import React, { useState, useEffect, useRef } from "react";
import NavbarButton from "./navbarElements/navbarButton";
import SearchBox from "./navbarElements/searchBox";
import FavoritesDropdown from "./navbarElements/favoritesDropdown";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const searchDropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch search results when searchQuery changes
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setSearchDropdownOpen(false);
      return;
    }

    const debounce = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=ca50dc8c5cef924f6657eede2ad4d533&query=${searchQuery}`
        );
        const data = await response.json();
        setSearchResults(data.results || []);
        setSearchDropdownOpen(true);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  // Close dropdowns and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !searchDropdownRef.current?.contains(target) &&
        !mobileMenuRef.current?.contains(target) &&
        !mobileMenuButtonRef.current?.contains(target)
      ) {
        setSearchDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check if the page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isClient) return null;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 p-1 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-b from-violet-950 via-violet-950/100 to-transparent"
          : "bg-gradient-to-b from-violet-950 via-violet-950/80 to-transparent"
      } text-white min-h-[80px]`}
    >
      {/* Large Screen Navbar */}
      <div className="hidden md:flex container mx-auto items-center justify-center p-6 mb-12 space-x-8">
        <NavbarButton href="/">Home</NavbarButton>
        <div ref={searchDropdownRef}>
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
            isSearchDropdownOpen={isSearchDropdownOpen}
            setSearchDropdownOpen={setSearchDropdownOpen}
          />
        </div>
        <NavbarButton href="/most-watched">Most Watched</NavbarButton>
        <FavoritesDropdown />
      </div>

      {/* Mobile Screen Navbar */}
      <div className="flex md:hidden justify-between items-center px-6 py-4 bg-violet-950/80 rounded-b-xl relative z-20 min-h-[90px]">
        {/* SearchBox on the left */}
        <div
          ref={searchDropdownRef}
          className="flex-none max-w-sm p-2"
        >
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
            isSearchDropdownOpen={isSearchDropdownOpen}
            setSearchDropdownOpen={setSearchDropdownOpen}
          />
        </div>

        {/* Burger Menu or X on the right */}
        <button
          ref={mobileMenuButtonRef}
          className="ml-4 p-4 text-3xl rounded-md hover:bg-violet-800 z-30"
          onClick={() => {
            setMobileMenuOpen((prev) => !prev);
            console.log("Toggling mobile menu");
          }}
        >
          {!isMobileMenuOpen ? "☰" : "✖"}
        </button>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="absolute top-20 right-6 w-56 bg-violet-900 text-white rounded-lg shadow-lg z-50"
          >
            <ul className="flex flex-col divide-y divide-violet-700 p-1">
              <li className="p-3">
                <NavbarButton href="/">Home</NavbarButton>
              </li>
              <li className="p-3">
                <NavbarButton href="/most-watched">Most Watched</NavbarButton>
              </li>
              <li className="p-3">
                <FavoritesDropdown />
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
