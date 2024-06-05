import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export const useLoginChecker = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const auth = getAuth();
  const uidFromCookie = cookie.get("uid");
  useEffect(() => {
    if (!uidFromCookie) return navigate("/auth/user/sign-up");
    onAuthStateChanged(auth, (user) => {
      if (user?.uid === uidFromCookie) setIsLogin(true);
      else return navigate("/auth/user/sign-up");
    });
  }, []);
  return isLogin;
};
