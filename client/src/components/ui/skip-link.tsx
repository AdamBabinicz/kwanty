import { Button } from '@/components/ui/button';

export default function SkipLink() {
  const skipToMain = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button
      onClick={skipToMain}
      className="sr-only focus:not-sr-only fixed top-4 left-4 z-[9999] bg-primary text-primary-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-4 focus:ring-ring"
      aria-label="Przejdź do głównej zawartości strony"
      data-testid="skip-link"
    >
      Przejdź do głównej zawartości
    </Button>
  );
}