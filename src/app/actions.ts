"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { site } from "@/lib/site";
import {
  BUDGET_OPTIONS,
  NEED_OPTIONS,
  SITUATION_OPTIONS,
  TIMELINE_OPTIONS,
  type QuoteInput,
  type QuoteResult,
} from "@/lib/quote";

/* Limitation simple : 5 demandes / 10 min par IP (par instance). */
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const list = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const labelOf = (opts: readonly { value: string; label: string }[], v: string) =>
  opts.find((o) => o.value === v)?.label ?? "Non précisé";

export async function sendQuote(raw: QuoteInput): Promise<QuoteResult> {
  // Pot de miel anti-robots : champ invisible qui doit rester vide.
  if (clip(raw.website, 200)) return { ok: true };
  // Un humain met plus de 4 secondes à remplir 6 étapes.
  if (typeof raw.startedAt === "number" && Date.now() - raw.startedAt < 4000) return { ok: true };

  const data = {
    need: clip(raw.need, 40),
    situation: clip(raw.situation, 40),
    activity: clip(raw.activity, 2000),
    timeline: clip(raw.timeline, 40),
    budget: clip(raw.budget, 40),
    name: clip(raw.name, 120),
    company: clip(raw.company, 160),
    email: clip(raw.email, 200),
    phone: clip(raw.phone, 40),
  };

  if (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || !data.need) {
    return { ok: false, reason: "invalid" };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) return { ok: false, reason: "rate_limited" };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.warn("[devis] RESEND_API_KEY ou CONTACT_TO_EMAIL manquant : email non envoyé.", data);
    return { ok: false, reason: "not_configured" };
  }

  const from = process.env.CONTACT_FROM_EMAIL ?? "Wincom <onboarding@resend.dev>";
  const resend = new Resend(apiKey);

  const rows: [string, string][] = [
    ["Besoin", labelOf(NEED_OPTIONS, data.need)],
    ["Situation", labelOf(SITUATION_OPTIONS, data.situation)],
    ["Délai", labelOf(TIMELINE_OPTIONS, data.timeline)],
    ["Budget", labelOf(BUDGET_OPTIONS, data.budget)],
    ["Nom", data.name],
    ["Entreprise", data.company || "—"],
    ["Email", data.email],
    ["Téléphone / WhatsApp", data.phone || "—"],
  ];

  const digits = data.phone.replace(/[^\d+]/g, "").replace(/^\+/, "").replace(/^0/, "33");
  const waReply = digits.length >= 8 ? `https://wa.me/${digits}` : null;

  const html = `
  <div style="background:#0a0a0a;padding:32px;font-family:Helvetica,Arial,sans-serif;color:#f5f3ee">
    <div style="max-width:560px;margin:0 auto;background:#141414;border:1px solid #2a2a2a;border-radius:18px;padding:32px">
      <p style="margin:0;color:#c9a96e;letter-spacing:.25em;font-size:11px;text-transform:uppercase">Nouvelle demande de devis</p>
      <h1 style="font-family:Georgia,serif;font-weight:400;font-size:28px;margin:12px 0 24px">${esc(data.name)}${data.company ? ` · ${esc(data.company)}` : ""}</h1>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:10px 0;color:#8a8780;border-top:1px solid #222;width:42%">${k}</td><td style="padding:10px 0;border-top:1px solid #222">${esc(v)}</td></tr>`
          )
          .join("")}
      </table>
      <p style="margin:24px 0 8px;color:#8a8780;font-size:12px;text-transform:uppercase;letter-spacing:.2em">Activité & projet</p>
      <p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap">${esc(data.activity || "—")}</p>
      <div style="margin-top:28px">
        <a href="mailto:${esc(data.email)}" style="display:inline-block;background:#c9a96e;color:#0a0a0a;text-decoration:none;padding:12px 20px;border-radius:999px;font-size:14px;margin-right:8px">Répondre par email</a>
        ${waReply ? `<a href="${waReply}" style="display:inline-block;border:1px solid #c9a96e;color:#c9a96e;text-decoration:none;padding:12px 20px;border-radius:999px;font-size:14px">Répondre sur WhatsApp</a>` : ""}
      </div>
    </div>
  </div>`;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject: `Devis · ${data.name}${data.company ? ` (${data.company})` : ""} · ${labelOf(NEED_OPTIONS, data.need)}`,
    html,
  });

  if (error) {
    console.error("[devis] Resend error", error);
    return { ok: false, reason: "error" };
  }

  // Email de confirmation au prospect (nécessite un domaine vérifié chez Resend).
  if (process.env.SEND_CONFIRMATION === "true") {
    await resend.emails
      .send({
        from,
        to: [data.email],
        replyTo: to,
        subject: "Wincom · Nous avons bien reçu votre demande",
        html: `
        <div style="background:#0a0a0a;padding:32px;font-family:Helvetica,Arial,sans-serif;color:#f5f3ee">
          <div style="max-width:520px;margin:0 auto;background:#141414;border:1px solid #2a2a2a;border-radius:18px;padding:32px">
            <p style="margin:0;font-family:Georgia,serif;font-size:26px">Merci ${esc(data.name.split(" ")[0])}.</p>
            <p style="color:#c9c6bf;line-height:1.7;font-size:15px">Votre demande est bien arrivée. Nous l'étudions avec attention et revenons vers vous <strong style="color:#c9a96e">sous ${site.responseTime}</strong>.</p>
            <p style="color:#8a8780;font-size:13px;margin-top:28px">Un site, c'est bien. Des clients, c'est mieux.<br/>Wincom Consulting</p>
          </div>
        </div>`,
      })
      .catch((e) => console.error("[devis] confirmation error", e));
  }

  return { ok: true };
}
