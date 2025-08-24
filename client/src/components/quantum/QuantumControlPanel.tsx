
import { useState, useEffect, useRef, useCallback } from 'react';
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
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { currentLanguage, setLanguage, toggleAccessibility, isAccessibilityMode, mousePosition } = useQuantumState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const orbButtonRef = useRef<HTMLButtonElement>(null);

  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      setIsMenuOpen(false);
      setTimeout(() => {
        orbButtonRef.current?.focus();
      }, 300);
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

  // Handle language change
  const handleLanguageChange = (lang: 'pl' | 'en' | 'fi') => {
    if (currentLanguage === lang) return;
    setLanguage(lang);
    if (i18n && i18n.changeLanguage) {
      i18n.changeLanguage(lang);
    }
  };

  // Mouse following effect
  const orbStyle = {
    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
  };

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-50 touch-none" style={orbStyle}>
      {/* Main Orb - Responsive sizes */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          ref={orbButtonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 p-0 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
          aria-label={isMenuOpen ? 
            (currentLanguage === 'pl' ? 'Zamknij menu kwantowe' : 
             currentLanguage === 'en' ? 'Close quantum menu' : 
             'Sulje kvanttivalikko') : 
            (currentLanguage === 'pl' ? 'Otwórz menu kwantowe' : 
             currentLanguage === 'en' ? 'Open quantum menu' : 
             'Avaa kvanttivalikko')}
          aria-expanded={isMenuOpen}
          aria-haspopup="true"
          data-testid="quantum-orb-button"
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaAtom className="text-sm sm:text-lg lg:text-xl text-white" />
          </motion.div>
        </Button>

        {/* Expanded Menu - Responsive */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="absolute top-0 right-0 w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-lg border-2 border-blue-400 border-opacity-50 flex items-center justify-center shadow-2xl"
              role="menu"
              aria-label="Menu nawigacji kwantowej"
              data-testid="quantum-menu"
            >
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
                {/* Navigation Icons - positioned around the circle with better visibility */}
                <Button
                  onClick={() => navigateToSection('observation')}
                  className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 hover:scale-110 p-0 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center shadow-md"
                  aria-label={`${t('sections.observation.title')} - ${t('sections.observation.subtitle')}`}
                  role="menuitem"
                  data-testid="nav-observation"
                >
                  <FaEye className="text-white text-xs sm:text-sm lg:text-base" aria-hidden="true" />
                </Button>

                <Button
                  onClick={() => navigateToSection('superposition')}
                  className="absolute top-4 sm:top-6 lg:top-8 right-2 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-purple-500 hover:bg-purple-600 text-white transition-all duration-300 hover:scale-110 p-0 focus:outline-none focus:ring-2 focus:ring-purple-400 flex items-center justify-center shadow-md"
                  aria-label={`${t('sections.superposition.title')} - ${t('sections.superposition.subtitle')}`}
                  role="menuitem"
                  data-testid="nav-superposition"
                >
                  <FaLayerGroup className="text-white text-xs sm:text-sm lg:text-base" aria-hidden="true" />
                </Button>

                <Button
                  onClick={() => navigateToSection('entanglement')}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white transition-all duration-300 hover:scale-110 p-0 focus:outline-none focus:ring-2 focus:ring-indigo-400 flex items-center justify-center shadow-md"
                  aria-label={`${t('sections.entanglement.title')} - ${t('sections.entanglement.subtitle')}`}
                  role="menuitem"
                  data-testid="nav-entanglement"
                >
                  <FaLink className="text-white text-xs sm:text-sm lg:text-base" aria-hidden="true" />
                </Button>

                <Button
                  onClick={() => navigateToSection('uncertainty')}
                  className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-2 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all duration-300 hover:scale-110 p-0 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center justify-center shadow-md"
                  aria-label={`${t('sections.uncertainty.title')} - ${t('sections.uncertainty.subtitle')}`}
                  role="menuitem"
                  data-testid="nav-uncertainty"
                >
                  <FaQuestion className="text-white text-xs sm:text-sm lg:text-base" aria-hidden="true" />
                </Button>

                <Button
                  onClick={() => navigateToSection('tunneling')}
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 hover:scale-110 p-0 focus:outline-none focus:ring-2 focus:ring-orange-400 flex items-center justify-center shadow-md"
                  aria-label={`${t('sections.tunneling.title')} - ${t('sections.tunneling.subtitle')}`}
                  role="menuitem"
                  data-testid="nav-tunneling"
                >
                  <FaPaperPlane className="text-white text-xs sm:text-sm lg:text-base" aria-hidden="true" />
                </Button>

                <Button
                  onClick={() => navigateToSection('schrodinger')}
                  className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-2 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-green-500 hover:bg-green-600 text-white transition-all duration-300 hover:scale-110 p-0 focus:outline-none focus:ring-2 focus:ring-green-400 flex items-center justify-center shadow-md"
                  aria-label={`${t('sections.schrodinger.title')} - ${t('sections.schrodinger.subtitle')}`}
                  role="menuitem"
                  data-testid="nav-schrodinger"
                >
                  <FaCat className="text-white text-xs sm:text-sm lg:text-base" aria-hidden="true" />
                </Button>

                <Button
                  onClick={() => navigateToSection('quantum-computing')}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-teal-500 hover:bg-teal-600 text-white transition-all duration-300 hover:scale-110 p-0 focus:outline-none focus:ring-2 focus:ring-teal-400 flex items-center justify-center shadow-md"
                  aria-label={`${t('sections.computing.title')} - ${t('sections.computing.subtitle')}`}
                  role="menuitem"
                  data-testid="nav-quantum-computing"
                >
                  <FaMicrochip className="text-white text-xs sm:text-sm lg:text-base" aria-hidden="true" />
                </Button>

                <Button
                  onClick={() => navigateToSection('quantum-applications')}
                  className="absolute top-4 sm:top-6 lg:top-8 left-2 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-pink-500 hover:bg-pink-600 text-white transition-all duration-300 hover:scale-110 p-0 focus:outline-none focus:ring-2 focus:ring-pink-400 flex items-center justify-center shadow-md"
                  aria-label={`${t('sections.applications.title')} - ${t('sections.applications.subtitle')}`}
                  role="menuitem"
                  data-testid="nav-quantum-applications"
                >
                  <FaRocket className="text-white text-xs sm:text-sm lg:text-base" aria-hidden="true" />
                </Button>

                {/* Center Controls with Labels - Responsive */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 sm:gap-3 lg:gap-4">
                  {/* Theme Toggle with Label */}
                  <div className="flex flex-col items-center gap-1">
                    <Button
                      onClick={toggleTheme}
                      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 hover:scale-110 transition-all duration-300 p-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      aria-label={`Przełącz na motyw ${isDarkMode ? 'jasny' : 'ciemny'}`}
                      data-testid="theme-toggle"
                    >
                      {isDarkMode ? (
                        <FaSun className="text-white text-xs sm:text-sm lg:text-lg" aria-hidden="true" />
                      ) : (
                        <FaMoon className="text-white text-xs sm:text-sm lg:text-lg" aria-hidden="true" />
                      )}
                    </Button>
                    <span className="text-xs text-gray-800 dark:text-gray-200 font-medium">
                      {currentLanguage === 'pl' ? 'Motyw' : currentLanguage === 'en' ? 'Theme' : 'Teema'}
                    </span>
                  </div>

                  {/* Language Toggle with Label - Improved contrast and responsiveness */}
                  <div className="flex flex-col items-center gap-1 sm:gap-2">
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg border border-gray-300 dark:border-gray-600">
                      <div className="text-xs text-center mb-1 sm:mb-2 font-semibold text-gray-800 dark:text-gray-200">
                        {currentLanguage === 'pl' ? 'Język' : currentLanguage === 'en' ? 'Language' : 'Kieli'}
                      </div>
                      <div className="flex flex-col gap-1">
                        {(['pl', 'en', 'fi'] as const).map((lang) => (
                          <Button
                            key={lang}
                            onClick={() => handleLanguageChange(lang)}
                            className={`w-12 sm:w-16 lg:w-20 h-5 sm:h-6 lg:h-8 text-xs font-bold rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                              currentLanguage === lang 
                                ? 'bg-blue-600 text-white shadow-lg border-2 border-blue-600' 
                                : 'bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white border border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-blue-600'
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
                      className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
                        isAccessibilityMode 
                          ? 'bg-green-600 text-white transform scale-110' 
                          : 'bg-gray-300 text-gray-700 hover:bg-green-500 hover:text-white hover:scale-105 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                      aria-label={`${isAccessibilityMode ? 'Wyłącz' : 'Włącz'} tryb wysokiej dostępności`}
                      aria-pressed={isAccessibilityMode}
                      data-testid="accessibility-toggle"
                    >
                      <MdAccessibility className="text-xs sm:text-sm" aria-hidden="true" />
                    </Button>
                    <span className="text-xs text-gray-800 dark:text-gray-200 font-medium">
                      {currentLanguage === 'pl' ? 'Dostępność' : currentLanguage === 'en' ? 'Accessibility' : 'Saavutettavuus'}
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
