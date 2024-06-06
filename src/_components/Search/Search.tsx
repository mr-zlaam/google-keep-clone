import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search as SearchIcon, X as DeleteIcon } from "lucide-react";
import DivWrapper from "../DivWrapper/DivWrapper";

function Search() {
  const [searchData, setSearchData] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = e.target.value;
    setSearchData(newData);
  };
  return (
    <>
      <div className="mx-4 bg-background   search md:w-[400px]  rounded-md h-12 relative overflow-hidden">
        <Input
          value={searchData}
          onChange={handleOnChange}
          placeholder="Search"
          className="h-full px-12 text-lg font-medium border border-foreground/60 focus:border-2"
        />
        <SearchIcon
          className="absolute top-3.5 left-2 text-foreground"
          size={20}
        />
        {searchData.length > 0 && (
          <DivWrapper
            onClick={() => {
              setSearchData("");
            }}
            className="absolute top-2.5 right-0 cursor-pointer text-foreground h-[30px] w-[30px]"
          >
            <DeleteIcon className="" size={20} />
          </DivWrapper>
        )}
        {/*show only when something is wrriten*/}
      </div>
    </>
  );
}

export default Search;
