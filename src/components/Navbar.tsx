"use client";

import { AnimatePresence, motion, useScroll, useSpring, useMotionValueEvent } from "motion/react";
import { useEffect, useState } from "react";
import { Logo, LogoMark } from "./Logo";
import { useContact } from "./contact/ContactProvider";
import { useLenis } from "./SmoothScroll";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { realHref, useGoTo } from "@/lib/useGoTo";
import { contact, nav, site, whatsappLink } from "@/lib/site";

const previews: Record<string, string> = {
  "#vision": "Pourquoi un beau site ne suffit pas, et ce qui fait vraiment venir les clients.",
  "#services": "Site professionnel & sécurisé. Stratégie marketing. Les deux, ensemble.",
  "#methode": "Comprendre, construire, attirer, gagner. Quatre étapes, un seul objectif.",
  "#realisations": "Délices by Leina, Kyosk, InfraMap : des projets réels, des résultats réels.",
  "/equipe": "Des profils complémentaires : conseil, marketing, design, développement, sécurité, relation client.",
};

/** Heure locale du visiteur, où qu'il soit. */
function useClock(tz?: string) {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () =>
      setT(new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date()));
    f();
    const id = setInterval(f, 30_000);
    return () => clearInterval(id);
  }, [tz]);
  return t;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState<string>("");
  const [hovered, setHovered] = useState<string>(nav[0].href);
  const { openContact } = useContact();
  const lenis = useLenis();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const localTime = useClock();
  const pathname = usePathname();
  const navigate = useGoTo();

  useMotionValueEvent(scrollY, "change", (y) => setCompact(y > window.innerHeight * 0.6));

  useEffect(() => {
    const ids = nav.filter((n) => n.href.startsWith("#")).map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive("#" + e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  const goTo = (href: string) => {
    setOpen(false);
    navigate(href, 350);
  };

  const current = pathname === "/" ? active : pathname;
  const activeLabel = nav.find((n) => n.href === current)?.label ?? "Accueil";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[80] flex justify-center px-3 md:bottom-auto md:top-5">
        <motion.nav
          layout
          aria-label="Navigation principale"
          data-lenis-prevent
          transition={{ type: "spring", stiffness: 300, damping: 34 }}
          style={{ borderRadius: open ? 28 : 999 }}
          className={`win-border pointer-events-auto relative overflow-hidden bg-graphite/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl ${
            open ? "w-full max-w-5xl" : "w-auto"
          }`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {!open ? (
              <motion.div
                key="bar"
                layout="position"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                className="flex items-center gap-1 py-1.5 pl-4 pr-1.5"
              >
                <button
                  onClick={() => navigate("/")}
                  className="mr-2 flex items-center text-ivory"
                  aria-label="Wincom, retour en haut"
                >
                  <span className="hidden sm:inline"><Logo className="text-[15px]" /></span>
                  <LogoMark className="h-4 w-auto sm:hidden" />
                </button>

                <AnimatePresence initial={false} mode="popLayout">
                  {!compact ? (
                    <motion.ul
                      key="links"
                      layout
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(4px)" }}
                      className="hidden items-center lg:flex"
                    >
                      {nav.map((n) => (
                        <li key={n.href}>
                          <a
                            href={realHref(n.href)}
                            onClick={(e) => {
                              e.preventDefault();
                              goTo(n.href);
                            }}
                            className={`relative rounded-full px-3.5 py-2 text-[13px] transition-colors ${
                              current === n.href ? "text-ivory" : "text-stone hover:text-ivory"
                            }`}
                          >
                            {current === n.href && (
                              <motion.span layoutId="nav-active" className="absolute inset-0 rounded-full bg-white/[0.06]" />
                            )}
                            <span className="relative">{n.label}</span>
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  ) : (
                    <motion.span
                      key="section"
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="hidden px-3 text-[13px] text-stone sm:block"
                    >
                      <span className="mr-2 inline-block h-1 w-1 rotate-45 bg-champagne align-middle" />
                      {activeLabel}
                    </motion.span>
                  )}
                </AnimatePresence>
                <span className="px-2 text-[13px] text-stone sm:hidden">{activeLabel}</span>

                <button
                  onClick={() => setOpen(true)}
                  className="group flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] text-ivory transition-colors hover:bg-white/[0.06]"
                  aria-expanded={open}
                >
                  <span className="flex flex-col gap-[3px]">
                    <span className="block h-px w-3.5 bg-current transition-transform duration-500 group-hover:translate-x-0.5" />
                    <span className="block h-px w-3.5 bg-current transition-transform duration-500 group-hover:-translate-x-0.5" />
                  </span>
                  Menu
                </button>
                <ThemeToggle className="mr-1" />
                <button
                  onClick={() => openContact()}
                  className="rounded-full bg-ivory px-4 py-2 text-[13px] font-medium text-ink transition-colors duration-300 hover:bg-champagne"
                >
                  Parlons-en
                </button>

                {/* Fil de croissance : progression de lecture */}
                <motion.span
                  className="absolute bottom-0 left-0 h-px w-full origin-left bg-champagne"
                  style={{ scaleX: progress }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="panel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="max-h-[85vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4 md:px-8">
                  <Logo className="text-[15px]" />
                  <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 text-[13px] text-stone hover:border-champagne/60 hover:text-ivory"
                  >
                    Fermer
                    <svg viewBox="0 0 12 12" className="h-3 w-3 transition-transform duration-500 group-hover:rotate-90">
                      <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                  </div>
                </div>

                <div className="grid gap-8 p-5 md:grid-cols-[1.3fr_1fr] md:p-8">
                  <ul>
                    {nav.map((n, i) => (
                      <motion.li
                        key={n.href}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.18 + i * 0.05, ease: [0.22, 1, 0.36, 1], duration: 0.6 } }}
                      >
                        <a
                          href={realHref(n.href)}
                          onMouseEnter={() => setHovered(n.href)}
                          onClick={(e) => {
                            e.preventDefault();
                            goTo(n.href);
                          }}
                          className="group flex items-baseline gap-4 border-b border-white/[0.06] py-3 md:py-4"
                        >
                          <span className="w-6 text-[0.7rem] tracking-[0.2em] text-stone">0{i + 1}</span>
                          <span className="font-display text-4xl text-ivory/80 transition-all duration-500 group-hover:translate-x-2 group-hover:text-ivory md:text-6xl">
                            {n.label}
                          </span>
                          {current === n.href && <span className="ml-auto h-1.5 w-1.5 rotate-45 bg-champagne" />}
                        </a>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.6 } }}
                    className="flex flex-col gap-4"
                  >
                    <div className="hidden min-h-40 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 md:block">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={hovered}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="eyebrow">{nav.find((n) => n.href === hovered)?.label}</p>
                          <p className="font-display mt-3 text-2xl leading-snug text-ivory/90">{previews[hovered]}</p>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="rounded-2xl border border-champagne/25 bg-champagne/[0.05] p-6">
                      <p className="flex items-center gap-2 text-sm text-ivory">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne opacity-60" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-champagne" />
                        </span>
                        Disponible pour de nouveaux projets
                      </p>
                      <p className="mt-2 text-sm text-stone">Réponse sous {site.responseTime}, partout dans le monde.</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            setOpen(false);
                            openContact("quote");
                          }}
                          className="rounded-full bg-champagne px-4 py-2 text-[13px] font-medium text-ink hover:bg-champagne-soft"
                        >
                          Demander un devis
                        </button>
                        <a
                          href={whatsappLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-white/15 px-4 py-2 text-[13px] hover:border-champagne hover:text-champagne"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>

                    <div className="flex justify-between px-1 text-xs text-stone">
                      <span>{localTime && <>Il est {localTime} chez vous</>}</span>
                      <a href={`mailto:${contact.email}`} className="hover:text-ivory">Email</a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
}
