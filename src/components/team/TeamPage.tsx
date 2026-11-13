"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { team, site } from "@/lib/site";
import { useContact } from "../contact/ContactProvider";
import { Arrow, FadeUp, Magnetic, Words, prefersReducedMotion, useIsoLayoutEffect } from "../ui";
import { FounderCard } from "./FounderCard";
import { TeamIcon } from "./TeamIcon";

const howWeWork = [
  {
    k: "01",
    t: "Un seul interlocuteur",
    d: "Vous parlez toujours à la même personne. Elle coordonne tout le reste.",
  },
  {
    k: "02",
    t: "Les bons profils, au bon moment",
    d: "Chaque expertise intervient quand votre projet en a besoin. Ni plus, ni moins.",
  },
  {
    k: "03",
    t: "Un suivi transparent",
    d: `Des points réguliers, des réponses sous ${site.responseTime}, et un accompagnement après la mise en ligne.`,
  },
];

export function TeamPage() {
  const root = useRef<HTMLDivElement>(null);
  const { openContact } = useContact();

  useIsoLayoutEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".t-hero .wi", { yPercent: 110, rotate: 3, duration: 1.2, ease: "expo.out", stagger: 0.05, delay: 0.1 });
      gsap.from(".t-fade", { y: 24, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.1, delay: 0.5 });
      gsap.from(".t-pole", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".t-poles", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      {/* En-tête */}
      <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-48">
        <div className="pointer-events-none absolute -right-40 top-10 h-[560px] w-[560px] rounded-full bg-champagne/[0.07] blur-[140px]" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          <p className="t-fade eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-champagne" />
            L&apos;équipe Wincom
          </p>
          <h1 className="t-hero font-display mt-8 max-w-5xl text-[clamp(2.8rem,7.4vw,6.8rem)] leading-[0.95]">
            <Words text="Des profils différents." />
            <br />
            <Words text="Une seule obsession :" /> <Words text="vos clients." wordClass="italic text-champagne" />
          </h1>
          <p className="t-fade mt-8 max-w-xl text-lg leading-relaxed text-stone">
            Conseil, marketing, design, développement, sécurité, relation client : Wincom réunit des expertises
            complémentaires. Selon votre projet, nous mobilisons les bons profils, coordonnés par un interlocuteur unique.
          </p>
        </div>
      </section>

      {/* Fondateur + principe */}
      <section className="mx-auto grid max-w-[1400px] gap-5 px-5 md:px-10 lg:grid-cols-12">
        <FadeUp className="lg:col-span-7">
          <FounderCard className="h-full" />
        </FadeUp>
        <FadeUp delay={0.1} className="lg:col-span-5">
          <div className="flex h-full flex-col justify-between rounded-[28px] bg-ivory p-7 text-ink md:p-10">
            <svg viewBox="0 0 40 30" className="h-7 w-auto self-start text-[#a8864a]" fill="currentColor" aria-hidden>
              <path d="M0 30V17C0 7 5 1 15 0v6c-5 1-8 4-8 10h8v14zm22 0V17c0-10 5-16 15-17v6c-5 1-8 4-8 10h8v14z" />
            </svg>
            <p className="font-display mt-8 text-3xl leading-snug md:text-4xl">
              « Win », c&apos;est gagner. Un projet n&apos;est réussi que quand <em className="text-[#a8864a]">vous</em> gagnez.
            </p>
            <p className="mt-8 text-sm text-ink/60">La conviction qui guide toute l&apos;équipe.</p>
          </div>
        </FadeUp>
      </section>

      {/* Les pôles */}
      <section className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-champagne" />
              Nos expertises
            </p>
            <h2 className="font-display mt-6 text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1.02]">
              Six pôles, <em className="text-champagne">une équipe.</em>
            </h2>
          </div>
          <p className="max-w-sm text-stone">Chaque pôle apporte un savoir-faire précis. Ensemble, ils couvrent tout le chemin jusqu&apos;à vos clients.</p>
        </div>

        <div className="t-poles mt-14 grid gap-5 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {team.map((p, i) => (
            <article
              key={p.id}
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
              className="t-pole win-border group relative flex flex-col overflow-hidden rounded-[28px] bg-graphite p-7 md:p-8"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(420px_circle_at_var(--mx)_var(--my),rgba(201,169,110,0.1),transparent_45%)]" />
              <div className="relative flex items-start justify-between">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 text-ivory transition-colors duration-500 group-hover:border-champagne/50">
                  <TeamIcon name={p.icon} className="h-9 w-9" />
                </span>
                <span className="font-display text-5xl leading-none text-white/[0.08]">0{i + 1}</span>
              </div>
              <h3 className="font-display relative mt-8 text-3xl leading-tight">{p.title}</h3>
              <p className="relative mt-3 leading-relaxed text-stone">{p.text}</p>
              <ul className="relative mt-6 border-t border-white/[0.06] pt-5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3 py-1.5 text-sm text-ivory/80">
                    <span className="h-1 w-1 rotate-45 bg-champagne" />
                    {pt}
                  </li>
                ))}
              </ul>
              <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 group-hover:scale-x-100" />
            </article>
          ))}
        </div>
      </section>

      {/* Comment on travaille */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-36">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-champagne" />
            Comment on travaille ensemble
          </p>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[28px] border border-white/[0.06] bg-white/[0.06] md:grid-cols-3">
            {howWeWork.map((h) => (
              <FadeUp key={h.k} className="bg-ink p-8 md:p-10">
                <span className="text-xs tracking-[0.2em] text-stone">{h.k}</span>
                <h3 className="font-display mt-6 text-3xl leading-tight">{h.t}</h3>
                <p className="mt-3 leading-relaxed text-stone">{h.d}</p>
              </FadeUp>
            ))}
          </div>

          <div className="mt-24 flex flex-col items-center text-center">
            <h2 className="font-display max-w-3xl text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.02]">
              Envie de travailler <em className="text-champagne">avec nous</em>&nbsp;?
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <button
                  onClick={() => openContact("quote")}
                  className="group flex items-center gap-3 rounded-full bg-ivory py-4 pl-7 pr-4 text-sm font-medium text-ink transition-colors duration-500 hover:bg-champagne"
                >
                  Demander un devis
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-ivory transition-transform duration-500 group-hover:-rotate-45">
                    <Arrow />
                  </span>
                </button>
              </Magnetic>
              <button onClick={() => openContact()} className="px-3 py-4 text-sm text-ivory/80 hover:text-ivory">
                Ou simplement discuter →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
