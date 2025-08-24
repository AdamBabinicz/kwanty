import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import { useQuantumState } from '@/hooks/useQuantumState';
import QuantumControlPanel from '@/components/quantum/QuantumControlPanel';
import WaveFunctionHero from '@/components/quantum/WaveFunctionHero';
import QuantumObservation from '@/components/quantum/QuantumObservation';
import QuantumSuperposition from '@/components/quantum/QuantumSuperposition';
import QuantumEntanglement from '@/components/quantum/QuantumEntanglement';
import QuantumUncertainty from '@/components/quantum/QuantumUncertainty';
import QuantumTunneling from '@/components/quantum/QuantumTunneling';
import SchrodingerSection from '@/components/quantum/SchrodingerSection';
import QuantumComputing from '@/components/quantum/QuantumComputing';
import QuantumApplications from '@/components/quantum/QuantumApplications';
import QuantumParticleField from '@/components/quantum/QuantumParticleField';
import SkipLink from '@/components/ui/skip-link';

export default function QuantumPortal() {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const { currentLanguage, updateMousePosition } = useQuantumState();

  useEffect(() => {
    if (i18n && i18n.changeLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [updateMousePosition]);

  useEffect(() => {
    // Set document language
    document.documentElement.lang = currentLanguage;
    
    // Update meta description based on language
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const descriptions = {
        pl: 'Przełomowa strona internetowa manifestująca zasady mechaniki kwantowej przez interaktywne wizualizacje i dynamiczny interfejs.',
        en: 'Revolutionary website manifesting quantum mechanics principles through interactive visualizations and dynamic interface.',
        fi: 'Vallankumouksellinen verkkosivusto, joka manifestoi kvanttimekaniikan periaatteita interaktiivisten visualisointien ja dynaamisen käyttöliittymän kautta.'
      };
      metaDescription.setAttribute('content', descriptions[currentLanguage]);
    }

    // Update title based on language
    const titles = {
      pl: 'Kwantowy Portal: Interaktywna Eksploracja Rzeczywistości',
      en: 'Quantum Portal: Interactive Reality Exploration',
      fi: 'Kvanttisivu: Interaktiivinen Todellisuuden Tutkimus'
    };
    document.title = titles[currentLanguage];
  }, [currentLanguage]);

  return (
    <div className={`min-h-screen w-full overflow-x-hidden font-sora transition-colors duration-500 ${isDarkMode ? 'dark' : ''}`}>
      {/* Skip Link for Accessibility */}
      <SkipLink />
      
      {/* Quantum Particle Field Background */}
      <QuantumParticleField />
      
      {/* Quantum Control Panel */}
      <QuantumControlPanel />
      
      {/* Main Content */}
      <main id="main-content" className="relative z-10 w-full max-w-full" tabIndex={-1} role="main" aria-label="Główna zawartość portalu kwantowego">
        {/* Hero Section - Wave Function */}
        <WaveFunctionHero />
        
        {/* Quantum Leap 1: Observation */}
        <QuantumObservation />
        
        {/* Quantum Leap 2: Superposition */}
        <QuantumSuperposition />
        
        {/* Schrödinger's Cat Experiment */}
        <SchrodingerSection />
        
        {/* Quantum Leap 3: Entanglement */}
        <QuantumEntanglement />
        
        {/* Quantum Leap 4: Uncertainty */}
        <QuantumUncertainty />
        
        {/* Quantum Leap 5: Tunneling & Contact */}
        <QuantumTunneling />
        
        {/* Quantum Leap 6: Computing */}
        <QuantumComputing />
        
        {/* Quantum Leap 7: Applications */}
        <QuantumApplications />
      </main>
    </div>
  );
}
