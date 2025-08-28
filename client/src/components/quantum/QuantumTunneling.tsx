import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import TunnelingAnimation from "./visualizations/TunnelingAnimation";
import GlossaryTerm from "@/components/ui/GlossaryTerm";

export default function QuantumTunneling() {
  const { t } = useTranslation();

  return (
    <motion.section
      id="tunneling"
      className="min-h-screen bg-quantum-dark-800 py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      data-testid="tunneling-section"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 quantum-glow"
            data-testid="tunneling-title"
          >
            {t("sections.tunneling.title")}
          </h2>
          <p
            className="text-xl text-quantum-cyan mb-8"
            data-testid="tunneling-subtitle"
          >
            {t("sections.tunneling.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-lg mb-8" data-testid="tunneling-instruction">
              {t("sections.tunneling.instruction")}
            </p>
          </motion.div>

          <TunnelingAnimation />

          <motion.div
            className="mt-8 bg-card p-6 rounded-xl border border-quantum-cyan border-opacity-30"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <h3
              className="text-xl font-semibold mb-4 text-quantum-cyan"
              data-testid="tunneling-effect-title"
            >
              {t("sections.tunneling.tunnelingEffect")}
            </h3>
            <div
              className="leading-relaxed opacity-90"
              data-testid="tunneling-effect-description"
            >
              <GlossaryTerm definition={t("definitions.quantumTunneling")}>
                {t("sections.tunneling.tunnelingDescription_part1")}
              </GlossaryTerm>
              {t("sections.tunneling.tunnelingDescription_part2")}
              <GlossaryTerm definition={t("definitions.potentialBarrier")}>
                {t("sections.tunneling.tunnelingDescription_term1")}
              </GlossaryTerm>
              {t("sections.tunneling.tunnelingDescription_part3")}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
