"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";

/**
 * Curseur Wincom : un point + un anneau qui s'agrandit et affiche un libellé
 * sur les éléments portant data-cursor="Voir" (etc.). Désactivé sur écrans tactiles.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const enabled = useSyncExternalStore(
    () => () => {},
    () =>
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    document.documentElement.classList.add("has-cursor");

    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const xRing = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const yRing = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const move = (e: PointerEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor], a, button, [role='button'], input, textarea, select"
      );
      const text = target?.dataset.cursor ?? null;
      setLabel(text);
      setHover(!!target && !text);
    };
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 });
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,background-color,border-color] duration-300 ease-out ${
          label
            ? "flex h-24 w-24 items-center justify-center border border-transparent bg-champagne text-ink"
            : hover
              ? "h-14 w-14 border-[1.5px] border-[#ffffff] mix-blend-difference"
              : "h-9 w-9 border border-[#ffffff] mix-blend-difference"
        }`}
      >
        {label && (
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em]">{label}</span>
        )}
      </div>
      <div
        ref={dot}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[101] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffffff] mix-blend-difference transition-opacity ${
          label ? "opacity-0" : ""
        }`}
      />
    </>
  );
}
