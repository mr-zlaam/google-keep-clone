import {} from "react";
import Search from "../Search/Search";
import Profile from "../profile/Profile";
import { ModeToggler } from "../theme/ModeToggler";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <header className="h-[80px] w-full bg-background shadow-md text-foreground flex justify-around items-center ">
        <h1>
          <Link to="/">
            <img
              src="https://justzlaam.netlify.app/_next/image?url=%2Flogo%2Fimage.png&w=96&q=75"
              alt="Z-Notes"
              width={70}
            />
          </Link>
        </h1>
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
