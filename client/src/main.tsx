import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; // lub inny plik stylów
import { HelmetProvider } from "react-helmet-async"; // <-- Importuj

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      {" "}
      {/* <-- Dodaj provider na zewnątrz App */}
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
