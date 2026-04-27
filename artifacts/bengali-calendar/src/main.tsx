import { hydrateRoot, createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

const base = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";
const rootEl = document.getElementById("root")!;

const tree = (
  <HelmetProvider>
    <BrowserRouter basename={base}>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, tree);
} else {
  createRoot(rootEl).render(tree);
}
