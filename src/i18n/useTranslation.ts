// i18n/useTranslation.ts
//
// The single hook components use to translate. Returns the memoised `t`
// function plus the active `language` and `setLanguage` setter, and throws a
// clear error if used outside <LanguageProvider> so misuse fails loudly.
import { useContext } from "react";

import { LanguageContext, type LanguageContextValue } from "./LanguageProvider";

export function useTranslation(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a <LanguageProvider>.");
  }
  return context;
}
