import { useLoginChecker } from "@/protectedRoute";
import { Outlet } from "react-router-dom";

function RootLayout() {
  const isLogin = useLoginChecker();
  return (
    <>
      <main>{isLogin && <Outlet />}</main>
    </>
  );
}

export default RootLayout;
