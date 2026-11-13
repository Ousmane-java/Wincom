"use client";

import { site } from "@/lib/site";
import { useContact } from "../contact/ContactProvider";
import { Magnetic, RevealWords, Words } from "../ui";

/**
 * Contact au milieu de la page : grand titre + bouton rond magnétique
 * entouré d'un texte qui tourne. Ouvre la fenêtre Wincom.
 */
export function ContactCTA() {
  const { openContact } = useContact();
  const ring = `RÉPONSE SOUS ${site.responseTime.toUpperCase()} · PREMIER ÉCHANGE OFFERT · PARTOUT DANS LE MONDE · `;

  return (
    <section id="contact" className="relative overflow-hidden border-y border-white/[0.06]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne/[0.06] blur-[120px]" />
      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center px-5 py-28 text-center md:px-10 md:py-40">
        <p className="eyebrow flex items-center gap-3">
          <span className="h-px w-8 bg-champagne" />
          Votre projet
          <span className="h-px w-8 bg-champagne" />
        </p>
        <RevealWords as="h2" className="font-display mt-8 max-w-5xl text-[clamp(2.6rem,7vw,6.4rem)] leading-[0.98]">
          <Words text="Votre prochain client" />
          <br />
          <Words text="vous cherche" /> <Words text="déjà." wordClass="italic text-champagne" />
        </RevealWords>
        <p className="mt-8 max-w-lg text-stone">
          Où que vous soyez, on vous répond sous {site.responseTime}. Dites-nous où vous en êtes : on vous dit, simplement, comment aller le chercher.
        </p>

        <Magnetic strength={0.4} className="mt-16">
          <button
            onClick={() => openContact()}
            data-cursor="Écrire"
            className="group relative flex h-48 w-48 items-center justify-center rounded-full md:h-56 md:w-56"
            aria-label="Parlons de votre projet"
          >
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite] text-stone motion-reduce:animate-none">
              <defs>
                <path id="ring-path" d="M100,100 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0" />
              </defs>
              <text fontSize="9.6" fill="currentColor">
                <textPath href="#ring-path" textLength="536" lengthAdjust="spacing">{ring}</textPath>
              </text>
            </svg>
            <span className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full bg-champagne text-ink transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-110 md:h-36 md:w-36">
              <span className="font-display text-2xl leading-none">Parlons</span>
              <span className="font-display text-2xl italic leading-none">-en</span>
            </span>
          </button>
        </Magnetic>
      </div>
    </section>
  );
}
