// lib/engineState.ts
//
// Single source of truth for the Eligibility Engine's shape, shared between
// `routes/index.tsx` (where the form lives) and `routes/scheme/$id.tsx`
// (which needs to hand the same state back when the user clicks "Back").
// Keeping this in its own module — instead of importing straight from
// routes/index.tsx — avoids pulling the whole SarthiPortal component into
// the scheme detail route's bundle.
import type { Scheme } from "@/components/ui/SchemesTab";

export type TabId = "engine" | "schemes" | "applications" | "notifications" | "help";

export const VALID_TABS: TabId[] = ["engine", "schemes", "applications", "notifications", "help"];

export const defaultFormData = {
  name: "",
  age: "",
  age_months: "",
  gender: "",
  caste: "",
  religion: "",
  annual_income: "",
  is_rural: true,
  is_income_tax_payer: false,
  is_government_employee: false,
  is_head_of_family: false,
  has_lpg_connection: false,
  is_permanent_resident: true,
  has_white_ration_card: false,
  is_married: false,
  is_unmarried: false,
  is_about_to_marry: false,
  is_pregnant: false,
  is_lactating: false,
  owns_pucca_house: false,
  is_widow: false,
  is_single_woman: false,
  is_disabled: false,
  occupation: "",
  has_specific_medical_condition: false,
  is_pattadar: false,
  has_cultivable_land: "",
  is_active_farmer: false,
  class_level: "",
  attendance_percent: "",
  graduation_marks_percent: "",
  graduation_percentage: "",
  is_graduate: false,
  is_final_year_student: false,
  has_confirmed_admission: false,
  target_country: "",
  education_level: "",
  gre_score: "",
  gmat_score: "",
  ielts_score: "",
  toefl_score: "",
  normalized_gre_gmat: "",
  normalized_english_test: "",
  electricity_consumption: "",
  has_electricity_bill_dues: false,
};

export type EngineFormData = typeof defaultFormData;

// Search params carried by "/" — tab + (for the engine tab) the last-submitted
// inputs and results, so navigating to a scheme detail page and back — via
// the in-app Back link *or* the browser's own Back button — restores exactly
// what the user had, instead of losing it when the route unmounts.
export interface IndexSearch {
  tab?: TabId;
  input?: Partial<EngineFormData>;
  results?: Scheme[];
}

export function parseIndexSearch(search: Record<string, unknown>): IndexSearch {
  const tab = VALID_TABS.includes(search.tab as TabId) ? (search.tab as TabId) : "engine";
  const input =
    search.input && typeof search.input === "object" && !Array.isArray(search.input)
      ? (search.input as Partial<EngineFormData>)
      : undefined;
  const results = Array.isArray(search.results) ? (search.results as Scheme[]) : undefined;
  return { tab, input, results };
}

// Search params carried by "/scheme/$id" — where the visit came from, plus
// (only relevant when `from === "engine"`) the engine state to hand back.
export interface SchemeDetailSearch {
  from?: TabId;
  input?: Partial<EngineFormData>;
  results?: Scheme[];
}

export function parseSchemeDetailSearch(search: Record<string, unknown>): SchemeDetailSearch {
  const from = VALID_TABS.includes(search.from as TabId) ? (search.from as TabId) : undefined;
  const input =
    search.input && typeof search.input === "object" && !Array.isArray(search.input)
      ? (search.input as Partial<EngineFormData>)
      : undefined;
  const results = Array.isArray(search.results) ? (search.results as Scheme[]) : undefined;
  return { from, input, results };
}

/**
 * Builds the `search` payload for a Link from a scheme card to
 * `/scheme/$id`, so the detail page's Back button can return the user to
 * the exact tab (and, for the engine, the exact inputs/results) they came
 * from. Only the engine tab needs to carry input/results forward — other
 * tabs (e.g. the full catalog) don't depend on them.
 */
export function buildSchemeLinkSearch(
  from: TabId,
  engineState?: { input?: Partial<EngineFormData>; results?: Scheme[] },
): SchemeDetailSearch {
  if (from === "engine") {
    return { from, input: engineState?.input, results: engineState?.results };
  }
  return { from };
}