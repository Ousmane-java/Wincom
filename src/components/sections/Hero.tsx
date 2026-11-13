"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { onReady } from "../Preloader";
import { Arrow, Magnetic, prefersReducedMotion, useIsoLayoutEffect } from "../ui";
import { useContact } from "../contact/ContactProvider";
import { useLenis } from "../SmoothScroll";
import { site } from "@/lib/site";

/**
 * Hero : la promesse « un site → des clients » racontée visuellement.
 * À droite, une fenêtre de site se construit, puis la courbe de clients s'envole
 * et les notifications arrivent.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { openContact } = useContact();
  const lenis = useLenis();

  useIsoLayoutEffect(() => {
    if (!root.current) return;
    const reduce = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.set(".h-line .wi", { yPercent: 110 });
      gsap.set([".h-fade", ".h-win", ".h-notif"], { autoAlpha: 0 });
      gsap.set(".h-curve", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(".h-area", { opacity: 0 });
      gsap.set(".h-skel", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".h-dot", { scale: 0, transformOrigin: "center" });
    }, root);

    const off = onReady(() => {
      ctx?.add(() => {
        if (reduce) return;
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(".h-line-1 .wi", { yPercent: 0, duration: 1.2, stagger: 0.06 })
          .to(".h-line-2 .wi", { yPercent: 0, duration: 1.3, stagger: 0.07 }, "-=0.85")
          .to(".h-win", { autoAlpha: 1, y: 0, duration: 1.2 }, "-=1")
          .fromTo(".h-win", { y: 50, rotateX: 12 }, { rotateX: 0, duration: 1.4 }, "<")
          .to(".h-skel", { scaleX: 1, duration: 0.9, stagger: 0.05, ease: "power3.out" }, "-=0.9")
          .to(".h-curve", { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, "-=0.5")
          .to(".h-area", { opacity: 1, duration: 1.2 }, "<0.4")
          .to(".h-dot", { scale: 1, duration: 0.6, ease: "back.out(3)" }, "-=0.4")
          .to(".h-notif", { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.35 }, "-=1.4")
          .fromTo(".h-notif", { y: 20 }, { y: 0, duration: 0.9, stagger: 0.35 }, "<")
          .to(".h-fade", { autoAlpha: 1, duration: 1, stagger: 0.08 }, "-=1.6");

        // Compteur de clients qui monte
        const counter = { v: 0 };
        tl.to(counter, {
          v: 128,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            const el = root.current?.querySelector(".h-count");
            if (el) el.textContent = "+" + Math.round(counter.v);
          },
        }, 1.4);

        // Parallaxe à la sortie du hero
        gsap.to(".h-visual", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".h-title", {
          yPercent: -18,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    });

    return () => {
      off();
      ctx?.revert();
    };
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById("realisations");
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.8 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28 md:pb-16 md:pt-32">
      {/* Halo lumineux */}
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[680px] w-[680px] rounded-full bg-champagne/[0.07] blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--ivory)_4%,transparent)_1px,transparent_1px)] bg-[size:calc(100%/12)_100%] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        <div className="h-title lg:col-span-7">
          <p className="h-fade eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-champagne" />
            Wincom Consulting · Sites & stratégie
          </p>

          <h1 className="font-display mt-8 leading-[0.92]">
            <span className="h-line h-line-1 block text-[clamp(2.4rem,6.2vw,5.6rem)] text-stone">
              {"Un site, c'est bien.".split(" ").map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
                  <span className="wi inline-block">{w}&nbsp;</span>
                </span>
              ))}
            </span>
            <span className="h-line h-line-2 mt-2 block text-[clamp(3rem,8.4vw,7.6rem)] text-ivory">
              {["Des", "clients,"].map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
                  <span className="wi inline-block">{w}&nbsp;</span>
                </span>
              ))}
              <br className="hidden sm:block" />
              {["c'est"].map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
                  <span className="wi inline-block">{w}&nbsp;</span>
                </span>
              ))}
              <span className="inline-block overflow-hidden pb-[0.08em] pr-[0.1em] align-top">
                <em className="wi inline-block text-champagne">mieux.</em>
              </span>
            </span>
          </h1>

          <p className="h-fade mt-8 max-w-xl text-base leading-relaxed text-stone md:text-lg">
            {site.description}
          </p>

          <div className="h-fade mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <button
                onClick={() => openContact()}
                className="group flex items-center gap-3 rounded-full bg-ivory py-4 pl-7 pr-4 text-sm font-medium text-ink transition-colors duration-500 hover:bg-champagne"
              >
                Parlons de votre projet
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-ivory transition-transform duration-500 group-hover:rotate-[-45deg]">
                  <Arrow />
                </span>
              </button>
            </Magnetic>
            <button
              onClick={scrollToWork}
              className="group flex items-center gap-2 px-2 py-4 text-sm text-ivory/80 transition-colors hover:text-ivory"
            >
              <span className="relative">
                Voir nos réalisations
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-champagne transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </span>
            </button>
          </div>
        </div>

        {/* Visuel : la fenêtre qui produit des clients */}
        <div className="h-visual relative lg:col-span-5" style={{ perspective: 1200 }}>
          <div className="h-win win-border relative rounded-[22px] bg-graphite/90 p-3 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur">
            <div className="flex items-center gap-1.5 px-2 pb-3 pt-1">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="ml-3 flex flex-1 items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1 text-[10px] text-stone">
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-champagne" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <rect x="2.5" y="5.5" width="7" height="5" rx="1" />
                  <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" />
                </svg>
                votre-entreprise.com
              </span>
            </div>
            <div className="rounded-[14px] bg-ink/80 p-5">
              <div className="flex items-center justify-between">
                <span className="h-skel block h-2.5 w-16 rounded-full bg-ivory/80" />
                <span className="flex gap-2">
                  <span className="h-skel block h-1.5 w-8 rounded-full bg-white/15" />
                  <span className="h-skel block h-1.5 w-8 rounded-full bg-white/15" />
                  <span className="h-skel block h-1.5 w-10 rounded-full bg-champagne/70" />
                </span>
              </div>
              <span className="h-skel mt-7 block h-4 w-4/5 rounded-full bg-ivory/85" />
              <span className="h-skel mt-2.5 block h-4 w-3/5 rounded-full bg-ivory/85" />
              <span className="h-skel mt-4 block h-1.5 w-2/3 rounded-full bg-white/15" />
              <span className="h-skel mt-2 block h-1.5 w-1/2 rounded-full bg-white/15" />

              {/* Courbe de clients */}
              <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-stone">Nouveaux clients</p>
                    <p className="h-count font-display mt-1 text-4xl text-ivory">+128</p>
                  </div>
                  <span className="rounded-full bg-champagne/15 px-2.5 py-1 text-[10px] text-champagne">6 mois</span>
                </div>
                <svg viewBox="0 0 300 110" className="mt-3 h-28 w-full overflow-visible">
                  <defs>
                    <linearGradient id="h-grad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--champagne)" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="var(--champagne)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[25, 55, 85].map((y) => (
                    <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="var(--ivory)" strokeOpacity="0.08" strokeDasharray="2 4" />
                  ))}
                  <path
                    className="h-area"
                    d="M0 100 C 40 98, 60 92, 90 88 S 140 80, 165 66 S 215 40, 240 30 S 280 10, 296 6 L296 110 L0 110 Z"
                    fill="url(#h-grad)"
                  />
                  <path
                    className="h-curve"
                    pathLength={1}
                    d="M0 100 C 40 98, 60 92, 90 88 S 140 80, 165 66 S 215 40, 240 30 S 280 10, 296 6"
                    fill="none"
                    stroke="var(--champagne)"
                    strokeWidth="1.8"
                  />
                  <g className="h-dot">
                    <circle cx="296" cy="6" r="9" fill="var(--champagne)" opacity="0.18" />
                    <circle cx="296" cy="6" r="3.5" fill="var(--champagne)" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="h-notif win-border absolute -left-4 top-10 hidden items-center gap-3 rounded-2xl bg-graphite-2/95 px-4 py-3 shadow-2xl backdrop-blur sm:flex md:-left-12">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-champagne/15 text-champagne">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 4h10l-1 7H4z M6 4V3a2 2 0 0 1 4 0v1" /></svg>
            </span>
            <span>
              <span className="block text-xs text-ivory">Nouvelle commande</span>
              <span className="block text-[10px] text-stone">Paiement en ligne · il y a 2 min</span>
            </span>
          </div>
          <div className="h-notif win-border absolute -bottom-6 -right-2 flex items-center gap-3 rounded-2xl bg-graphite-2/95 px-4 py-3 shadow-2xl backdrop-blur md:-right-8">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-champagne/15 text-champagne">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h10v8H6l-3 3z" /></svg>
            </span>
            <span>
              <span className="block text-xs text-ivory">Demande de devis reçue</span>
              <span className="block text-[10px] text-stone">Via votre site · à l&apos;instant</span>
            </span>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="h-fade absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="eyebrow text-[0.6rem]!">Défiler</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-champagne" />
        </span>
      </div>
      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}
