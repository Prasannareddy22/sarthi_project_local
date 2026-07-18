// i18n/translations/index.ts
//
// Aggregates every language resource behind a single `resources` map keyed by
// `Language`, so the provider can look up the active language and fall back to
// English without importing each file individually.
import type { Language } from "../config";
import { en, type Translation } from "./en";
import { te } from "./te";
import { hi } from "./hi";
import type { PartialTranslation } from "./types";

export const resources: Record<Language, PartialTranslation> = {
  en,
  te,
  hi,
};

// The complete, always-present English resource used as the fallback source.
export const fallbackResource: Translation = en;

export type { Translation, PartialTranslation };
export type { TranslationKey } from "./types";
