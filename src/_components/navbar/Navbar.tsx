import {} from "react";
import Search from "../Search/Search";
import Profile from "../profile/Profile";
import { ModeToggler } from "../theme/ModeToggler";
import { Link } from "react-router-dom";
import logo from "@/assets/image.png";
function Navbar() {
  return (
    <>
      <header className="h-[80px] w-full bg-background shadow-md text-foreground flex justify-around items-center ">
        <h1>
          <Link to="/" className="select-none">
            <img src={logo} alt="Z-Notes" width={70} />
          </Link>
        </h1>
        <Search />
        <div className="flex items-center justify-center gap-3">
          <ModeToggler />
          <Profile />
        </div>
      </header>
      <hr />
    </>
  );
}

export default Navbar;
