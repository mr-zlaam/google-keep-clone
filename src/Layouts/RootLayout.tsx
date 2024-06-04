import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function RootLayout() {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const auth = getAuth();
  const uidFromCookie = cookie.get("uid");
  console.log(uidFromCookie);
  useEffect(() => {
    if (!uidFromCookie) return navigate("/auth/user/sign-up");
    onAuthStateChanged(auth, (user) => {
      if (user?.uid === uidFromCookie) setIsLogin(true);
      else return navigate("/auth/user/sign-up");
    });
  }, []);
  return (
    <>
      <main>
        {isLogin ? <Outlet /> : <Navigate to={"/auth/user/sign-up"} />}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
