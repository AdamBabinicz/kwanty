import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import schrodingerImage from "@assets/generated_images/Schrödinger's_cat_superposition_paradox_ae58c587.avif";
import GlossaryTerm from "@/components/ui/GlossaryTerm";

export default function SchrodingerSection() {
  const { t } = useTranslation();
  const [boxState, setBoxState] = useState<
    "closed" | "opening" | "alive" | "dead"
  >("closed");
  const [measurementHistory, setMeasurementHistory] = useState<
    ("alive" | "dead")[]
  >([]);

  const openBox = () => {
    setBoxState("opening");

    setTimeout(() => {
      const outcome = Math.random() > 0.5 ? "alive" : "dead";
      setBoxState(outcome);
      setMeasurementHistory((prev) => [...prev, outcome]);

      setTimeout(() => {
        setBoxState("closed");
      }, 3000);
    }, 2000);
  };

  const aliveCount = measurementHistory.filter((m) => m === "alive").length;
  const deadCount = measurementHistory.filter((m) => m === "dead").length;
  const totalMeasurements = measurementHistory.length;

  return (
    <motion.section
      id="schrodinger"
      className="min-h-screen py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      data-testid="schrodinger-section"
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
            className="text-3xl md:text-5xl font-bold mb-6 quantum-glow"
            data-testid="schrodinger-title"
          >
            {t("sections.schrodinger.title")}
          </h2>
          <p
            className="text-xl text-quantum-cyan mb-8"
            data-testid="schrodinger-subtitle"
          >
            {t("sections.schrodinger.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={schrodingerImage}
              alt="Schrödinger's Cat Paradox"
              className="w-full rounded-xl shadow-2xl border border-quantum-cyan border-opacity-30"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              data-testid="schrodinger-image"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-20 rounded-xl"
              animate={{
                opacity: boxState === "closed" ? [0.2, 0.4, 0.2] : 0.2,
              }}
              transition={{
                duration: 2,
                repeat: boxState === "closed" ? Infinity : 0,
              }}
            />
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.div
                className={`relative w-80 h-80 mx-auto rounded-xl border-4 transition-all duration-500 ${
                  boxState === "closed"
                    ? "border-dashed border-quantum-cyan border-opacity-50 bg-card"
                    : boxState === "opening"
                    ? "border-solid border-yellow-400 bg-yellow-400 bg-opacity-20"
                    : boxState === "alive"
                    ? "border-solid border-green-400 bg-green-400 bg-opacity-20"
                    : "border-solid border-red-400 bg-red-400 bg-opacity-20"
                }`}
                animate={
                  boxState === "opening"
                    ? { scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  repeat: boxState === "opening" ? Infinity : 0,
                }}
                data-testid="quantum-box"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {boxState === "closed" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                      >
                        <motion.i
                          className="fas fa-cube text-6xl text-quantum-cyan mb-4"
                          animate={{ rotateY: [0, 360], scale: [1, 1.1, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        <p className="text-lg font-bold">
                          <GlossaryTerm
                            definition={t("definitions.superposition")}
                          >
                            {t("sections.schrodinger.boxStateSuperposition")}
                          </GlossaryTerm>
                        </p>
                        <p className="text-sm opacity-70">
                          {t("sections.schrodinger.boxStateDescription")}
                        </p>
                      </motion.div>
                    )}

                    {boxState === "opening" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                      >
                        <motion.i
                          className="fas fa-magic text-6xl text-yellow-400 mb-4"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <p className="text-lg font-bold">
                          {t("sections.schrodinger.boxStateMeasuring")}
                        </p>
                      </motion.div>
                    )}

                    {boxState === "alive" && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                      >
                        <motion.i
                          className="fas fa-heart text-6xl text-green-400 mb-4"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.5, repeat: 3 }}
                        />
                        <p className="text-lg font-bold text-green-400">
                          {t("sections.schrodinger.boxStateAlive")}
                        </p>
                      </motion.div>
                    )}

                    {boxState === "dead" && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                      >
                        <motion.i
                          className="fas fa-skull text-6xl text-red-400 mb-4"
                          animate={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5, repeat: 2 }}
                        />
                        <p className="text-lg font-bold text-red-400">
                          {t("sections.schrodinger.boxStateDead")}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            <div className="text-center">
              <Button
                onClick={openBox}
                disabled={boxState !== "closed"}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-quantum-cyan text-white font-bold rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="measure-button"
              >
                {boxState === "closed"
                  ? t("sections.schrodinger.buttonOpen")
                  : t("sections.schrodinger.buttonMeasuring")}
              </Button>
            </div>

            {totalMeasurements > 0 && (
              <motion.div
                className="bg-card p-6 rounded-xl border border-quantum-cyan border-opacity-30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-center text-quantum-cyan">
                  {t("sections.schrodinger.statsTitle")} ({totalMeasurements}{" "}
                  {t("sections.schrodinger.statsTotal")})
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold text-green-400 mb-1"
                      data-testid="alive-count"
                    >
                      {aliveCount}
                    </div>
                    <div className="text-sm">
                      {t("sections.schrodinger.statsAlive")}
                    </div>
                    <div className="text-xs opacity-70">
                      {totalMeasurements > 0
                        ? Math.round((aliveCount / totalMeasurements) * 100)
                        : 0}
                      %
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold text-red-400 mb-1"
                      data-testid="dead-count"
                    >
                      {deadCount}
                    </div>
                    <div className="text-sm">
                      {t("sections.schrodinger.statsDead")}
                    </div>
                    <div className="text-xs opacity-70">
                      {totalMeasurements > 0
                        ? Math.round((deadCount / totalMeasurements) * 100)
                        : 0}
                      %
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              className="bg-card p-6 rounded-xl border border-quantum-cyan border-opacity-30"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-3 text-quantum-cyan">
                {t("sections.schrodinger.paradoxTitle")}
              </h3>
              <div className="text-sm leading-relaxed opacity-90">
                {t("sections.schrodinger.paradoxDescription_part1")}
                <GlossaryTerm definition={t("definitions.superposition")}>
                  {t("sections.schrodinger.paradoxDescription_term1")}
                </GlossaryTerm>
                {t("sections.schrodinger.paradoxDescription_part2")}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
