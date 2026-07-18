// i18n/translations/types.ts
//
// Shared typing helpers for the translation resources. `TranslationKey` gives
// every consumer of `t()` autocomplete + compile-time safety over the full set
// of dot-paths (e.g. "nav.engine"), while `PartialTranslation` lets non-English
// resources omit keys and rely on the English fallback.
import type { Translation } from "./en";

// Widens string-literal leaves (from the `as const` English resource) back to
// `string` so translated resources can supply their own text, while still
// allowing every key to be omitted for English fallback.
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends string ? string : T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type PartialTranslation = DeepPartial<Translation>;

// Recursively builds the union of dot-separated paths that terminate at a
// string leaf, so `t("footer.privacy")` is checked but `t("footer")` is not.
export type TranslationKey = PathInto<Translation>;

type PathInto<T> = {
  [K in keyof T & string]: T[K] extends string
    ? K
    : T[K] extends object
      ? `${K}.${PathInto<T[K]>}`
      : never;
}[keyof T & string];
