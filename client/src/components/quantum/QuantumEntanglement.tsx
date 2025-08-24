import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import EntangledParticles from './visualizations/EntangledParticles';

export default function QuantumEntanglement() {
  const { t } = useTranslation();

  return (
    <motion.section
      id="entanglement"
      className="min-h-screen bg-quantum-dark-800 py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      data-testid="entanglement-section"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6 quantum-glow" data-testid="entanglement-title">
            {t('sections.entanglement.title')}
          </h2>
          <p className="text-xl text-quantum-cyan mb-8" data-testid="entanglement-subtitle">
            {t('sections.entanglement.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-lg mb-8" data-testid="entanglement-instruction">
              {t('sections.entanglement.instruction')}
            </p>
          </motion.div>

          {/* Entangled Particles Visualization */}
          <EntangledParticles />

          {/* Explanation */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 mt-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-card p-6 rounded-xl border border-quantum-cyan border-opacity-30"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-quantum-cyan" data-testid="principle-title">
                {t('sections.entanglement.principle')}
              </h3>
              <p className="text-sm leading-relaxed opacity-90" data-testid="principle-description">
                {t('sections.entanglement.principleDescription')}
              </p>
            </motion.div>

            <motion.div
              className="bg-card p-6 rounded-xl border border-quantum-cyan border-opacity-30"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-quantum-cyan" data-testid="applications-title">
                {t('sections.entanglement.applications')}
              </h3>
              <p className="text-sm leading-relaxed opacity-90" data-testid="applications-description">
                {t('sections.entanglement.applicationsDescription')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
