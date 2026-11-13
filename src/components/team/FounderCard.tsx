import { founder } from "@/lib/site";
import { LogoMark } from "../Logo";
import { ArrowUpRight } from "../ui";

/** Carte du fondateur : prénom + domaine d'études, sans photo. */
export function FounderCard({ className = "" }: { className?: string }) {
  return (
    <div className={`win-border relative overflow-hidden rounded-[28px] bg-graphite p-7 md:p-10 ${className}`}>
      <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-champagne/[0.08] blur-3xl" />
      <div className="relative flex items-start justify-between gap-6">
        <div>
          <p className="eyebrow">Fondateur</p>
          <h3 className="font-display mt-4 text-6xl leading-none md:text-7xl">{founder.name}</h3>
          <p className="mt-3 text-sm text-champagne">{founder.role}</p>
        </div>
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/10 text-ivory">
          <LogoMark className="h-6 w-auto" strokeWidth={2} />
        </span>
      </div>
      <p className="relative mt-8 max-w-md leading-relaxed text-stone">
        {founder.title}. Il pilote la partie technique de chaque projet et veille à ce que chaque site soit aussi solide que beau.
      </p>
      <div className="relative mt-8">
        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-stone">Domaine d&apos;études</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {founder.studies.map((s) => (
            <span key={s} className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-ivory/85">
              {s}
            </span>
          ))}
        </div>
      </div>
      <a
        href={founder.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 text-sm text-ivory transition-colors hover:border-champagne hover:text-champagne"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
        LinkedIn
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
