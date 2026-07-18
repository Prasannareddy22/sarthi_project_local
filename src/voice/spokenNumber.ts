// Converts a spoken transcript into a plain numeric string for numeric form
// fields. Handles:
//   - Plain digits, including Telugu (౦-౯) and Devanagari (०-९) numerals,
//     currency symbols, and Indian-style separators ("₹1,50,000" → "150000").
//   - English number words ("twenty five thousand" → "25000"), including
//     hyphenated forms ("twenty-five") and Indian units (lakh, crore).
//   - Hindi number words in Devanagari ("पचास हज़ार") and common Latin
//     transliterations ("pachas hazaar", "do lakh").
//   - Telugu number words ("యాభై వేలు" → "50000", "రెండు లక్షలు" → "200000").
//   - Mixed digits + units ("2.5 lakh" → "250000", "3 हज़ार" → "3000").
// Unrecognised filler words ("my age is twenty five") are ignored so the
// number can be extracted from a natural sentence.

// Small values that add onto the running group (0-99).
const UNITS: Record<string, number> = {
  // --- English ---
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7,
  eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13,
  fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18,
  nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60,
  seventy: 70, eighty: 80, ninety: 90,
  // --- Hindi (Devanagari) ---
  "शून्य": 0, "एक": 1, "दो": 2, "तीन": 3, "चार": 4, "पांच": 5, "पाँच": 5,
  "छह": 6, "छः": 6, "सात": 7, "आठ": 8, "नौ": 9, "दस": 10, "ग्यारह": 11,
  "बारह": 12, "तेरह": 13, "चौदह": 14, "पंद्रह": 15, "पन्द्रह": 15,
  "सोलह": 16, "सत्रह": 17, "अठारह": 18, "उन्नीस": 19, "बीस": 20,
  "इक्कीस": 21, "बाईस": 22, "तेईस": 23, "चौबीस": 24, "पच्चीस": 25,
  "छब्बीस": 26, "सत्ताईस": 27, "अट्ठाईस": 28, "उनतीस": 29, "तीस": 30,
  "पैंतीस": 35, "चालीस": 40, "पैंतालीस": 45, "पचास": 50, "पचपन": 55,
  "साठ": 60, "पैंसठ": 65, "सत्तर": 70, "पचहत्तर": 75, "अस्सी": 80,
  "पचासी": 85, "नब्बे": 90, "पंचानवे": 95,
  // --- Hindi (Latin transliteration, as en-IN recognition often emits) ---
  shunya: 0, ek: 1, do: 2, doh: 2, teen: 3, char: 4, chaar: 4, panch: 5, paanch: 5,
  chhe: 6, cheh: 6, saat: 7, aath: 8, nau: 9, das: 10, gyarah: 11,
  barah: 12, terah: 13, chaudah: 14, pandrah: 15, solah: 16, satrah: 17,
  atharah: 18, unnis: 19, bees: 20, pachees: 25, tees: 30, chalis: 40,
  chaalis: 40, pachas: 50, saath: 60, sattar: 70, pachattar: 75, assi: 80,
  nabbe: 90,
  // --- Telugu ---
  "సున్నా": 0, "ఒకటి": 1, "ఒక": 1, "రెండు": 2, "మూడు": 3, "నాలుగు": 4,
  "ఐదు": 5, "అయిదు": 5, "ఆరు": 6, "ఏడు": 7, "ఎనిమిది": 8, "తొమ్మిది": 9,
  "పది": 10, "పదకొండు": 11, "పన్నెండు": 12, "పదమూడు": 13, "పధ్నాలుగు": 14,
  "పద్నాలుగు": 14, "పదిహేను": 15, "పదహారు": 16, "పదిహేడు": 17,
  "పద్దెనిమిది": 18, "పంతొమ్మిది": 19, "ఇరవై": 20, "ఇరవయ్": 20,
  "ముప్పై": 30, "ముప్ఫై": 30, "నలభై": 40, "నలబై": 40, "యాభై": 50,
  "యాబై": 50, "అరవై": 60, "అరవయ్": 60, "డెబ్బై": 70, "డెభ్భై": 70,
  "ఎనభై": 80, "ఎనబై": 80, "తొంభై": 90, "తొంబై": 90,
};

