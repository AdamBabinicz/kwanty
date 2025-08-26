import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

// Typy schematów odpowiednie dla tej strony.
type SchemaType = "website" | "article";

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

// Stałe dopasowane do projektu "Kwantowy Portal"
const siteUrl = "https://kwantowy-portal.netlify.app"; // Zmień na swój docelowy URL
const siteName = "Kwantowy Portal: Interaktywna Eksploracja Rzeczywistości";
const defaultImage = `${siteUrl}/quantum-portal-og.png`; // Ważne: Stwórz ten plik i umieść go w folderze /public
const authorName = "Adam Babinicz";
const authorProfileUrl = "https://github.com/AdamBabinicz";
const twitterHandle = "@AdamBabinicz"; // Opcjonalnie: Twój uchwyt na Twitterze/X

export default function SEO({
  title,
  description,
  image = defaultImage,
  schema,
  isHomePage = false,
}: SEOProps) {
  const { i18n, t } = useTranslation();
  const [location] = useLocation();

  // Te klucze muszą istnieć w plikach z tłumaczeniami (patrz Krok 3 wdrożenia).
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
    if (!schema) return null;

    let schemaData: any = null;
    const { type, data } = schema;

    switch (type) {
      case "website":
        schemaData = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          url: siteUrl,
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl}/?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        };
        break;

      case "article":
        schemaData = {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: data.title || "",
          description: data.description || "",
          image: fullImageUrl,
          datePublished: data.date, // np. "2024-08-25"
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
              url: `${siteUrl}/favicon-96x96.png`, // Używamy istniejącego favikona
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonicalUrl,
          },
        };
        break;
    }

    if (!schemaData) return null;

    return (
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    );
  };

  return (
    <Helmet>
      {/* --- Podstawowe Tagi --- */}
      <html lang={i18n.language} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="author" content={authorName} />
      <link rel="canonical" href={canonicalUrl} />

      {/* --- Open Graph (Facebook, etc.) --- */}
      <meta property="og:type" content={isHomePage ? "website" : "article"} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={getOgLocale()} />

      {/* --- Twitter --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* --- Schema.org (JSON-LD) --- */}
      {generateSchema()}
    </Helmet>
  );
}
