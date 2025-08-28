// SEO.tsx
import React from "react";
import { Helmet } from "react-helmet-async";
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
  const [location] = useLocation();

  // --- Twarde wartości dla prerender ---
  const defaultTitle =
    "Kwantowy Portal: Interaktywna Eksploracja Rzeczywistości";
  const defaultDescription =
    "Portal o fizyce kwantowej, nauce i interaktywnych eksploracjach rzeczywistości.";

  const pageTitle = title
    ? isHomePage
      ? title
      : `${title} - ${siteName}`
    : defaultTitle;

  const pageDescription = description || defaultDescription;
  const canonicalUrl = `${siteUrl}${location}`;
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  const getOgLocale = () => "pl_PL"; // prosty statyczny język dla prerender

  // --- Generowanie JSON-LD ---
  const generateSchemaJSON = () => {
    const schemas: any[] = [];

    // WebSite schema
    if (isHomePage || !schema) {
      schemas.push({
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

    // Organization schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/favicon-96x96.png`,
        width: 96,
        height: 96,
      },
      sameAs: [
        "https://github.com/AdamBabinicz",
        "https://twitter.com/AdamBabinicz",
      ],
      description: defaultDescription,
    });

    // Specyficzne schema dla strony
    if (schema) {
      const { type, data } = schema;
      let specificSchema: any = null;

      switch (type) {
        case "article":
          specificSchema = {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: data.title || pageTitle,
            description: data.description || pageDescription,
            image: {
              "@type": "ImageObject",
              url: fullImageUrl,
              width: 1200,
              height: 630,
            },
            datePublished: data.date || new Date().toISOString(),
            dateModified: data.date || new Date().toISOString(),
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
                width: 96,
                height: 96,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": canonicalUrl,
            },
          };
          break;

        case "organization":
          specificSchema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteName,
            url: siteUrl,
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl}/favicon-96x96.png`,
              width: 96,
              height: 96,
            },
            sameAs: [
              "https://github.com/AdamBabinicz",
              "https://twitter.com/AdamBabinicz",
            ],
            ...data,
          };
          break;

        case "website":
          specificSchema = {
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

      if (specificSchema) schemas.push(specificSchema);
    }

    return JSON.stringify(schemas, null, 2);
  };

  return (
    <Helmet>
      <html lang="pl" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="author" content={authorName} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={isHomePage ? "website" : "article"} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={getOgLocale()} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content={twitterHandle} />

      {/* JSON-LD schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateSchemaJSON() }}
      />
    </Helmet>
  );
}
