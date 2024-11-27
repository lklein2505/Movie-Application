"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Define the Movie type
interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

// Define the context type
interface FavoritesContextType {
  favoriteMovies: Movie[];
  toggleFavorite: (movie: Movie) => void;
}

// Create the context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Custom hook to use the FavoritesContext
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

// Local storage key for favorites
const FAVORITES_STORAGE_KEY = "favoriteMovies";

// FavoritesProvider component
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    }
    return [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  // Function to toggle the favorite status of a movie
  const toggleFavorite = (movie: Movie) => {
    setFavoriteMovies((prevFavorites) =>
      prevFavorites.some((favMovie) => favMovie.id === movie.id)
        ? prevFavorites.filter((favMovie) => favMovie.id !== movie.id)
        : [...prevFavorites, movie]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favoriteMovies, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
