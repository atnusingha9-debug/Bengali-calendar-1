import { Helmet } from "react-helmet-async";

export type SeoProps = {
  title: string;
  description: string;
  path: string;
  canonical?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  keywords?: string;
};

const SITE_URL =
  typeof window !== "undefined" && window.location?.origin
    ? window.location.origin
    : "https://bengali-calendar.example.com";

export default function Seo({
  title,
  description,
  path,
  canonical,
  jsonLd,
  keywords,
}: SeoProps) {
  const fullTitle = title.includes("Bengali Calendar")
    ? title
    : `${title} | Bengali Calendar`;
  const url =
    canonical ?? `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const ld = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Bengali Calendar" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ld.map((obj, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
}
