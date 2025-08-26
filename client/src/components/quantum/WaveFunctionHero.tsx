import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuantumState } from "@/hooks/useQuantumState";
import { Button } from "@/components/ui/button";

export default function WaveFunctionHero() {
  const { t } = useTranslation();
  const { isWaveCollapsed, collapseWave } = useQuantumState();

  const handleWaveCollapse = () => {
    collapseWave();
    setTimeout(() => {
      const observationSection = document.getElementById("observation");
      if (observationSection) {
        observationSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isWaveCollapsed && (
        // KLUCZOWA ZMIANA 1: Cała sekcja ignoruje kliknięcia...
        <motion.section
          id="hero"
          className="min-h-screen flex items-center justify-center relative overflow-hidden wave-function pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          role="banner"
          aria-label="Główna sekcja portalu kwantowego"
          data-testid="hero-section"
        >
          <div className="absolute inset-0" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="particle-system"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 20}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 30, -20, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <motion.div
            className="text-center z-10 max-w-4xl mx-auto px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-8 quantum-glow animate-float"
              role="heading"
              aria-level={1}
              data-testid="hero-title"
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-12 text-quantum-cyan opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 1, delay: 1 }}
              data-testid="hero-subtitle"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              className="relative w-80 h-80 mx-auto mb-12"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 1.5, type: "spring" }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-quantum-cyan border-opacity-30"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border border-quantum-cyan border-opacity-50"
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-8 rounded-full border border-quantum-cyan border-opacity-70"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-quantum-cyan to-quantum-blue animate-pulse-glow flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                >
                  <i className="fas fa-wave-square text-4xl text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* KLUCZOWA ZMIANA 2: ... z wyjątkiem tego jednego elementu, który je akceptuje */}
            <motion.div
              className="pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              <Button
                onClick={handleWaveCollapse}
                className="px-8 py-4 bg-transparent border-2 border-quantum-cyan text-quantum-cyan hover:bg-quantum-cyan hover:text-background transition-all duration-300 rounded-full font-semibold text-lg"
                data-testid="collapse-wave-button"
              >
                <span className="mr-2">{t("hero.measureReality")}</span>
                <i className="fas fa-arrow-down" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
