"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { useLenis } from "@/components/SmoothScroll";

/**
 * Navigation unique pour tout le site :
 * - "#services" : défile vers la section si elle est sur la page, sinon va sur l'accueil à cette section
 * - "/equipe"   : change de page
 */
export function useGoTo() {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();

  return useCallback(
    (href: string, delay = 0) => {
      const run = () => {
        if (href.startsWith("/")) {
          if (pathname !== href) router.push(href);
          else if (lenis) lenis.scrollTo(0, { duration: 1.4 });
          else window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        const el = document.querySelector(href) as HTMLElement | null;
        if (!el) {
          router.push("/" + href);
          return;
        }
        if (lenis) lenis.scrollTo(el, { offset: -20, duration: 1.6 });
        else el.scrollIntoView({ behavior: "smooth" });
      };
      if (delay) setTimeout(run, delay);
      else run();
    },
    [router, pathname, lenis]
  );
}

/** Lien href réel (pour l'accessibilité / le clic droit) correspondant à une destination. */
export const realHref = (href: string) => (href.startsWith("#") ? "/" + href : href);
