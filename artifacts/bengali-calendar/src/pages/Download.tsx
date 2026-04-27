import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import {
  BENGALI_MONTHS,
  CURRENT_BS_YEAR,
  GREGORIAN_SPAN,
  bsToGregorian,
  formatGregorian,
  monthSlug,
} from "@/lib/bengali-calendar";

export default function Download() {
  const description = `Download a printable Bengali Calendar for ${CURRENT_BS_YEAR} BS. View any month in print-friendly format and save it as a PDF using your browser's print to PDF feature.`;
  return (
    <Layout>
      <Seo
        title={`Download Bengali Calendar ${CURRENT_BS_YEAR} BS — Printable PDF`}
        description={description}
        path="/download"
        keywords="download bengali calendar, bengali calendar pdf, bangla calendar download, printable bangla panjika"
      />

      <header className="mb-6">
        <h1 className="font-serif text-4xl font-bold text-[#7a1f12]">
          Download &amp; Print the Bengali Calendar
        </h1>
        <p className="text-stone-700 mt-2">
          Every Bengali month on this site is print-friendly. Open the month
          you want, then use <kbd className="border rounded px-1.5 py-0.5 text-xs">Ctrl/⌘ + P</kbd>{" "}
          and choose <em>Save as PDF</em> to keep an offline copy on your
          phone, computer or as a wall calendar.
        </p>
      </header>

      <section
        aria-label="Year downloads"
        className="grid sm:grid-cols-2 gap-5 mb-10"
      >
        {[CURRENT_BS_YEAR, CURRENT_BS_YEAR + 1].map((y) => (
          <article
            key={y}
            className="rounded-xl bg-white border border-amber-200 p-6 shadow-sm"
          >
            <h2 className="font-serif text-2xl text-[#7a1f12]">
              Bengali Calendar {y} BS
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Complete Bangla Panjika · 12 months · all festivals
            </p>
            <Link
              to={`/year/${y}`}
              className="inline-block mt-4 bg-[#7a1f12] text-amber-50 px-4 py-2 rounded-md hover:bg-[#5e1409]"
            >
              Open year overview →
            </Link>
          </article>
        ))}
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold text-[#7a1f12] mb-3">
          Monthly print-friendly pages — {CURRENT_BS_YEAR} BS
        </h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BENGALI_MONTHS.map((m, i) => {
            const start = bsToGregorian(CURRENT_BS_YEAR, i, 1);
            return (
              <li key={m}>
                <Link
                  to={`/year/${CURRENT_BS_YEAR}/${monthSlug(m)}`}
                  className="block bg-white border border-amber-200 rounded-lg p-4 hover:border-[#7a1f12] hover:shadow-md transition-shadow"
                >
                  <span className="font-serif font-semibold text-lg text-[#7a1f12]">
                    {m} {CURRENT_BS_YEAR}
                  </span>
                  <span className="block text-sm text-stone-600 mt-1">
                    {GREGORIAN_SPAN[i]} — starts{" "}
                    {formatGregorian(
                      new Date(Date.UTC(start.y, start.m, start.d)),
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-10 prose prose-stone max-w-none">
        <h2 className="font-serif text-2xl text-[#7a1f12]">
          Tips for printing
        </h2>
        <ol>
          <li>
            Open the month you want from the lists above (or from any month
            page).
          </li>
          <li>
            Use your browser&apos;s print dialog (<kbd>Ctrl/⌘ + P</kbd>).
          </li>
          <li>
            Choose <strong>Landscape orientation</strong> for the best fit.
          </li>
          <li>
            Pick <strong>Save as PDF</strong> to download a printable copy.
          </li>
        </ol>
      </section>
    </Layout>
  );
}
