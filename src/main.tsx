import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";  
import { BetSlipProvider } from "./components/Bet/BetSlipContext";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>   
      <AuthProvider>
        <BetSlipProvider>
          <App />
        </BetSlipProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>
);
