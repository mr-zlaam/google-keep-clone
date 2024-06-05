import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home/Home";
import Login from "@/pages/auth/login/Login";
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
    element: <Login />,
  },
]);
