import { createContext, useState, useContext, ReactNode } from "react";

// 1. Correct the interface
interface SearchContextType {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

// 2. Create context with a default value
const SearchContext = createContext<SearchContextType>({
  search: '',
  setSearch: () => {},
});

// 3. Properly type the props of SearchProvider
interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [search, setSearch] = useState<string>('');

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

// 4. Export a hook to use the context
export const useSearch = () => useContext(SearchContext);
