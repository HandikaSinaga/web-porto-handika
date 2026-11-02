"use client";

import React, { createContext, useContext, useEffect, useCallback, useSyncExternalStore } from "react";

export type Language = "EN" | "ID";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  isEN: boolean;
  isID: boolean;
  t: (idText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio_lang";

const emptySubscribe = () => () => {};

const subscribeLanguage = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("language-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("language-change", callback);
  };
};

const getLanguageSnapshot = (): Language => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "EN" ? "EN" : "ID";
  } catch {
    return "ID";
  }
};

const getLanguageServerSnapshot = (): Language => "ID";

const applyDocumentLanguage = (newLang: Language) => {
  if (typeof document === "undefined") return;
  document.documentElement.lang = newLang.toLowerCase();
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribeLanguage, getLanguageSnapshot, getLanguageServerSnapshot);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    applyDocumentLanguage(lang);
  }, [lang]);

  const setLang = useCallback((newLang: Language) => {
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // Ignore localStorage error
    }
    applyDocumentLanguage(newLang);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("language-change", { detail: { lang: newLang } }));
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "EN" ? "ID" : "EN");
  }, [lang, setLang]);

  const t = useCallback(
    (idText: string, enText: string) => {
      if (!mounted) return idText;
      return lang === "EN" ? enText : idText;
    },
    [lang, mounted]
  );

  const value: LanguageContextType = {
    lang,
    setLang,
    toggleLang,
    isEN: lang === "EN",
    isID: lang === "ID",
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
