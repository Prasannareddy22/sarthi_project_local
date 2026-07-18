// Client wrapper for the backend natural-language extraction endpoint. The
// browser does speech-to-text; the transcript is sent here so the FastAPI
// backend can parse it into partial form fields.
import type { Language } from "@/i18n/config";

const API_BASE_URL = "https://sarthi-backend-drdp.onrender.com";

export interface ExtractionResult {
  fields: Record<string, string | number | boolean>;
  warnings: string[];
  matched_language: string;
}

export async function extractProfile(
  transcript: string,
  language: Language,
): Promise<ExtractionResult> {
  const response = await fetch(`${API_BASE_URL}/api/extract-profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript, language }),
  });
  if (!response.ok) throw new Error("Extraction request failed");
  const data = await response.json();
  return {
    fields: data.fields ?? {},
    warnings: data.warnings ?? [],
    matched_language: data.matched_language ?? language,
  };
}
