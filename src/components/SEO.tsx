import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_NAME = "Hormone Reset Diet";
const BASE_URL = "https://mediterraneanplan.com";

const SEO = ({ title, description, path = "/", jsonLd }: SEOProps) => {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${BASE_URL}${path}`;

  const jsonLdItems = jsonLd
    ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).filter(Boolean)
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {jsonLdItems.map((item, i) => (
        <script key={`ld-${i}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
