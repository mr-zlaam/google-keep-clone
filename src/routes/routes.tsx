import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home/Home";
import SignUp from "@/pages/auth/login/SignUp";
import RootLayout from "@/Layouts/RootLayout";
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
    element: <SignUp />,
  },
]);
