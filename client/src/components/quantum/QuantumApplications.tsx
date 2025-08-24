import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import waveDualityImage from '@assets/generated_images/Quantum_wave-particle_duality_visualization_684f28dd.png';
import entanglementImage from '@assets/generated_images/Quantum_entanglement_cosmic_connection_d8e9ab2d.png';

export default function QuantumApplications() {
  const { t } = useTranslation();
  const [selectedApp, setSelectedApp] = useState<'cryptography' | 'teleportation' | 'sensing' | null>(null);

  const applications = [
    {
      id: 'cryptography',
      title: 'Kryptografia Kwantowa',
      icon: 'fas fa-shield-alt',
      description: 'Niemożliwa do złamania komunikacja dzięki prawom fizyki kwantowej.',
      details: 'Kryptografia kwantowa wykorzystuje zasadę nieoznaczoności Heisenberga do tworzenia absolutnie bezpiecznych kanałów komunikacji. Każda próba podsłuchania automatycznie zostaje wykryta.',
      image: entanglementImage
    },
    {
      id: 'teleportation',
      title: 'Teleportacja Kwantowa',
      icon: 'fas fa-exchange-alt',
      description: 'Przenoszenie stanów kwantowych na duże odległości.',
      details: 'Teleportacja kwantowa pozwala na przesyłanie informacji o stanie kwantowym bez fizycznego przemieszczania cząstki. To podstawa przyszłego internetu kwantowego.',
      image: waveDualityImage
    },
    {
      id: 'sensing',
      title: 'Czujniki Kwantowe',
      icon: 'fas fa-search',
      description: 'Pomiary o niedostępnej wcześniej precyzji.',
      details: 'Czujniki kwantowe wykorzystują efekty kwantowe do osiągnięcia niespotykanych poziomów czułości, revolutionizing medycynę, geologię i nawigację.',
      image: waveDualityImage
    }
  ];

  return (
    <motion.section
      id="quantum-applications"
      className="min-h-screen bg-quantum-dark-800 py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      data-testid="quantum-applications-section"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6 quantum-glow" data-testid="applications-title">
            Skok 7: Zastosowania Kwantowe
          </h2>
          <p className="text-xl text-quantum-cyan mb-8" data-testid="applications-subtitle">
            Rewolucja Kwantowa w Praktyce
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Application Cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {applications.map((app, index) => (
              <motion.div
                key={app.id}
                className={`relative cursor-pointer transform transition-all duration-300 ${
                  selectedApp === app.id ? 'scale-105' : 'hover:scale-102'
                }`}
                onClick={() => setSelectedApp(selectedApp === app.id ? null : app.id as 'cryptography' | 'teleportation' | 'sensing')}
                whileHover={{ y: -10 }}
                data-testid={`app-card-${app.id}`}
              >
                <div className={`bg-card p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedApp === app.id 
                    ? 'border-quantum-cyan border-opacity-70 shadow-2xl shadow-quantum-cyan' 
                    : 'border-quantum-cyan border-opacity-30 hover:border-opacity-50'
                }`}>
                  <div className="text-center mb-4">
                    <motion.i
                      className={`${app.icon} text-4xl text-quantum-cyan mb-4`}
                      animate={selectedApp === app.id ? { 
                        scale: [1, 1.2, 1],
                        rotate: [0, 360, 0]
                      } : {}}
                      transition={{ duration: 1, repeat: selectedApp === app.id ? Infinity : 0 }}
                    />
                    <h3 className="text-xl font-semibold mb-2" data-testid={`app-title-${app.id}`}>
                      {app.title}
                    </h3>
                    <p className="text-sm opacity-80" data-testid={`app-description-${app.id}`}>
                      {app.description}
                    </p>
                  </div>

                  <div className="text-center">
                    <Button
                      variant="ghost"
                      className="text-quantum-cyan hover:bg-quantum-cyan hover:text-background transition-all duration-300"
                      data-testid={`app-button-${app.id}`}
                    >
                      {selectedApp === app.id ? 'Ukryj szczegóły' : 'Poznaj szczegóły'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Detailed View */}
          <AnimatePresence>
            {selectedApp && (
              <motion.div
                className="bg-card rounded-xl border border-quantum-cyan border-opacity-30 overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                data-testid="app-details"
              >
                {(() => {
                  const app = applications.find(a => a.id === selectedApp);
                  if (!app) return null;

                  return (
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <h3 className="text-2xl font-bold mb-4 text-quantum-cyan" data-testid="app-detail-title">
                          {app.title}
                        </h3>
                        <p className="text-lg leading-relaxed opacity-90 mb-6" data-testid="app-detail-description">
                          {app.details}
                        </p>

                        {/* Interactive Demo */}
                        <div className="bg-muted p-4 rounded-lg border border-quantum-cyan border-opacity-20">
                          <h4 className="text-lg font-semibold mb-3 quantum-text-light" data-testid="quantum-advantage-title">
                            Demo Interaktywne:
                          </h4>
                          <div className="flex gap-2 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-6 h-6 rounded-full bg-gradient-to-br from-quantum-cyan to-purple-500"
                                animate={{ 
                                  scale: [1, 1.2, 1],
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ 
                                  duration: 1.5, 
                                  repeat: Infinity, 
                                  delay: i * 0.2 
                                }}
                                data-testid={`demo-particle-${i}`}
                              />
                            ))}
                          </div>
                          <p className="text-sm opacity-70">
                            {app.id === 'cryptography' && 'Klucze kwantowe generowane w czasie rzeczywistym'}
                            {app.id === 'teleportation' && 'Stany kwantowe przesyłane między cząstkami'}
                            {app.id === 'sensing' && 'Precyzyjne pomiary kwantowe w toku'}
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <motion.img
                          src={app.image}
                          alt={app.title}
                          className="w-full rounded-lg shadow-xl border border-quantum-cyan border-opacity-30"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          data-testid="app-detail-image"
                        />
                      </motion.div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}