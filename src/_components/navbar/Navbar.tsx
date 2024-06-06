import {} from "react";
import Search from "../Search/Search";
import Profile from "../profile/Profile";
import { ModeToggler } from "../theme/ModeToggler";

function Navbar() {
  return (
    <>
      <header className="h-[80px] w-full bg-background shadow-md text-foreground flex justify-around items-center ">
        <h1>Logo</h1>
        <Search />
        <div className="flex items-center justify-center gap-3">
          <ModeToggler />
          <Profile />
        </div>
      </header>
    </>
  );
}

export default Navbar;
