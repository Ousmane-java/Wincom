# Wincom Consulting

Site vitrine de Wincom Consulting : *Un site, c'est bien. Des clients, c'est mieux.*

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3005.

## Modifier le contenu

Tout le contenu modifiable (contact, chiffres, témoignage, réalisations, services, équipe) est dans `src/lib/site.ts`.

## Formulaire de devis

Les demandes sont envoyées par email via [Resend](https://resend.com). Variables d'environnement à définir (voir `.env.example`) :

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `SEND_CONFIRMATION`

Sans configuration, le formulaire propose d'envoyer la demande sur WhatsApp.

## Stack

Next.js (App Router), Tailwind CSS, GSAP, Lenis, Motion.
