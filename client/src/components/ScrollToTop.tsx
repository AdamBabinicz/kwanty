import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => setVisible(window.scrollY > 100); // mniejsze 100px, żeby łatwiej testować
    checkScroll(); // <-- sprawdza przy mount, jeśli strona jest już przewinięta
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  if (!visible) return null;

  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Przewiń do góry"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-quantum-cyan text-background shadow-lg transition-all duration-300 hover:bg-quantum-cyan-light hover:scale-110"
    >
      <ArrowUp className="h-6 w-6" />
    </Button>
  );
}
