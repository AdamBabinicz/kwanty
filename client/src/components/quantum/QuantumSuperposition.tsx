import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuantumState } from "@/hooks/useQuantumState";
import QubitVisualization from "./visualizations/QubitVisualization";
import GlossaryTerm from "@/components/ui/GlossaryTerm";

export default function QuantumSuperposition() {
  const { t } = useTranslation();
  const { measurementCount, measureQubit } = useQuantumState();
  const [currentState, setCurrentState] = useState<"superposition" | 0 | 1>(
    "superposition"
  );

  const totalMeasurements = measurementCount.state0 + measurementCount.state1;
  const state0Percent =
    totalMeasurements > 0
      ? (measurementCount.state0 / totalMeasurements) * 100
      : 0;
  const state1Percent =
    totalMeasurements > 0
      ? (measurementCount.state1 / totalMeasurements) * 100
      : 0;

  const handleQubitMeasurement = () => {
    const measurement = Math.random() < 0.5 ? 0 : 1;
    setCurrentState(measurement);
    measureQubit(measurement);

    setTimeout(() => {
      setCurrentState("superposition");
    }, 3000);
  };

  return (
    <motion.section
      id="superposition"
      className="min-h-screen py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      data-testid="superposition-section"
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
            className="text-5xl font-bold mb-6 quantum-glow"
            data-testid="superposition-title"
          >
            {t("sections.superposition.title")}
          </h2>
          <p
            className="text-xl text-quantum-cyan mb-8"
            data-testid="superposition-subtitle"
          >
            {t("sections.superposition.subtitle")}
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
            <p className="text-lg mb-8" data-testid="qubit-instruction">
              {t("sections.superposition.instruction")}
            </p>

            <QubitVisualization
              currentState={currentState}
              onMeasurement={handleQubitMeasurement}
            />

            <motion.div
              className="mt-8 p-6 md:ml-10 bg-card rounded-xl border border-quantum-cyan border-opacity-30 inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3
                className="text-lg font-semibold mb-3 text-quantum-cyan"
                data-testid="qubit-state-label"
              >
                {t("sections.superposition.qubitState")}
              </h3>
              <p className="text-2xl font-bold" data-testid="state-text">
                {currentState === "superposition" &&
                  t("sections.superposition.superpositionState")}
                {currentState === 0 && t("sections.superposition.measured0")}
                {currentState === 1 && t("sections.superposition.measured1")}
              </p>
              <p
                className="mt-2 text-sm opacity-80"
                data-testid="state-description"
              >
                {currentState === "superposition" &&
                  t("sections.superposition.superpositionDescription")}
                {currentState !== "superposition" && (
                  <>
                    {t("sections.superposition.collapse_part1")}
                    {t("sections.superposition.collapse_part2")}
                    {currentState === 0
                      ? t("sections.superposition.collapse_state_base")
                      : t("sections.superposition.collapse_state_excited")}
                    .
                  </>
                )}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="bg-card p-8 rounded-xl border border-quantum-cyan border-opacity-30"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-2xl font-semibold mb-6 text-center"
              data-testid="statistics-title"
            >
              {t("sections.superposition.statistics")}
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="text-4xl font-bold text-quantum-cyan mb-2"
                  data-testid="state0-count"
                >
                  {measurementCount.state0}
                </div>
                <div className="text-lg" data-testid="state0-label">
                  {t("sections.superposition.state0")}
                </div>
                <div className="w-full bg-muted rounded-full h-4 mt-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-quantum-cyan h-4 rounded-full transition-all duration-300"
                    style={{ width: `${state0Percent}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${state0Percent}%` }}
                    transition={{ duration: 0.5 }}
                    data-testid="state0-bar"
                  />
                </div>
              </motion.div>

              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="text-4xl font-bold text-purple-400 mb-2"
                  data-testid="state1-count"
                >
                  {measurementCount.state1}
                </div>
                <div className="text-lg" data-testid="state1-label">
                  {t("sections.superposition.state1")}
                </div>
                <div className="w-full bg-muted rounded-full h-4 mt-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${state1Percent}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${state1Percent}%` }}
                    transition={{ duration: 0.5 }}
                    data-testid="state1-bar"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
