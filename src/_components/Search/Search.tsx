import { Input } from "@/components/ui/input";
import {} from "react";
import { Search as SearchIcon, X } from "lucide-react";

function Search() {
  return (
    <>
      <div className="mx-4 bg-gray-200  search md:w-[400px] shadow-md rounded-md h-12 relative overflow-hidden">
        <Input
          placeholder="Search"
          className="h-full px-10 text-lg font-medium border-none focus:bg-white focus:outline-none"
        />
        <SearchIcon
          className="absolute top-3.5 left-2 text-foreground"
          size={20}
        />
        <X
          className="absolute cursor-pointer top-3.5 right-3 text-foreground"
          size={20}
        />
        {/*show only when something is wrriten*/}
      </div>
    </>
  );
}

export default Search;
