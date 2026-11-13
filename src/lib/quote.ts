export const NEED_OPTIONS = [
  { value: "site", label: "Un site professionnel", hint: "Création ou refonte" },
  { value: "marketing", label: "Une stratégie marketing", hint: "Toucher ma cible" },
  { value: "both", label: "Les deux", hint: "L'accompagnement complet" },
] as const;

export const SITUATION_OPTIONS = [
  { value: "none", label: "Je n'ai pas encore de site" },
  { value: "redo", label: "J'ai un site à refaire" },
  { value: "boost", label: "J'ai un site, je veux plus de clients" },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "urgent", label: "Le plus vite possible" },
  { value: "1-3", label: "D'ici 1 à 3 mois" },
  { value: "later", label: "Je me renseigne" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "lt1k", label: "Moins de 1 000 €" },
  { value: "1-3k", label: "1 000 – 3 000 €" },
  { value: "3-6k", label: "3 000 – 6 000 €" },
  { value: "gt6k", label: "Plus de 6 000 €" },
  { value: "unknown", label: "Je ne sais pas encore" },
] as const;

export type QuoteInput = {
  need: string;
  situation: string;
  activity: string;
  timeline: string;
  budget: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website?: string; // pot de miel
  startedAt?: number;
};

export type QuoteResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "rate_limited" | "not_configured" | "error" };
