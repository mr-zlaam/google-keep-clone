import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home/Home";
import Login from "@/pages/auth/login/Login";
import RootLayout from "@/Layouts/RootLayout";
import ErrorPage from "@/pages/error/ErrorPage";
import SlugLayout from "@/Layouts/SlugLayout";
import Slug from "@/pages/slug/Slug";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth/user/login",
    element: <Login />,
  },
  {
    path: "/1/:slug",
    element: <SlugLayout />,
    children: [
      {
        path: "",
        element: <Slug />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
