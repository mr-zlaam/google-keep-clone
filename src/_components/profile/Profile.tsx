import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import type { UserTypes } from "@/types";
import { Card } from "@/components/ui/card";
import { GetName } from "./components/GetName";
import { LogOut, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
        <Card className=" shadow-lg border  absolute top-2 right-4 h-[350px] w-[400px] flex flex-col">
          <button
            onClick={() => setIsCardOpen(false)}
            className="absolute rounded-full right-2 top-2 w-[35px] h-[35px] flex justify-center items-center cursor-pointer duration-300 transition-all hover:bg-foreground/10 "
          >
            <X className="" />
          </button>
          <h1 className="my-2 text-center">{userDetails.email}</h1>
          <div className="mx-auto my-3 cursor-pointer flex bg-green-700 select-none items-center justify-center border overflow-hidden rounded-full h-[70px] w-[70px] border-foreground">
            <img
              src={userDetails?.photoURL || ""}
              alt={userDetails.displayName as string}
              className="object-contain w-auto h-auto mx-auto rounded-full"
            />
          </div>
          <h1 className="text-2xl font-medium text-center">
            Hi,{" "}
            {userDetails?.displayName?.split(" ")[0] ||
              "John Doe".split(" ")[0]}
            !
          </h1>
          <Link
            className="flex items-center justify-center py-2 mx-auto my-4 text-sm text-blue-500 transition-all duration-300 border rounded-full hover:bg-background/80 px-7 w-fit border-foreground/60"
            to={"https://myaccount.google.com/"}
          >
            <span>Manage Your Google Account</span>
          </Link>
          <div className="flex items-center mx-auto my-4 overflow-hidden border rounded-full border-foreground/10 w-fit">
            <Link to={"https://accounts.google.com/"} target="_blank">
              <Button
                variant={"outline"}
                className="flex items-center px-4 transition-all duration-200 border-none rounded-none bg-background py-7 hover:bg-foreground/5 "
              >
                <Plus className="mx-2" /> Add Another Account
              </Button>
            </Link>
            <div className="w-[1px] bg-foreground/10 h-full" />
            <Button
              variant={"outline"}
              className="flex items-center px-4 transition-all duration-200 border-none rounded-none bg-background py-7 hover:bg-foreground/5"
            >
              <LogOut className="mx-2" /> Sign out
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}

export default Profile;