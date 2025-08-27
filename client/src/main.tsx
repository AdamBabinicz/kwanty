import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      {" "}
      {/* <-- Dodaj provider na zewnątrz App */}
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
