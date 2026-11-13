"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { ContactWindow } from "./ContactWindow";

type View = "choices" | "quote";
type Ctx = { openContact: (view?: View) => void };

const ContactContext = createContext<Ctx>({ openContact: () => {} });
export const useContact = () => useContext(ContactContext);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("choices");

  const openContact = useCallback((v: View = "choices") => {
    setView(v);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <ContactContext.Provider value={{ openContact }}>
      {children}
      <ContactWindow open={open} view={view} setView={setView} onClose={close} />
    </ContactContext.Provider>
  );
}
