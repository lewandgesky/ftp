"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import fr from "./fr.json";
import en from "./en.json";

type Locale = "fr" | "en";

const translations: Record<Locale, Record<string, unknown>> = { fr, en };

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => any;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function getNestedValue(obj: Record<string, unknown>, path: string): any {
  const keys = path.split(".");
  let current: any = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      return path;
    }
  }
  return current;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("REDAC-locale") as Locale | null;
    if (saved && (saved === "fr" || saved === "en")) {
      setLocaleState(saved);
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("REDAC-locale", newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback(
    (key: string): any => {
      return getNestedValue(translations[locale] as Record<string, unknown>, key);
    },
    [locale]
  );

  if (!mounted) {
    return (
      <I18nContext.Provider value={{ locale: "fr", setLocale, t: (key: string) => getNestedValue(translations.fr as Record<string, unknown>, key) }}>
        {children}
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}

export type { Locale };
