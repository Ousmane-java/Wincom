"use client";

import Link from "next/link";
import { team } from "@/lib/site";
import { FounderCard } from "../team/FounderCard";
import { TeamIcon } from "../team/TeamIcon";
import { Arrow, FadeUp, RevealWords, Words } from "../ui";

/** Aperçu de l'équipe sur l'accueil, avec lien vers la page Équipe. */
export function TeamTeaser() {
  return (
    <section id="equipe" className="relative border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-champagne" />
              L&apos;équipe
            </p>
            <RevealWords as="h2" className="font-display mt-8 text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1.02]">
              <Words text="Des profils différents." />
              <br />
              <Words text="Un seul objectif :" /> <Words text="vous." wordClass="italic text-champagne" />
            </RevealWords>
            <p className="mt-6 max-w-md leading-relaxed text-stone">
              Selon votre projet, nous mobilisons les bons profils, coordonnés par un interlocuteur unique.
            </p>
            <Link
              href="/equipe"
              data-cursor="Voir"
              className="group mt-10 inline-flex items-center gap-3 rounded-full border border-white/15 py-3 pl-6 pr-3 text-sm transition-colors hover:border-champagne hover:text-champagne"
            >
              Découvrir l&apos;équipe
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ivory text-ink transition-transform duration-500 group-hover:-rotate-45">
                <Arrow />
              </span>
            </Link>
          </div>

          <div className="grid gap-5 lg:col-span-7">
            <FadeUp>
              <FounderCard />
            </FadeUp>
            <FadeUp delay={0.1}>
              <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-white/[0.06] bg-white/[0.06] sm:grid-cols-3">
                {team.map((p) => (
                  <li key={p.id} className="flex items-center gap-3 bg-ink p-5">
                    <TeamIcon name={p.icon} className="h-7 w-7 shrink-0 text-ivory" />
                    <span className="text-sm leading-snug text-ivory/85">{p.title}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
