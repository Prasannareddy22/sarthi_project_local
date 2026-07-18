// Per-scheme content localization.
//
// The English catalog in `src/data/schemes.ts` stays the source of truth. These
// registries provide translated overrides keyed by scheme id; any field a
// language omits falls back to the English catalog value. Dynamic eligibility
// results come from the backend, so only the scheme *name* is localized there
// (via `localizeSchemeNameById`).
import type { Scheme } from "@/data/schemes";
import type { Language } from "../config";
import { schemeContentTe } from "./te";
import { schemeContentHi } from "./hi";

export type LocalizedSchemeContent = Partial<
  Pick<Scheme, "name" | "description" | "benefits" | "documents" | "offlineInstructions">
>;

const registry: Partial<Record<Language, Record<string, LocalizedSchemeContent>>> = {
  te: schemeContentTe,
  hi: schemeContentHi,
};

export function localizeScheme(language: Language, scheme: Scheme): Scheme {
  const content = registry[language]?.[scheme.id];
  if (!content) return scheme;
  return {
    ...scheme,
    name: content.name ?? scheme.name,
    description: content.description ?? scheme.description,
    benefits: content.benefits ?? scheme.benefits,
    documents: content.documents ?? scheme.documents,
    offlineInstructions: content.offlineInstructions ?? scheme.offlineInstructions,
  };
}

export function localizeSchemeNameById(
  language: Language,
  id: string | null | undefined,
  fallback: string,
): string {
  if (!id) return fallback;
  return registry[language]?.[id]?.name ?? fallback;
}
