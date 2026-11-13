import type { TeamPole } from "@/lib/site";

/** Pictogrammes au trait fin, accent champagne, pour chaque pôle. */
export function TeamIcon({ name, className = "h-10 w-10" }: { name: TeamPole["icon"]; className?: string }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.3 } as const;
  const a = { fill: "none", stroke: "var(--champagne)", strokeWidth: 1.3 } as const;
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      {name === "strategy" && (
        <>
          <circle cx="20" cy="20" r="14" {...c} strokeOpacity=".4" />
          <circle cx="20" cy="20" r="8" {...c} strokeOpacity=".7" />
          <circle cx="20" cy="20" r="2.5" fill="var(--champagne)" />
          <path d="M34 6 L22 18 M34 6 v6 M34 6 h-6" {...a} />
        </>
      )}
      {name === "marketing" && (
        <>
          <path d="M6 16 v8 h5 l12 7 V9 l-12 7 z" {...c} />
          <path d="M28 14 q4 6 0 12 M31 10 q7 10 0 20" {...a} />
        </>
      )}
      {name === "design" && (
        <>
          <rect x="6" y="6" width="28" height="28" rx="3" {...c} strokeOpacity=".5" />
          <circle cx="15" cy="15" r="4" {...a} />
          <path d="M6 28 l9-8 6 5 5-4 8 7" {...c} />
        </>
      )}
      {name === "dev" && (
        <>
          <rect x="5" y="8" width="30" height="24" rx="3" {...c} strokeOpacity=".5" />
          <path d="M5 14 h30" {...c} strokeOpacity=".5" />
          <path d="M16 20 l-4 4 4 4 M24 20 l4 4 -4 4" {...a} />
        </>
      )}
      {name === "security" && (
        <>
          <path d="M20 5 l12 5 v9 c0 8-5 13-12 16 -7-3-12-8-12-16 v-9 z" {...c} />
          <path d="M14 20 l4 4 8-8" {...a} />
        </>
      )}
      {name === "client" && (
        <>
          <path d="M6 9 h28 v18 H16 l-7 6 v-6 H6 z" {...c} />
          <path d="M13 17 h14 M13 21 h9" {...a} />
        </>
      )}
    </svg>
  );
}
