"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { projects, type Project } from "@/lib/site";
import { WinWindow } from "../WinWindow";
import { ArrowUpRight, RevealWords, Words, prefersReducedMotion, useIsoLayoutEffect } from "../ui";
import { useContact } from "../contact/ContactProvider";

/**
 * Réalisations : cartes empilées (chacune glisse par-dessus la précédente),
 * qui s'ouvrent en étude de cas dans une fenêtre Wincom.
 */
export function Work() {
  const root = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState<Project | null>(null);

  useIsoLayoutEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".wk-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const st = {
          trigger: cards[i + 1],
          start: "top bottom",
          end: "top 15%",
          scrub: true,
        };
        gsap.to(card.querySelector(".wk-shade"), { opacity: 0.75, ease: "none", scrollTrigger: st });
        gsap.to(card.querySelector(".wk-inner"), {
          scale: 0.92,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top 15%",
            scrub: true,
          },
        });
      });
      gsap.utils.toArray<HTMLElement>(".wk-img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -6 },
          { yPercent: 6, ease: "none", scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="realisations" ref={root} className="relative bg-ivory text-ink">
      <div className="mx-auto max-w-[1400px] px-5 pt-28 md:px-10 md:pt-40">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow flex items-center gap-3 text-ink/50!">
              <span className="h-px w-8 bg-champagne" />
              Réalisations
            </p>
            <RevealWords as="h2" className="font-display mt-8 text-[clamp(2.4rem,5.4vw,5rem)] leading-[1]">
              <Words text="Des projets réels." />
              <br />
              <Words text="Des résultats" /> <Words text="réels." wordClass="italic text-[#a8864a]" />
            </RevealWords>
          </div>
          <p className="max-w-sm text-ink/60">
            Commerce local, plateforme panafricaine, logiciel B2B : chaque projet a sa cible. Notre méthode, elle, reste la même.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 pb-28 pt-16 md:px-10 md:pb-40 md:pt-24">
        {projects.map((p, i) => (
          <div key={p.slug} className="wk-card sticky top-20 pb-6 md:top-24" style={{ zIndex: i + 1 }}>
            <article
              className="wk-inner group relative grid origin-top cursor-pointer overflow-hidden rounded-[28px] bg-ink text-ivory shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] md:grid-cols-12"
              onClick={() => setCurrent(p)}
              data-cursor="Voir"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setCurrent(p)}
              aria-label={`Voir l'étude de cas ${p.name}`}
            >
              <span className="wk-shade pointer-events-none absolute inset-0 z-20 bg-ink opacity-0" />
              <div className="flex flex-col justify-between gap-8 p-7 md:col-span-5 md:p-10">
                <div>
                  <div className="flex items-center gap-3 text-xs text-stone">
                    <span className="tracking-[0.2em]">0{i + 1}</span>
                    <span className="h-px w-6 bg-white/20" />
                    <span>{p.scope}</span>
                  </div>
                  <h3 className="font-display mt-6 text-5xl leading-none md:text-6xl">{p.name}</h3>
                  <p className="mt-3 text-sm text-champagne">{p.category}</p>
                  <p className="mt-6 max-w-sm leading-relaxed text-ivory/75">{p.summary}</p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-stone">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <span className="inline-flex items-center gap-2 text-sm text-ivory">
                      Voir l&apos;étude de cas
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <VisitLink project={p} variant="ghost" />
                  </div>
                </div>
              </div>
              <div className="relative p-3 md:col-span-7 md:p-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-graphite">
                  <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-1.5 bg-graphite/90 px-4 py-2.5 backdrop-blur">
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="ml-3 text-[10px] text-stone">{p.domain}</span>
                  </div>
                  <div className="wk-img absolute inset-x-0 -top-[6%] bottom-[-6%] pt-8">
                    <Image
                      src={p.image}
                      alt={`Capture du site ${p.name}`}
                      fill
                      sizes="(min-width: 768px) 55vw, 100vw"
                      className="object-cover object-top transition-transform duration-[1.4s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      <CaseStudy project={current} onClose={() => setCurrent(null)} />
    </section>
  );
}

function CaseStudy({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { openContact } = useContact();
  const p = project;
  return (
    <WinWindow open={!!p} onClose={onClose} title={p ? `Étude de cas · ${p.name}` : "Étude de cas"} size="xl">
      {p && (
        <div>
          <div className="grid gap-8 p-6 md:grid-cols-12 md:p-10">
            <div className="md:col-span-7">
              <p className="text-sm text-champagne">{p.category}</p>
              <h3 className="font-display mt-3 text-5xl leading-none md:text-7xl">{p.name}</h3>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/80">{p.summary}</p>
            </div>
            <div className="flex flex-col justify-end gap-3 md:col-span-5 md:items-end">
              <VisitLink project={p} variant="solid" />
            </div>
          </div>

          <div className="px-3 md:px-6">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Visiter"
              aria-label={`Visiter ${p.domain}`}
              className="group/shot relative block aspect-[16/9] overflow-hidden rounded-[20px] bg-ink"
            >
              <Image
                src={p.image}
                alt={`Site ${p.name}`}
                fill
                sizes="90vw"
                className="object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover/shot:scale-[1.03]"
              />
            </a>
          </div>

          <div className="grid gap-px overflow-hidden border-t border-white/[0.06] md:mt-10 md:grid-cols-3">
            <Block label="Le défi">
              <p className="leading-relaxed text-ivory/80">{p.challenge}</p>
            </Block>
            <Block label="Ce que nous avons fait">
              <ul className="space-y-3">
                {p.solution.map((s) => (
                  <li key={s} className="flex gap-3 text-ivory/80">
                    <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-champagne" />
                    {s}
                  </li>
                ))}
              </ul>
            </Block>
            <Block label="Le résultat" accent>
              <p className="font-display text-2xl leading-snug text-ivory">{p.result}</p>
            </Block>
          </div>

          <div className="flex flex-col items-start justify-between gap-6 border-t border-white/[0.06] p-6 md:flex-row md:items-center md:p-10">
            <p className="font-display text-3xl">
              Votre projet est <em className="text-champagne">le prochain</em>&nbsp;?
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <VisitLink project={p} variant="outline" />
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => openContact("quote"), 350);
                }}
                className="rounded-full bg-champagne px-6 py-3 text-sm font-medium text-ink hover:bg-champagne-soft"
              >
                Demander un devis
              </button>
            </div>
          </div>
        </div>
      )}
    </WinWindow>
  );
}

function Block({ label, children, accent }: { label: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`p-6 md:p-10 ${accent ? "bg-champagne/[0.05]" : ""}`}>
      <p className="eyebrow mb-5">{label}</p>
      {children}
    </div>
  );
}

/** Bouton « Visiter » qui affiche le domaine du client. */
function VisitLink({ project, variant }: { project: Project; variant: "solid" | "outline" | "ghost" }) {
  const styles = {
    solid:
      "rounded-full bg-champagne px-5 py-3 text-sm font-medium text-ink hover:bg-champagne-soft",
    outline:
      "rounded-full border border-white/15 px-5 py-3 text-sm text-ivory hover:border-champagne hover:text-champagne",
    ghost: "text-sm text-stone hover:text-champagne",
  }[variant];
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      data-cursor="Visiter"
      className={`group/visit inline-flex items-center gap-2 transition-colors duration-300 ${styles}`}
    >
      <span className="h-1.5 w-1.5 rotate-45 bg-current opacity-70" />
      {variant === "ghost" ? project.domain : <>Visiter {project.domain}</>}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/visit:-translate-y-0.5 group-hover/visit:translate-x-0.5" />
    </a>
  );
}
