"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { WinWindow } from "../WinWindow";
import { QuoteForm } from "./QuoteForm";
import { contact, mailLink, site, whatsappLink } from "@/lib/site";

type View = "choices" | "quote";

export function ContactWindow({
  open,
  view,
  setView,
  onClose,
}: {
  open: boolean;
  view: View;
  setView: (v: View) => void;
  onClose: () => void;
}) {
  const [progress, setProgress] = useState(0);

  return (
    <WinWindow
      open={open}
      onClose={onClose}
      title={view === "quote" ? "Demande de devis" : "Contact"}
      progress={view === "quote" ? progress : 1}
    >
      <AnimatePresence mode="wait" initial={false}>
        {view === "choices" ? (
          <motion.div
            key="choices"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 md:p-10"
          >
            <p className="eyebrow">Parlons de votre projet</p>
            <h2 className="font-display mt-4 text-4xl leading-[1.05] md:text-5xl">
              Comment préférez-vous <em className="text-champagne">échanger</em>&nbsp;?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">
              Réponse garantie sous {site.responseTime}. Premier échange offert, sans engagement.
            </p>

            <div className="mt-8 grid gap-3">
              <ChoiceCard
                href={whatsappLink()}
                index="01"
                title="WhatsApp"
                text="Écrivez-nous directement · réponse rapide"
                icon={<WhatsIcon />}
              />
              <ChoiceCard
                href={mailLink()}
                index="02"
                title="Email"
                text={contact.email}
                icon={<MailIcon />}
              />
              <ChoiceCard
                onClick={() => setView("quote")}
                index="03"
                title="Demander un devis"
                text="6 questions, 2 minutes. Vous recevez une proposition sur mesure."
                icon={<QuoteIcon />}
                highlight
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quote"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <QuoteForm onBack={() => setView("choices")} onProgress={setProgress} onDone={onClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </WinWindow>
  );
}

function ChoiceCard({
  href,
  onClick,
  index,
  title,
  text,
  icon,
  highlight,
}: {
  href?: string;
  onClick?: () => void;
  index: string;
  title: string;
  text: string;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  const inner = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 text-ivory transition-colors duration-500 group-hover:border-champagne group-hover:bg-champagne group-hover:text-ink">
        {icon}
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="flex items-baseline gap-3">
          <span className="text-[0.65rem] tracking-[0.2em] text-stone">{index}</span>
          <span className="font-display text-2xl">{title}</span>
        </span>
        <span className="mt-1 block truncate text-sm text-stone">{text}</span>
      </span>
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-stone transition-all duration-500 group-hover:translate-x-1 group-hover:text-champagne">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </svg>
    </>
  );
  const cls = `group flex w-full items-center gap-4 rounded-2xl border p-4 transition-colors duration-500 md:p-5 ${
    highlight
      ? "border-champagne/30 bg-champagne/[0.04] hover:border-champagne/70"
      : "border-white/[0.07] bg-white/[0.02] hover:border-white/20"
  }`;
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function WhatsIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.38 9.38 0 0 1-1.44-5c0-5.2 4.23-9.43 9.44-9.43a9.38 9.38 0 0 1 6.67 2.77 9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.42-9.44 9.42zm8.03-17.45A11.27 11.27 0 0 0 12.05.72C5.79.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.6l6.02-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.26 0 11.35-5.09 11.35-11.34 0-3.03-1.18-5.88-3.32-8.02z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h4" />
    </svg>
  );
}
