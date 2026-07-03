// lib/schemeMatch.ts
//
// The eligibility API only returns a free-text label (e.g. "Indiramma Family
// Life Insurance Scheme: ₹5 Lakh Life Cover"), not the canonical `id`/`name`
// pair our routes and catalog use. This resolver maps that label back to a
// known scheme from `data/schemes.ts` so every card (EligibleCard,
// SchemeMatchCard, etc.) can link to the same `/scheme/$id` route.
import { schemes as schemeCatalog } from "@/data/schemes";

export interface MatchedSchemeRaw {
  id?: string;
  name?: string;
  scheme?: string;
  benefits?: string[];
  missing?: string[];
  percentage?: number;
}

export interface ResolvedScheme {
  id: string | null;
  name: string;
}

const normalize = (value: string): string =>
  value
    .toLowerCase()
    .replace(/₹|[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");

/**
 * Resolves the id/name a card needs for display + routing from whatever
 * shape the caller happens to have:
 *  - Already-canonical objects (id + name present, e.g. from data/schemes.ts)
 *    are returned as-is.
 *  - Raw match objects from the eligibility API (`{ scheme, benefits, ... }`)
 *    are matched against the local catalog by normalized name comparison,
 *    falling back to word-overlap scoring for labels like
 *    "Indiramma Family Life Insurance Scheme: ₹5 Lakh Life Cover" that embed
 *    extra benefit text alongside the scheme name.
 */
export function resolveSchemeIdentity(raw: MatchedSchemeRaw): ResolvedScheme {
  if (raw.id && raw.name) {
    return { id: raw.id, name: raw.name };
  }

  const rawLabel = (raw.name || raw.scheme || "").trim();
  if (!rawLabel) {
    return { id: null, name: "Untitled Scheme" };
  }

  const rawNorm = normalize(rawLabel);
  // Space-stripped form catches labels where the API drops spaces between
  // words (e.g. "Mahalakshmi" vs catalog "Maha Lakshmi Scheme") — plain
  // startsWith/includes on the spaced form can't match these since the
  // strings no longer line up once a space goes missing.
  const rawCompact = rawNorm.replace(/\s+/g, "");

  // 1. Exact match, or one label fully contains the other — checked on both
  //    the spaced and space-stripped forms.
  let match = schemeCatalog.find((s) => {
    const catalogNorm = normalize(s.name);
    const catalogCompact = catalogNorm.replace(/\s+/g, "");
    return (
      catalogNorm === rawNorm ||
      rawNorm.startsWith(catalogNorm) ||
      catalogNorm.startsWith(rawNorm) ||
      rawNorm.includes(catalogNorm) ||
      catalogCompact === rawCompact ||
      rawCompact.startsWith(catalogCompact) ||
      catalogCompact.startsWith(rawCompact) ||
      rawCompact.includes(catalogCompact)
    );
  });

  // 2. Fallback: word-overlap scoring, for labels where extra benefit text
  //    sits *between* words of the scheme name (e.g. "... Family Life
  //    Insurance Scheme: ₹5 Lakh Life Cover" vs catalog "Life Insurance").
  //    Generic words that appear in almost every catalog name (e.g.
  //    "scheme") are excluded — otherwise an unrelated label that merely
  //    contains the word "scheme" can false-match on it alone.
  if (!match) {
    const STOPWORDS = new Set(["scheme", "yojana", "the", "and", "of", "for"]);
    const rawWords = new Set(rawNorm.split(" ").filter((w) => w && !STOPWORDS.has(w)));
    let best: { scheme: (typeof schemeCatalog)[number]; score: number } | null = null;

    for (const s of schemeCatalog) {
      const catalogWords = normalize(s.name)
        .split(" ")
        .filter((w) => w && !STOPWORDS.has(w));
      if (catalogWords.length === 0) continue;
      const overlap = catalogWords.filter((w) => rawWords.has(w)).length;
      const score = overlap / catalogWords.length;
      if (!best || score > best.score) {
        best = { scheme: s, score };
      }
    }

    if (best && best.score >= 0.5) {
      match = best.scheme;
    }
  }

  return {
    id: match ? match.id : null,
    name: match ? match.name : rawLabel,
  };
}