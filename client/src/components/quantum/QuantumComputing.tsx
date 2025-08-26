import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import quantumComputerImage from "@assets/generated_images/Futuristic_quantum_computer_visualization_59e7c532.png";
import GlossaryTerm from "@/components/ui/GlossaryTerm";

export default function QuantumComputing() {
  const { t } = useTranslation();
  const [qubitsState, setQubitsState] = useState([0, 0, 0, 0]);
  const [isComputing, setIsComputing] = useState(false);

  const toggleQubit = (index: number) => {
    const newState = [...qubitsState];
    newState[index] = newState[index] === 0 ? 1 : newState[index] === 1 ? 2 : 0;
    setQubitsState(newState);
  };

  const startQuantumComputation = () => {
    setIsComputing(true);
    setTimeout(() => {
      setQubitsState([2, 2, 2, 2]);
      setTimeout(() => {
        setQubitsState([
          Math.floor(Math.random() * 2),
          Math.floor(Math.random() * 2),
          Math.floor(Math.random() * 2),
          Math.floor(Math.random() * 2),
        ]);
        setIsComputing(false);
      }, 2000);
    }, 1000);
  };

  const getQubitColor = (state: number) => {
    switch (state) {
      case 0:
        return "from-blue-500 to-cyan-400";
      case 1:
        return "from-purple-500 to-pink-400";
      case 2:
        return "from-yellow-400 via-purple-500 to-cyan-400";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getQubitSymbol = (state: number) => {
    switch (state) {
      case 0:
        return "|0⟩";
      case 1:
        return "|1⟩";
      case 2:
        return "|ψ⟩";
      default:
        return "?";
    }
  };

  return (
    <motion.section
      id="quantum-computing"
      className="min-h-screen py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      data-testid="quantum-computing-section"
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
            data-testid="quantum-computing-title"
          >
            {t("sections.computing.title")}
          </h2>
          <p
            className="text-xl quantum-subtitle-light mb-8"
            data-testid="quantum-computing-subtitle"
          >
            {t("sections.computing.subtitle")}
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
              src={quantumComputerImage}
              alt={t("sections.computing.visualizationTitle")}
              className="w-full rounded-xl shadow-2xl border border-quantum-cyan border-opacity-30"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              data-testid="quantum-computer-image"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-xl"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <h3
                className="text-2xl font-semibold mb-6 text-center"
                data-testid="quantum-processor-title"
              >
                {t("sections.computing.processorTitle")}
              </h3>

              <div className="grid grid-cols-4 gap-4 mb-8">
                {qubitsState.map((state, index) => (
                  <motion.button
                    key={index}
                    onClick={() => !isComputing && toggleQubit(index)}
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${getQubitColor(
                      state
                    )} flex items-center justify-center font-bold text-white text-lg shadow-lg hover:scale-110 transition-all duration-300 ${
                      isComputing
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }`}
                    whileHover={!isComputing ? { scale: 1.1 } : {}}
                    whileTap={!isComputing ? { scale: 1.2 } : {}}
                    animate={
                      state === 2
                        ? {
                            boxShadow: [
                              "0 0 20px rgba(255, 255, 0, 0.5)",
                              "0 0 40px rgba(255, 0, 255, 0.5)",
                              "0 0 20px rgba(0, 255, 255, 0.5)",
                            ],
                            scale: [1, 1.1, 1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 1,
                      repeat: state === 2 ? Infinity : 0,
                    }}
                    data-testid={`qubit-${index}`}
                  >
                    {getQubitSymbol(state)}
                  </motion.button>
                ))}
              </div>

              <div className="bg-card p-6 rounded-xl border border-quantum-cyan border-opacity-30 mb-6">
                <h4
                  className="text-lg font-semibold mb-4 text-quantum-cyan"
                  data-testid="quantum-gates-title"
                >
                  <GlossaryTerm definition={t("definitions.quantumGate")}>
                    {t("sections.computing.gatesTitle")}
                  </GlossaryTerm>
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {["H", "X", "Z"].map((gate) => (
                    <Button
                      key={gate}
                      onClick={() =>
                        !isComputing &&
                        setQubitsState(
                          qubitsState.map(() => Math.floor(Math.random() * 3))
                        )
                      }
                      className="h-12 bg-gradient-to-br from-quantum-cyan to-purple-500 text-white font-bold hover:scale-105 transition-all duration-300"
                      disabled={isComputing}
                      data-testid={`gate-${gate}`}
                    >
                      {gate}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={startQuantumComputation}
                  disabled={isComputing}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-quantum-cyan text-white font-bold rounded-lg hover:scale-105 transition-all duration-300 relative overflow-hidden"
                  data-testid="start-computation"
                >
                  <span className="relative z-10">
                    {isComputing
                      ? t("sections.computing.computing")
                      : t("sections.computing.startComputation")}
                  </span>
                  {isComputing && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-purple-500"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </Button>
              </div>
            </div>

            <motion.div
              className="bg-card p-6 rounded-xl border border-quantum-cyan border-opacity-30"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h4
                className="text-lg font-semibold mb-3 text-quantum-cyan"
                data-testid="quantum-advantage-title"
              >
                <GlossaryTerm definition={t("definitions.quantumAdvantage")}>
                  {t("sections.computing.quantumAdvantage")}
                </GlossaryTerm>
              </h4>
              <div
                className="text-sm leading-relaxed opacity-90"
                data-testid="quantum-advantage-description"
              >
                {t("sections.computing.advantageDescription_part1")}
                <GlossaryTerm definition={t("definitions.superposition")}>
                  {t("sections.computing.advantageDescription_term1")}
                </GlossaryTerm>
                {t("sections.computing.advantageDescription_part2")}
                <GlossaryTerm definition={t("definitions.quantumEntanglement")}>
                  {t("sections.computing.advantageDescription_term2")}
                </GlossaryTerm>
                {t("sections.computing.advantageDescription_part3")}
                <GlossaryTerm definition={t("definitions.qubit")}>
                  {t("sections.computing.advantageDescription_term3")}
                </GlossaryTerm>
                {t("sections.computing.advantageDescription_part4")}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
