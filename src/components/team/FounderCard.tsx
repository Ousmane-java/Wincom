import { founder } from "@/lib/site";
import { LogoMark } from "../Logo";

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
    </div>
  );
}
