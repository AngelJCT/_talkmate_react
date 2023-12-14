import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthComponent from "./components/auth/AuthComponent";
import AuthPage from "./components/auth/AuthPage";
import { AnimatePresence } from "framer-motion";
import WelcomePage from "./components/WelcomePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/chat" element={<App />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  </React.StrictMode>
);
