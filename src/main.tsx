import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./_components/theme/theme-provider.tsx";
import { SearchContextProvider } from "./context/SearchContext.tsx";
import "./index.css";
import { routes } from "./routes/routes.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <SearchContextProvider>
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <Toaster />
      <RouterProvider router={routes} />
    </ThemeProvider>
  </SearchContextProvider>
);
