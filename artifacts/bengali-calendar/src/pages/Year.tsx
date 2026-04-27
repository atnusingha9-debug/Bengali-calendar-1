import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import {
  BENGALI_MONTHS,
  BENGALI_MONTHS_BN,
  GREGORIAN_SPAN,
  bsToGregorian,
  buildMonthGrid,
  festivalsForMonth,
  formatGregorian,
  getYearInfo,
  monthSlug,
  WEEKDAYS,
} from "@/lib/bengali-calendar";

export default function Year({ bsYear }: { bsYear: number }) {
  const info = getYearInfo(bsYear);

  const description = `Bengali Calendar ${bsYear} BS — complete Bangla Panjika for the Bengali year ${bsYear} (${info.gregorianRange}). Browse monthly calendars, list of festivals, holidays and important Tithi for all 12 Bengali months.`;

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      {
        "@type": "ListItem",
        position: 2,
        name: `Bengali Calendar ${bsYear}`,
        item: `/year/${bsYear}`,
      },
    ],
  };

  return (
    <Layout>
      <Seo
        title={`Bengali Calendar ${bsYear} BS — Bangla Panjika ${info.gregorianRange}`}
        description={description}
        path={`/year/${bsYear}`}
        keywords={`bengali calendar ${bsYear}, bangla calendar ${bsYear}, bangla panjika ${bsYear}, bengali year ${bsYear} festivals`}
        jsonLd={breadcrumbs}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-stone-600 mb-3">
        <ol className="flex gap-2">
          <li>
            <Link to="/" className="hover:text-[#7a1f12]">
              Home
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="text-[#7a1f12] font-medium">
            Bengali Calendar {bsYear}
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-[#7a1f12]">
          Bengali Calendar {bsYear} BS
        </h1>
        <p className="text-lg text-stone-700 mt-2">
          Bangla Panjika for the Bengali year <strong>{bsYear}</strong> (covering{" "}
          {info.gregorianRange}). Browse all twelve Bengali months — Boishakh
          to Choitro — with their Gregorian start dates, day counts and
          festival listings.
        </p>
      </header>

      <section aria-label="Year overview" className="mb-10">
        <table className="w-full text-sm border border-amber-200 rounded-lg overflow-hidden">
          <caption className="sr-only">
            All twelve months of Bengali year {bsYear}
          </caption>
          <thead className="bg-amber-100/60 text-[#7a1f12]">
            <tr>
              <th scope="col" className="text-left px-3 py-2 font-semibold">
                Bengali Month
              </th>
              <th scope="col" className="text-left px-3 py-2 font-semibold">
                Bengali (বাংলা)
              </th>
              <th scope="col" className="text-left px-3 py-2 font-semibold">
                Gregorian Span
              </th>
              <th scope="col" className="text-left px-3 py-2 font-semibold">
                Starts
              </th>
              <th scope="col" className="text-right px-3 py-2 font-semibold">
                Days
              </th>
            </tr>
          </thead>
          <tbody>
            {info.months.map((m) => (
              <tr
                key={m.index}
                className="border-t border-amber-100 hover:bg-amber-50/40"
              >
                <th scope="row" className="text-left px-3 py-2 font-medium">
                  <Link
                    to={`/year/${bsYear}/${monthSlug(m.name)}`}
                    className="text-[#7a1f12] hover:underline"
                  >
                    {m.name}
                  </Link>
                </th>
                <td className="px-3 py-2" lang="bn">
                  {m.nameBn}
                </td>
                <td className="px-3 py-2 text-stone-600">
                  {GREGORIAN_SPAN[m.index]}
                </td>
                <td className="px-3 py-2 text-stone-600">
                  {m.startGregorian}
                </td>
                <td className="px-3 py-2 text-right text-stone-600">
                  {m.days}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold text-[#7a1f12] mb-4">
          Monthly Bangla Panjika {bsYear} BS
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {info.months.map((m) => {
            const grid = buildMonthGrid(bsYear, m.index);
            const fests = festivalsForMonth(bsYear, m.index);
            const start = bsToGregorian(bsYear, m.index, 1);
            return (
              <article
                key={m.index}
                className="rounded-lg border border-amber-200 bg-white overflow-hidden"
              >
                <header className="px-4 py-2 bg-amber-100/60 border-b border-amber-200 flex items-baseline justify-between">
                  <h3 className="font-serif text-lg text-[#7a1f12]">
                    <Link
                      to={`/year/${bsYear}/${monthSlug(m.name)}`}
                      className="hover:underline"
                    >
                      {m.name} <span className="text-sm">({BENGALI_MONTHS_BN[m.index]})</span>
                    </Link>
                  </h3>
                  <span className="text-xs text-stone-500">
                    {formatGregorian(new Date(Date.UTC(start.y, start.m, start.d)))} →
                  </span>
                </header>
                <div className="p-3">
                  <div className="grid grid-cols-7 gap-0.5 text-[11px] text-center">
                    {WEEKDAYS.map((d) => (
                      <div
                        key={d}
                        className="font-semibold text-[#7a1f12] py-0.5"
                      >
                        {d.slice(0, 1)}
                      </div>
                    ))}
                    {(() => {
                      const lead = grid[0].gregorianDate.getUTCDay();
                      const cells: (typeof grid[0] | null)[] = [
                        ...Array.from({ length: lead }, () => null),
                        ...grid,
                      ];
                      while (cells.length % 7 !== 0) cells.push(null);
                      return cells.map((c, i) =>
                        c ? (
                          <div
                            key={i}
                            className="aspect-square rounded text-[11px] flex items-center justify-center bg-stone-50 border border-stone-100"
                          >
                            {c.bsDay}
                          </div>
                        ) : (
                          <div key={i} className="aspect-square" />
                        ),
                      );
                    })()}
                  </div>
                  {fests.length > 0 && (
                    <ul className="mt-3 space-y-1 text-xs">
                      {fests.slice(0, 3).map((f) => (
                        <li
                          key={f.name}
                          className="flex justify-between gap-2 text-stone-700"
                        >
                          <span className="font-medium text-[#7a1f12] truncate">
                            {f.name}
                          </span>
                          <span className="text-stone-500 shrink-0">
                            {f.bsDay} {BENGALI_MONTHS[m.index]}
                          </span>
                        </li>
                      ))}
                      {fests.length > 3 && (
                        <li>
                          <Link
                            to={`/year/${bsYear}/${monthSlug(m.name)}`}
                            className="text-[#7a1f12] hover:underline"
                          >
                            +{fests.length - 3} more festivals →
                          </Link>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-10 prose prose-stone max-w-none">
        <h2 className="font-serif text-2xl text-[#7a1f12]">
          About Bengali Year {bsYear}
        </h2>
        <p>
          The Bengali year {bsYear} BS (Bangabda) corresponds approximately to
          the Gregorian period {info.gregorianRange}. It begins on{" "}
          <strong>1 Boishakh, {bsYear}</strong> ({info.months[0].startGregorian}
          ) and ends on the last day of{" "}
          <strong>Choitro, {bsYear}</strong>. The year is divided into six
          seasons (<em>Ritu</em>) — Grishmo, Borsha, Sharat, Hemonto, Sheet
          and Bashonto — each spanning two Bengali months.
        </p>
      </section>
    </Layout>
  );
}
