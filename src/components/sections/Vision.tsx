"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { keywords } from "@/lib/site";
import { prefersReducedMotion, useIsoLayoutEffect } from "../ui";

export function Marquee() {
  const items = [...keywords, ...keywords];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] py-6" aria-hidden>
      <div className="marquee-track flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {items.map((w, i) => (
              <span key={i} className="flex items-center">
                <span className={`font-display px-8 text-3xl md:text-5xl ${i % 2 ? "italic text-stone" : "text-ivory/90"}`}>
                  {w}
                </span>
                <span className="h-1.5 w-1.5 rotate-45 bg-champagne" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const manifesto =
  "La plupart des sites sont beaux. Très peu rapportent. Un site sans stratégie, c'est une vitrine magnifique dans une rue vide. Chez Wincom, on construit la vitrine, et on fait venir la foule.";

const pains = [
  { k: "01", t: "Un site, mais pas de visiteurs", d: "Personne ne vous trouve sur Google ni sur les réseaux." },
  { k: "02", t: "Des visiteurs, mais pas de clients", d: "Le message n'est pas clair, le parcours n'invite pas à agir." },
  { k: "03", t: "Un site fragile", d: "Lent, mal sécurisé, il fait fuir au lieu de rassurer." },
];

/**
 * Vision : section ivoire révélée en rideau, manifeste lu mot à mot au scroll.
 */
export function Vision() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".v-curtain",
        { clipPath: "inset(12% 6% 0% 6% round 40px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 15%", scrub: true },
        }
      );
      gsap.fromTo(
        ".v-word",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".v-text", start: "top 75%", end: "bottom 45%", scrub: true },
        }
      );
      gsap.from(".v-pain", {
        y: 50,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: ".v-pains", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="vision" ref={root} className="relative">
      <div className="v-curtain bg-ivory text-ink">
        <div className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
          <p className="eyebrow flex items-center gap-3 text-ink/50!">
            <span className="h-px w-8 bg-champagne" />
            Notre vision
          </p>

          <p className="v-text font-display mt-10 max-w-6xl text-[clamp(2rem,4.6vw,4.4rem)] leading-[1.08]">
            {manifesto.split(" ").map((w, i) => {
              const accent = ["rapportent.", "foule."].includes(w);
              return (
                <span key={i} className={`v-word ${accent ? "italic text-[#a8864a]" : ""}`}>
                  {w}{" "}
                </span>
              );
            })}
          </p>

          <div className="v-pains mt-20 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:mt-28 md:grid-cols-3">
            {pains.map((p) => (
              <div key={p.k} className="v-pain group relative bg-ivory p-8 transition-colors duration-500 hover:bg-ivory-2 md:p-10">
                <span className="text-xs tracking-[0.2em] text-ink/40">{p.k}</span>
                <h3 className="font-display mt-6 text-3xl leading-tight">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{p.d}</p>
                <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 group-hover:scale-x-100" />
              </div>
            ))}
          </div>

          <p className="mt-14 max-w-xl text-lg leading-relaxed text-ink/70">
            Notre métier : régler ces trois problèmes <strong className="font-medium text-ink">en même temps</strong>.
            Parce qu&apos;un site, c&apos;est bien. Mais des clients, c&apos;est mieux.
          </p>
        </div>
      </div>
    </section>
  );
}