// "hundred"-class words: multiply the current group by 100.
const HUNDREDS = new Set<string>([
  "hundred", "hundreds",
  "सौ",
  "sau", "so",
  "వంద", "వందలు", "నూరు",
]);

// Large multipliers: close out the current group.
const MULTIPLIERS: Record<string, number> = {
  // --- English / international ---
  thousand: 1_000, thousands: 1_000,
  lakh: 100_000, lakhs: 100_000, lac: 100_000, lacs: 100_000,
  crore: 10_000_000, crores: 10_000_000,
  million: 1_000_000, millions: 1_000_000,
  billion: 1_000_000_000, billions: 1_000_000_000,
  // --- Hindi ---
  "हज़ार": 1_000, "हजार": 1_000, "लाख": 100_000, "करोड़": 10_000_000,
  "करोड": 10_000_000,
  hazaar: 1_000, hazar: 1_000, hajar: 1_000,
  // --- Telugu ---
  "వెయ్యి": 1_000, "వేయి": 1_000, "వేలు": 1_000, "వెయ్యిలు": 1_000,
  "లక్ష": 100_000, "లక్షలు": 100_000,
  "కోటి": 10_000_000, "కోట్లు": 10_000_000,
};

// Filler words safely ignored between number words.
const FILLERS = new Set<string>(["and", "और", "మరియు", "rupees", "rupee", "रुपये", "रुपए", "రూపాయలు"]);

/** Convert Telugu / Devanagari digits to ASCII digits. */
function toAsciiDigits(text: string): string {
  return text.replace(/[\u0C66-\u0C6F\u0966-\u096F]/g, (c) => {
    const code = c.charCodeAt(0);
    const base = code >= 0x0c66 ? 0x0c66 : 0x0966;
    return String(code - base);
  });
}

/**
 * Parse a spoken transcript into a numeric string ("" when no number found).
 * Works with digits, number words (en / hi / te), and mixed forms.
 */
export function spokenNumber(text: string): string {
  const normalized = toAsciiDigits(text)
    .toLowerCase()
    // Split hyphenated compounds like "twenty-five".
    .replace(/-/g, " ")
    // Drop currency symbols and thousands separators inside digit groups.
    .replace(/[₹$,]/g, "")
    // Strip punctuation that speech engines append.
    .replace(/[?!।|]/g, " ");

  // Fast path: the transcript already contains a usable plain number.
  const direct = normalized.match(/\d+(?:\.\d+)?/);
  const tokens = normalized.split(/\s+/).filter(Boolean);

  let total = 0; // Completed groups (e.g. "two lakh" once "lakh" is seen).
  let current = 0; // Group being accumulated (e.g. "fifty five").
  let sawNumberWord = false;
  let sawMultiplier = false;

  for (const token of tokens) {
    if (FILLERS.has(token)) continue;

    const digitMatch = token.match(/^\d+(?:\.\d+)?$/);
    if (digitMatch) {
      current += parseFloat(token);
      sawNumberWord = true;
      continue;
    }

    if (token in UNITS) {
      current += UNITS[token];
      sawNumberWord = true;
      continue;
    }

    if (HUNDREDS.has(token)) {
      current = (current || 1) * 100;
      sawNumberWord = true;
      continue;
    }

    if (token in MULTIPLIERS) {
      total += (current || 1) * MULTIPLIERS[token];
      current = 0;
      sawNumberWord = true;
      sawMultiplier = true;
      continue;
    }

    // Unknown token (e.g. "my", "age", "साल") — ignore it.
  }

  const result = total + current;

  if (sawNumberWord && (result > 0 || sawMultiplier || /(^|\s)(zero|शून्य|సున్నా|0)(\s|$)/.test(normalized))) {
    return String(result);
  }

  // Fallback: first plain number found anywhere in the transcript.
  if (direct) return direct[0];

  return "";
}
