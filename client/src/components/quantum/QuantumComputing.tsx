import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import quantumComputerImage from '@assets/generated_images/Futuristic_quantum_computer_visualization_59e7c532.png';

export default function QuantumComputing() {
  const { t } = useTranslation();
  const [qubitsState, setQubitsState] = useState([0, 0, 0, 0]);
  const [isComputing, setIsComputing] = useState(false);

  const toggleQubit = (index: number) => {
    const newState = [...qubitsState];
    newState[index] = newState[index] === 0 ? 1 : newState[index] === 1 ? 2 : 0; // 0: |0⟩, 1: |1⟩, 2: superposition
    setQubitsState(newState);
  };

  const startQuantumComputation = () => {
    setIsComputing(true);
    // Simulate quantum computation
    setTimeout(() => {
      setQubitsState([2, 2, 2, 2]); // All in superposition
      setTimeout(() => {
        setQubitsState([Math.floor(Math.random() * 2), Math.floor(Math.random() * 2), Math.floor(Math.random() * 2), Math.floor(Math.random() * 2)]);
        setIsComputing(false);
      }, 2000);
    }, 1000);
  };

  const getQubitColor = (state: number) => {
    switch (state) {
      case 0: return 'from-blue-500 to-cyan-400';
      case 1: return 'from-purple-500 to-pink-400';
      case 2: return 'from-yellow-400 via-purple-500 to-cyan-400';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getQubitSymbol = (state: number) => {
    switch (state) {
      case 0: return '|0⟩';
      case 1: return '|1⟩';
      case 2: return '|ψ⟩';
      default: return '?';
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
          <h2 className="text-5xl font-bold mb-6 quantum-glow" data-testid="quantum-computing-title">
            Skok 6: Komputery Kwantowe
          </h2>
          <p className="text-xl text-quantum-cyan mb-8" data-testid="quantum-computing-subtitle">
            Przyszłość Obliczeń
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Quantum Computer Visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={quantumComputerImage}
              alt="Quantum Computer Visualization"
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

          {/* Interactive Quantum Processor */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-center" data-testid="quantum-processor-title">
                Interaktywny Procesor Kwantowy
              </h3>
              
              {/* Qubits */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {qubitsState.map((state, index) => (
                  <motion.button
                    key={index}
                    onClick={() => !isComputing && toggleQubit(index)}
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${getQubitColor(state)} flex items-center justify-center font-bold text-white text-lg shadow-lg hover:scale-110 transition-all duration-300 ${
                      isComputing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                    }`}
                    whileHover={!isComputing ? { scale: 1.1 } : {}}
                    whileTap={!isComputing ? { scale: 0.95 } : {}}
                    animate={state === 2 ? { 
                      boxShadow: ["0 0 20px rgba(255, 255, 0, 0.5)", "0 0 40px rgba(255, 0, 255, 0.5)", "0 0 20px rgba(0, 255, 255, 0.5)"],
                      scale: [1, 1.05, 1]
                    } : {}}
                    transition={{ duration: 1, repeat: state === 2 ? Infinity : 0 }}
                    data-testid={`qubit-${index}`}
                  >
                    {getQubitSymbol(state)}
                  </motion.button>
                ))}
              </div>

              {/* Quantum Gates */}
              <div className="bg-card p-6 rounded-xl border border-quantum-cyan border-opacity-30 mb-6">
                <h4 className="text-lg font-semibold mb-4 text-quantum-cyan" data-testid="quantum-gates-title">
                  Bramki Kwantowe
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {['H', 'X', 'Z'].map((gate) => (
                    <Button
                      key={gate}
                      onClick={() => !isComputing && setQubitsState(qubitsState.map(() => Math.floor(Math.random() * 3)))}
                      className="h-12 bg-gradient-to-br from-quantum-cyan to-purple-500 text-white font-bold hover:scale-105 transition-all duration-300"
                      disabled={isComputing}
                      data-testid={`gate-${gate}`}
                    >
                      {gate}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantum Computation Button */}
              <div className="text-center">
                <Button
                  onClick={startQuantumComputation}
                  disabled={isComputing}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-quantum-cyan text-white font-bold rounded-lg hover:scale-105 transition-all duration-300 relative overflow-hidden"
                  data-testid="start-computation"
                >
                  <span className="relative z-10">
                    {isComputing ? 'Obliczanie Kwantowe...' : 'Uruchom Obliczenia'}
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

            {/* Quantum Advantage */}
            <motion.div
              className="bg-card p-6 rounded-xl border border-quantum-cyan border-opacity-30"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-3 text-quantum-cyan" data-testid="quantum-advantage-title">
                Przewaga Kwantowa
              </h4>
              <p className="text-sm leading-relaxed opacity-90" data-testid="quantum-advantage-description">
                Komputery kwantowe wykorzystują superpozycję i splątanie do wykonywania obliczeń, które byłyby praktycznie niemożliwe dla komputerów klasycznych. Jeden qubit może być jednocześnie w stanie |0⟩ i |1⟩, co pozwala na eksponencjalny wzrost mocy obliczeniowej z każdym dodatkowym qubitem.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}