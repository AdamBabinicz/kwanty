import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { I18nextProvider } from 'react-i18next';
import i18n from './translations';
import App from './App.tsx';
import './index.css';
import { QuantumContextProvider } from './contexts/QuantumContext';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <TooltipProvider>
          <QuantumContextProvider>
            <App />
            <Toaster />
          </QuantumContextProvider>
        </TooltipProvider>
      </I18nextProvider>
    </QueryClientProvider>
  </StrictMode>,
);