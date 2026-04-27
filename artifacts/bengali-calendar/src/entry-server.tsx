import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider, type FilledContext } from "react-helmet-async";
import App from "./App";
import { buildRoutes } from "./routes";

export { buildRoutes };

export function renderRoute(pathname: string): {
  html: string;
  head: string;
} {
  const helmetContext: { helmet?: FilledContext["helmet"] } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={pathname}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  );
  const helmet = helmetContext.helmet;
  const head = helmet
    ? [
        helmet.title?.toString() ?? "",
        helmet.meta?.toString() ?? "",
        helmet.link?.toString() ?? "",
        helmet.script?.toString() ?? "",
      ]
        .filter(Boolean)
        .join("\n    ")
    : "";
  return { html, head };
}
