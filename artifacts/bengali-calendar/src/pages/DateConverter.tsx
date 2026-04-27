import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import {
  BENGALI_MONTHS,
  bengaliNumeral,
  bsToGregorian,
  formatGregorian,
  gregorianToBs,
  monthSlug,
  todayBs,
  WEEKDAYS_FULL,
} from "@/lib/bengali-calendar";

const AD_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function DateConverter() {
  const today = todayBs();

  const [adYear, setAdYear] = useState(today.gDate.getUTCFullYear());
  const [adMonth, setAdMonth] = useState(today.gDate.getUTCMonth());
  const [adDay, setAdDay] = useState(today.gDate.getUTCDate());

  const [bsYear, setBsYear] = useState(today.bsYear);
  const [bsMonth0, setBsMonth0] = useState(today.bsMonth0);
  const [bsDay, setBsDay] = useState(today.bsDay);

  const adToBs = useMemo(() => gregorianToBs(adYear, adMonth, adDay), [
    adYear,
    adMonth,
    adDay,
  ]);

  const bsToAd = useMemo(() => bsToGregorian(bsYear, bsMonth0, bsDay), [
    bsYear,
    bsMonth0,
    bsDay,
  ]);
  const bsToAdDate = new Date(Date.UTC(bsToAd.y, bsToAd.m, bsToAd.d));

  const description =
    "Free Bengali date converter — convert any English (Gregorian) date to Bengali (BS) and any Bengali date to English. Useful for finding Bengali New Year dates, Durga Puja dates, birthdays and important Tithi.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Bengali Date Converter",
    applicationCategory: "Utility",
    operatingSystem: "Web",
    description,
    url: "/date-converter",
  };

  return (
    <Layout>
      <Seo
        title="Bengali Date Converter — BS ↔ AD (Bengali ↔ English Date)"
        description={description}
        path="/date-converter"
        keywords="bengali date converter, bangla date converter, english to bengali date, bs to ad converter, ad to bs converter, bangabda calculator"
        jsonLd={jsonLd}
      />

      <header className="mb-6">
        <h1 className="font-serif text-4xl font-bold text-[#7a1f12]">
          Bengali Date Converter
        </h1>
        <p className="text-stone-700 mt-2">
          Convert between English (Gregorian / AD) dates and Bengali (Bangabda
          / BS) dates instantly. The current Bengali year is{" "}
          <strong>{today.bsYear} BS</strong>.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-6">
        <section
          aria-label="English to Bengali"
          className="bg-white border border-amber-200 rounded-xl shadow-sm p-6"
        >
          <h2 className="font-serif text-2xl text-[#7a1f12]">
            English → Bengali
          </h2>
          <p className="text-sm text-stone-600 mb-4">
            Enter a Gregorian date to convert to Bengali (BS).
          </p>
          <fieldset className="grid grid-cols-3 gap-2">
            <legend className="sr-only">English date</legend>
            <label className="text-sm">
              <span className="block text-xs text-stone-500 mb-1">Day</span>
              <input
                type="number"
                min={1}
                max={31}
                value={adDay}
                onChange={(e) => setAdDay(parseInt(e.target.value || "1", 10))}
                className="w-full rounded border border-stone-300 px-3 py-2 focus:border-[#7a1f12] outline-none"
              />
            </label>
            <label className="text-sm">
              <span className="block text-xs text-stone-500 mb-1">Month</span>
              <select
                value={adMonth}
                onChange={(e) => setAdMonth(parseInt(e.target.value, 10))}
                className="w-full rounded border border-stone-300 px-3 py-2 focus:border-[#7a1f12] outline-none"
              >
                {AD_MONTHS.map((m, i) => (
                  <option key={m} value={i}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="block text-xs text-stone-500 mb-1">Year</span>
              <input
                type="number"
                min={1900}
                max={2100}
                value={adYear}
                onChange={(e) =>
                  setAdYear(parseInt(e.target.value || "2026", 10))
                }
                className="w-full rounded border border-stone-300 px-3 py-2 focus:border-[#7a1f12] outline-none"
              />
            </label>
          </fieldset>
          <div className="mt-5 rounded-lg bg-amber-50 border border-amber-200 p-4">
            <p className="text-sm text-stone-600">Bengali date:</p>
            <p className="font-serif text-2xl font-bold text-[#7a1f12] mt-1">
              {adToBs.bsDay} {BENGALI_MONTHS[adToBs.bsMonth0]}, {adToBs.bsYear}{" "}
              BS
            </p>
            <p className="text-sm text-stone-600 mt-1" lang="bn">
              {bengaliNumeral(adToBs.bsDay)} {BENGALI_MONTHS[adToBs.bsMonth0]},{" "}
              {bengaliNumeral(adToBs.bsYear)}
            </p>
            <Link
              to={`/year/${adToBs.bsYear}/${monthSlug(BENGALI_MONTHS[adToBs.bsMonth0])}`}
              className="inline-block mt-3 text-[#7a1f12] hover:underline text-sm"
            >
              View {BENGALI_MONTHS[adToBs.bsMonth0]} {adToBs.bsYear} calendar →
            </Link>
          </div>
        </section>

        <section
          aria-label="Bengali to English"
          className="bg-white border border-amber-200 rounded-xl shadow-sm p-6"
        >
          <h2 className="font-serif text-2xl text-[#7a1f12]">
            Bengali → English
          </h2>
          <p className="text-sm text-stone-600 mb-4">
            Enter a Bengali date to convert to Gregorian (AD).
          </p>
          <fieldset className="grid grid-cols-3 gap-2">
            <legend className="sr-only">Bengali date</legend>
            <label className="text-sm">
              <span className="block text-xs text-stone-500 mb-1">Day</span>
              <input
                type="number"
                min={1}
                max={32}
                value={bsDay}
                onChange={(e) => setBsDay(parseInt(e.target.value || "1", 10))}
                className="w-full rounded border border-stone-300 px-3 py-2 focus:border-[#7a1f12] outline-none"
              />
            </label>
            <label className="text-sm">
              <span className="block text-xs text-stone-500 mb-1">Month</span>
              <select
                value={bsMonth0}
                onChange={(e) => setBsMonth0(parseInt(e.target.value, 10))}
                className="w-full rounded border border-stone-300 px-3 py-2 focus:border-[#7a1f12] outline-none"
              >
                {BENGALI_MONTHS.map((m, i) => (
                  <option key={m} value={i}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="block text-xs text-stone-500 mb-1">Year</span>
              <input
                type="number"
                min={1300}
                max={1500}
                value={bsYear}
                onChange={(e) =>
                  setBsYear(parseInt(e.target.value || "1433", 10))
                }
                className="w-full rounded border border-stone-300 px-3 py-2 focus:border-[#7a1f12] outline-none"
              />
            </label>
          </fieldset>
          <div className="mt-5 rounded-lg bg-amber-50 border border-amber-200 p-4">
            <p className="text-sm text-stone-600">Gregorian date:</p>
            <p className="font-serif text-2xl font-bold text-[#7a1f12] mt-1">
              {formatGregorian(bsToAdDate)}
            </p>
            <p className="text-sm text-stone-600 mt-1">
              {WEEKDAYS_FULL[bsToAdDate.getUTCDay()]}
            </p>
          </div>
        </section>
      </div>

      <section className="mt-10 prose prose-stone max-w-none">
        <h2 className="font-serif text-2xl text-[#7a1f12]">
          How the Bengali Date Converter works
        </h2>
        <p>
          The Bengali Calendar (Bangabda) is a solar calendar that begins each
          year on Pohela Boishakh — usually 14 or 15 April in the Gregorian
          calendar. The Bengali year is approximately{" "}
          <strong>594 years behind</strong> the Gregorian year. To convert a
          Gregorian date to Bengali, our converter finds the most recent
          Pohela Boishakh and counts days forward through the twelve Bengali
          months. To convert Bengali to Gregorian, the process is reversed.
        </p>
        <h3 className="font-serif text-xl text-[#7a1f12]">
          Tip: Find the Bengali date for any birthday
        </h3>
        <p>
          Enter your English birthday above to see your Bengali date of birth.
          You can also enter a Bengali date — like 1 Boishakh, 1433 — to learn
          the corresponding English date.
        </p>
      </section>
    </Layout>
  );
}
