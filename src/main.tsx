import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { routes } from "./routes/routes.tsx";
import { ThemeProvider } from "./_components/theme/theme-provider.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <RouterProvider router={routes} />
    </ThemeProvider>
  </React.StrictMode>
);
