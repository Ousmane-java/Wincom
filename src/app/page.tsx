import { Preloader } from "@/components/Preloader";
import { Hero } from "@/components/sections/Hero";
import { Marquee, Vision } from "@/components/sections/Vision";
import { Services } from "@/components/sections/Services";
import { Method } from "@/components/sections/Method";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Work } from "@/components/sections/Work";
import { Proof } from "@/components/sections/Proof";
import { TeamTeaser } from "@/components/sections/TeamTeaser";

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
        <Marquee />
        <Vision />
        <Services />
        <Method />
        <ContactCTA />
        <Work />
        <Proof />
        <TeamTeaser />
      </main>
    </>
  );
}
