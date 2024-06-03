import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validDateEmail, validDatePassword } from "@/utils/validator.regex";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
  };
  const DataValidator = () => {
    const { email, password, username } = userData;
    if (!username || !email || !password)
      return setError("All fields are required!!.");
    const isEmailValid = validDateEmail(email);
    if (!isEmailValid) return setError("Invalid Email Address");
    const isPasswordValid = validDatePassword(password);
    if (!isPasswordValid)
      return setError(
        "This password is not valid please choose other password"
      );
    setError("");
  };
  const handleRegisterUser = async () => {
    // const { email, password, username } = userData;
    DataValidator();
  };
  return (
    <Card className="absolute max-w-sm px-5 mx-auto transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 centered-element ">
      <CardHeader>
        <p className="text-xs font-semibold text-center text-red-500">
          {error}{" "}
        </p>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter username, email and password in order to register yourself.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="john_doe"
              name="username"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="relative grid gap-2">
            <div className="flex items-center ">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type={isPassVisible ? "text" : "password"}
              name="password"
              onChange={handleOnChange}
              required
              className="pr-10"
            />
            <span
              onClick={() => {
                setIsPassVisible((prev) => !prev);
              }}
              className="absolute h-[30px] w-[30px] duration-300 transition-all hover:bg-black/20 flex justify-center cursor-pointer rounded-full items-center right-2 top-6"
            >
              {isPassVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </span>
          </div>
          <Button onClick={handleRegisterUser} type="submit" className="w-full">
            Sign up
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link to="/auth/user/sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
