/**
 * Contenu central du site Wincom.
 * Tout ce qui est susceptible de changer (contact, chiffres, témoignages, projets)
 * se modifie ICI, sans toucher aux composants.
 */

export const site = {
  name: "Wincom",
  baseline: "Consulting",
  tagline: ["Un site, c'est bien.", "Des clients, c'est mieux."],
  description:
    "Wincom accompagne entrepreneurs et entreprises dans la création de sites professionnels et sécurisés, et dans la stratégie marketing qui leur amène des clients.",
  url: "https://wincomconsulting.com",
  responseTime: "24 h",
};

export const contact = {
  email: "contact@wincomconsulting.com",
  whatsapp: "33613452016",
  whatsappMessage:
    "Bonjour Wincom, je souhaite échanger avec vous sur mon projet.",
};

export const whatsappLink = (text: string = contact.whatsappMessage) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;

export const mailLink = (subject = "Mon projet avec Wincom") =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;

/** Fondateur : prénom seul, sans photo (choix volontaire). */
export const founder = {
  name: "Ousmane",
  role: "Fondateur · Direction technique",
  title: "Ingénieur systèmes, réseaux & cybersécurité",
  studies: ["Cybersécurité", "Cloud", "Systèmes & réseaux"],
  linkedin: "https://www.linkedin.com/in/ousmane-drame-83858a334/",
};

export type TeamPole = {
  id: string;
  title: string;
  text: string;
  points: string[];
  icon: "strategy" | "marketing" | "design" | "dev" | "security" | "client";
};

/** Pôles de l'équipe : présentés par expertise, sans noms ni visages. */
export const team: TeamPole[] = [
  {
    id: "conseil",
    title: "Conseil & stratégie",
    text: "On analyse votre marché et votre cible, puis on fixe un cap clair.",
    points: ["Audit de votre présence en ligne", "Positionnement & message", "Plan d'action priorisé"],
    icon: "strategy",
  },
  {
    id: "marketing",
    title: "Marketing digital",
    text: "On amène les bonnes personnes jusqu'à vous, au bon moment.",
    points: ["Réseaux sociaux & contenus", "Publicité en ligne", "Référencement naturel (SEO)"],
    icon: "marketing",
  },
  {
    id: "design",
    title: "Design & expérience",
    text: "Une image à la hauteur de votre activité, et un parcours qui donne envie d'agir.",
    points: ["Direction artistique", "Maquettes UX / UI", "Identité visuelle"],
    icon: "design",
  },
  {
    id: "dev",
    title: "Développement web & mobile",
    text: "Des sites, plateformes et applications mobiles rapides, modernes et sécurisés.",
    points: ["Sites vitrines & e-commerce", "Applications web & mobiles (iOS, Android)", "Paiement en ligne & intégrations"],
    icon: "dev",
  },
  {
    id: "securite",
    title: "Sécurité & infrastructure",
    text: "Des fondations solides : votre site reste rapide, disponible et protégé.",
    points: ["HTTPS & protection anti-spam", "Hébergement fiable & sauvegardes", "Surveillance & mises à jour"],
    icon: "security",
  },
  {
    id: "relation",
    title: "Relation client",
    text: "Un interlocuteur unique qui vous suit du premier échange à bien après le lancement.",
    points: [`Réponse sous ${site.responseTime}`, "Points d'avancement réguliers", "Suivi après la mise en ligne"],
    icon: "client",
  },
];

