import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { initAnalyticsSession, endAnalyticsSession } from "./utils/analytics.js";
import { GoogleOAuthProvider } from "@react-oauth/google";



ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="936680291642-mtc8ku530b607q9ie0k9q9gu08j3pkku.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("Service Worker Registered"))
      .catch((err) => console.error("SW registration failed:", err));
  });
}

