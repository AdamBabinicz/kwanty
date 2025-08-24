
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nextProvider } from 'react-i18next';
import i18n from './translations';
import { QuantumContextProvider } from "./contexts/QuantumContext";
import QuantumPortal from "@/pages/quantum-portal";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={QuantumPortal} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <TooltipProvider>
          <QuantumContextProvider>
            <Toaster />
            <Router />
          </QuantumContextProvider>
        </TooltipProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export default App;
