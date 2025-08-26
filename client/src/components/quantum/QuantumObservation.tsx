import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuantumContext } from "@/contexts/QuantumContext";
import GlossaryTerm from "@/components/ui/GlossaryTerm";

export default function QuantumObservation() {
  const { t } = useTranslation();
  const { state } = useQuantumContext();
  const { isWaveCollapsed } = state;

  if (!isWaveCollapsed) return null;

  return (
    <motion.section
      id="observation"
      className="min-h-screen bg-quantum-dark-800 py-20"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring" }}
      viewport={{ once: true }}
      data-testid="observation-section"
    >
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-5xl font-bold mb-6 quantum-glow"
            data-testid="observation-title"
          >
            {t("sections.observation.title")}
          </h2>
          <p
            className="text-xl text-quantum-cyan mb-8"
            data-testid="observation-subtitle"
          >
            {t("sections.observation.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-2xl font-semibold mb-4"
              data-testid="duality-title"
            >
              <GlossaryTerm definition={t("definitions.waveParticleDuality")}>
                {t("sections.observation.content.title")}
              </GlossaryTerm>
            </h3>

            <div
              className="text-lg leading-relaxed opacity-90"
              data-testid="description-1"
            >
              {t("sections.observation.content.description1")}
            </div>

            <div
              className="text-lg leading-relaxed opacity-90"
              data-testid="description-2"
            >
              {t("sections.observation.content.description2")}
            </div>

            <motion.div
              className="bg-quantum-dark-700 p-6 rounded-xl border border-quantum-cyan border-opacity-30"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h4
                className="text-lg font-semibold mb-3 text-quantum-cyan"
                data-testid="concepts-title"
              >
                {t("sections.observation.content.concepts")}
              </h4>
              <ul className="space-y-2">
                <li data-testid="concept-1">
                  <i className="fas fa-chevron-right text-quantum-cyan mr-2" />
                  <GlossaryTerm definition={t("definitions.waveFunction")}>
                    {t("sections.observation.content.concept1")}
                  </GlossaryTerm>
                </li>
                <li data-testid="concept-2">
                  <i className="fas fa-chevron-right text-quantum-cyan mr-2" />
                  <GlossaryTerm
                    definition={t("definitions.waveFunctionCollapse")}
                  >
                    {t("sections.observation.content.concept2")}
                  </GlossaryTerm>
                </li>
                <li data-testid="concept-3">
                  <i className="fas fa-chevron-right text-quantum-cyan mr-2" />
                  {t("sections.observation.content.concept3")}
                </li>
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-96 rounded-xl bg-gradient-to-br from-quantum-dark-700 to-quantum-dark-800 border border-quantum-cyan border-opacity-30 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1, delay: 1, type: "spring" }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-32 h-32 mx-auto mb-4 relative"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-dashed border-quantum-cyan opacity-60"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <i className="fas fa-eye text-4xl text-quantum-cyan" />
                    </div>
                  </motion.div>
                  <p
                    className="text-quantum-cyan font-medium"
                    data-testid="collapsed-state"
                  >
                    {t("sections.observation.content.afterCollapse")}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
