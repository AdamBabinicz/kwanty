// quantum-portal.tsx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/theme-provider";
import { useQuantumContext } from "@/contexts/QuantumContext";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import QuantumControlPanel from "@/components/quantum/QuantumControlPanel";
import WaveFunctionHero from "@/components/quantum/WaveFunctionHero";
import QuantumObservation from "@/components/quantum/QuantumObservation";
import QuantumSuperposition from "@/components/quantum/QuantumSuperposition";
import QuantumEntanglement from "@/components/quantum/QuantumEntanglement";
import QuantumUncertainty from "@/components/quantum/QuantumUncertainty";
import QuantumTunneling from "@/components/quantum/QuantumTunneling";
import SchrodingerSection from "@/components/quantum/SchrodingerSection";
import QuantumComputing from "@/components/quantum/QuantumComputing";
import QuantumApplications from "@/components/quantum/QuantumApplications";
import QuantumParticleField from "@/components/quantum/QuantumParticleField";
import SkipLink from "@/components/ui/skip-link";
import SEO from "@/components/SEO";

export default function QuantumPortal() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const { state, dispatch } = useQuantumContext();
  const { currentLanguage } = state;

  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollButtonVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (i18n && i18n.changeLanguage && i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      dispatch({
        type: "UPDATE_MOUSE_POSITION",
        payload: { x: e.clientX, y: e.clientY },
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return (
    <div
      className={`w-full max-w-full overflow-x-hidden font-sora transition-colors duration-500 ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <SEO isHomePage={true} />
      <SkipLink />
      <QuantumParticleField />
      <QuantumControlPanel />

      <div className="relative z-0">
        <main
          id="main-content"
          className="w-full max-w-full overflow-x-hidden"
          tabIndex={-1}
          role="main"
          aria-label="Główna zawartość portalu kwantowego"
        >
          <WaveFunctionHero />
          <div id="observation">
            <QuantumObservation />
          </div>
          <div id="superposition">
            <QuantumSuperposition />
          </div>
          <div id="schrodinger">
            <SchrodingerSection />
          </div>
          <div id="entanglement">
            <QuantumEntanglement />
          </div>
          <div id="uncertainty">
            <QuantumUncertainty />
          </div>
          <div id="tunneling">
            <QuantumTunneling />
          </div>
          <div id="quantum-computing">
            <QuantumComputing />
          </div>
          <div id="quantum-applications">
            <QuantumApplications />
          </div>
        </main>
      </div>

      {isScrollButtonVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-quantum-cyan text-background shadow-lg transition-all duration-300 hover:bg-quantum-cyan-light hover:scale-110"
          aria-label={t("panel.scrollToTop")}
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
