import RootLayout from "@/Layouts/RootLayout";
import SlugLayout from "@/Layouts/SlugLayout";
import Login from "@/pages/auth/login/Login";
import ErrorPage from "@/pages/error/ErrorPage";
import Home from "@/pages/home/Home";
import Slug from "@/pages/slug/Slug";
import UpdateSlug from "@/updateNote/UpdateSlug";
import { createBrowserRouter } from "react-router-dom";
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
    path: "",
    element: <SlugLayout />,
    children: [
      {
        path: "/1/:slug",
        element: <Slug />,
      },
      {
        path: "/updateNote/:updateSlug",
        element: <UpdateSlug />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
