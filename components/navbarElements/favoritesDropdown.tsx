import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useFavorites } from "@/app/context/favoritesContext";

// Define the Movie type (with the poster_path field)
interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const FavoritesDropdown: React.FC = () => {
  const { favoriteMovies, toggleFavorite } = useFavorites();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close the dropdown if a click outside of it occurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 hover:text-violet-300 font-bold"
      >
        <span>Favorites</span>
        <span
          className={`text-sm transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 bg-violet-200 rounded-lg shadow-lg z-10 w-72 overflow-hidden transition-all duration-300"
        >
          {favoriteMovies.length > 0 ? (
            <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200">
              {favoriteMovies.map((movie: Movie) => (
                <li
                  key={movie.id}
                  className="flex justify-between items-center p-3 hover:bg-gray-100 transition-colors"
                >
                  {/* Link to the movie page */}
                  <Link
                    href={`/movie/${movie.id}`}
                    className="flex-1 text-black font-bold truncate"
                  >
                    {movie.title}
                  </Link>

                  {/* Button to remove movie from favorites */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(movie);
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors font-bold"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-2 text-gray-700">No favorites yet.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesDropdown;
