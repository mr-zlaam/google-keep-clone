import { createContext, useContext, useState } from "react";

interface SearchContextType {
  searchItem: string;
  setSearchItem: React.Dispatch<React.SetStateAction<string>>;
}
const SearchContext = createContext<SearchContextType | null>(null);

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchItem, setSearchItem] = useState("helloworld");
  const values = {
    searchItem,
    setSearchItem,
  };
  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
};
const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("context must be in context provider");
  return context;
};
export { useSearchContext, SearchContextProvider };
