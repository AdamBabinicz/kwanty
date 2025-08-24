import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import { useQuantumState } from '@/hooks/useQuantumState';
import { Button } from '@/components/ui/button';

export default function QuantumControlPanel() {
  const { i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { currentLanguage, setLanguage, toggleAccessibility, isAccessibilityMode, mousePosition } = useQuantumState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Mouse following effect
  const orbStyle = {
    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
  };

  return (
    <div className="fixed top-8 right-8 z-50" style={orbStyle}>
      {/* Main Orb */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-quantum-cyan via-quantum-blue to-purple-500 animate-pulse-glow hover:shadow-2xl transition-all duration-300 p-0"
          data-testid="quantum-orb-button"
        >
          <motion.i
            className="fas fa-atom text-xl text-white"
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </Button>

        {/* Expanded Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="absolute top-0 right-0 w-80 h-80 rounded-full bg-black bg-opacity-90 backdrop-blur-lg border-2 border-quantum-cyan border-opacity-50 flex items-center justify-center shadow-2xl"
              data-testid="quantum-menu"
            >
              <div className="relative w-64 h-64">
                {/* Navigation Icons */}
                <Button
                  onClick={() => navigateToSection('observation')}
                  className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-quantum-cyan bg-opacity-20 hover:bg-opacity-40 transition-colors p-0"
                  data-testid="nav-observation"
                >
                  <i className="fas fa-eye text-quantum-cyan" />
                </Button>

                <Button
                  onClick={() => navigateToSection('superposition')}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 rounded-full bg-quantum-cyan bg-opacity-20 hover:bg-opacity-40 transition-colors p-0"
                  data-testid="nav-superposition"
                >
                  <i className="fas fa-layer-group text-quantum-cyan" />
                </Button>

                <Button
                  onClick={() => navigateToSection('entanglement')}
                  className="absolute bottom-4 right-1/3 w-12 h-12 rounded-full bg-quantum-cyan bg-opacity-20 hover:bg-opacity-40 transition-colors p-0"
                  data-testid="nav-entanglement"
                >
                  <i className="fas fa-link text-quantum-cyan" />
                </Button>

                <Button
                  onClick={() => navigateToSection('uncertainty')}
                  className="absolute bottom-4 left-1/3 w-12 h-12 rounded-full bg-quantum-cyan bg-opacity-20 hover:bg-opacity-40 transition-colors p-0"
                  data-testid="nav-uncertainty"
                >
                  <i className="fas fa-question text-quantum-cyan" />
                </Button>

                <Button
                  onClick={() => navigateToSection('tunneling')}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 w-12 h-12 rounded-full bg-quantum-cyan bg-opacity-20 hover:bg-opacity-40 transition-colors p-0"
                  data-testid="nav-tunneling"
                >
                  <i className="fas fa-paper-plane text-quantum-cyan" />
                </Button>

                <Button
                  onClick={() => navigateToSection('schrodinger')}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-quantum-cyan bg-opacity-20 hover:bg-opacity-40 transition-colors p-0"
                  data-testid="nav-schrodinger"
                >
                  <i className="fas fa-cat text-quantum-cyan" />
                </Button>

                <Button
                  onClick={() => navigateToSection('quantum-computing')}
                  className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-quantum-cyan bg-opacity-20 hover:bg-opacity-40 transition-colors p-0"
                  data-testid="nav-quantum-computing"
                >
                  <i className="fas fa-microchip text-quantum-cyan" />
                </Button>

                <Button
                  onClick={() => navigateToSection('quantum-applications')}
                  className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-quantum-cyan bg-opacity-20 hover:bg-opacity-40 transition-colors p-0"
                  data-testid="nav-quantum-applications"
                >
                  <i className="fas fa-rocket text-quantum-cyan" />
                </Button>

                {/* Center Controls with Labels */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
                  {/* Theme Toggle with Label */}
                  <div className="flex flex-col items-center gap-1">
                    <Button
                      onClick={toggleTheme}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-quantum-cyan to-purple-500 hover:scale-110 transition-all duration-300 p-0 shadow-lg"
                      data-testid="theme-toggle"
                    >
                      <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-white text-lg`} />
                    </Button>
                    <span className="text-xs text-quantum-cyan font-medium">
                      {isDarkMode ? 'Jasny' : 'Ciemny'}
                    </span>
                  </div>

                  {/* Language Toggle with Label */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-2">
                      {(['pl', 'en', 'fi'] as const).map((lang) => (
                        <Button
                          key={lang}
                          onClick={() => setLanguage(lang)}
                          className={`w-8 h-8 text-xs font-bold rounded-full transition-all duration-300 ${
                            currentLanguage === lang 
                              ? 'bg-quantum-cyan text-black shadow-lg transform scale-110' 
                              : 'bg-quantum-cyan bg-opacity-20 text-quantum-cyan hover:bg-opacity-40 hover:scale-105'
                          }`}
                          data-testid={`language-${lang}`}
                        >
                          {lang.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                    <span className="text-xs text-quantum-cyan font-medium">Język</span>
                  </div>

                  {/* Accessibility with Label */}
                  <div className="flex flex-col items-center gap-1">
                    <Button
                      onClick={toggleAccessibility}
                      className={`w-10 h-10 rounded-full transition-all duration-300 shadow-lg ${
                        isAccessibilityMode 
                          ? 'bg-green-500 text-white transform scale-110' 
                          : 'bg-quantum-cyan bg-opacity-20 text-quantum-cyan hover:bg-opacity-40 hover:scale-105'
                      }`}
                      data-testid="accessibility-toggle"
                    >
                      <i className="fas fa-universal-access text-sm" />
                    </Button>
                    <span className="text-xs text-quantum-cyan font-medium">
                      {isAccessibilityMode ? 'Włączone' : 'Dostępność'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
