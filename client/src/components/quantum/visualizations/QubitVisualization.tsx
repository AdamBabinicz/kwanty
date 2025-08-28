import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface QubitVisualizationProps {
  currentState: "superposition" | 0 | 1;
  onMeasurement: () => void;
}

export default function QubitVisualization({
  currentState,
  onMeasurement,
}: QubitVisualizationProps) {
  const { t } = useTranslation();

  const getQubitBackground = () => {
    switch (currentState) {
      case 0:
        return "linear-gradient(135deg, #3B82F6, #64FFDA)";
      case 1:
        return "linear-gradient(135deg, #A855F7, #EC4899)";
      default:
        return "linear-gradient(135deg, #A855F7, #3B82F6, #64FFDA)";
    }
  };

  const getStateDisplay = () => {
    switch (currentState) {
      case 0:
        return "|0⟩";
      case 1:
        return "|1⟩";
      default:
        return "|ψ⟩";
    }
  };

  return (
    <div className="relative inline-block">
      <Button
        onClick={onMeasurement}
        className="relative w-48 h-48 rounded-full animate-pulse-glow hover:scale-105 transition-all duration-300 group p-0 border-0"
        style={{ background: getQubitBackground() }}
        data-testid="quantum-qubit"
      >
        {/* Orbital Rings */}
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-white border-opacity-30"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-8 rounded-full border border-white border-opacity-50"
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* State Display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-3xl font-bold text-white group-hover:scale-110 transition-transform"
            key={currentState}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.5, type: "spring" }}
            data-testid="qubit-state-display"
          >
            {getStateDisplay()}
          </motion.span>
        </div>

        {/* Measurement Effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-quantum-cyan opacity-0 scale-150"
          animate={
            currentState !== "superposition"
              ? {
                  opacity: [0, 1, 0],
                  scale: [1.5, 1, 1.5],
                }
              : {}
          }
          transition={{ duration: 0.5 }}
          data-testid="measurement-ring"
        />
      </Button>
    </div>
  );
}
