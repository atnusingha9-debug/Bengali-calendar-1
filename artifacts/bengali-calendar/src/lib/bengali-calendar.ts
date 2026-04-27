export const BENGALI_MONTHS = [
  "Boishakh",
  "Joishtho",
  "Asadh",
  "Srabon",
  "Bhadro",
  "Ashshin",
  "Kartik",
  "Ogrohaeon",
  "Poush",
  "Magh",
  "Falgun",
  "Choitro",
] as const;

export const BENGALI_MONTHS_BN = [
  "বৈশাখ",
  "জ্যৈষ্ঠ",
  "আষাঢ়",
  "শ্রাবণ",
  "ভাদ্র",
  "আশ্বিন",
  "কার্তিক",
  "অগ্রহায়ণ",
  "পৌষ",
  "মাঘ",
  "ফাল্গুন",
  "চৈত্র",
] as const;

export const GREGORIAN_SPAN = [
  "Apr–May",
  "May–Jun",
  "Jun–Jul",
  "Jul–Aug",
  "Aug–Sep",
  "Sep–Oct",
  "Oct–Nov",
  "Nov–Dec",
  "Dec–Jan",
  "Jan–Feb",
  "Feb–Mar",
  "Mar–Apr",
] as const;

export const SEASONS = [
  { en: "Grishmo (Summer)", bn: "গ্রীষ্ম", months: [0, 1] },
  { en: "Borsha (Monsoon)", bn: "বর্ষা", months: [2, 3] },
  { en: "Sharat (Autumn)", bn: "শরৎ", months: [4, 5] },
  { en: "Hemonto (Late Autumn)", bn: "হেমন্ত", months: [6, 7] },
  { en: "Sheet (Winter)", bn: "শীত", months: [8, 9] },
  { en: "Bashonto (Spring)", bn: "বসন্ত", months: [10, 11] },
];

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const WEEKDAYS_FULL = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export type MonthInfo = {
  index: number;
  name: string;
  nameBn: string;
  startGregorian: string;
  endGregorian: string;
  days: number;
};

export type YearInfo = {
  bsYear: number;
  gregorianRange: string;
  months: MonthInfo[];
};

