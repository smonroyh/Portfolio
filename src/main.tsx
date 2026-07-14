import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen"; // auto-generado por el plugin

const router = createRouter({ routeTree });

// registro global para type-safety total
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
