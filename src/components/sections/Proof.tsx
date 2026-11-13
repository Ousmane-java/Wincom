"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { stats, testimonial } from "@/lib/site";
import { prefersReducedMotion, useIsoLayoutEffect } from "../ui";

/** Chiffres clés + témoignage. */
export function Proof() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (!root.current) return;
    const reduce = prefersReducedMotion();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".p-num").forEach((el) => {
        const target = Number(el.dataset.value);
        if (reduce) return;
        const o = { v: 0 };
        gsap.to(o, {
          v: target,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate: () => (el.textContent = String(Math.round(o.v))),
        });
      });
      if (reduce) return;
      gsap.fromTo(
        ".p-qword",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: ".p-quote", start: "top 75%", end: "bottom 55%", scrub: true },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative">
      <div className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-white/[0.06] bg-white/[0.06] lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink p-6 md:p-10">
              <p className="font-display text-5xl leading-none md:text-7xl">
                {s.prefix && <span className="text-champagne">{s.prefix}</span>}
                <span className="p-num" data-value={s.value}>{s.value}</span>
                {s.suffix && <span className="text-champagne">{s.suffix}</span>}
              </p>
              <p className="mt-4 text-sm text-stone">{s.label}</p>
            </div>
          ))}
        </div>

        <figure className="mx-auto mt-28 max-w-5xl md:mt-40">
          <svg viewBox="0 0 40 30" className="h-8 w-auto text-champagne" fill="currentColor" aria-hidden>
            <path d="M0 30V17C0 7 5 1 15 0v6c-5 1-8 4-8 10h8v14zm22 0V17c0-10 5-16 15-17v6c-5 1-8 4-8 10h8v14z" />
          </svg>
          <blockquote className="p-quote font-display mt-8 text-[clamp(1.6rem,3.2vw,2.9rem)] leading-[1.2]">
            {testimonial.quote.split(" ").map((w, i) => (
              <span key={i} className="p-qword">{w} </span>
            ))}
          </blockquote>
          <figcaption className="mt-10 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne/40 font-display text-xl text-champagne">
              {testimonial.author[0]}
            </span>
            <span>
              <span className="block text-ivory">{testimonial.author}</span>
              <span className="block text-sm text-stone">{testimonial.role}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
