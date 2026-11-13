"use client";

import { contact, founder, mailLink, nav, site, whatsappLink } from "@/lib/site";
import { realHref, useGoTo } from "@/lib/useGoTo";
import { useContact } from "../contact/ContactProvider";
import { LogoMark } from "../Logo";
import { ArrowUpRight } from "../ui";

export function Footer() {
  const { openContact } = useContact();
  const navigate = useGoTo();

  return (
    <footer className="relative overflow-hidden bg-ivory text-ink">
      <div className="mx-auto max-w-[1400px] px-5 pt-24 md:px-10 md:pt-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-ink/50!">Contact</p>
            <button
              onClick={() => openContact()}
              data-cursor="Écrire"
              className="group mt-6 block text-left"
            >
              <span className="font-display block text-[clamp(3rem,9vw,8rem)] leading-[0.9]">
                Parlons<em className="text-[#a8864a]">-en.</em>
              </span>
              <span className="mt-4 block h-px w-full origin-left scale-x-[0.15] bg-ink transition-transform duration-1000 ease-[var(--ease-out)] group-hover:scale-x-100" />
            </button>
            <p className="mt-6 max-w-md text-ink/60">
              Réponse sous {site.responseTime}. Premier échange offert, sans engagement.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm lg:col-span-5">
            <div>
              <p className="eyebrow text-ink/40!">Écrire</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 hover:text-[#a8864a]">
                    WhatsApp <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <span className="block text-ink/50">Réponse rapide</span>
                </li>
                <li>
                  <a href={mailLink()} className="hover:text-[#a8864a]">Email</a>
                  <span className="block break-all text-ink/50">{contact.email}</span>
                </li>
                <li>
                  <button onClick={() => openContact("quote")} className="hover:text-[#a8864a]">
                    Demander un devis
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow text-ink/40!">Explorer</p>
              <ul className="mt-5 space-y-3">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a
                      href={realHref(n.href)}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(n.href);
                      }}
                      className="hover:text-[#a8864a]"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#a8864a]">LinkedIn</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Signature géante */}
        <div className="mt-24 flex items-end gap-4 border-t border-ink/10 pt-10 md:mt-32">
          <LogoMark className="mb-[1.5vw] h-[13vw] w-auto max-h-48 shrink-0" strokeWidth={1.8} />
          <span className="font-display text-[21vw] leading-[0.75] tracking-[-0.045em] lg:text-[19.5rem]">
            Win<span className="text-ink/25">com</span>
          </span>
        </div>

        <div className="flex flex-col justify-between gap-3 pb-28 pt-8 text-xs text-ink/50 md:flex-row md:pb-8">
          <span>© 2026 Wincom Consulting. Tous droits réservés.</span>
          <span>{site.tagline.join(" ")}</span>
        </div>
      </div>
    </footer>
  );
}
