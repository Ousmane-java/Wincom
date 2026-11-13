"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, useTransition } from "react";
import { sendQuote } from "@/app/actions";
import {
  BUDGET_OPTIONS,
  NEED_OPTIONS,
  SITUATION_OPTIONS,
  TIMELINE_OPTIONS,
  type QuoteInput,
} from "@/lib/quote";
import { site, whatsappLink } from "@/lib/site";
import { WhatsIcon } from "./ContactWindow";

const STEPS = ["Besoin", "Situation", "Activité", "Délai", "Budget", "Coordonnées"] as const;

type Status = "idle" | "sent" | "fallback" | "error";

export function QuoteForm({
  onBack,
  onProgress,
  onDone,
}: {
  onBack: () => void;
  onProgress: (p: number) => void;
  onDone: () => void;
}) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [pending, startTransition] = useTransition();
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const [data, setData] = useState<QuoteInput>({
    need: "",
    situation: "",
    activity: "",
    timeline: "",
    budget: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    website: "",
  });

  useEffect(() => {
    onProgress(status === "idle" || status === "error" ? step / STEPS.length : 1);
  }, [step, status, onProgress]);

  const set = (k: keyof QuoteInput, v: string) => setData((d) => ({ ...d, [k]: v }));
  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
  };
  const pick = (k: keyof QuoteInput, v: string) => {
    set(k, v);
    setTimeout(() => go(step + 1), 260);
  };

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  const canNext = [
    !!data.need,
    !!data.situation,
    data.activity.trim().length >= 3,
    !!data.timeline,
    true,
    data.name.trim().length > 1 && emailOk,
  ][step];

  const summary = () => {
    const l = (o: readonly { value: string; label: string }[], v: string) => o.find((x) => x.value === v)?.label ?? "—";
    return [
      "Bonjour Wincom, voici ma demande de devis :",
      `• Besoin : ${l(NEED_OPTIONS, data.need)}`,
      `• Situation : ${l(SITUATION_OPTIONS, data.situation)}`,
      `• Activité : ${data.activity}`,
      `• Délai : ${l(TIMELINE_OPTIONS, data.timeline)}`,
      `• Budget : ${l(BUDGET_OPTIONS, data.budget)}`,
      `• ${data.name}${data.company ? ` (${data.company})` : ""} · ${data.email}${data.phone ? ` · ${data.phone}` : ""}`,
    ].join("\n");
  };

  const submit = () => {
    startTransition(async () => {
      try {
        const res = await sendQuote({ ...data, startedAt: startedAt.current });
        if (res.ok) setStatus("sent");
        else if (res.reason === "invalid") setStatus("error");
        else setStatus("fallback");
      } catch {
        setStatus("fallback");
      }
    });
  };

  if (status === "sent" || status === "fallback") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start p-6 md:p-10"
      >
        <svg viewBox="0 0 64 64" className="h-14 w-14 text-champagne">
          <motion.path
            d="M14 33 L27 45 L50 19"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          />
          <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeOpacity=".3" />
        </svg>
        {status === "sent" ? (
          <>
            <h3 className="font-display mt-6 text-4xl md:text-5xl">
              Merci {data.name.split(" ")[0]}, <em className="text-champagne">c&apos;est reçu.</em>
            </h3>
            <p className="mt-4 max-w-md text-stone">
              Votre demande est entre de bonnes mains. Nous revenons vers vous sous {site.responseTime}.
            </p>
            <button onClick={onDone} className="mt-8 rounded-full bg-ivory px-6 py-3 text-sm text-ink transition-colors hover:bg-champagne">
              Fermer
            </button>
          </>
        ) : (
          <>
            <h3 className="font-display mt-6 text-4xl md:text-5xl">
              Dernière étape, <em className="text-champagne">en un clic.</em>
            </h3>
            <p className="mt-4 max-w-md text-stone">
              Envoyez votre demande déjà rédigée sur WhatsApp : nous vous répondons sous {site.responseTime}.
            </p>
            <a
              href={whatsappLink(summary())}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-champagne px-6 py-3 text-sm font-medium text-ink"
            >
              <WhatsIcon className="h-4 w-4" /> Envoyer sur WhatsApp
            </a>
          </>
        )}
      </motion.div>
    );
  }

  return (
    <div className="flex min-h-[460px] flex-col p-6 md:p-10">
      {/* Indicateur d'étapes */}
      <div className="flex items-center justify-between">
        <span className="eyebrow">
          Étape {String(step + 1).padStart(2, "0")} <span className="text-stone/50">/ 06</span> · {STEPS[step]}
        </span>
        <div className="hidden gap-1.5 sm:flex">
          {STEPS.map((s, i) => (
            <span
              key={s}
              className={`h-1 rounded-full transition-all duration-500 ${i <= step ? "w-6 bg-champagne" : "w-3 bg-white/10"}`}
            />
          ))}
        </div>
      </div>

      <div className="relative mt-8 flex-1">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, y: dir * 24, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: dir * -24, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <Question title={<>De quoi avez-vous <em className="text-champagne">besoin</em>&nbsp;?</>}>
                <div className="grid gap-3 sm:grid-cols-3">
                  {NEED_OPTIONS.map((o) => (
                    <Option key={o.value} active={data.need === o.value} onClick={() => pick("need", o.value)} big>
                      <span className="font-display block text-xl">{o.label}</span>
                      <span className="mt-1 block text-xs text-stone">{o.hint}</span>
                    </Option>
                  ))}
                </div>
              </Question>
            )}
            {step === 1 && (
              <Question title={<>Où en êtes-vous <em className="text-champagne">aujourd&apos;hui</em>&nbsp;?</>}>
                <div className="grid gap-3">
                  {SITUATION_OPTIONS.map((o) => (
                    <Option key={o.value} active={data.situation === o.value} onClick={() => pick("situation", o.value)}>
                      {o.label}
                    </Option>
                  ))}
                </div>
              </Question>
            )}
            {step === 2 && (
              <Question title={<>Parlez-nous de votre <em className="text-champagne">activité</em>.</>}>
                <textarea
                  autoFocus
                  value={data.activity}
                  onChange={(e) => set("activity", e.target.value)}
                  maxLength={2000}
                  rows={5}
                  placeholder="Ex. : Je suis pâtissière à Lyon, je vends surtout via Instagram et je veux une boutique en ligne…"
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-ivory outline-none transition-colors placeholder:text-stone/60 focus:border-champagne/60"
                />
              </Question>
            )}
            {step === 3 && (
              <Question title={<>Quel est votre <em className="text-champagne">délai</em>&nbsp;?</>}>
                <div className="grid gap-3">
                  {TIMELINE_OPTIONS.map((o) => (
                    <Option key={o.value} active={data.timeline === o.value} onClick={() => pick("timeline", o.value)}>
                      {o.label}
                    </Option>
                  ))}
                </div>
              </Question>
            )}
            {step === 4 && (
              <Question
                title={<>Un budget <em className="text-champagne">envisagé</em>&nbsp;?</>}
                hint="Facultatif : cela nous aide simplement à vous proposer la solution la plus juste."
              >
                <div className="flex flex-wrap gap-2.5">
                  {BUDGET_OPTIONS.map((o) => (
                    <Option key={o.value} active={data.budget === o.value} onClick={() => pick("budget", o.value)} pill>
                      {o.label}
                    </Option>
                  ))}
                </div>
              </Question>
            )}
            {step === 5 && (
              <Question title={<>Comment vous <em className="text-champagne">recontacter</em>&nbsp;?</>}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Nom & prénom *" value={data.name} onChange={(v) => set("name", v)} autoComplete="name" autoFocus />
                  <Field label="Entreprise" value={data.company} onChange={(v) => set("company", v)} autoComplete="organization" />
                  <Field label="Email *" type="email" value={data.email} onChange={(v) => set("email", v)} autoComplete="email" />
                  <Field label="Téléphone / WhatsApp" type="tel" value={data.phone} onChange={(v) => set("phone", v)} autoComplete="tel" />
                  {/* Pot de miel (invisible pour les humains) */}
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                    name="website"
                    value={data.website}
                    onChange={(e) => set("website", e.target.value)}
                  />
                </div>
                {status === "error" && (
                  <p className="mt-3 text-sm text-red-300">Vérifiez votre nom et votre email, puis réessayez.</p>
                )}
              </Question>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-6">
        <button
          type="button"
          onClick={() => (step === 0 ? onBack() : go(step - 1))}
          className="text-sm text-stone transition-colors hover:text-ivory"
        >
          ← Retour
        </button>
        {step < 5 ? (
          <button
            type="button"
            disabled={!canNext}
            onClick={() => go(step + 1)}
            className="rounded-full border border-white/15 px-6 py-3 text-sm transition-all hover:border-champagne hover:text-champagne disabled:pointer-events-none disabled:opacity-30"
          >
            {step === 4 && !data.budget ? "Passer" : "Continuer"} →
          </button>
        ) : (
          <button
            type="button"
            disabled={!canNext || pending}
            onClick={submit}
            className="rounded-full bg-champagne px-7 py-3 text-sm font-medium text-ink transition-all hover:bg-champagne-soft disabled:opacity-40"
          >
            {pending ? "Envoi…" : "Envoyer ma demande"}
          </button>
        )}
      </div>
    </div>
  );
}

function Question({ title, hint, children }: { title: React.ReactNode; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-3xl leading-tight md:text-4xl">{title}</h3>
      {hint && <p className="mt-2 text-sm text-stone">{hint}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Option({
  active,
  onClick,
  children,
  big,
  pill,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  big?: boolean;
  pill?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative border text-left transition-all duration-300 ${
        pill ? "rounded-full px-5 py-2.5 text-sm" : big ? "rounded-2xl p-5" : "rounded-2xl px-5 py-4"
      } ${
        active
          ? "border-champagne bg-champagne/10 text-ivory"
          : "border-white/[0.08] bg-white/[0.02] text-ivory/85 hover:border-white/25"
      }`}
    >
      {children}
      {active && !pill && <span className="absolute right-4 top-4 h-1.5 w-1.5 rotate-45 bg-champagne" />}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="group block rounded-2xl border border-white/10 bg-white/[0.02] px-4 pb-3 pt-2.5 transition-colors focus-within:border-champagne/60">
      <span className="text-[0.68rem] uppercase tracking-[0.18em] text-stone">{label}</span>
      <input
        type={type}
        value={value}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full bg-transparent text-ivory outline-none"
      />
    </label>
  );
}
