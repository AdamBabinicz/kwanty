import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import UncertaintyMeter from './visualizations/UncertaintyMeter';

export default function QuantumUncertainty() {
  const { t } = useTranslation();

  return (
    <motion.section
      id="uncertainty"
      className="min-h-screen py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      data-testid="uncertainty-section"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6 quantum-glow" data-testid="uncertainty-title">
            {t('sections.uncertainty.title')}
          </h2>
          <p className="text-xl text-quantum-cyan mb-8" data-testid="uncertainty-subtitle">
            {t('sections.uncertainty.subtitle')}
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
            <p className="text-lg mb-8" data-testid="uncertainty-instruction">
              {t('sections.uncertainty.instruction')}
            </p>
          </motion.div>

          {/* Heisenberg Meter */}
          <UncertaintyMeter />

          {/* Explanation */}
          <motion.div
            className="mt-8 bg-card p-6 rounded-xl border border-quantum-cyan border-opacity-30"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-quantum-cyan" data-testid="limitation-title">
              {t('sections.uncertainty.limitation')}
            </h3>
            <p className="leading-relaxed opacity-90" data-testid="limitation-description">
              {t('sections.uncertainty.limitationDescription')}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
