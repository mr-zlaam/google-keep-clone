import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { routes } from "./routes/routes.tsx";
import { ThemeProvider } from "./_components/theme/theme-provider.tsx";
import { Toaster } from "sonner";
import { SearchContextProvider } from "./context/SearchContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  //TODO:Remove strict mode in production...
  <React.StrictMode>
    <SearchContextProvider>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <Toaster />
        <RouterProvider router={routes} />
      </ThemeProvider>
    </SearchContextProvider>
  </React.StrictMode>
);
