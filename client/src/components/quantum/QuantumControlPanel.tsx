import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/theme-provider";
import { useQuantumContext } from "@/contexts/QuantumContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FaEye,
  FaLayerGroup,
  FaLink,
  FaQuestion,
  FaPaperPlane,
  FaCat,
  FaMicrochip,
  FaRocket,
  FaSun,
  FaMoon,
  FaGithub,
  FaFacebook,
  FaFileContract,
  FaShieldAlt,
} from "react-icons/fa";
import { SiX } from "react-icons/si";
import { MdAccessibility } from "react-icons/md";
import { Languages, Menu, X, ChevronsRight, ChevronsLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { RemoveScroll } from "react-remove-scroll";

const navItems = [
  { id: "observation", icon: FaEye, labelKey: "sections.observation.title" },
  {
    id: "superposition",
    icon: FaLayerGroup,
    labelKey: "sections.superposition.title",
  },
  { id: "schrodinger", icon: FaCat, labelKey: "sections.schrodinger.title" },
  { id: "entanglement", icon: FaLink, labelKey: "sections.entanglement.title" },
  {
    id: "uncertainty",
    icon: FaQuestion,
    labelKey: "sections.uncertainty.title",
  },
  { id: "tunneling", icon: FaPaperPlane, labelKey: "sections.tunneling.title" },
  {
    id: "quantum-computing",
    icon: FaMicrochip,
    labelKey: "sections.computing.title",
  },
  {
    id: "quantum-applications",
    icon: FaRocket,
    labelKey: "sections.applications.title",
  },
];

const legalLinks = [
  { href: "/terms", icon: FaFileContract, labelKey: "panel.terms" },
  { href: "/privacy", icon: FaShieldAlt, labelKey: "panel.privacy" },
];

export default function QuantumControlPanel() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { state, dispatch } = useQuantumContext();
  const { currentLanguage, isAccessibilityMode } = state;

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("observation");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangPopoverOpen, setIsLangPopoverOpen] = useState(false);

  const togglePanel = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = navItems.find((item) => {
        const element = document.getElementById(item.id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        );
      });
      if (currentSection) setActiveSection(currentSection.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    if (sectionId === "observation") {
      dispatch({ type: "COLLAPSE_WAVE" });
    }
    setTimeout(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (lang: "pl" | "en" | "fi") => {
    dispatch({ type: "SET_LANGUAGE", payload: lang });
    i18n.changeLanguage(lang);
    setIsLangPopoverOpen(false);
  };

  const handleThemeToggle = () => setTheme(theme === "dark" ? "light" : "dark");

  const toggleAccessibility = () => dispatch({ type: "TOGGLE_ACCESSIBILITY" });

  const NavButton = ({
    item,
    isMobile = false,
  }: {
    item: (typeof navItems)[0];
    isMobile?: boolean;
  }) => (
    <Button
      onClick={() => navigateToSection(item.id)}
      aria-label={t(item.labelKey)}
      className={cn(
        "w-full flex items-center justify-start space-x-4 p-3 h-auto transition-colors duration-200 rounded-lg",
        activeSection === item.id
          ? "bg-blue-500 text-white"
          : "bg-transparent text-slate-800 dark:text-slate-200 hover:bg-blue-500/10 dark:hover:bg-blue-500/20",
        isMobile ? "" : "justify-center lg:justify-start"
      )}
    >
      <item.icon className="h-6 w-6 flex-shrink-0" />
      <span
        className={cn(
          "font-medium transition-opacity duration-300",
          isMobile
            ? "whitespace-normal text-left"
            : "whitespace-nowrap hidden lg:inline-block",
          isExpanded ? "lg:opacity-100" : "lg:opacity-0"
        )}
      >
        {t(item.labelKey)}
      </span>
    </Button>
  );

  const desktopPanel = (
    <div
      className={cn(
        "hidden lg:flex flex-col fixed top-1/2 -translate-y-1/2 left-4 z-50",
        "h-full max-h-[90vh] bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-blue-400/20 shadow-lg overflow-hidden",
        "transition-all duration-300 ease-in-out",
        isExpanded ? "w-80" : "w-[5.5rem]"
      )}
    >
      <div className="p-4 border-b border-blue-400/20 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-4 overflow-hidden">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex-shrink-0"></div>
          <span
            className={cn(
              "font-bold text-lg whitespace-nowrap transition-opacity duration-200",
              isExpanded ? "opacity-100" : "opacity-0"
            )}
          >
            Quantum Portal
          </span>
        </div>
        <Button
          onClick={togglePanel}
          variant="ghost"
          size="icon"
          aria-label={isExpanded ? t("panel.collapse") : t("panel.expand")}
          className="flex-shrink-0 text-slate-800 dark:text-slate-200"
        >
          {isExpanded ? <ChevronsLeft /> : <ChevronsRight />}
        </Button>
      </div>
      <nav className="flex-1 p-3 space-y-2 overflow-y-auto no-scrollbar min-h-0">
        {navItems.map((item) => (
          <NavButton key={item.id} item={item} />
        ))}
      </nav>
      <div className="p-3 border-t border-blue-400/20 space-y-2 flex-shrink-0">
        <Button
          onClick={handleThemeToggle}
          variant="ghost"
          aria-label={
            theme === "dark" ? t("panel.lightMode") : t("panel.darkMode")
          }
          className={cn(
            "w-full flex items-center space-x-4 p-3 h-auto rounded-lg text-slate-800 dark:text-slate-200",
            isExpanded ? "justify-start" : "justify-center"
          )}
        >
          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
            {theme === "dark" ? (
              <FaSun className="h-6 w-6 text-yellow-400" />
            ) : (
              <FaMoon className="h-6 w-6 text-indigo-500" />
            )}
          </div>
          <span
            className={cn(
              "font-medium transition-opacity duration-300",
              isExpanded ? "opacity-100" : "opacity-0",
              !isExpanded && "hidden"
            )}
          >
            {theme === "dark" ? t("panel.lightMode") : t("panel.darkMode")}
          </span>
        </Button>
        <Popover open={isLangPopoverOpen} onOpenChange={setIsLangPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              aria-label={t("panel.language")}
              className={cn(
                "w-full flex items-center space-x-4 p-3 h-auto rounded-lg text-slate-800 dark:text-slate-200",
                isExpanded ? "justify-start" : "justify-center"
              )}
            >
              <Languages className="h-6 w-6 flex-shrink-0 text-green-500" />
              <span
                className={cn(
                  "font-medium transition-opacity duration-300",
                  isExpanded ? "opacity-100" : "opacity-0",
                  !isExpanded && "hidden"
                )}
              >
                {t("panel.language")}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="center"
            sideOffset={8}
            className="w-40 p-1"
          >
            <div className="flex flex-col space-y-1">
              {(["pl", "en", "fi"] as const).map((lang) => (
                <Button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  variant={currentLanguage === lang ? "default" : "ghost"}
                  aria-label={lang.toUpperCase()}
                  className={`w-full justify-center text-sm h-8 ${
                    currentLanguage === lang ? "bg-green-500" : ""
                  }`}
                >
                  {lang.toUpperCase()}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Button
          onClick={toggleAccessibility}
          variant="ghost"
          aria-label={
            isAccessibilityMode
              ? t("panel.accessibilityOff")
              : t("panel.accessibilityOn")
          }
          className={cn(
            "w-full flex items-center space-x-4 p-3 h-auto rounded-lg text-slate-800 dark:text-slate-200",
            isExpanded ? "justify-start" : "justify-center"
          )}
        >
          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
            <MdAccessibility
              className={cn(
                "h-6 w-6",
                isAccessibilityMode ? "text-purple-500" : "text-gray-500"
              )}
            />
          </div>
          <span
            className={cn(
              "font-medium transition-opacity duration-300",
              isExpanded ? "opacity-100" : "opacity-0",
              !isExpanded && "hidden"
            )}
          >
            {isAccessibilityMode
              ? t("panel.accessibilityOff")
              : t("panel.accessibilityOn")}
          </span>
        </Button>
      </div>
      <div className="p-3 border-t border-blue-400/20 space-y-1 flex-shrink-0">
        {legalLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-label={t(link.labelKey)}
            className={cn(
              "w-full flex items-center space-x-4 p-3 h-auto transition-colors duration-200 rounded-lg text-slate-800 dark:text-slate-200 hover:bg-blue-500/10 dark:hover:bg-blue-500/20",
              isExpanded ? "justify-start" : "justify-center"
            )}
          >
            <link.icon className="h-6 w-6 flex-shrink-0" />
            <span
              className={cn(
                "font-medium transition-opacity duration-300",
                isExpanded ? "opacity-100" : "opacity-0",
                !isExpanded && "hidden"
              )}
            >
              {t(link.labelKey)}
            </span>
          </Link>
        ))}
      </div>
      <div className="p-4 border-t border-blue-400/20 flex-shrink-0">
        <div
          className={cn(
            "flex items-center justify-around",
            isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <a
            href="https://github.com/AdamBabinicz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("panel.github")}
            className="text-slate-800 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <FaGithub className="h-6 w-6" />
          </a>
          <a
            href="https://x.com/AdamBabinicz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("panel.twitter")}
            className="text-slate-800 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <SiX className="h-6 w-6" /> {/* Zmienione na FaXTwitter */}
          </a>
          <a
            href="https://www.facebook.com/adam.gierczak.334"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("panel.facebook")}
            className="text-slate-800 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <FaFacebook className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  );

  const mobilePanel = (
    <div className="lg:hidden">
      <Button
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label={t("panel.openMenu") || "Otwórz menu"}
        className="fixed top-4 right-4 z-50 p-3 h-12 w-12 rounded-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg border border-blue-400/20 text-slate-800 dark:text-slate-200"
      >
        <Menu />
      </Button>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <RemoveScroll>
            <motion.div
              className="fixed inset-0 z-[100] bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.div
                className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl flex flex-col"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-blue-400/20 flex items-center justify-between flex-shrink-0">
                  <span className="font-bold text-lg">Quantum Portal</span>
                  <Button
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="ghost"
                    aria-label={t("panel.closeMenu") || "Zamknij menu"}
                    className="p-2 h-auto"
                  >
                    <X />
                  </Button>
                </div>
                <nav className="flex-1 p-3 space-y-2 overflow-y-auto min-h-0">
                  {navItems.map((item) => (
                    <NavButton key={item.id} item={item} isMobile />
                  ))}
                </nav>
                <div className="p-3 border-t border-blue-400/20 space-y-2 flex-shrink-0">
                  {/* Theme Toggle */}
                  <Button
                    onClick={() => {
                      handleThemeToggle();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="ghost"
                    aria-label={
                      theme === "dark"
                        ? t("panel.lightMode")
                        : t("panel.darkMode")
                    }
                    className="w-full flex items-center space-x-4 p-3 h-auto rounded-lg justify-start"
                  >
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      {theme === "dark" ? (
                        <FaSun className="h-6 w-6 text-yellow-400" />
                      ) : (
                        <FaMoon className="h-6 w-6 text-indigo-500" />
                      )}
                    </div>
                    <span className="font-medium">
                      {theme === "dark"
                        ? t("panel.lightMode")
                        : t("panel.darkMode")}
                    </span>
                  </Button>

                  {/* Language Selector */}
                  <div className="p-3 flex flex-col space-y-2">
                    <div className="flex items-center space-x-4">
                      <Languages className="h-6 w-6 text-green-500" />
                      <span className="font-medium">{t("panel.language")}</span>
                    </div>
                    <div className="flex justify-around">
                      {(["pl", "en", "fi"] as const).map((lang) => (
                        <Button
                          key={lang}
                          onClick={() => {
                            handleLanguageChange(lang);
                            setIsMobileMenuOpen(false);
                          }}
                          variant={
                            currentLanguage === lang ? "default" : "ghost"
                          }
                          aria-label={lang.toUpperCase()}
                          className={`flex-1 ${
                            currentLanguage === lang ? "bg-green-500" : ""
                          }`}
                        >
                          {lang.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Accessibility Toggle */}
                  <Button
                    onClick={() => {
                      toggleAccessibility();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="ghost"
                    aria-label={
                      isAccessibilityMode
                        ? t("panel.accessibilityOff")
                        : t("panel.accessibilityOn")
                    }
                    className="w-full flex items-center space-x-4 p-3 h-auto rounded-lg justify-start"
                  >
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      <MdAccessibility
                        className={cn(
                          "h-6 w-6",
                          isAccessibilityMode
                            ? "text-purple-500"
                            : "text-gray-500"
                        )}
                      />
                    </div>
                    <span className="font-medium">
                      {isAccessibilityMode
                        ? t("panel.accessibilityOff")
                        : t("panel.accessibilityOn")}
                    </span>
                  </Button>

                  {/* Legal Links */}
                  <div className="border-t border-blue-400/20 pt-2 mt-2 space-y-1">
                    {legalLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                        aria-label={t(link.labelKey)}
                        className="w-full flex items-center space-x-4 p-3 h-auto transition-colors duration-200 rounded-lg text-slate-800 dark:text-slate-200 hover:bg-blue-500/10 dark:hover:bg-blue-500/20 justify-start"
                      >
                        <link.icon className="h-6 w-6 flex-shrink-0" />
                        <span className="font-medium">{t(link.labelKey)}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Social Media Links */}
                  <div className="border-t border-blue-400/20 pt-2 mt-2">
                    <div className="flex items-center justify-around p-3">
                      <a
                        href="https://github.com/AdamBabinicz"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t("panel.github")}
                        className="text-slate-800 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400"
                      >
                        <FaGithub className="h-6 w-6" />
                      </a>
                      <a
                        href="https://x.com/AdamBabinicz"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t("panel.twitter")}
                        className="text-slate-800 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400"
                      >
                        <SiX className="h-6 w-6" />{" "}
                        {/* Zmienione na FaXTwitter */}
                      </a>
                      <a
                        href="https://www.facebook.com/adam.gierczak.334"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t("panel.facebook")}
                        className="text-slate-800 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400"
                      >
                        <FaFacebook className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </RemoveScroll>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {desktopPanel}
      {mobilePanel}
    </>
  );
}
