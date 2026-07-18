// Merges backend-extracted fields onto the Eligibility-Engine form state.
// The form keeps numeric inputs as strings, so numbers are stringified here.
// Nothing is submitted automatically — this only pre-fills editable fields.
import { defaultFormData, type EngineFormData } from "@/lib/engineState";

// String-valued form fields the extractor may populate.
const STRING_FIELDS = new Set<keyof EngineFormData>([
  "name",
  "gender",
  "caste",
  "religion",
  "occupation",
  "target_country",
]);

// Numeric form fields (stored as strings in the form state).
const NUMERIC_FIELDS = new Set<keyof EngineFormData>([
  "age",
  "age_months",
  "annual_income",
  "electricity_consumption",
  "class_level",
  "attendance_percent",
  "graduation_percentage",
]);

function isBooleanField(key: keyof EngineFormData): boolean {
  return typeof defaultFormData[key] === "boolean";
}

export interface ApplyResult {
  next: EngineFormData;
  filledKeys: (keyof EngineFormData)[];
}

export function applyExtraction(
  current: EngineFormData,
  fields: Record<string, string | number | boolean>,
): ApplyResult {
  const next: EngineFormData = { ...current };
  const filledKeys: (keyof EngineFormData)[] = [];

  for (const [rawKey, value] of Object.entries(fields)) {
    const key = rawKey as keyof EngineFormData;
    if (!(key in defaultFormData)) continue;

    if (STRING_FIELDS.has(key)) {
      const str = String(value).trim();
      if (!str) continue;
      (next[key] as string) = str;
      filledKeys.push(key);
    } else if (NUMERIC_FIELDS.has(key)) {
      const num = typeof value === "number" ? value : Number(value);
      if (!Number.isFinite(num)) continue;
      (next[key] as string) = String(num);
      filledKeys.push(key);
    } else if (isBooleanField(key)) {
      (next[key] as boolean) = Boolean(value);
      filledKeys.push(key);
    }
  }

  return { next, filledKeys };
}
