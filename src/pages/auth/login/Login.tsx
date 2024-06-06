import { auth, googleProvider } from "@/backend/db/firebase.config";
import Cookies from "universal-cookie";

import { getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";

import { UserTypes } from "@/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const cookie = new Cookies();
  const navigate = useNavigate();

  const existingUidOnCookie = cookie.get("uid") as string;
  useEffect(() => {
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

        alert("Logged in Successfully");
        cookie.set("uid", uid, {
          maxAge: 1000 * 60 * 1000,
        });
        return navigate("/");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        return error.message;
      }
      return error;
    }
  };

  return (
    <main className="flex items-center justify-center w-full h-screen select-none bg-background">
      <button
        onClick={handleLoginWithGoogle}
        className="flex items-center text-2xl transition-all duration-300 border rounded-lg p-7 bg-foreground text-background hover:scale-110 active:scale-75"
      >
        <FaGoogle size={40} />
        <span className="mx-4">Continue with Google</span>
      </button>
    </main>
  );
}
