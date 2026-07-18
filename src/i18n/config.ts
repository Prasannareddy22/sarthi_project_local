// i18n/config.ts
//
// Central configuration for SARTHI's multilingual support. Keeping the list
// of supported languages and the default in one place means the provider,
// the language switcher, and the browser-detection logic all agree on what
// is supported — add a language here (plus its resource file) and it flows
// through the rest of the app automatically.

export const SUPPORTED_LANGUAGES = ["en", "te", "hi"] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "en";

// localStorage key under which the user's explicit choice is persisted so it
// survives reloads and future visits.
export const LANGUAGE_STORAGE_KEY = "sarthi.language";

// Display metadata for the language switcher. `label` is the short code shown
// in the compact government strip; `name` is the full endonym used in menus.
export const LANGUAGE_META: Record<Language, { label: string; name: string }> = {
  en: { label: "EN", name: "English" },
  te: { label: "తె", name: "తెలుగు" },
  hi: { label: "हि", name: "हिन्दी" },
};

/** Narrows an arbitrary string to a supported `Language`, if it is one. */
export function isSupportedLanguage(value: string | null | undefined): value is Language {
  return !!value && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

/**
 * Maps a raw browser language tag (e.g. "te-IN", "hi", "en-US") onto one of
 * our supported languages by matching the primary subtag, returning
 * `undefined` when nothing matches so callers can fall back to the default.
 */
export function matchBrowserLanguage(navigatorLanguages: readonly string[]): Language | undefined {
  for (const tag of navigatorLanguages) {
    const primary = tag.toLowerCase().split("-")[0];
    if (isSupportedLanguage(primary)) return primary;
  }
  return undefined;
}
