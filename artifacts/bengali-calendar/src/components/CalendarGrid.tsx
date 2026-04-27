import { Link } from "react-router-dom";
import {
  WEEKDAYS,
  bengaliNumeral,
  buildMonthGrid,
  festivalsForMonth,
  BENGALI_MONTHS,
  BENGALI_MONTHS_BN,
  monthSlug,
  formatGregorian,
} from "@/lib/bengali-calendar";

type Props = {
  bsYear: number;
  bsMonth0: number;
  highlightedDay?: number;
  showLegend?: boolean;
};

export default function CalendarGrid({
  bsYear,
  bsMonth0,
  highlightedDay,
  showLegend = true,
}: Props) {
  const cells = buildMonthGrid(bsYear, bsMonth0);
  const festivals = festivalsForMonth(bsYear, bsMonth0);
  const festivalMap = new Map(festivals.map((f) => [f.bsDay, f]));

  const monthName = BENGALI_MONTHS[bsMonth0];
  const monthNameBn = BENGALI_MONTHS_BN[bsMonth0];

  // Pad start to align with first day's weekday
  const firstWeekday = cells[0].gregorianDate.getUTCDay();
  const lead = Array.from({ length: firstWeekday }, () => null);
  const all: (typeof cells[0] | null)[] = [...lead, ...cells];
  while (all.length % 7 !== 0) all.push(null);

  return (
    <section
      aria-label={`${monthName} ${bsYear} BS calendar grid`}
      className="bg-white rounded-lg shadow-sm border border-amber-200/60 overflow-hidden"
    >
      <header className="px-4 py-3 bg-amber-100/60 border-b border-amber-200 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#7a1f12]">
            {monthName} <span className="text-base font-normal">({monthNameBn})</span>{" "}
            {bsYear} BS
          </h2>
          <p className="text-sm text-stone-600">
            {formatGregorian(cells[0].gregorianDate)} – {formatGregorian(cells[cells.length - 1].gregorianDate)}
          </p>
        </div>
        <div className="text-xs text-stone-500">
          {cells.length} days · {bengaliNumeral(cells.length)} দিন
        </div>
      </header>
      <div className="p-3">
        <div
          role="grid"
          aria-label={`${monthName} ${bsYear} dates`}
          className="grid grid-cols-7 gap-1 text-sm"
        >
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              role="columnheader"
              className="text-center font-semibold text-[#7a1f12] py-1 text-xs uppercase tracking-wide"
            >
              {d}
            </div>
          ))}
          {all.map((cell, i) => {
            if (!cell) return <div key={i} role="gridcell" aria-hidden="true" />;
            const fest = festivalMap.get(cell.bsDay);
            const isHighlighted = highlightedDay === cell.bsDay;
            const isSunday = cell.gregorianDate.getUTCDay() === 0;
            return (
              <div
                key={i}
                role="gridcell"
                className={`relative rounded-md border min-h-[4.5rem] p-1.5 flex flex-col ${
                  isHighlighted
                    ? "bg-[#7a1f12] text-amber-50 border-[#7a1f12]"
                    : fest
                      ? "bg-amber-50 border-amber-300"
                      : isSunday
                        ? "bg-rose-50 border-rose-100"
                        : "bg-white border-stone-200"
                }`}
                aria-label={`${cell.bsDay} ${monthName} (${formatGregorian(cell.gregorianDate)})${
                  fest ? ` — ${fest.name}` : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-1">
                  <span className="font-serif font-bold text-base">
                    {cell.bsDay}
                  </span>
                  <span
                    className={`text-[10px] ${isHighlighted ? "text-amber-100" : "text-stone-500"}`}
                  >
                    {cell.gregorianDate.getUTCDate()}{" "}
                    {cell.gregorianDate.toLocaleString("en-US", {
                      month: "short",
                      timeZone: "UTC",
                    })}
                  </span>
                </div>
                {fest && (
                  <span
                    className={`mt-auto text-[11px] leading-tight font-medium line-clamp-2 ${
                      isHighlighted ? "text-amber-100" : "text-[#7a1f12]"
                    }`}
                  >
                    {fest.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showLegend && festivals.length > 0 && (
        <div className="px-4 pb-4">
          <h3 className="font-serif text-lg font-semibold text-[#7a1f12] mt-2 mb-2">
            {monthName} {bsYear} BS — Festivals & Holidays
          </h3>
          <ul className="grid sm:grid-cols-2 gap-2">
            {festivals.map((f) => (
              <li
                key={`${f.bsDay}-${f.name}`}
                className="rounded border border-amber-200 bg-amber-50/40 p-2.5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <strong className="text-[#7a1f12]">{f.name}</strong>
                  <span className="text-xs text-stone-500">
                    {f.bsDay} {monthName}
                  </span>
                </div>
                {f.description && (
                  <p className="text-xs text-stone-600 mt-1 leading-snug">
                    {f.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <footer className="px-4 py-3 border-t border-amber-200/60 bg-amber-50/40 flex justify-between text-sm">
        {bsMonth0 > 0 ? (
          <Link
            to={`/year/${bsYear}/${monthSlug(BENGALI_MONTHS[bsMonth0 - 1])}`}
            className="text-[#7a1f12] hover:underline"
            rel="prev"
          >
            ← {BENGALI_MONTHS[bsMonth0 - 1]} {bsYear}
          </Link>
        ) : (
          <Link
            to={`/year/${bsYear - 1}/${monthSlug(BENGALI_MONTHS[11])}`}
            className="text-[#7a1f12] hover:underline"
            rel="prev"
          >
            ← Choitro {bsYear - 1}
          </Link>
        )}
        {bsMonth0 < 11 ? (
          <Link
            to={`/year/${bsYear}/${monthSlug(BENGALI_MONTHS[bsMonth0 + 1])}`}
            className="text-[#7a1f12] hover:underline"
            rel="next"
          >
            {BENGALI_MONTHS[bsMonth0 + 1]} {bsYear} →
          </Link>
        ) : (
          <Link
            to={`/year/${bsYear + 1}/${monthSlug(BENGALI_MONTHS[0])}`}
            className="text-[#7a1f12] hover:underline"
            rel="next"
          >
            Boishakh {bsYear + 1} →
          </Link>
        )}
      </footer>
    </section>
  );
}
