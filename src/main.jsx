import "./config/local-storage.config.js";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ORMProvider } from "./ORMProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ORMProvider>
        <App />
      </ORMProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
