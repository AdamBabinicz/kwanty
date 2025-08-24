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
              className="absolute top-0 right-0 w-64 h-64 rounded-full bg-black bg-opacity-80 backdrop-blur-lg border border-quantum-cyan border-opacity-30 flex items-center justify-center"
              data-testid="quantum-menu"
            >
              <div className="relative w-48 h-48">
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

                {/* Center Controls */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                  {/* Theme Toggle */}
                  <Button
                    onClick={toggleTheme}
                    className="w-8 h-8 rounded-full bg-quantum-cyan bg-opacity-20 hover:bg-opacity-40 transition-colors p-0"
                    data-testid="theme-toggle"
                  >
                    <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-quantum-cyan text-sm`} />
                  </Button>

                  {/* Language Toggle */}
                  <div className="flex gap-1">
                    {(['pl', 'en', 'fi'] as const).map((lang) => (
                      <Button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`w-6 h-6 text-xs font-bold transition-colors p-0 ${
                          currentLanguage === lang 
                            ? 'text-white' 
                            : 'text-quantum-cyan hover:text-white'
                        }`}
                        variant="ghost"
                        data-testid={`language-${lang}`}
                      >
                        {lang.toUpperCase()}
                      </Button>
                    ))}
                  </div>

                  {/* Accessibility */}
                  <Button
                    onClick={toggleAccessibility}
                    className={`w-8 h-8 rounded-full transition-colors p-0 ${
                      isAccessibilityMode 
                        ? 'bg-quantum-cyan bg-opacity-40' 
                        : 'bg-quantum-cyan bg-opacity-20 hover:bg-opacity-40'
                    }`}
                    data-testid="accessibility-toggle"
                  >
                    <i className="fas fa-universal-access text-quantum-cyan text-sm" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
