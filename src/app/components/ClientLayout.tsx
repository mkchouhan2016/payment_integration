"use client";

import { useState } from "react";
import Header from "./Header";
import { ThemeProvider } from "../context/ThemeContext";
import { SearchProvider } from "../context/SearchContext";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  console.log(searchQuery);
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SearchProvider>
          <div className="min-h-screen">
            <Header onSearch={handleSearch} />
            <main className="container mx-auto py-8 px-4">{children}</main>
          </div>
        </SearchProvider>
      </ThemeProvider>
    </Provider>
  );
}
