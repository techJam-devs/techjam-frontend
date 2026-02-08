/**
 * @description This displays the search bar
 */

import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log("Searching for:", query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-full xl:w-auto flex items-center gap-2 bg-gray-100 rounded-full px-8 py-2 transition-all duration-300"
    >
      {/* Mobile toggle for search input */}
      <button type="button">
        <Search className="text-gray-600" />
      </button>

      {/* Search input (hidden on mobile unless toggled) */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`outline-none text-sm text-gray-800 w-[60vw] lg:w-48 xl:w-64 transition-all duration-300}`}
      />
    </form>
  );
};

export default SearchBar;
