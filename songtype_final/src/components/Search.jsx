import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Searching for:", search);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-lg">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 px-4 pr-12 text-sm bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600 text-gray-100 placeholder-gray-400"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-gray-200"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
