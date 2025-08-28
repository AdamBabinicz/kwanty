import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

type SchemaType = "website" | "article" | "organization";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  schema?: {
    type: SchemaType;
    data?: any;
  };
  isHomePage?: boolean;
}

const siteUrl = "https://kwanty.netlify.app";
const siteName = "Kwantowy Portal: Interaktywna Eksploracja Rzeczywistości";
const defaultImage = `${siteUrl}/2.png`;
const authorName = "Adam Babinicz";
const authorProfileUrl = "https://github.com/AdamBabinicz";
const twitterHandle = "@AdamBabinicz";

export default function SEO({
  title,
  description,
  image = defaultImage,
  schema,
  isHomePage = false,
}: SEOProps) {
  const { i18n, t } = useTranslation();
  const [location] = useLocation();

  const defaultTitle = t("seo.defaultTitle");
  const defaultDescription = t("seo.defaultDescription");

  const pageTitle = title
    ? isHomePage
      ? title
      : `${title} - ${siteName}`
    : defaultTitle;
  const pageDescription = description || defaultDescription;
  const canonicalUrl = `${siteUrl}${location}`;

  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  const getOgLocale = () => {
    switch (i18n.language) {
      case "pl":
        return "pl_PL";
      case "en":
        return "en_US";
      case "fi":
        return "fi_FI";
      default:
        return "pl_PL";
    }
  };

  const generateSchema = () => {
    const schemasToGenerate: any[] = [];

    if (isHomePage || !schema) {
      schemasToGenerate.push({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        url: siteUrl,
        description: defaultDescription,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      });
    }

    schemasToGenerate.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/favicon-96x96.png`,
      sameAs: ["https://github.com/AdamBabinicz"],
      description: defaultDescription,
    });

    if (schema) {
      const { type, data } = schema;
      let specificSchemaData: any = null;

      switch (type) {
        case "article":
          specificSchemaData = {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: data.title || "",
            description: data.description || "",
            image: {
              "@type": "ImageObject",
              url: fullImageUrl,
              width: 1200,
              height: 630,
            },
            datePublished: data.date,
            dateModified: data.date,
            author: {
              "@type": "Person",
              name: authorName,
              url: authorProfileUrl,
            },
            publisher: {
              "@type": "Organization",
              name: siteName,
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/favicon-96x96.png`,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": canonicalUrl,
            },
          };
          break;
        case "organization":
          specificSchemaData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteName,
            url: siteUrl,
            logo: `${siteUrl}/favicon-96x96.png`,
            sameAs: [
              "https://github.com/AdamBabinicz",
              "https://twitter.com/AdamBabinicz",
            ],
            ...data,
          };
          break;
        case "website":
          specificSchemaData = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteName,
            url: siteUrl,
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteUrl}/?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
            ...data,
          };
          break;
      }
      if (specificSchemaData) {
        schemasToGenerate.push(specificSchemaData);
      }
    }

    if (schemasToGenerate.length === 0) return null;

    return (
      <>
        {schemasToGenerate.map((s, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}
      </>
    );
  };

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="author" content={authorName} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={isHomePage ? "website" : "article"} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={getOgLocale()} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content={twitterHandle} />

      {generateSchema()}
    </Helmet>
  );
}
