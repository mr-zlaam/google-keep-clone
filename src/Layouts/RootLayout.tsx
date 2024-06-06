import Loader from "@/_components/loding/Loader";
import Navbar from "@/_components/navbar/Navbar";
import useOnlineStatus from "@/hooks/useStatus";
import { useLoginChecker } from "@/protectedRoute";
import { Outlet } from "react-router-dom";

function RootLayout() {
  const { isLogin, isLoading } = useLoginChecker();
  const isOnline = useOnlineStatus();
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  return (
    <>
      {isOnline ? (
        <main className="">
          <Navbar />
          {isLogin && <Outlet />}
        </main>
      ) : (
        <div className="flex items-center justify-center h-screen bg-foreground">
          <h1 className="text-4xl font-bold text-red-500">
            You are offline please connect to the internet!!
          </h1>
        </div>
      )}
    </>
  );
}

export default RootLayout;
