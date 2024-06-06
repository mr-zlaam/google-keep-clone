import Loader from "@/_components/loding/Loader";
import Navbar from "@/_components/navbar/Navbar";
// import useOnlineStatus from "@/hooks/useStatus"; //**TODO:on this thing in production */
import { useLoginChecker } from "@/protectedRoute";
import { Outlet } from "react-router-dom";

function RootLayout() {
  const { isLogin, isLoading } = useLoginChecker();
  // const isOnline = useOnlineStatus();
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  return (
    <>
      {/* {!isOnline ? ( */}
      <main className="">
        <Navbar />
        {isLogin && <Outlet />}
      </main>
      {/* ) : ( */}
      {/* <div className="flex items-center justify-center h-screen bg-background">
        <h1 className="text-4xl font-bold text-red-500">
          You can&apos;t access data without internet!!
        </h1>
      </div> */}
      {/* )} */}
    </>
  );
}

export default RootLayout;
