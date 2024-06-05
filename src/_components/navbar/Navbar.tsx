import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import {} from "react";

function Navbar() {
  return (
    <>
      <header className="h-[80px] w-full bg-background shadow-md text-foreground flex justify-around items-center ">
        <h1>Logo</h1>
        <div className="mx-4 bg-gray-200  search md:w-[400px] shadow-md rounded-md h-12 relative overflow-hidden">
          <Input
            placeholder="Search"
            className="h-full px-10 text-lg font-medium border-none focus:bg-white focus:outline-none"
          />
          <Search
            className="absolute top-3.5 left-2 text-foreground"
            size={20}
          />
          <X
            className="absolute cursor-pointer top-3.5 right-3 text-foreground"
            size={20}
          />
          {/*show only when something is wrriten*/}
        </div>
        <div className="mx-4 account">Account</div>
      </header>
    </>
  );
}

export default Navbar;
