// Maps the app's i18n language to the BCP-47 locale used by the browser's
// speech engines (SpeechRecognition + speechSynthesis). Centralised here so
// both voice input and text-to-speech follow the currently selected language.
import type { Language } from "@/i18n/config";

export const SPEECH_LOCALE: Record<Language, string> = {
  en: "en-IN",
  te: "te-IN",
  hi: "hi-IN",
};

export function speechLocaleFor(language: Language): string {
  return SPEECH_LOCALE[language] ?? SPEECH_LOCALE.en;
}

// Unicode ranges per script, used to detect whether a transcript's script
// matches the selected language (for a friendly "language mismatch" hint).
const SCRIPT_RANGE: Record<Language, RegExp> = {
  te: /[\u0C00-\u0C7F]/,
  hi: /[\u0900-\u097F]/,
  en: /[A-Za-z]/,
};

/**
 * Returns true when `text` clearly does NOT contain the script expected for
 * `language` (e.g. Telugu selected but only Latin letters were recognised).
 * Empty/whitespace/numeric-only text is treated as a match (no false alarm).
 */
export function isScriptMismatch(text: string, language: Language): boolean {
  const trimmed = text.trim();
  if (!trimmed) return false;
  const expected = SCRIPT_RANGE[language];
  if (!expected) return false;
  if (expected.test(trimmed)) return false;
  // Only flag when some OTHER script is present, not for pure digits/symbols.
  return Object.entries(SCRIPT_RANGE).some(
    ([lang, range]) => lang !== language && range.test(trimmed),
  );
}
