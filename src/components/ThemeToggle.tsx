"use client";

import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

type Theme = "dark" | "light";
const KEY = "wincom-theme";

/**
 * Script exécuté avant le premier affichage : évite tout flash de thème.
 * Le mode clair est le défaut (rendu serveur) ; on passe en sombre seulement si le visiteur l'a choisi.
 */
export const themeScript = `try{if(localStorage.getItem("${KEY}")==="dark")delete document.documentElement.dataset.theme}catch(e){}`;

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

function apply(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") root.dataset.theme = "light";
  else delete root.dataset.theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {}
}

/**
 * Bouton « éclipse » : un disque à moitié plein qui pivote.
 * Au clic, le nouveau thème s'ouvre en cercle depuis le bouton (View Transitions).
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      apply(next);
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const vt = document.startViewTransition(() => {
      flushSync(() => apply(next));
    });
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 900, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
      title={theme === "dark" ? "Mode clair" : "Mode sombre"}
      className={`group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ivory transition-colors hover:bg-white/[0.06] ${className}`}
    >
      <svg
        viewBox="0 0 20 20"
        className="h-[18px] w-[18px] transition-transform duration-700 ease-[var(--ease-in-out)] group-hover:scale-110"
        style={{ transform: theme === "light" ? "rotate(180deg)" : "rotate(0deg)" }}
        aria-hidden
      >
        <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M10 2.5 A7.5 7.5 0 0 1 10 17.5 Z" fill="currentColor" />
        <rect x="8.6" y="-0.4" width="2.8" height="2.8" transform="rotate(45 10 1)" fill="var(--champagne)" />
      </svg>
    </button>
  );
}
