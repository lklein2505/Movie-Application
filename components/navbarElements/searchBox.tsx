import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: any[];
  isSearchDropdownOpen: boolean;
  setSearchDropdownOpen: (open: boolean) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchQuery,
  setSearchQuery,
  searchResults,
  isSearchDropdownOpen,
  setSearchDropdownOpen,
}) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchDropdownRef = useRef<HTMLUListElement | null>(null);

  // Ensure highlighted item is visible in the dropdown
  useEffect(() => {
    if (
      highlightedIndex !== -1 &&
      searchDropdownRef.current &&
      searchDropdownRef.current.children[highlightedIndex]
    ) {
      const highlightedItem =
        searchDropdownRef.current.children[highlightedIndex] as HTMLElement;
      const dropdown = searchDropdownRef.current;

      const itemTop = highlightedItem.offsetTop;
      const itemBottom = itemTop + highlightedItem.offsetHeight;
      const dropdownScrollTop = dropdown.scrollTop;
      const dropdownHeight = dropdown.offsetHeight;

      if (itemTop < dropdownScrollTop) {
        dropdown.scrollTop = itemTop;
      } else if (itemBottom > dropdownScrollTop + dropdownHeight) {
        dropdown.scrollTop = itemBottom - dropdownHeight;
      }
    }
  }, [highlightedIndex]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        Math.min(prev + 1, searchResults.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex !== -1 && searchResults[highlightedIndex]) {
        const selectedMovie = searchResults[highlightedIndex];
        // Navigate using Link instead of window.location.href
        window.location.href = `/movie/${selectedMovie.id}`;
      } else if (searchQuery.trim() !== "") {
        // Navigate to search results if no movie is highlighted
        window.location.href = `/search?query=${encodeURIComponent(
          searchQuery
        )}`;
      }
    }
  };

  return (
    <div className="relative w-72 md:w-64">
      <input
        type="text"
        placeholder="Search movies..."
        className="w-full px-6 py-3 rounded-lg bg-violet-300 text-gray-950 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600 font-bold text-base md:text-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (searchQuery.trim() !== "") {
            setSearchDropdownOpen(true);
          }
        }}
      />
      {isSearchDropdownOpen && searchResults.length > 0 && (
        <ul
          className="absolute bg-violet-200 text-black w-full mt-1 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto font-bold"
          ref={searchDropdownRef}
          onMouseLeave={() => setHighlightedIndex(-1)}
        >
          {searchResults.map((movie, index) => (
            <li
              key={movie.id}
              className={`p-3 cursor-pointer hover:bg-white transition-colors duration-200 ${
                highlightedIndex === index ? "bg-gray-400" : ""
              }`}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {/* Use Next.js Link for client-side navigation */}
              <Link href={`/movie/${movie.id}`} className="text-gray-700">
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
