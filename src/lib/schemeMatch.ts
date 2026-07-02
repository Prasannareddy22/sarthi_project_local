
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

export function resolveSchemeIdentity(raw: MatchedSchemeRaw): ResolvedScheme {
  if (raw.id && raw.name) {
    return { id: raw.id, name: raw.name };
  }

  const rawLabel = (raw.name || raw.scheme || "").trim();
  if (!rawLabel) {
    return { id: null, name: "Untitled Scheme" };
  }

  const rawNorm = normalize(rawLabel);

  // 1. Exact match, or one label fully contains the other.
  let match = schemeCatalog.find((s) => {
    const catalogNorm = normalize(s.name);
    return (
      catalogNorm === rawNorm ||
      rawNorm.startsWith(catalogNorm) ||
      catalogNorm.startsWith(rawNorm) ||
      rawNorm.includes(catalogNorm)
    );
  });

  if (!match) {
    const rawWords = new Set(rawNorm.split(" ").filter(Boolean));
    let best: { scheme: (typeof schemeCatalog)[number]; score: number } | null = null;

    for (const s of schemeCatalog) {
      const catalogWords = normalize(s.name).split(" ").filter(Boolean);
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