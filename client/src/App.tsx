import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nextProvider } from "react-i18next";
import i18n from "./translations";
import {
  QuantumContextProvider,
  useQuantumContext,
} from "./contexts/QuantumContext";
import { ThemeProvider } from "@/components/theme-provider";
import QuantumPortal from "@/pages/quantum-portal";
import NotFound from "@/pages/not-found";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={QuantumPortal} />
      <Route path="/terms" component={TermsOfService} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { state } = useQuantumContext();
  const { isAccessibilityMode } = state;

  useEffect(() => {
    const body = document.documentElement;
    if (isAccessibilityMode) {
      body.classList.add("accessibility-mode");
    } else {
      body.classList.remove("accessibility-mode");
    }
  }, [isAccessibilityMode]);

  return (
    <>
      <Toaster />
      <Router />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <TooltipProvider>
          <ThemeProvider defaultTheme="dark" storageKey="quantum-portal-theme">
            <QuantumContextProvider>
              <AppContent />
            </QuantumContextProvider>
          </ThemeProvider>
        </TooltipProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export default App;
