import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import {
  CURRENT_BS_YEAR,
  bsToGregorian,
  formatGregorian,
} from "@/lib/bengali-calendar";

export default function PoylaBoishakh() {
  const years = [CURRENT_BS_YEAR, CURRENT_BS_YEAR + 1, CURRENT_BS_YEAR + 2];
  const description = `Pohela Boishakh (Poyla Boishakh / Bengali New Year / Nababarsha) — date, traditions, history and celebration. Pohela Boishakh ${CURRENT_BS_YEAR} BS falls on ${formatGregorian(
    new Date(
      Date.UTC(
        bsToGregorian(CURRENT_BS_YEAR, 0, 1).y,
        bsToGregorian(CURRENT_BS_YEAR, 0, 1).m,
        bsToGregorian(CURRENT_BS_YEAR, 0, 1).d,
      ),
    ),
  )}.`;

  const events = years.map((y) => {
    const g = bsToGregorian(y, 0, 1);
    return {
      "@type": "Event",
      name: `Pohela Boishakh — Bengali New Year ${y} BS`,
      startDate: `${g.y}-${String(g.m + 1).padStart(2, "0")}-${String(g.d).padStart(2, "0")}`,
      description: `Bengali New Year (Nababarsha) marking the start of Bengali year ${y} BS.`,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
      location: { "@type": "Place", name: "West Bengal, Bangladesh" },
    };
  });

  return (
    <Layout>
      <Seo
        title="Pohela Boishakh (Poyla Boishakh) — Bengali New Year Date & Traditions"
        description={description}
        path="/poyla-boishakh"
        keywords="pohela boishakh, poyla boishakh, bengali new year, nababarsha, subho nababarsha, bengali new year 2026, 1 boishakh"
        jsonLd={events}
      />

      <article className="prose prose-stone max-w-none">
        <header className="not-prose mb-6">
          <h1 className="font-serif text-4xl font-bold text-[#7a1f12]">
            Pohela Boishakh — Bengali New Year (Nababarsha)
          </h1>
          <p className="text-stone-700 mt-2">
            Pohela Boishakh (also spelled Poyla Boishakh / Pôhela Boishakh) is
            the first day of the Bengali calendar year and one of the most
            widely celebrated festivals across West Bengal, Tripura, Assam and
            Bangladesh.
          </p>
        </header>

        <h2 className="font-serif text-2xl text-[#7a1f12]">
          Pohela Boishakh dates
        </h2>
        <table>
          <thead>
            <tr>
              <th>Bengali Year</th>
              <th>Pohela Boishakh date</th>
              <th>Day of week</th>
            </tr>
          </thead>
          <tbody>
            {years.map((y) => {
              const g = bsToGregorian(y, 0, 1);
              const d = new Date(Date.UTC(g.y, g.m, g.d));
              return (
                <tr key={y}>
                  <td>{y} BS</td>
                  <td>{formatGregorian(d)}</td>
                  <td>
                    {d.toLocaleDateString("en-US", {
                      weekday: "long",
                      timeZone: "UTC",
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h2 className="font-serif text-2xl text-[#7a1f12]">
          What is Pohela Boishakh?
        </h2>
        <p>
          Pohela Boishakh — literally <em>&quot;the first of Boishakh&quot;</em>{" "}
          — marks the first day of the Bengali year (Nababarsha, নববর্ষ). It
          is celebrated on <strong>14 April in Bangladesh</strong> and on{" "}
          <strong>14 or 15 April</strong> in West Bengal, Tripura and Assam,
          depending on the traditional panjika calculation. It is a public
          holiday in West Bengal, Tripura, Assam and Bangladesh.
        </p>

        <h2 className="font-serif text-2xl text-[#7a1f12]">
          History &amp; origin
        </h2>
        <p>
          The Bengali calendar is widely credited to Mughal Emperor{" "}
          <strong>Akbar</strong>, who introduced the <em>Tarikh-e-Ilahi</em> in
          the late 16th century to align tax collection with the harvest
          season. The era was set to begin from his accession year, with the
          starting epoch back-dated to <strong>593 CE</strong>. Some
          historians attribute earlier Bengali calendar reforms to King{" "}
          <strong>Shashanka</strong> of Gauda (early 7th century).
        </p>

        <h2 className="font-serif text-2xl text-[#7a1f12]">
          How it is celebrated
        </h2>
        <ul>
          <li>
            <strong>Subho Nababarsha</strong> (শুভ নববর্ষ) — &quot;Happy New
            Year&quot; greetings exchanged among family and friends.
          </li>
          <li>
            <strong>Halkhata</strong> (হালখাতা) — Bengali traders and
            shopkeepers open new account books for the new year and offer
            sweets to their customers.
          </li>
          <li>
            <strong>Mangal Shobhajatra</strong> — the iconic colourful
            procession in Dhaka, recognised by UNESCO as Intangible Cultural
            Heritage of Humanity in 2016.
          </li>
          <li>
            <strong>Prabhat Pheri</strong> — early morning processions
            featuring Rabindra Sangeet performances, especially{" "}
            <em>&quot;Esho hey Boishakh&quot;</em>.
          </li>
          <li>
            <strong>Boishakhi Mela</strong> — fairs, food stalls, music and
            cultural programmes across cities and villages.
          </li>
          <li>
            <strong>Traditional food</strong> — panta bhat (fermented rice)
            with hilsa fish, alur bhorta, and seasonal sweets.
          </li>
        </ul>

        <h2 className="font-serif text-2xl text-[#7a1f12]">Quick links</h2>
        <ul>
          <li>
            <Link to={`/year/${CURRENT_BS_YEAR}/boishakh`}>
              Boishakh {CURRENT_BS_YEAR} calendar
            </Link>
          </li>
          <li>
            <Link to={`/year/${CURRENT_BS_YEAR}`}>
              Bengali Calendar {CURRENT_BS_YEAR}
            </Link>
          </li>
          <li>
            <Link to="/festivals">All Bengali festivals &amp; holidays</Link>
          </li>
        </ul>
      </article>
    </Layout>
  );
}
