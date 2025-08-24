import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function EntangledParticles() {
  const { t } = useTranslation();
  const [particleAHovered, setParticleAHovered] = useState(false);
  const [particleBHovered, setParticleBHovered] = useState(false);

  return (
    <motion.div
      className="relative h-96 mb-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 flex items-center justify-between px-12">
        {/* Particle A */}
        <motion.div
          className="relative group cursor-pointer"
          onMouseEnter={() => {
            setParticleAHovered(true);
            setParticleBHovered(false);
          }}
          onMouseLeave={() => {
            setParticleAHovered(false);
            setParticleBHovered(false);
          }}
          whileHover={{ scale: 1.1 }}
          data-testid="particle-a"
        >
          <motion.div
            className="entangled-particle"
            animate={particleAHovered ? { 
              scale: 1.25, 
              rotate: 180,
              boxShadow: "0 0 40px rgba(100, 255, 218, 0.8)"
            } : {}}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <span className="text-sm font-medium text-quantum-cyan" data-testid="particle-a-label">
              {t('sections.entanglement.particleA')}
            </span>
          </div>
          {/* Spin Indicator */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <motion.i
              className="fas fa-arrow-up text-quantum-cyan text-2xl transition-transform duration-300"
              animate={particleAHovered ? { rotate: 180 } : { rotate: 0 }}
              data-testid="spin-a"
            />
          </div>
        </motion.div>

        {/* Connection Line */}
        <div className="flex-1 relative mx-8">
          <motion.div
            className="h-px bg-gradient-to-r from-quantum-cyan via-purple-500 to-quantum-cyan relative overflow-hidden"
            animate={particleAHovered || particleBHovered ? {
              background: "linear-gradient(90deg, #64FFDA, #FFFFFF, #64FFDA)"
            } : {}}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.span
              className="bg-background px-3 py-1 text-sm font-medium text-quantum-cyan border border-quantum-cyan border-opacity-30 rounded-full"
              animate={particleAHovered || particleBHovered ? {
                scale: 1.1,
                boxShadow: "0 0 20px rgba(100, 255, 218, 0.5)"
              } : {}}
              data-testid="connection-label"
            >
              {t('sections.entanglement.connection')}
            </motion.span>
          </div>
        </div>

        {/* Particle B */}
        <motion.div
          className="relative group cursor-pointer"
          onMouseEnter={() => {
            setParticleBHovered(true);
            setParticleAHovered(false);
          }}
          onMouseLeave={() => {
            setParticleBHovered(false);
            setParticleAHovered(false);
          }}
          whileHover={{ scale: 1.1 }}
          data-testid="particle-b"
        >
          <motion.div
            className="entangled-particle"
            animate={particleBHovered ? { 
              scale: 1.25, 
              rotate: 180,
              boxShadow: "0 0 40px rgba(168, 85, 247, 0.8)"
            } : {}}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <span className="text-sm font-medium text-quantum-cyan" data-testid="particle-b-label">
              {t('sections.entanglement.particleB')}
            </span>
          </div>
          {/* Spin Indicator */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <motion.i
              className="fas fa-arrow-down text-purple-400 text-2xl transition-transform duration-300"
              animate={particleBHovered ? { rotate: 180 } : { rotate: 0 }}
              data-testid="spin-b"
            />
          </div>
        </motion.div>
      </div>

      {/* Entanglement Effect */}
      {(particleAHovered || particleBHovered) && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-quantum-cyan rounded-full"
              style={{
                left: `${20 + i * 10}%`,
                top: `${40 + Math.sin(i) * 20}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
