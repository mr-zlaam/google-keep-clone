import {} from "react";
import Search from "../Search/Search";
import Profile from "../profile/Profile";

function Navbar() {
  return (
    <>
      <header className="h-[80px] w-full bg-background shadow-md text-foreground flex justify-around items-center ">
        <h1>Logo</h1>
        <Search />
        <Profile />
      </header>
    </>
  );
}

export default Navbar;
