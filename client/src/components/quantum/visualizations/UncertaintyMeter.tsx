import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export default function UncertaintyMeter() {
  const { t } = useTranslation();
  const [positionCertainty, setPositionCertainty] = useState([50]);
  const momentumCertainty = 100 - positionCertainty[0];

  const handlePositionChange = (value: number[]) => {
    setPositionCertainty(value);
  };

  return (
    <motion.div
      className="bg-card p-8 rounded-xl border border-quantum-cyan border-opacity-30 mb-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-semibold mb-8 text-center" data-testid="heisenberg-meter-title">
        {t('sections.uncertainty.heisenbergMeter')}
      </h3>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Position Slider */}
        <div>
          <Label className="block text-lg font-medium mb-4 text-quantum-cyan" data-testid="position-label">
            {t('sections.uncertainty.positionCertainty')} <span data-testid="position-value">{positionCertainty[0]}</span>%
          </Label>
          <Slider
            value={positionCertainty}
            onValueChange={handlePositionChange}
            max={100}
            step={1}
            className="w-full"
            data-testid="position-slider"
          />
          <div className="flex justify-between text-sm mt-2 opacity-60">
            <span data-testid="position-unknown">{t('sections.uncertainty.unknown')}</span>
            <span data-testid="position-precise">{t('sections.uncertainty.precise')}</span>
          </div>
        </div>

        {/* Momentum Slider */}
        <div>
          <Label className="block text-lg font-medium mb-4 text-purple-400" data-testid="momentum-label">
            {t('sections.uncertainty.momentumCertainty')} <span data-testid="momentum-value">{momentumCertainty}</span>%
          </Label>
          <Slider
            value={[momentumCertainty]}
            max={100}
            step={1}
            className="w-full"
            disabled
            data-testid="momentum-slider"
          />
          <div className="flex justify-between text-sm mt-2 opacity-60">
            <span data-testid="momentum-unknown">{t('sections.uncertainty.unknownMomentum')}</span>
            <span data-testid="momentum-precise">{t('sections.uncertainty.preciseMomentum')}</span>
          </div>
        </div>
      </div>

      {/* Particle Visualization */}
      <div className="relative h-48 bg-muted rounded-lg border border-quantum-cyan border-opacity-30 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div className="relative" data-testid="uncertainty-particle">
            {/* Particle */}
            <motion.div
              className="w-8 h-8 rounded-full bg-quantum-cyan transition-all duration-300"
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Position Uncertainty Cloud */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-quantum-cyan to-transparent opacity-30 transition-all duration-300"
              style={{
                width: `${100 + (100 - positionCertainty[0])}px`,
                height: `${100 + (100 - positionCertainty[0])}px`,
                opacity: (100 - positionCertainty[0]) / 200,
              }}
              data-testid="position-cloud"
            />
            
            {/* Momentum Vectors */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                opacity: 1 - (momentumCertainty / 100),
                filter: `blur(${(100 - momentumCertainty) / 10}px)`,
              }}
              data-testid="momentum-vectors"
            >
              {[-45, 45, 12, -12].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-12 h-px bg-purple-400 origin-left"
                  style={{ transform: `rotate(${angle}deg)` }}
                  animate={{ scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Uncertainty Formula */}
        <div className="absolute top-4 left-4">
          <span className="text-sm font-mono bg-background bg-opacity-80 px-2 py-1 rounded" data-testid="uncertainty-formula">
            Δx · Δp ≥ ℏ/2
          </span>
        </div>
      </div>
    </motion.div>
  );
}
