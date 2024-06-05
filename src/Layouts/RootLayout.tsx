import { RouteProtector } from "@/protectedRoute";
import { Outlet } from "react-router-dom";

function RootLayout() {
  const isLogin = RouteProtector();
  return (
    <>
      <main>{isLogin && <Outlet />}</main>
    </>
  );
}

export default RootLayout;