export const nav = [
  { label: "Vision", href: "#vision" },
  { label: "Services", href: "#services" },
  { label: "Méthode", href: "#methode" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Équipe", href: "/equipe" },
];

export const services = [
  {
    id: "site",
    index: "01",
    title: "Site professionnel & sécurisé",
    short: "Un site à votre image, rapide, solide, et pensé pour convertir.",
    points: [
      "Conception & direction artistique sur mesure",
      "Développement moderne, rapide sur mobile",
      "Sécurité : HTTPS, anti-spam, sauvegardes, hébergement fiable",
      "Paiement en ligne, réservation, WhatsApp intégrés",
      "Référencement naturel de base & mise en ligne",
      "Suivi et évolutions après le lancement",
    ],
  },
  {
    id: "strategie",
    index: "02",
    title: "Stratégie marketing",
    short: "Comprendre votre cible, la toucher, et la transformer en clients.",
    points: [
      "Analyse de votre marché et de votre cible",
      "Positionnement & message qui fait la différence",
      "Stratégie réseaux sociaux & contenus",
      "Acquisition : publicité, référencement, partenariats",
      "Plan d'action concret, priorisé, mesurable",
      "Accompagnement dans la durée",
    ],
  },
];

export const method = [
  {
    step: "01",
    title: "Comprendre",
    text: "Votre activité, vos clients, vos objectifs. On part du terrain, pas d'un modèle.",
  },
  {
    step: "02",
    title: "Construire",
    text: "Un site professionnel et sécurisé, conçu pour transformer les visiteurs en clients.",
  },
  {
    step: "03",
    title: "Attirer",
    text: "La stratégie marketing qui amène votre cible jusqu'à vous, au bon endroit, au bon moment.",
  },
  {
    step: "04",
    title: "Gagner",
    text: "On mesure, on ajuste, on fait grandir. Votre réussite est notre seul indicateur.",
  },
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  scope: string; // type de mission affiché sur la carte
  url: string;
  domain: string;
  image: string;
  summary: string;
  challenge: string;
  solution: string[];
  result: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "delices-by-leina",
    name: "Délices by Leina",
    category: "Pâtisserie créative · E-commerce",
    scope: "Site & stratégie",
    url: "https://www.delicesbyleina.com",
    domain: "www.delicesbyleina.com",
    image: "/work/delicesbyleina.png",
    summary:
      "D'une prise de commande par messages privés à une boutique en ligne qui vend toute seule.",
    challenge:
      "Toutes les commandes passaient par Instagram et Snapchat : beaucoup d'échanges, des oublis, et une clientèle limitée au cercle des abonnés.",
    solution: [
      "Site vitrine & boutique avec commande et paiement en ligne",
      "Choix de date, retrait ou livraison, codes promo",
      "Demandes de devis pour les événements",
      "Stratégie réseaux sociaux pour élargir la clientèle locale",
    ],
    result:
      "Des commandes de nouveaux clients, un temps de gestion fortement réduit, et une image professionnelle à la hauteur des créations.",
    tags: ["Site e-commerce", "Paiement en ligne", "Stratégie social media"],
  },
  {
    slug: "kyosk",
    name: "Kyosk",
    category: "Presse numérique · Plateforme",
    scope: "Plateforme web",
    url: "https://kyosk.sn",
    domain: "kyosk.sn",
    image: "/work/kyosk.png",
    summary:
      "Toute la presse africaine dans la poche : une plateforme de lecture pensée pour le mobile.",
    challenge:
      "Rendre la presse africaine accessible partout, sur mobile, avec des moyens de paiement adaptés au marché local et à la diaspora.",
    solution: [
      "Site de présentation & catalogue de titres",
      "Abonnements en FCFA, EUR et USD",
      "Paiement Wave, Orange Money, Free Money et carte",
      "Espace éditeurs dédié",
    ],
    result:
      "Une plateforme panafricaine claire et rassurante, qui transforme les visiteurs en abonnés.",
    tags: ["Plateforme web", "Mobile money", "Acquisition"],
  },
  {
    slug: "inframap",
    name: "InfraMap",
    category: "SaaS B2B · Infrastructure",
    scope: "Produit SaaS",
    url: "https://inframap.io",
    domain: "inframap.io",
    image: "/work/inframap.png",
    summary:
      "Toute l'infrastructure de vos clients, enfin cartographiée au même endroit.",
    challenge:
      "Donner aux freelances, ESN et infogérants une vue claire de leurs serveurs, contrats, alertes et inventaires, sans outils éparpillés.",
    solution: [
      "Conception et développement du produit SaaS",
      "Site de présentation orienté essai gratuit",
      "Architecture sécurisée et pensée pour la production",
      "Positionnement auprès des MSP et petites ESN",
    ],
    result:
      "Version commerciale lancée en mars 2026, utilisée en production sur plus de 250 serveurs.",
    tags: ["SaaS", "Cybersécurité", "Go-to-market"],
  },
];

/** Chiffres clés — à ajuster avec tes vrais résultats. */
export const stats = [
  { value: 24, suffix: " h", label: "Délai de réponse garanti" },
  { value: 100, suffix: " %", label: "Sites livrés sécurisés (HTTPS)" },
  { value: 250, prefix: "+", label: "Serveurs gérés en production via InfraMap" },
  { value: 5, label: "Secteurs d'expertise" },
];

/**
 * ⚠️ Témoignage rédigé comme PROPOSITION : à faire valider (ou réécrire) par Leina
 * avant la mise en ligne.
 */
export const testimonial = {
  quote:
    "Avant, je prenais toutes mes commandes en messages privés. C'était épuisant et je perdais des clients. Wincom m'a accompagnée de A à Z : un site à mon image, la commande et le paiement en ligne, et surtout une vraie stratégie pour me faire connaître. Quelques mois après, je reçois des commandes de clients qui ne me connaissaient pas, et je passe enfin mon temps en cuisine plutôt qu'au téléphone.",
  author: "Leina",
  role: "Fondatrice, Délices by Leina",
};

/** Secteurs d'expertise (affichés sous les Services). */
export const sectors = [
  "Commerce & e-commerce",
  "Restauration & alimentation",
  "Médias & audiovisuel",
  "Services & professions libérales",
  "Tech & logiciel",
];

export const keywords = [
  "Stratégie",
  "Design",
  "Sécurité",
  "Conversion",
  "Acquisition",
  "Performance",
  "Clients",
];
