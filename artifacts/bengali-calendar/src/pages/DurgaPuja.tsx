import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import {
  CURRENT_BS_YEAR,
  bsToGregorian,
  festivalsForYear,
  formatGregorian,
} from "@/lib/bengali-calendar";

const DURGA_DAYS = [
  { name: "Mahalaya", desc: "Marks the start of Devi Paksha and the invocation of Goddess Durga." },
  { name: "Maha Shashthi", desc: "Sixth day; the goddess is welcomed with Bodhon, Amantran and Adhibas rituals." },
  { name: "Maha Saptami", desc: "Seventh day; the kola bou is bathed at dawn and the goddess is worshipped." },
  { name: "Maha Ashtami", desc: "Eighth day — Sandhi Puja, Pushpanjali and Kumari Puja, the most important day." },
  { name: "Maha Nabami", desc: "Ninth day; final aarti and the great feast (bhog) is offered." },
  { name: "Bijoya Dashami", desc: "Tenth day — Sindur Khela and the immersion (bisarjan) of the idol." },
];

export default function DurgaPuja() {
  const years = [CURRENT_BS_YEAR, CURRENT_BS_YEAR + 1];

  const description = `Durga Puja ${CURRENT_BS_YEAR} BS — the most important Bengali festival. Mahalaya, Shashthi, Saptami, Ashtami, Nabami and Bijoya Dashami dates, traditions, and complete Ashshin month panjika.`;

  const events = years.flatMap((y) =>
    festivalsForYear(y)
      .filter((f) =>
        DURGA_DAYS.some((d) => f.name.toLowerCase().includes(d.name.toLowerCase().split(" ")[0])),
      )
      .map((f) => {
        const g = bsToGregorian(y, f.bsMonth0, f.bsDay);
        return {
          "@type": "Event",
          name: `${f.name} ${y} BS`,
          startDate: `${g.y}-${String(g.m + 1).padStart(2, "0")}-${String(g.d).padStart(2, "0")}`,
          description: f.description ?? f.name,
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
          location: { "@type": "Place", name: "West Bengal, India" },
        };
      }),
  );

  return (
    <Layout>
      <Seo
        title={`Durga Puja ${CURRENT_BS_YEAR}–${CURRENT_BS_YEAR + 1} BS — Mahalaya, Shashthi, Ashtami, Nabami & Dashami Dates`}
        description={description}
        path="/durga-puja"
        keywords="durga puja, durga puja date, mahalaya date, mahasaptami, mahaashtami, mahanabami, bijoya dashami, durga puja 2026, ashshin durga puja"
        jsonLd={events}
      />

      <article className="prose prose-stone max-w-none">
        <header className="not-prose mb-6">
          <h1 className="font-serif text-4xl font-bold text-[#7a1f12]">
            Durga Puja
          </h1>
          <p className="text-stone-700 mt-2">
            Durga Puja is the largest festival of Bengal — a five-day worship
            of Goddess Durga celebrated in the month of <strong>Ashshin</strong>{" "}
            (September/October), recognised by UNESCO as Intangible Cultural
            Heritage of Humanity in 2021.
          </p>
        </header>

        {years.map((y) => {
          const fests = festivalsForYear(y).filter((f) =>
            DURGA_DAYS.some((d) =>
              f.name.toLowerCase().includes(d.name.toLowerCase().split(" ")[0]),
            ),
          );
          if (fests.length === 0) return null;
          return (
            <section key={y}>
              <h2 className="font-serif text-2xl text-[#7a1f12]">
                Durga Puja {y} BS dates
              </h2>
              <table>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>English date</th>
                    <th>Day of week</th>
                  </tr>
                </thead>
                <tbody>
                  {fests.map((f) => {
                    const g = bsToGregorian(y, f.bsMonth0, f.bsDay);
                    const d = new Date(Date.UTC(g.y, g.m, g.d));
                    return (
                      <tr key={f.name}>
                        <td>
                          <strong>{f.name}</strong>
                        </td>
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
            </section>
          );
        })}

        <h2 className="font-serif text-2xl text-[#7a1f12]">
          The five days of Durga Puja
        </h2>
        <dl>
          {DURGA_DAYS.map((d) => (
            <div key={d.name} className="mb-3">
              <dt>
                <strong>{d.name}</strong>
              </dt>
              <dd>{d.desc}</dd>
            </div>
          ))}
        </dl>

        <h2 className="font-serif text-2xl text-[#7a1f12]">
          About Durga Puja
        </h2>
        <p>
          Durga Puja celebrates the victory of Goddess Durga over the buffalo
          demon Mahishasura. In Bengal, communities erect elaborate{" "}
          <strong>pandals</strong> housing artistic clay idols of Durga
          slaying Mahishasura, flanked by her four children — Lakshmi,
          Saraswati, Kartik and Ganesh. The five days of Puja are a public
          festival of art, music, food, fashion and devotion. Schools,
          colleges and offices remain closed for several days across West
          Bengal.
        </p>

        <h2 className="font-serif text-2xl text-[#7a1f12]">
          Important rituals
        </h2>
        <ul>
          <li><strong>Bodhon</strong> — the awakening of the goddess on Shashthi.</li>
          <li><strong>Sandhi Puja</strong> — the most sacred 48 minutes spanning Ashtami and Nabami.</li>
          <li><strong>Kumari Puja</strong> — the worship of a young girl as a living embodiment of the goddess.</li>
          <li><strong>Sindur Khela</strong> — married women smear vermilion on each other on Dashami.</li>
          <li><strong>Bisarjan</strong> — immersion of the idol in a river or pond at the close of Dashami.</li>
        </ul>

        <h2 className="font-serif text-2xl text-[#7a1f12]">Related</h2>
        <ul>
          <li>
            <Link to={`/year/${CURRENT_BS_YEAR}/ashshin`}>
              Ashshin {CURRENT_BS_YEAR} — full month calendar
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