const MONTH_NAMES_AD = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function isLeap(y: number) {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

function gregorianDayOfYear(y: number, m: number, d: number) {
  const dim = [
    31,
    isLeap(y) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  let n = d;
  for (let i = 0; i < m; i++) n += dim[i];
  return n;
}

function dateFromOrdinal(y: number, ord: number): { y: number; m: number; d: number } {
  let n = ord;
  const dim = [
    31,
    isLeap(y) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  let total = dim.reduce((s, v) => s + v, 0);
  while (n > total) {
    n -= total;
    y++;
    total = (isLeap(y) ? 366 : 365);
  }
  while (n <= 0) {
    y--;
    total = isLeap(y) ? 366 : 365;
    n += total;
  }
  let m = 0;
  const dimY = [
    31,
    isLeap(y) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  while (n > dimY[m]) {
    n -= dimY[m];
    m++;
  }
  return { y, m, d: n };
}

/**
 * Approximate West-Bengal Hindu Bengali (solar) month lengths used near present day.
 * 1 Boishakh ≈ April 15. Total = 365 days; in years where the start shifts to April 14
 * we use a 366-day variant.
 */
function monthLengths(bsYear: number): number[] {
  // (gregorian year that contains 1 Boishakh of bsYear) is bsYear + 593
  const gYear = bsYear + 593;
  // The next Pohela Boishakh is April 14 if (gYear+1) is a Gregorian leap year, else April 15
  const nextLeap = isLeap(gYear + 1);
  const total = nextLeap ? 366 : 365;
  // Standard approximation of WB Bengali calendar month lengths
  // Boi Joi Asa Sra Bha Ash Kar Ogr Pou Mag Fal Cho
  const base = [31, 31, 31, 31, 31, 30, 30, 29, 29, 30, 30, 30];
  // base sums to 363; we need to add 2 (or 3 for leap) days. Distribute to Asadh/Ashshin/Choitro
  let sum = base.reduce((a, b) => a + b, 0);
  let diff = total - sum;
  // Add to Asadh first (often has 32), then Ashshin (often 31), then Choitro
  const boost = [2, 5, 11];
  let i = 0;
  while (diff > 0) {
    base[boost[i % boost.length]]++;
    diff--;
    i++;
  }
  return base;
}

export function bsToGregorian(
  bsYear: number,
  bsMonth0: number,
  bsDay: number,
): { y: number; m: number; d: number } {
  const startY = bsYear + 593;
  // Pohela Boishakh: April 14 if (startY+1) is leap (Mar 1..Dec 31 and Jan 1..Apr 13 of next year all in BS year), else April 15.
  // Simpler heuristic: April 14 when (startY+1) % 4 == 0 (close to leap), else April 15.
  // Use: if startY is a leap year, April 14, else April 15
  const startMonth = 3; // April (0-indexed)
  const startDay = isLeap(startY + 1) ? 14 : 15;
  const lengths = monthLengths(bsYear);
  let offset = 0;
  for (let i = 0; i < bsMonth0; i++) offset += lengths[i];
  offset += bsDay - 1;
  const startOrd = gregorianDayOfYear(startY, startMonth, startDay);
  return dateFromOrdinal(startY, startOrd + offset);
}

export function gregorianToBs(y: number, m: number, d: number): { bsYear: number; bsMonth0: number; bsDay: number } {
  // Determine BS year for this Gregorian date
  // Pohela Boishakh of BS year (Y - 593) is roughly April 15 of Y
  const possibleBsYear = (() => {
    const target = new Date(Date.UTC(y, m, d));
    const candA = y - 593; // BS year that started in Apr of (Y-1)? No - BS Y = AD Y - 593 if after Apr ~14
    const candB = y - 594;
    // PB of candA = April of (candA + 593) = April of y
    const startA = bsToGregorian(candA, 0, 1);
    const startDateA = new Date(Date.UTC(startA.y, startA.m, startA.d));
    if (target.getTime() >= startDateA.getTime()) return candA;
    return candB;
  })();
  const startG = bsToGregorian(possibleBsYear, 0, 1);
  const startDate = new Date(Date.UTC(startG.y, startG.m, startG.d));
  const target = new Date(Date.UTC(y, m, d));
  const diffDays = Math.round((target.getTime() - startDate.getTime()) / 86400000);
  const lengths = monthLengths(possibleBsYear);
  let remaining = diffDays;
  let monthIdx = 0;
  while (monthIdx < 12 && remaining >= lengths[monthIdx]) {
    remaining -= lengths[monthIdx];
    monthIdx++;
  }
  if (monthIdx >= 12) {
    // Fall into next year
    return gregorianToBs(y, m, d);
  }
  return { bsYear: possibleBsYear, bsMonth0: monthIdx, bsDay: remaining + 1 };
}

export function getYearInfo(bsYear: number): YearInfo {
  const lengths = monthLengths(bsYear);
  const months: MonthInfo[] = lengths.map((days, i) => {
    const start = bsToGregorian(bsYear, i, 1);
    const end = bsToGregorian(bsYear, i, days);
    return {
      index: i,
      name: BENGALI_MONTHS[i],
      nameBn: BENGALI_MONTHS_BN[i],
      startGregorian: `${MONTH_NAMES_AD[start.m]} ${start.d}, ${start.y}`,
      endGregorian: `${MONTH_NAMES_AD[end.m]} ${end.d}, ${end.y}`,
      days,
    };
  });
  const first = bsToGregorian(bsYear, 0, 1);
  const last = bsToGregorian(bsYear, 11, lengths[11]);
  return {
    bsYear,
    gregorianRange: `${first.y} – ${last.y}`,
    months,
  };
}

export function buildMonthGrid(bsYear: number, bsMonth0: number) {
  const lengths = monthLengths(bsYear);
  const days = lengths[bsMonth0];
  const cells: { bsDay: number; gregorianDate: Date }[] = [];
  for (let d = 1; d <= days; d++) {
    const g = bsToGregorian(bsYear, bsMonth0, d);
    cells.push({ bsDay: d, gregorianDate: new Date(Date.UTC(g.y, g.m, g.d)) });
  }
  return cells;
}

export function gregorianMonthName(idx: number) {
  return MONTH_NAMES_AD[idx];
}

export function formatGregorian(date: Date): string {
  return `${MONTH_NAMES_AD[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

export function bengaliNumeral(n: number): string {
  const map = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(n)
    .split("")
    .map((c) => (/[0-9]/.test(c) ? map[parseInt(c, 10)] : c))
    .join("");
}

export function monthSlug(name: string) {
  return name.toLowerCase();
}

export function monthFromSlug(slug: string): number {
  const idx = BENGALI_MONTHS.findIndex((m) => m.toLowerCase() === slug.toLowerCase());
  return idx;
}

/* ---------------- Festival data ---------------- */

export type Festival = {
  bsYear: number;
  bsMonth0: number;
  bsDay: number;
  name: string;
  type: "religious" | "national" | "cultural" | "tithi";
  description?: string;
};

export const FESTIVALS: Festival[] = [
  // 1432 BS (2025-2026)
  { bsYear: 1432, bsMonth0: 0, bsDay: 1, name: "Pohela Boishakh (Bengali New Year)", type: "national", description: "First day of the Bengali year and one of the largest cultural celebrations in Bengal." },
  { bsYear: 1432, bsMonth0: 0, bsDay: 14, name: "Akshaya Tritiya", type: "religious", description: "Considered an auspicious day for new ventures and gold purchases." },
  { bsYear: 1432, bsMonth0: 0, bsDay: 25, name: "Rabindra Jayanti", type: "cultural", description: "Birth anniversary of Nobel laureate Rabindranath Tagore." },
  { bsYear: 1432, bsMonth0: 1, bsDay: 11, name: "Jamai Shashthi", type: "cultural", description: "A day to honour sons-in-law in Bengali Hindu households." },
  { bsYear: 1432, bsMonth0: 2, bsDay: 12, name: "Rath Yatra", type: "religious", description: "Chariot festival of Lord Jagannath." },
  { bsYear: 1432, bsMonth0: 3, bsDay: 19, name: "Janmashtami", type: "religious", description: "Birth of Lord Krishna." },
  { bsYear: 1432, bsMonth0: 4, bsDay: 14, name: "Vishwakarma Puja", type: "religious", description: "Worship of the divine architect Vishwakarma." },
  { bsYear: 1432, bsMonth0: 5, bsDay: 11, name: "Mahalaya", type: "religious", description: "Marks the beginning of Devi Paksha and Durga Puja festivities." },
  { bsYear: 1432, bsMonth0: 5, bsDay: 19, name: "Maha Shashthi (Durga Puja)", type: "religious", description: "Beginning of the five-day Durga Puja." },
  { bsYear: 1432, bsMonth0: 5, bsDay: 20, name: "Maha Saptami", type: "religious" },
  { bsYear: 1432, bsMonth0: 5, bsDay: 21, name: "Maha Ashtami", type: "religious" },
  { bsYear: 1432, bsMonth0: 5, bsDay: 22, name: "Maha Nabami", type: "religious" },
  { bsYear: 1432, bsMonth0: 5, bsDay: 23, name: "Bijoya Dashami", type: "religious", description: "Final day of Durga Puja, idol immersion day." },
  { bsYear: 1432, bsMonth0: 5, bsDay: 28, name: "Lakshmi Puja (Kojagari)", type: "religious", description: "Worship of goddess Lakshmi on the full-moon night." },
  { bsYear: 1432, bsMonth0: 6, bsDay: 4, name: "Kali Puja & Diwali", type: "religious", description: "Worship of goddess Kali; Diwali festival of lights." },
  { bsYear: 1432, bsMonth0: 6, bsDay: 6, name: "Bhai Phonta", type: "cultural", description: "Bengali festival celebrating brother-sister bonds." },
  { bsYear: 1432, bsMonth0: 6, bsDay: 23, name: "Jagaddhatri Puja", type: "religious" },
  { bsYear: 1432, bsMonth0: 8, bsDay: 16, name: "Poush Sankranti / Makar Sankranti", type: "religious", description: "Harvest festival celebrated with pithe-puli." },
  { bsYear: 1432, bsMonth0: 9, bsDay: 9, name: "Saraswati Puja", type: "religious", description: "Worship of the goddess of knowledge and learning." },
  { bsYear: 1432, bsMonth0: 10, bsDay: 4, name: "Maha Shivratri", type: "religious" },
  { bsYear: 1432, bsMonth0: 10, bsDay: 19, name: "Holi / Dol Yatra", type: "religious", description: "Festival of colours; in Bengal celebrated as Dol Yatra." },
  { bsYear: 1432, bsMonth0: 11, bsDay: 22, name: "Nil Puja", type: "religious" },
  { bsYear: 1432, bsMonth0: 11, bsDay: 30, name: "Choitro Sankranti", type: "religious", description: "Last day of the Bengali year." },

  // 1433 BS (2026-2027)
  { bsYear: 1433, bsMonth0: 0, bsDay: 1, name: "Pohela Boishakh (Bengali New Year)", type: "national", description: "First day of Bengali year 1433 — Nababarsha celebrations across Bengal." },
  { bsYear: 1433, bsMonth0: 0, bsDay: 5, name: "Akshaya Tritiya", type: "religious", description: "Auspicious day for new beginnings and purchasing gold." },
  { bsYear: 1433, bsMonth0: 0, bsDay: 13, name: "Mohini Ekadashi", type: "religious" },
  { bsYear: 1433, bsMonth0: 0, bsDay: 17, name: "Buddha Purnima", type: "religious", description: "Birth anniversary of Lord Buddha." },
  { bsYear: 1433, bsMonth0: 0, bsDay: 25, name: "Rabindra Jayanti", type: "cultural", description: "Birth anniversary of Rabindranath Tagore — celebrated across Bengal." },
  { bsYear: 1433, bsMonth0: 0, bsDay: 29, name: "Apara Ekadashi", type: "religious" },
  { bsYear: 1433, bsMonth0: 1, bsDay: 13, name: "Nirjala Ekadashi", type: "religious" },
  { bsYear: 1433, bsMonth0: 1, bsDay: 18, name: "Jamai Shashthi", type: "cultural", description: "Sons-in-law are welcomed and feasted by their in-laws." },
  { bsYear: 1433, bsMonth0: 2, bsDay: 1, name: "Rath Yatra of Puri", type: "religious", description: "Lord Jagannath's chariot festival." },
  { bsYear: 1433, bsMonth0: 2, bsDay: 9, name: "Ulto Rath", type: "religious" },
  { bsYear: 1433, bsMonth0: 3, bsDay: 8, name: "Janmashtami", type: "religious", description: "Birth of Lord Krishna celebrated with fasting and devotional songs." },
  { bsYear: 1433, bsMonth0: 4, bsDay: 1, name: "Vishwakarma Puja", type: "religious", description: "Worship of the divine engineer in workshops and factories." },
  { bsYear: 1433, bsMonth0: 4, bsDay: 30, name: "Mahalaya", type: "religious", description: "Beginning of Devi Paksha — Mahishasuramardini broadcast at dawn." },
  { bsYear: 1433, bsMonth0: 5, bsDay: 9, name: "Maha Shashthi (Durga Puja)", type: "religious", description: "Beginning of the grand Durga Puja festival in Bengal." },
  { bsYear: 1433, bsMonth0: 5, bsDay: 10, name: "Maha Saptami", type: "religious" },
  { bsYear: 1433, bsMonth0: 5, bsDay: 11, name: "Maha Ashtami", type: "religious", description: "Sandhi Puja and Kumari Puja are observed." },
  { bsYear: 1433, bsMonth0: 5, bsDay: 12, name: "Maha Nabami", type: "religious" },
  { bsYear: 1433, bsMonth0: 5, bsDay: 13, name: "Bijoya Dashami", type: "religious", description: "Goddess Durga returns to Kailash; idol immersion." },
  { bsYear: 1433, bsMonth0: 5, bsDay: 18, name: "Kojagari Lakshmi Puja", type: "religious", description: "Worship of goddess Lakshmi on the full-moon night." },
  { bsYear: 1433, bsMonth0: 6, bsDay: 24, name: "Kali Puja & Diwali", type: "religious", description: "Festival of lights and worship of goddess Kali." },
  { bsYear: 1433, bsMonth0: 6, bsDay: 26, name: "Bhai Phonta", type: "cultural", description: "Bengali brother-sister festival." },
  { bsYear: 1433, bsMonth0: 7, bsDay: 11, name: "Jagaddhatri Puja", type: "religious", description: "Worship of goddess Jagaddhatri, especially grand in Chandannagar." },
  { bsYear: 1433, bsMonth0: 8, bsDay: 16, name: "Poush Sankranti", type: "religious", description: "Harvest festival; Pithe-puli is prepared in every Bengali home." },
  { bsYear: 1433, bsMonth0: 9, bsDay: 22, name: "Saraswati Puja (Vasant Panchami)", type: "religious", description: "Worship of the goddess of learning, music and arts." },
  { bsYear: 1433, bsMonth0: 10, bsDay: 14, name: "Maha Shivratri", type: "religious" },
  { bsYear: 1433, bsMonth0: 10, bsDay: 30, name: "Dol Yatra / Holi", type: "religious", description: "Festival of colours, celebrated as Dol in Bengal." },
  { bsYear: 1433, bsMonth0: 11, bsDay: 30, name: "Choitro Sankranti / Charak Puja", type: "religious", description: "Last day of the Bengali year 1433." },
];

export function festivalsForMonth(bsYear: number, bsMonth0: number): Festival[] {
  return FESTIVALS.filter((f) => f.bsYear === bsYear && f.bsMonth0 === bsMonth0);
}

export function festivalsForYear(bsYear: number): Festival[] {
  return FESTIVALS.filter((f) => f.bsYear === bsYear);
}

export function todayBs(): { bsYear: number; bsMonth0: number; bsDay: number; gDate: Date } {
  const now = new Date();
  const g = { y: now.getFullYear(), m: now.getMonth(), d: now.getDate() };
  const bs = gregorianToBs(g.y, g.m, g.d);
  return { ...bs, gDate: new Date(Date.UTC(g.y, g.m, g.d)) };
}

export const SUPPORTED_BS_YEARS = [1430, 1431, 1432, 1433, 1434, 1435];
export const CURRENT_BS_YEAR = 1433;
