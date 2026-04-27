import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import CalendarGrid from "@/components/CalendarGrid";
import {
  BENGALI_MONTHS,
  CURRENT_BS_YEAR,
  WEEKDAYS_FULL,
  bengaliNumeral,
  bsToGregorian,
  formatGregorian,
  monthSlug,
  todayBs,
} from "@/lib/bengali-calendar";

export default function Home() {
  const today = todayBs();
  const monthName = BENGALI_MONTHS[today.bsMonth0];

  const description = `Bengali Calendar — official Bangla Panjika for ${CURRENT_BS_YEAR} BS. Today is ${today.bsDay} ${monthName}, ${today.bsYear}. View festivals, holidays, Durga Puja and Bengali date converter for West Bengal, Tripura, Assam and Bangladesh.`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Bengali Calendar",
      alternateName: ["Bangla Calendar", "Bangla Panjika", "Bong Calendar"],
      url: "/",
      description,
      inLanguage: ["en", "bn"],
      potentialAction: {
        "@type": "SearchAction",
        target: "/date-converter?ad={ad_date}",
        "query-input": "required name=ad_date",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Bengali Calendar",
      url: "/",
      sameAs: [],
    },
  ];

  return (
    <Layout>
      <Seo
        title={`Bengali Calendar ${CURRENT_BS_YEAR} — Bangla Panjika, Festivals & Date Converter`}
        description={description}
        path="/"
        keywords="bengali calendar, bangla calendar, bangla panjika, bengali calendar 1433, durga puja 2026, bengali date converter, poyla boishakh, bengali festivals"
        jsonLd={jsonLd}
      />

      <section className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start mb-10">
        <article>
          <p className="text-sm uppercase tracking-widest text-[#7a1f12]/70 font-semibold">
            Today in the Bengali Calendar
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#7a1f12] leading-tight mt-2">
            {today.bsDay} {monthName}, {today.bsYear} BS
          </h1>
          <p className="mt-3 text-lg text-stone-700">
            {WEEKDAYS_FULL[today.gDate.getUTCDay()]},{" "}
            {formatGregorian(today.gDate)} ·{" "}
            <span lang="bn">
              {bengaliNumeral(today.bsDay)} {monthName}, {bengaliNumeral(today.bsYear)}
            </span>
          </p>
          <p className="mt-4 text-stone-700 leading-relaxed">
            Welcome to the Bengali Calendar — a free, comprehensive Bangla
            Panjika listing every Bengali date, festival and holiday for
            year <strong>{CURRENT_BS_YEAR} BS</strong>. The Bengali calendar (also
            called <em>Bangla Calendar</em>, <em>Bong Calendar</em> or{" "}
            <em>Bangla Panjika</em>) is a solar calendar followed in West
            Bengal, Tripura, Assam and Bangladesh. The current Bengali year is{" "}
            <strong>{today.bsYear} BS</strong> (Bangabda).
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to={`/year/${today.bsYear}/${monthSlug(monthName)}`}
              className="inline-flex items-center gap-2 bg-[#7a1f12] text-amber-50 px-4 py-2 rounded-md hover:bg-[#5e1409]"
            >
              View {monthName} {today.bsYear}
            </Link>
            <Link
              to="/date-converter"
              className="inline-flex items-center gap-2 bg-amber-100 text-[#7a1f12] px-4 py-2 rounded-md hover:bg-amber-200"
            >
              Bengali Date Converter
            </Link>
          </div>
        </article>
        <aside
          aria-label="Today summary"
          className="rounded-xl bg-gradient-to-br from-[#7a1f12] to-[#5e1409] text-amber-50 p-6 shadow-lg"
        >
          <h2 className="text-sm uppercase tracking-wider text-amber-200/80">
            Tithi & Day
          </h2>
          <p className="font-serif text-3xl font-semibold mt-2">
            {monthName} {today.bsDay}
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-amber-200/80">Bengali Year</dt>
            <dd className="text-right font-medium">{today.bsYear} BS</dd>
            <dt className="text-amber-200/80">Bengali Month</dt>
            <dd className="text-right font-medium">{monthName}</dd>
            <dt className="text-amber-200/80">Bengali Day</dt>
            <dd className="text-right font-medium">{today.bsDay}</dd>
            <dt className="text-amber-200/80">Weekday</dt>
            <dd className="text-right font-medium">
              {WEEKDAYS_FULL[today.gDate.getUTCDay()]}
            </dd>
            <dt className="text-amber-200/80">Gregorian</dt>
            <dd className="text-right font-medium">
              {formatGregorian(today.gDate)}
            </dd>
          </dl>
        </aside>
      </section>

      <CalendarGrid bsYear={today.bsYear} bsMonth0={today.bsMonth0} highlightedDay={today.bsDay} />

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold text-[#7a1f12] mb-4">
          All months of {CURRENT_BS_YEAR} BS
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
                    {m}
                  </span>
                  <span className="block text-sm text-stone-600 mt-1">
                    Starts {formatGregorian(new Date(Date.UTC(start.y, start.m, start.d)))}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-12 prose prose-stone max-w-none">
        <h2 className="font-serif text-2xl font-semibold text-[#7a1f12]">
          About the Bengali Calendar (Bangla Panjika)
        </h2>
        <p>
          The Bengali calendar — known as <em>Bangabda</em> (বঙ্গাব্দ) — is a
          solar calendar used by Bengali people in the Indian states of West
          Bengal, Tripura and Assam, and as the national calendar of
          Bangladesh. There are two variants: a revised calendar adopted by
          Bangladesh in 1987 and the traditional Hindu Bengali calendar
          followed in West Bengal that determines all Hindu festival dates.
          Both share the same twelve-month structure.
        </p>
        <p>
          The Bengali year is approximately <strong>594 years behind</strong>{" "}
          the Gregorian year. The new year — <strong>Pohela Boishakh</strong>{" "}
          (পয়লা বৈশাখ) — falls on April 14 or 15 each year and is celebrated as{" "}
          <em>Nababarsha</em>.
        </p>
        <h3 className="font-serif text-xl text-[#7a1f12] mt-6">
          The twelve Bengali months
        </h3>
        <ol>
          <li><strong>Boishakh (বৈশাখ)</strong> — Apr/May, contains Pohela Boishakh.</li>
          <li><strong>Joishtho (জ্যৈষ্ঠ)</strong> — May/Jun, hot summer month.</li>
          <li><strong>Asadh (আষাঢ়)</strong> — Jun/Jul, monsoon arrives.</li>
          <li><strong>Srabon (শ্রাবণ)</strong> — Jul/Aug, height of monsoon.</li>
          <li><strong>Bhadro (ভাদ্র)</strong> — Aug/Sep.</li>
          <li><strong>Ashshin (আশ্বিন)</strong> — Sep/Oct, contains Durga Puja.</li>
          <li><strong>Kartik (কার্তিক)</strong> — Oct/Nov, contains Kali Puja and Diwali.</li>
          <li><strong>Ogrohaeon (অগ্রহায়ণ)</strong> — Nov/Dec.</li>
          <li><strong>Poush (পৌষ)</strong> — Dec/Jan, contains Poush Sankranti.</li>
          <li><strong>Magh (মাঘ)</strong> — Jan/Feb, contains Saraswati Puja.</li>
          <li><strong>Falgun (ফাল্গুন)</strong> — Feb/Mar, contains Holi/Dol Yatra.</li>
          <li><strong>Choitro (চৈত্র)</strong> — Mar/Apr, ends with Choitro Sankranti.</li>
        </ol>
      </section>
    </Layout>
  );
}
