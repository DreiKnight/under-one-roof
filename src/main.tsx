import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "@/context/AuthContext";
import { ActivePropertyProvider } from "@/context/ActivePropertyContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ActivePropertyProvider>
          <App />
        </ActivePropertyProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
