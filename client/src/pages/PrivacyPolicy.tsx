import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  const sections =
    (t("privacyPage.sections", { returnObjects: true }) as Array<{
      title: string;
      content: string[];
    }>) || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageTitle = t("privacyPage.mainTitle");
  const pageDescription = t("seo.defaultDescription");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title={pageTitle}
        description={pageDescription}
        schema={{
          type: "article",
          data: {
            title: pageTitle,
            description: pageDescription,
            date: "2024-08-25",
          },
        }}
      />
      <Link href="/">
        <Button
          variant="ghost"
          className="fixed top-4 left-4 z-50 flex items-center space-x-2 text-quantum-cyan"
        >
          <ArrowLeft />
          <span>{t("privacyPage.backButton")}</span>
        </Button>
      </Link>

      <main className="container mx-auto px-6 py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-4 text-center quantum-glow">
            {t("privacyPage.mainTitle")}
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-center">
            {t("privacyPage.subtitle")}
          </p>

          <div className="max-w-4xl mx-auto space-y-10">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 lg:p-8 rounded-xl border border-border"
              >
                <h3 className="text-2xl font-semibold mb-4 text-quantum-cyan">
                  {section.title}
                </h3>
                <div className="prose dark:prose-invert max-w-none text-foreground/80 space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
