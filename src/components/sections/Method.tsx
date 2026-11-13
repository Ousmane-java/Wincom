"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { method } from "@/lib/site";
import { prefersReducedMotion, useIsoLayoutEffect } from "../ui";

/**
 * Méthode : le « fil de croissance » se trace au scroll et allume chaque étape.
 */
export function Method() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".m-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".m-list", start: "top 60%", end: "bottom 60%", scrub: true },
        }
      );
      gsap.utils.toArray<HTMLElement>(".m-step").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.25 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 70%", end: "top 45%", scrub: true },
          }
        );
        ScrollTriggerToggle(el);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="methode" ref={root} className="relative border-t border-white/[0.06]">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-28 md:px-10 md:py-40 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-champagne" />
              Méthode
            </p>
            <h2 className="font-display mt-8 text-[clamp(2.4rem,5vw,4.6rem)] leading-[1]">
              Du premier café <br />
              au <em className="text-champagne">premier client.</em>
            </h2>
            <p className="mt-6 max-w-sm text-stone">
              Quatre étapes claires. Vous savez toujours où on en est, et pourquoi on le fait.
            </p>
          </div>
        </div>

        <ol className="m-list relative lg:col-span-7">
          {/* Le fil */}
          <span className="absolute bottom-6 left-[19px] top-6 w-px bg-white/10 md:left-[27px]" />
          <span className="m-fill absolute bottom-6 left-[19px] top-6 w-px origin-top bg-gradient-to-b from-champagne/40 via-champagne to-champagne md:left-[27px]" />

          {method.map((m) => (
            <li key={m.step} className="m-step group relative flex gap-6 pb-20 last:pb-0 md:gap-10">
              <span className="m-node relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-ink text-xs text-stone transition-all duration-700 md:h-14 md:w-14 [&.is-on]:border-champagne [&.is-on]:text-champagne">
                {m.step}
              </span>
              <div className="pt-1 md:pt-3">
                <h3 className="font-display text-4xl md:text-6xl">{m.title}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-stone">{m.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ScrollTriggerToggle(el: HTMLElement) {
  const node = el.querySelector(".m-node");
  if (!node) return;
  gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: "top 60%",
      onEnter: () => node.classList.add("is-on"),
      onLeaveBack: () => node.classList.remove("is-on"),
    },
  });
}
