// i18n/LanguageProvider.tsx
//
// Provides the active language and a translate function (`t`) to the whole app
// via React context. Designed to be SSR-safe: the server and the first client
// render both use DEFAULT_LANGUAGE, and the persisted/browser-detected language
// is only applied inside a client-only effect after mount — this avoids React
// hydration mismatches while still honouring the user's choice on first paint
// of subsequent interactions.
import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  isSupportedLanguage,
  matchBrowserLanguage,
  type Language,
} from "./config";
import {
  fallbackResource,
  resources,
  type PartialTranslation,
  type TranslationKey,
} from "./translations";

export type TranslateVars = Record<string, string | number>;

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, vars?: TranslateVars) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Safely walks a dot-separated path (e.g. "nav.engine") into a resource. */
function getByPath(source: PartialTranslation | undefined, path: string): string | undefined {
  if (!source) return undefined;
  let current: unknown = source;
  for (const segment of path.split(".")) {
    if (current && typeof current === "object" && segment in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return undefined;
    }
  }
  return typeof current === "string" ? current : undefined;
}

/** Replaces {token} placeholders in a template with the provided values. */
function interpolate(template: string, vars?: TranslateVars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, token: string) =>
    token in vars ? String(vars[token]) : match,
  );
}

function readStoredLanguage(): Language | undefined {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isSupportedLanguage(stored) ? stored : undefined;
  } catch {
    return undefined;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Start from the default on both server and first client render so the
  // hydrated markup matches what the server produced.
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  // After mount, resolve the real preference: an explicit stored choice wins,
  // otherwise fall back to the browser's language, otherwise the default.
  useEffect(() => {
    const stored = readStoredLanguage();
    if (stored) {
      setLanguageState(stored);
      return;
    }
    const detected = matchBrowserLanguage(navigator.languages ?? [navigator.language]);
    if (detected) setLanguageState(detected);
  }, []);

  // Keep <html lang> in sync for accessibility and correct font/rendering.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    } catch {
      // localStorage may be unavailable (private mode / SSR) — ignore.
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey, vars?: TranslateVars): string => {
      const active = getByPath(resources[language], key);
      const fallback = active ?? getByPath(fallbackResource, key);
      return interpolate(fallback ?? key, vars);
    },
    [language],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
