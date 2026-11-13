"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useLenis } from "./SmoothScroll";

/**
 * La « fenêtre Wincom » : le seul et unique gabarit pour tout ce qui s'ouvre
 * (contact, devis, études de cas). Même forme, même bordure, même animation.
 */
export function WinWindow({
  open,
  onClose,
  title,
  children,
  size = "md",
  layoutId,
  progress,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "md" | "xl";
  layoutId?: string;
  progress?: number; // 0 → 1 : la ligne champagne en haut de la fenêtre
}) {
  const lenis = useLenis();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const prevFocus = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => panel.current?.focus(), 50);
    return () => {
      clearTimeout(t);
      lenis?.start();
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
  }, [open, lenis, onClose]);

  const widths = size === "xl" ? "md:max-w-6xl md:h-[88vh]" : "md:max-w-2xl md:max-h-[86vh]";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center md:items-center md:p-6">
          <motion.div
            className="absolute inset-0 bg-ink/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />
          <motion.div
            ref={panel}
            layoutId={layoutId}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            data-lenis-prevent
            className={`win-border relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-[28px] bg-graphite text-ivory shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] outline-none md:rounded-[28px] ${widths}`}
            initial={layoutId ? undefined : { opacity: 0, y: 60, scale: 0.96, filter: "blur(8px)" }}
            animate={layoutId ? undefined : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={layoutId ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            {/* Barre de fenêtre */}
            <div className="relative flex shrink-0 items-center justify-between border-b border-white/[0.06] px-5 py-4 md:px-7">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rotate-45 bg-champagne" />
                <span className="eyebrow text-[0.66rem]!">Wincom · {title}</span>
              </div>
              <button
                onClick={onClose}
                className="group flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-stone transition-colors hover:border-champagne/60 hover:text-ivory"
                aria-label="Fermer"
              >
                <span className="hidden md:inline">Échap</span>
                <svg viewBox="0 0 12 12" className="h-3 w-3 transition-transform duration-500 group-hover:rotate-90">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
              <motion.span
                className="absolute bottom-[-1px] left-0 h-px origin-left bg-champagne"
                style={{ width: "100%" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress ?? 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
