import { Input } from "@/components/ui/input";
import { useSearchContext } from "@/context/SearchContext";
import { cn } from "@/lib/utils";
import { X as DeleteIcon, Search as SearchIcon } from "lucide-react";
import DivWrapper from "../DivWrapper/DivWrapper";
import { useTheme } from "../theme/theme-provider";

function Search() {
  const { searchItem, setSearchItem } = useSearchContext();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = e.target.value;
    setSearchItem(newData);
  };
  const { theme } = useTheme();
  return (
    <>
      <div
        className={cn(
          "mx-4 bg-background   search md:w-[400px]  rounded-md h-12 relative overflow-hidden"
        )}
      >
        <Input
          value={searchItem}
          onChange={handleOnChange}
          placeholder="Search"
          className={cn(
            "h-full pl-16 pr-12 text-lg font-medium  focus:bg-background focus:boreder focus:border-foreground/40 ",
            theme === "dark" ? "bg-[#525355] text-white" : "bg-[#F0F3F5]"
          )}
        />
        <SearchIcon
          className="absolute top-3.5 left-5  text-foreground"
          size={20}
        />
        {searchItem.length > 0 && (
          <DivWrapper
            onClick={() => {
              setSearchItem("");
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
