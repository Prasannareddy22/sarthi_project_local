// i18n/categories.ts
//
// Scheme categories are data-driven values, so they can't be looked up with a
// statically-typed translation key. This helper maps the known catalog
// categories to their translation keys and falls back to the raw category name
// for any value that isn't explicitly translated.

import type { LanguageContextValue } from "./LanguageProvider";
import type { TranslationKey } from "./translations/types";

type TranslateFn = LanguageContextValue["t"];

const CATEGORY_KEYS: Record<string, TranslationKey> = {
  "Women & Child Welfare": "categories.Women & Child Welfare",
  Education: "categories.Education",
  Housing: "categories.Housing",
  "Social Welfare": "categories.Social Welfare",
  Nutrition: "categories.Nutrition",
  Agriculture: "categories.Agriculture",
  Insurance: "categories.Insurance",
  Utilities: "categories.Utilities",
  Welfare: "categories.Welfare",
  Pension: "categories.Pension",
};

export function translateCategory(t: TranslateFn, category: string): string {
  const key = CATEGORY_KEYS[category];
  return key ? t(key) : category;
}
