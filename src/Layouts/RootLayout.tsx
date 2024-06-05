import Navbar from "@/_components/navbar/Navbar";
import { useLoginChecker } from "@/protectedRoute";
import { Outlet } from "react-router-dom";

function RootLayout() {
  const isLogin = useLoginChecker();
  return (
    <>
      <main>
        <Navbar />
        {isLogin && <Outlet />}
      </main>
    </>
  );
}

export default RootLayout;
