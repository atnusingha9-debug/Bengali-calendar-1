import Layout from "@/components/Layout";
import Seo from "@/components/Seo";

export default function About() {
  const description =
    "About the Bengali Calendar (Bangla Panjika) — its history, the Hindu West-Bengal panjika and the revised Bangladesh national calendar, the twelve months, six seasons and how Bengali dates are calculated.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "About the Bengali Calendar (Bangla Panjika)",
    description,
    author: { "@type": "Organization", name: "Bengali Calendar" },
    inLanguage: "en",
    mainEntityOfPage: "/about",
  };

  return (
    <Layout>
      <Seo
        title="About the Bengali Calendar — Bangla Panjika History & Structure"
        description={description}
        path="/about"
        keywords="bengali calendar history, bangabda, bangla panjika, bengali calendar months, bengali seasons, bangladesh national calendar"
        jsonLd={jsonLd}
      />

      <article className="prose prose-stone max-w-none">
        <h1 className="font-serif text-4xl font-bold text-[#7a1f12]">
          About the Bengali Calendar
        </h1>
        <p>
          The <strong>Bengali Calendar</strong> — known as <em>Bangabda</em>{" "}
          (বঙ্গাব্দ), <em>Bangla Sôn</em> or <em>Bangla Sal</em> — is a solar
          calendar used in the Bengal region. A revised version is the
          national and official calendar of Bangladesh, while the traditional
          Hindu Bengali calendar (Bangla Panjika) is followed by Bengali
          Hindus in the Indian states of <strong>West Bengal</strong>,{" "}
          <strong>Tripura</strong> and <strong>Assam</strong> to set Hindu
          festival dates.
        </p>
        <p>
          The Bengali era has a zero year that begins around{" "}
          <strong>593–594 CE</strong>. The Bengali year is therefore roughly{" "}
          <strong>594 less</strong> than the Gregorian year before Pohela
          Boishakh, and 593 less after.
        </p>

        <h2 className="font-serif text-2xl text-[#7a1f12]">
          The two Bengali calendars
        </h2>
        <h3 className="font-serif text-xl text-[#7a1f12]">
          Hindu Bengali Calendar (West Bengal, Tripura, Assam)
        </h3>
        <p>
          This is the traditional <em>Surya Siddhanta</em> based calendar
          followed by Bengali Hindus. Months begin with the Sun&apos;s entry
          (sankranti) into a new zodiacal sign and can range from 29 to 32
          days. All Hindu festival dates — Durga Puja, Kali Puja, Saraswati
          Puja and others — are determined by this panjika using lunar tithi
          calculations.
        </p>
        <h3 className="font-serif text-xl text-[#7a1f12]">
          Revised Bangladesh National Calendar
        </h3>
        <p>
          A reformed version was adopted in Bangladesh in <strong>1987</strong>
          , and further amended in <strong>2018</strong>. In this version, the
          first six months have 31 days each, the next five have 30 days, and
          Falgun is 29 or 30 days. The reformed calendar fixes Pohela Boishakh
          on <strong>14 April</strong> every year in Bangladesh.
        </p>

        <h2 className="font-serif text-2xl text-[#7a1f12]">
          The twelve Bengali months
        </h2>
        <ol>
          <li>Boishakh — বৈশাখ (Apr/May)</li>
          <li>Joishtho — জ্যৈষ্ঠ (May/Jun)</li>
          <li>Asadh — আষাঢ় (Jun/Jul)</li>
          <li>Srabon — শ্রাবণ (Jul/Aug)</li>
          <li>Bhadro — ভাদ্র (Aug/Sep)</li>
          <li>Ashshin — আশ্বিন (Sep/Oct)</li>
          <li>Kartik — কার্তিক (Oct/Nov)</li>
          <li>Ogrohaeon — অগ্রহায়ণ (Nov/Dec)</li>
          <li>Poush — পৌষ (Dec/Jan)</li>
          <li>Magh — মাঘ (Jan/Feb)</li>
          <li>Falgun — ফাল্গুন (Feb/Mar)</li>
          <li>Choitro — চৈত্র (Mar/Apr)</li>
        </ol>

        <h2 className="font-serif text-2xl text-[#7a1f12]">
          The six Bengali seasons (Ritu)
        </h2>
        <ul>
          <li><strong>Grishmo</strong> (গ্রীষ্ম) — Summer · Boishakh, Joishtho</li>
          <li><strong>Borsha</strong> (বর্ষা) — Monsoon · Asadh, Srabon</li>
          <li><strong>Sharat</strong> (শরৎ) — Autumn · Bhadro, Ashshin</li>
          <li><strong>Hemonto</strong> (হেমন্ত) — Late Autumn · Kartik, Ogrohaeon</li>
          <li><strong>Sheet</strong> (শীত) — Winter · Poush, Magh</li>
          <li><strong>Bashonto</strong> (বসন্ত) — Spring · Falgun, Choitro</li>
        </ul>

        <h2 className="font-serif text-2xl text-[#7a1f12]">About this site</h2>
        <p>
          This is a free Bengali Calendar reference. It is not affiliated
          with any government or religious body. Festival dates and Bengali
          dates are computed using standard panjika reference data and are
          intended for general use.
        </p>
      </article>
    </Layout>
  );
}
