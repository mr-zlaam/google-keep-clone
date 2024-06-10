import { auth, googleProvider } from "@/backend/db/firebase.config";
import Cookies from "universal-cookie";

import { getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";

import { useMessage } from "@/hooks/useMessage";
import usePreviousRoute from "@/hooks/usePreviousRoute";
import { UserTypes } from "@/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const { errorMessage, successMessage } = useMessage();
  const existingUidOnCookie = cookie.get("uid") as string;
  const prevRoute = usePreviousRoute();
  useEffect(() => {
    if (prevRoute.pathname !== "/auth/user/login")
      errorMessage("You have to login first...");
    if (!existingUidOnCookie || existingUidOnCookie?.trim() === "") return;
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (existingUidOnCookie === user?.uid) return navigate("/");
    });
  }, []);
  const handleLoginWithGoogle = async () => {
    try {
      const registerUser = await signInWithPopup(auth, googleProvider);
      if (registerUser.user.email?.trim() !== "") {
        const user: UserTypes = registerUser.user;
        const uid = user.uid;

        successMessage(`${user.displayName || "User"} Signed in Successfully.`);
        cookie.set("uid", uid, {
          maxAge: 1000 * 60 * 1000,
        });
        return navigate("/");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        return errorMessage(
          error.message || "something went wrong while signing !!"
        );
      }
      return errorMessage("unknown error occured!!");
    }
  };

  return (
    <main className="flex items-center justify-center w-full h-screen select-none bg-background">
      <button
        onClick={handleLoginWithGoogle}
        className="flex items-center transition-all duration-300 rounded-lg shadow-2xl cursor-default md:text-xl sm:text-2xl shadow-foreground/50 p-7 bg-foreground text-background hover:scale-110 active:scale-75"
      >
        <FaGoogle size={40} />
        <span className="mx-4">Continue with Google</span>
      </button>
    </main>
  );
}
