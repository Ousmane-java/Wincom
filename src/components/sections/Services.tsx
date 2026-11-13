"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { sectors, services } from "@/lib/site";
import { FadeUp, RevealWords, Words } from "../ui";
import { useContact } from "../contact/ContactProvider";

function SiteGlyph() {
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full" fill="none">
      <rect x="6" y="8" width="108" height="74" rx="8" stroke="currentColor" strokeOpacity=".35" />
      <path d="M6 22h108" stroke="currentColor" strokeOpacity=".35" />
      <circle cx="14" cy="15" r="1.6" fill="currentColor" fillOpacity=".5" />
      <circle cx="20" cy="15" r="1.6" fill="currentColor" fillOpacity=".5" />
      <rect x="18" y="34" width="50" height="5" rx="2.5" fill="currentColor" fillOpacity=".7" />
      <rect x="18" y="44" width="34" height="5" rx="2.5" fill="currentColor" fillOpacity=".7" />
      <rect x="18" y="58" width="22" height="9" rx="4.5" fill="#c9a96e" />
      <path d="M86 40l12-5v10c0 7-5 11-12 14-7-3-12-7-12-14V35z" stroke="#c9a96e" strokeWidth="1.4" />
      <path d="M81 47l3.5 3.5L91 44" stroke="#c9a96e" strokeWidth="1.4" />
    </svg>
  );
}

function StrategyGlyph() {
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full" fill="none">
      <circle cx="60" cy="45" r="36" stroke="currentColor" strokeOpacity=".2" />
      <circle cx="60" cy="45" r="24" stroke="currentColor" strokeOpacity=".35" />
      <circle cx="60" cy="45" r="12" stroke="currentColor" strokeOpacity=".6" />
      <circle cx="60" cy="45" r="3.5" fill="#c9a96e" />
      <path d="M104 10 L63 42" stroke="#c9a96e" strokeWidth="1.4" />
      <path d="M104 10l-1 8m1-8l-8 1" stroke="#c9a96e" strokeWidth="1.4" />
    </svg>
  );
}

export function Services() {
  const [open, setOpen] = useState<string | null>(null);
  const { openContact } = useContact();

  return (
    <section id="services" className="relative mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-champagne" />
            Services
          </p>
        </div>
        <RevealWords as="h2" className="font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[1] md:col-span-7">
          <Words text="Deux expertises." />
          <br />
          <Words text="Un seul objectif :" />{" "}
          <Words text="vos clients." wordClass="italic text-champagne" />
        </RevealWords>
      </div>

      <div className="mt-16 grid gap-5 md:mt-24 lg:grid-cols-2">
        {services.map((s, i) => {
          const isOpen = open === s.id;
          return (
            <FadeUp key={s.id} delay={i * 0.1}>
              <motion.article
                layout
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
                className="win-border group relative overflow-hidden rounded-[28px] bg-graphite p-7 md:p-10"
              >
                {/* Projecteur qui suit la souris */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(500px_circle_at_var(--mx)_var(--my),rgba(201,169,110,0.09),transparent_45%)]" />

                <motion.div layout="position" className="relative flex items-start justify-between gap-6">
                  <div>
                    <span className="font-display text-7xl leading-none text-white/[0.08] md:text-8xl">{s.index}</span>
                    <h3 className="font-display mt-4 text-3xl leading-tight md:text-[2.6rem]">{s.title}</h3>
                    <p className="mt-4 max-w-md text-stone">{s.short}</p>
                  </div>
                  <div className="hidden h-24 w-32 shrink-0 text-ivory sm:block">
                    {s.id === "site" ? <SiteGlyph /> : <StrategyGlyph />}
                  </div>
                </motion.div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="relative mt-8 overflow-hidden border-t border-white/[0.06]"
                    >
                      {s.points.map((p, k) => (
                        <motion.li
                          key={p}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0, transition: { delay: 0.1 + k * 0.05 } }}
                          className="flex items-center gap-4 border-b border-white/[0.06] py-4 text-ivory/85"
                        >
                          <span className="h-1 w-1 rotate-45 bg-champagne" />
                          {p}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                <motion.div layout="position" className="relative mt-8 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setOpen(isOpen ? null : s.id)}
                    aria-expanded={isOpen}
                    className="flex items-center gap-3 rounded-full border border-white/15 px-5 py-2.5 text-sm transition-colors hover:border-champagne hover:text-champagne"
                  >
                    {isOpen ? "Refermer" : "Ce qui est inclus"}
                    <span className={`relative h-3 w-3 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>
                      <span className="absolute left-0 top-1/2 h-px w-3 bg-current" />
                      <span className="absolute left-1/2 top-0 h-3 w-px bg-current" />
                    </span>
                  </button>
                  <button
                    onClick={() => openContact("quote")}
                    className="px-2 py-2.5 text-sm text-stone transition-colors hover:text-ivory"
                  >
                    Demander un devis →
                  </button>
                </motion.div>
              </motion.article>
            </FadeUp>
          );
        })}
      </div>

      {/* Le lien entre les deux */}
      <FadeUp className="mt-14 flex flex-col items-center gap-4 text-center md:mt-20">
        <p className="font-display text-3xl md:text-5xl">
          Le site <em className="text-stone">attire</em>.{" "}
          <span className="text-champagne">+</span> La stratégie <em className="text-champagne">convertit</em>.
        </p>
        <p className="max-w-lg text-sm text-stone">
          Séparément, ce sont deux prestations. Ensemble, c&apos;est une machine à clients. C&apos;est ce que nous construisons avec vous.
        </p>
      </FadeUp>

      {/* Secteurs d'expertise */}
      <FadeUp className="mt-16 border-y border-white/[0.06] py-6 md:mt-20">
        <p className="eyebrow mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-champagne" />
          Secteurs d&apos;expertise
          <span className="h-px w-6 bg-champagne" />
        </p>
        {/* Ordinateur : une ligne centrée */}
        <ul className="hidden flex-wrap items-center justify-center gap-x-5 gap-y-3 md:flex">
          {sectors.map((s, i) => (
            <li key={s} className="flex items-center gap-5">
              {i > 0 && <span className="h-1.5 w-1.5 rotate-45 bg-champagne" aria-hidden />}
              <span className="font-display text-2xl text-ivory/90 lg:text-[1.7rem]">{s}</span>
            </li>
          ))}
        </ul>
        {/* Mobile : défilement doux */}
        <div className="overflow-hidden md:hidden">
          <ul className="marquee-track flex w-max items-center [animation-duration:26s]" aria-label="Secteurs d'expertise">
            {[...sectors, ...sectors].map((s, i) => (
              <li key={i} className="flex items-center" aria-hidden={i >= sectors.length}>
                <span className="font-display whitespace-nowrap px-4 text-xl text-ivory/90">{s}</span>
                <span className="h-1.5 w-1.5 rotate-45 bg-champagne" />
              </li>
            ))}
          </ul>
        </div>
      </FadeUp>
    </section>
  );
}
