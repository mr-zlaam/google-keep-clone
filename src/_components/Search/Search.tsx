import { Input } from "@/components/ui/input";
import {} from "react";
import { Search as SearchIcon, X } from "lucide-react";
import DivWrapper from "../DivWrapper/DivWrapper";

function Search() {
  return (
    <>
      <div className="mx-4 bg-background   search md:w-[400px]  rounded-md h-12 relative overflow-hidden">
        <Input
          placeholder="Search"
          className="h-full px-12 text-lg font-medium border border-foreground/60 focus:border-2"
        />
        <SearchIcon
          className="absolute top-3.5 left-2 text-foreground"
          size={20}
        />
        <DivWrapper className="absolute top-2.5 right-0 cursor-pointer text-foreground h-[30px] w-[30px]">
          <X className="" size={20} />
        </DivWrapper>
        {/*show only when something is wrriten*/}
      </div>
    </>
  );
}

export default Search;
