import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import {
  BENGALI_MONTHS,
  CURRENT_BS_YEAR,
  bsToGregorian,
  festivalsForYear,
  formatGregorian,
  monthSlug,
} from "@/lib/bengali-calendar";

export default function Festivals() {
  const years = [CURRENT_BS_YEAR, CURRENT_BS_YEAR + 1];

  const description = `Complete list of Bengali festivals and holidays for ${CURRENT_BS_YEAR} and ${CURRENT_BS_YEAR + 1} BS — Pohela Boishakh, Durga Puja, Kali Puja, Saraswati Puja, Rabindra Jayanti, Poush Sankranti and all major Bangla Panjika observances with dates.`;

  const allEvents = years.flatMap((y) =>
    festivalsForYear(y).map((f) => {
      const g = bsToGregorian(y, f.bsMonth0, f.bsDay);
      return {
        "@type": "Event",
        name: f.name,
        startDate: `${g.y}-${String(g.m + 1).padStart(2, "0")}-${String(g.d).padStart(2, "0")}`,
        description: f.description ?? f.name,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
        location: { "@type": "Place", name: "Bengal" },
      };
    }),
  );

  return (
    <Layout>
      <Seo
        title={`Bengali Festivals & Holidays ${CURRENT_BS_YEAR}–${CURRENT_BS_YEAR + 1} BS`}
        description={description}
        path="/festivals"
        keywords="bengali festivals, bengali holidays, durga puja date, kali puja date, saraswati puja date, poyla boishakh date, bangla festivals 2026"
        jsonLd={allEvents}
      />

      <header className="mb-6">
        <h1 className="font-serif text-4xl font-bold text-[#7a1f12]">
          Bengali Festivals & Holidays
        </h1>
        <p className="text-stone-700 mt-2">
          Complete schedule of major Bengali festivals, religious tithi and
          public holidays for the next two Bengali years. Every entry shows
          both the Bengali (BS) and English (AD) dates.
        </p>
      </header>

      {years.map((y) => {
        const fests = festivalsForYear(y);
        return (
          <section key={y} className="mb-12">
            <h2 className="font-serif text-2xl font-semibold text-[#7a1f12] mb-3">
              Bengali Year {y} BS Festivals
            </h2>
            <div className="overflow-x-auto rounded-lg border border-amber-200">
              <table className="w-full text-sm">
                <caption className="sr-only">
                  Bengali festivals and holidays for year {y} BS
                </caption>
                <thead className="bg-amber-100/60 text-[#7a1f12]">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold">
                      Festival / Holiday
                    </th>
                    <th className="text-left px-3 py-2 font-semibold">
                      Bengali Date
                    </th>
                    <th className="text-left px-3 py-2 font-semibold">
                      English Date
                    </th>
                    <th className="text-left px-3 py-2 font-semibold">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {fests.map((f) => {
                    const g = bsToGregorian(y, f.bsMonth0, f.bsDay);
                    const gDate = new Date(Date.UTC(g.y, g.m, g.d));
                    return (
                      <tr
                        key={`${y}-${f.bsMonth0}-${f.bsDay}-${f.name}`}
                        className="border-t border-amber-100 hover:bg-amber-50/40"
                      >
                        <th
                          scope="row"
                          className="text-left px-3 py-2 font-medium align-top"
                        >
                          <div className="text-[#7a1f12]">{f.name}</div>
                          {f.description && (
                            <p className="text-xs text-stone-600 mt-0.5 font-normal">
                              {f.description}
                            </p>
                          )}
                        </th>
                        <td className="px-3 py-2 align-top">
                          <Link
                            to={`/year/${y}/${monthSlug(BENGALI_MONTHS[f.bsMonth0])}`}
                            className="text-[#7a1f12] hover:underline"
                          >
                            {f.bsDay} {BENGALI_MONTHS[f.bsMonth0]}
                          </Link>
                        </td>
                        <td className="px-3 py-2 align-top text-stone-700">
                          {formatGregorian(gDate)}
                        </td>
                        <td className="px-3 py-2 align-top">
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                              f.type === "national"
                                ? "bg-rose-100 text-rose-800"
                                : f.type === "religious"
                                  ? "bg-amber-100 text-amber-800"
                                  : f.type === "cultural"
                                    ? "bg-sky-100 text-sky-800"
                                    : "bg-stone-100 text-stone-700"
                            }`}
                          >
                            {f.type}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}

      <section className="prose prose-stone max-w-none">
        <h2 className="font-serif text-2xl text-[#7a1f12]">
          About Bengali Festivals
        </h2>
        <p>
          Bengali culture has a rich calendar of festivals — religious,
          cultural and seasonal — that span the entire Bengali year. The most
          significant include <strong>Pohela Boishakh</strong> (Bengali New
          Year), the five-day <strong>Durga Puja</strong> celebrated across
          West Bengal in Ashshin, <strong>Kali Puja</strong> and{" "}
          <strong>Diwali</strong> in Kartik, and{" "}
          <strong>Saraswati Puja</strong> in Magh.
        </p>
        <p>
          Festival dates in the West Bengal Hindu Bengali calendar are set by
          tithi (lunar phases) calculated according to the traditional
          panjika, so they vary slightly from year to year in the Gregorian
          calendar. The dates listed above are based on standard panjika
          references.
        </p>
      </section>
    </Layout>
  );
}
