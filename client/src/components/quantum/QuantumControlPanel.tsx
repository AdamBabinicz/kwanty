import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import { useQuantumState } from '@/hooks/useQuantumState';
import { Button } from '@/components/ui/button';
import { 
  FaAtom, 
  FaEye, 
  FaLayerGroup, 
  FaLink, 
  FaQuestion, 
  FaPaperPlane, 
  FaCat, 
  FaMicrochip, 
  FaRocket, 
  FaSun, 
  FaMoon 
} from 'react-icons/fa';
import { MdAccessibility } from 'react-icons/md';

export default function QuantumControlPanel() {
  const { i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { currentLanguage, setLanguage, toggleAccessibility, isAccessibilityMode, mousePosition } = useQuantumState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const orbButtonRef = useRef<HTMLButtonElement>(null);

  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      // Return focus to orb button after navigation
      setTimeout(() => {
        orbButtonRef.current?.focus();
      }, 100);
    }
  };

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        orbButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Focus management when menu opens
  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const firstFocusableElement = menuRef.current.querySelector('button');
      (firstFocusableElement as HTMLElement)?.focus();
    }
  }, [isMenuOpen]);

  const getLanguageName = (lang: string) => {
    const names = {
      pl: 'Polski',
      en: 'English', 
      fi: 'Suomi'
    };
    return names[lang as keyof typeof names] || lang;
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
          ref={orbButtonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-quantum-cyan via-quantum-blue to-purple-500 animate-pulse-glow hover:shadow-2xl transition-all duration-300 p-0 focus:outline-none focus:ring-4 focus:ring-quantum-cyan focus:ring-opacity-50"
          aria-label={isMenuOpen ? 'Zamknij menu kwantowe' : 'Otwórz menu kwantowe'}
          aria-expanded={isMenuOpen}
          aria-haspopup="true"
          data-testid="quantum-orb-button"
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaAtom className="text-xl text-white" />
          </motion.div>
        </Button>

        {/* Expanded Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="absolute top-0 right-0 w-80 h-80 rounded-full bg-black dark:bg-black bg-opacity-95 dark:bg-opacity-90 backdrop-blur-lg border-2 border-quantum-cyan border-opacity-50 flex items-center justify-center shadow-2xl"
              role="menu"
              aria-label="Menu nawigacji kwantowej"
              data-testid="quantum-menu"
            >
              <div className="relative w-64 h-64">
                {/* Navigation Icons */}
                <Button
                  onClick={() => navigateToSection('observation')}
                  className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-quantum-cyan bg-opacity-20 hover:bg-opacity-40 transition-colors p-0 focus:outline-none focus:ring-2 focus:ring-quantum-cyan"
                  aria-label="Przejdź do sekcji obserwacji kwantowej"
                  role="menuitem"
                  data-testid="nav-observation"
                >
                  <FaEye className="text-quantum-cyan" aria-hidden="true" />
                </Button>

                <Button
                  onClick={() => navigateToSection('superposition')}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 rounded-full bg-quantum-cyan bg-opacity-20 hover:bg-opacity-40 transition-colors p-0 focus:outline-none focus:ring-2 focus:ring-quantum-cyan"
                  aria-label="Przejdź do sekcji superpozycji kwantowej"
                  role="menuitem"
                  data-testid="nav-superposition"
                >
                  <FaLayerGroup className="text-quantum-cyan" aria-hidden="true" />
                </Button>

                <Button
                  onClick={() => navigateToSection('entanglement')}
                  className="absolute bottom-4 right-1/3 w-12 h-12 rounded-full bg-quantum-cyan bg-opacity-20 hover:bg-opacity-40 transition-colors p-0 focus:outline-none focus:ring-2 focus:ring-quantum-cyan"
                  aria-label="Przejdź do sekcji splątania kwantowego"
                  role="menuitem"
                  data-testid="nav-entanglement"
                >
                  <FaLink className="text-quantum-cyan" aria-hidden="true" />
                </Button>

                <Button
                  onClick={() => navigateToSection('uncertainty')}
                  className="absolute bottom-4 left-1/3 w-12 h-12 rounded-full bg-quantum-cyan bg-opacity-20 hover:bg-opacity-40 transition-colors p-0 focus:outline-none focus:ring-2 focus:ring-quantum-cyan"
                  aria-label="Przejdź do sekcji zasady nieoznaczoności"
                  role="menuitem"
                  data-testid="nav-uncertainty"
                >
                  <FaQuestion className="text-quantum-cyan" aria-hidden="true" />
                </Button>

                <Button
                  onClick={() => navigateToSection('tunneling')}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 w-12 h-12 rounded-full bg-quantum-cyan bg-opacity-20 hover:bg-opacity-40 transition-colors p-0 focus:outline-none focus:ring-2 focus:ring-quantum-cyan"
                  aria-label="Przejdź do sekcji tunelowania kwantowego"
                  role="menuitem"
                  data-testid="nav-tunneling"
                >
                  <FaPaperPlane className="text-quantum-cyan" aria-hidden="true" />
                </Button>

                <Button
                  onClick={() => navigateToSection('schrodinger')}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-quantum-cyan bg-opacity-20 hover:bg-opacity-40 transition-colors p-0 focus:outline-none focus:ring-2 focus:ring-quantum-cyan"
                  aria-label="Przejdź do sekcji eksperymentu Schrödingera"
                  role="menuitem"
                  data-testid="nav-schrodinger"
                >
                  <FaCat className="text-quantum-cyan" aria-hidden="true" />
                </Button>

                <Button
                  onClick={() => navigateToSection('quantum-computing')}
                  className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-quantum-cyan bg-opacity-20 hover:bg-opacity-40 transition-colors p-0 focus:outline-none focus:ring-2 focus:ring-quantum-cyan"
                  aria-label="Przejdź do sekcji komputerów kwantowych"
                  role="menuitem"
                  data-testid="nav-quantum-computing"
                >
                  <FaMicrochip className="text-quantum-cyan" aria-hidden="true" />
                </Button>

                <Button
                  onClick={() => navigateToSection('quantum-applications')}
                  className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-quantum-cyan bg-opacity-20 hover:bg-opacity-40 transition-colors p-0 focus:outline-none focus:ring-2 focus:ring-quantum-cyan"
                  aria-label="Przejdź do sekcji zastosowań kwantowych"
                  role="menuitem"
                  data-testid="nav-quantum-applications"
                >
                  <FaRocket className="text-quantum-cyan" aria-hidden="true" />
                </Button>

                {/* Center Controls with Labels */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
                  {/* Theme Toggle with Label */}
                  <div className="flex flex-col items-center gap-1">
                    <Button
                      onClick={toggleTheme}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-quantum-cyan to-purple-500 hover:scale-110 transition-all duration-300 p-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-quantum-cyan"
                      aria-label={`Przełącz na motyw ${isDarkMode ? 'jasny' : 'ciemny'}`}
                      data-testid="theme-toggle"
                    >
                      {isDarkMode ? (
                        <FaSun className="text-white text-lg" aria-hidden="true" />
                      ) : (
                        <FaMoon className="text-white text-lg" aria-hidden="true" />
                      )}
                    </Button>
                    <span className="text-xs text-foreground font-medium">
                      Motyw: {isDarkMode ? 'Ciemny' : 'Jasny'}
                    </span>
                  </div>

                  {/* Language Toggle with Label */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-card dark:bg-quantum-dark-800 p-2 rounded-lg border border-quantum-cyan border-opacity-30">
                      <div className="text-xs text-center mb-2 font-semibold text-foreground">Język / Language</div>
                      <div className="flex flex-col gap-1">
                        {(['pl', 'en', 'fi'] as const).map((lang) => (
                          <Button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={`w-20 h-8 text-xs font-bold rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-quantum-cyan ${
                              currentLanguage === lang 
                                ? 'bg-quantum-cyan text-black shadow-lg border-2 border-quantum-cyan' 
                                : 'bg-muted text-foreground hover:bg-primary hover:text-primary-foreground border border-border'
                            }`}
                            aria-label={`Zmień język na ${getLanguageName(lang)}`}
                            aria-pressed={currentLanguage === lang}
                            role="radio"
                            data-testid={`language-${lang}`}
                          >
                            {getLanguageName(lang)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Accessibility with Label */}
                  <div className="flex flex-col items-center gap-1">
                    <Button
                      onClick={toggleAccessibility}
                      className={`w-10 h-10 rounded-full transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
                        isAccessibilityMode 
                          ? 'bg-green-500 text-white transform scale-110' 
                          : 'bg-muted text-foreground hover:bg-green-500 hover:text-white hover:scale-105'
                      }`}
                      aria-label={`${isAccessibilityMode ? 'Wyłącz' : 'Włącz'} tryb wysokiej dostępności`}
                      aria-pressed={isAccessibilityMode}
                      data-testid="accessibility-toggle"
                    >
                      <MdAccessibility className="text-sm" aria-hidden="true" />
                    </Button>
                    <span className="text-xs text-foreground font-medium">
                      Dostępność: {isAccessibilityMode ? 'Wł.' : 'Wył.'}
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
