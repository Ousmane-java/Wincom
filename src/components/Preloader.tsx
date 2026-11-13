"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { MARK_PATH } from "./Logo";
import { prefersReducedMotion, useIsoLayoutEffect } from "./ui";

export const READY_EVENT = "wincom:ready";

declare global {
  interface Window {
    __wincomReady?: boolean;
  }
}

/** Intro : le « W » se trace, le losange s'allume, puis le rideau se lève. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useIsoLayoutEffect(() => {
    const finish = () => {
      window.__wincomReady = true;
      window.dispatchEvent(new Event(READY_EVENT));
      setDone(true);
    };

    let seen = false;
    try {
      seen = sessionStorage.getItem("wincom-intro") === "1";
      sessionStorage.setItem("wincom-intro", "1");
    } catch {}

    if (seen || prefersReducedMotion() || !root.current) {
      finish();
      return;
    }

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline({ onComplete: finish });
      tl.set(".pl-path", { strokeDasharray: 1, strokeDashoffset: 1 })
        .to(".pl-path", { strokeDashoffset: 0, duration: 1.1, ease: "power3.inOut" })
        .to(counter, {
          v: 100,
          duration: 1.1,
          ease: "power3.inOut",
          onUpdate: () => {
            const el = root.current?.querySelector(".pl-count");
            if (el) el.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        }, 0)
        .from(".pl-diamond", { scale: 0, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(3)" }, "-=0.15")
        .from(".pl-word", { yPercent: 100, duration: 0.7, ease: "expo.out" }, "-=0.3")
        .to(".pl-inner", { y: -30, opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.25")
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut" }, "-=0.15");
    }, root);
    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden
    >
      <div className="pl-inner flex flex-col items-center">
        <svg viewBox="0 0 42 32" className="h-14 w-auto text-ivory" fill="none">
          <path className="pl-path" d={MARK_PATH} stroke="currentColor" strokeWidth="1.6" pathLength={1} strokeLinecap="square" />
          <rect className="pl-diamond" x="34.6" y="-0.4" width="4.8" height="4.8" transform="rotate(45 37 2)" fill="var(--champagne)" />
        </svg>
        <span className="mt-6 overflow-hidden">
          <span className="pl-word font-display block text-3xl">
            Win<span className="text-stone">com</span>
          </span>
        </span>
      </div>
      <span className="pl-count absolute bottom-8 right-8 font-display text-6xl text-ivory/15 md:text-8xl">000</span>
      <span className="absolute bottom-10 left-8 eyebrow">Consulting</span>
    </div>
  );
}

/** Exécute fn quand l'intro est terminée (ou immédiatement si déjà fait). */
export function onReady(fn: () => void) {
  if (typeof window === "undefined") return () => {};
  if (window.__wincomReady) {
    fn();
    return () => {};
  }
  const h = () => fn();
  window.addEventListener(READY_EVENT, h, { once: true });
  return () => window.removeEventListener(READY_EVENT, h);
}
