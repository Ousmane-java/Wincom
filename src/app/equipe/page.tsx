import type { Metadata } from "next";
import { TeamPage } from "@/components/team/TeamPage";

export const metadata: Metadata = {
  title: "L'équipe",
  description:
    "Conseil, marketing digital, design, développement web, sécurité et relation client : les expertises de l'équipe Wincom.",
};

export default function EquipePage() {
  return (
    <main>
      <TeamPage />
    </main>
  );
}
