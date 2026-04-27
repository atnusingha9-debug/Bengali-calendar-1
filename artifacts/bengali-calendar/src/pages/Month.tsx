import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import CalendarGrid from "@/components/CalendarGrid";
import {
  BENGALI_MONTHS,
  BENGALI_MONTHS_BN,
  GREGORIAN_SPAN,
  bsToGregorian,
  festivalsForMonth,
  formatGregorian,
  monthSlug,
} from "@/lib/bengali-calendar";

export default function Month({
  bsYear,
  bsMonth0,
}: {
  bsYear: number;
  bsMonth0: number;
}) {
  const monthName = BENGALI_MONTHS[bsMonth0];
  const monthNameBn = BENGALI_MONTHS_BN[bsMonth0];
  const span = GREGORIAN_SPAN[bsMonth0];
  const fests = festivalsForMonth(bsYear, bsMonth0);
  const start = bsToGregorian(bsYear, bsMonth0, 1);
  const startStr = formatGregorian(
    new Date(Date.UTC(start.y, start.m, start.d)),
  );

  const description = `${monthName} ${bsYear} BS (${monthNameBn}) — Bengali Calendar for ${monthName}, ${span} ${start.y}. Complete Bangla Panjika with festivals, holidays, weekly view and Tithi for the Bengali month of ${monthName} ${bsYear}.`;

  const events = fests.map((f) => {
    const g = bsToGregorian(bsYear, bsMonth0, f.bsDay);
    return {
      "@type": "Event",
      name: f.name,
      startDate: `${g.y}-${String(g.m + 1).padStart(2, "0")}-${String(g.d).padStart(2, "0")}`,
      description: f.description ?? f.name,
      eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: "Bengal (West Bengal, Tripura, Assam, Bangladesh)",
      },
    };
  });

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
      {
        "@type": "ListItem",
        position: 3,
        name: `${monthName} ${bsYear}`,
        item: `/year/${bsYear}/${monthSlug(monthName)}`,
      },
    ],
  };

  return (
    <Layout>
      <Seo
        title={`${monthName} ${bsYear} BS — Bengali Calendar (${span} ${start.y})`}
        description={description}
        path={`/year/${bsYear}/${monthSlug(monthName)}`}
        keywords={`${monthName.toLowerCase()} ${bsYear}, bengali ${monthName.toLowerCase()} ${start.y}, ${monthName.toLowerCase()} festivals, bangla panjika ${monthName.toLowerCase()}`}
        jsonLd={[breadcrumbs, ...events]}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-stone-600 mb-3">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link to="/" className="hover:text-[#7a1f12]">Home</Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link to={`/year/${bsYear}`} className="hover:text-[#7a1f12]">
              Bengali Calendar {bsYear}
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="text-[#7a1f12] font-medium">
            {monthName} {bsYear}
          </li>
        </ol>
      </nav>

      <header className="mb-6">
        <p className="text-sm uppercase tracking-widest text-[#7a1f12]/70 font-semibold">
          Bangla Panjika · Month {bsMonth0 + 1} of 12
        </p>
        <h1 className="font-serif text-4xl font-bold text-[#7a1f12] mt-1">
          {monthName} {bsYear} BS{" "}
          <span className="text-2xl font-normal text-stone-600" lang="bn">
            ({monthNameBn})
          </span>
        </h1>
        <p className="text-stone-700 mt-2">
          {monthName} is the {ordinal(bsMonth0 + 1)} month of the Bengali
          calendar. {monthName} {bsYear} starts on{" "}
          <strong>{startStr}</strong> ({span} {start.y}) and contains{" "}
          {fests.length} listed festival{fests.length === 1 ? "" : "s"} in this
          Bangla Panjika.
        </p>
      </header>

      <CalendarGrid bsYear={bsYear} bsMonth0={bsMonth0} />

      <section className="mt-10 prose prose-stone max-w-none">
        <h2 className="font-serif text-2xl text-[#7a1f12]">
          About {monthName} ({monthNameBn})
        </h2>
        <p>{monthDescription(bsMonth0)}</p>
        <p>
          In the Bengali calendar, {monthName} corresponds to the Gregorian
          period {span}. The Sun enters the corresponding zodiacal sign at the
          start of {monthName}, and devotees observe a number of religious
          tithi and pujas through the month.
        </p>
        <h2 className="font-serif text-2xl text-[#7a1f12]">
          Other months of {bsYear} BS
        </h2>
        <ul>
          {BENGALI_MONTHS.map((m, i) => (
            <li key={m}>
              <Link
                to={`/year/${bsYear}/${monthSlug(m)}`}
                className={i === bsMonth0 ? "font-semibold text-[#7a1f12]" : ""}
              >
                {m} {bsYear}
              </Link>{" "}
              <span className="text-stone-500 text-sm">
                ({GREGORIAN_SPAN[i]})
              </span>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function monthDescription(idx: number): string {
  const descriptions = [
    "Boishakh marks the start of the Bengali year. The most important celebration is Pohela Boishakh — Bengali New Year — observed on 1 Boishakh with new year's wishes (Subho Nababarsha), traditional sweets, halkhata in Bengali businesses, and large fairs across West Bengal and Bangladesh.",
    "Joishtho falls at the height of summer. Notable observances include Jamai Shashthi, when sons-in-law are honoured by their in-laws with elaborate meals, and several important Ekadashi tithi.",
    "Asadh signals the arrival of the monsoon. The most prominent festival is Rath Yatra of Lord Jagannath at Puri, replicated by Rath festivals in Bengali neighbourhoods.",
    "Srabon is the heart of the monsoon season. Devotees observe Mondays as Shivratri Vrat. Janmashtami — the birth of Lord Krishna — is celebrated with great devotion.",
    "Bhadro is associated with the worship of the divine architect Vishwakarma in workshops, factories, and small businesses. Several pujas and Ekadashi tithi are observed.",
    "Ashshin is the most important Bengali month culturally — it contains Mahalaya, marking the start of Devi Paksha, and the grand five-day Durga Puja celebrated across Bengal with elaborate pandals, idols and cultural programmes. The month closes with Kojagari Lakshmi Puja.",
    "Kartik features Kali Puja and Diwali — the festival of lights — followed by Bhai Phonta, the Bengali brother-sister festival, and Jagaddhatri Puja in places like Chandannagar.",
    "Ogrohaeon is a relatively quiet month between the major festival cycles. Several Ekadashi tithi are observed and harvest preparations begin in rural Bengal.",
    "Poush ends with Poush Sankranti / Makar Sankranti — the harvest festival celebrated with pithe-puli (rice cakes) prepared in every Bengali home, and bathing rituals at sacred sites.",
    "Magh contains Saraswati Puja (Vasant Panchami), the worship of the goddess of knowledge, music and art — celebrated with great devotion at schools, colleges and homes across Bengal.",
    "Falgun brings the arrival of spring (Bashonto) with Dol Yatra, the Bengali festival of colours that coincides with Holi, and Maha Shivratri.",
    "Choitro is the last month of the Bengali year. It ends with Choitro Sankranti and the popular Charak Puja and Gajan festival in rural Bengal.",
  ];
  return descriptions[idx];
}
