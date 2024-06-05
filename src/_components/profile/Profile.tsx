import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import type { UserTypes } from "@/types";
import { Card } from "@/components/ui/card";
import { GetName } from "./components/GetName";
import { X } from "lucide-react";
function Profile() {
  const [userDetails, setUserDetails] = useState<null | UserTypes>(null);
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserDetails(user);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      {isCardOpen && (
        <div
          onClick={() => setIsCardOpen(false)}
          className="before:fixed before:h-screen before: before:w-full before:bg-foreground/5 before:top-0 before:left-0"
        />
      )}{" "}
      {!isCardOpen && (
        <div
          onClick={() => {
            setIsCardOpen((prev) => !prev);
          }}
          className=" cursor-pointer flex bg-green-700 select-none items-center justify-center border overflow-hidden rounded-full h-[50px] w-[50px] border-foreground"
        >
          {userDetails?.photoURL ? (
            <img
              src={userDetails?.photoURL}
              alt={userDetails?.displayName as string}
              className="object-contain w-auto h-auto rounded-full"
            />
          ) : (
            <h1 className="text-2xl font-bold text-white">
              <GetName name={userDetails?.displayName || ""} />
            </h1>
          )}
        </div>
      )}
      {isCardOpen && userDetails && (
        <Card className="bg-background shadow-lg border  absolute top-2 right-4 h-[400px] w-[400px] flex flex-col">
          <button
            onClick={() => setIsCardOpen(false)}
            className="absolute rounded-full right-2 top-2 w-[35px] h-[35px] flex justify-center items-center cursor-pointer duration-300 transition-all hover:bg-foreground/10 "
          >
            <X className="" />
          </button>
          <h1 className="my-2 text-center">{userDetails.email}</h1>
        </Card>
      )}
    </>
  );
}

export default Profile;
