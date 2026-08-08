import { Helmet } from "react-helmet-async";
import { site } from "../data/site";

type SEOProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
};

export default function SEO({ title, description, path, image, jsonLd, noindex }: SEOProps) {
  const fullTitle = title === site.name ? title : `${title} | ${site.name}`;
  const url = `${site.domain}${path}`;
  const ogImage = image ?? `${site.domain}/og-image.png`;
  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {ldArray.map((entry, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  );
}
