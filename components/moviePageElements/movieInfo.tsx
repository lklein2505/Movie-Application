import React, { useState, useEffect } from "react";
import { useFavorites } from "@/app/context/favoritesContext";

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  runtime: number;
  production_countries: { iso_3166_1: string; name: string }[];
  poster_path: string;
}

interface MovieInfoProps {
  movie: MovieDetails;
}

const MovieInfo = ({ movie }: MovieInfoProps) => {
  const { favoriteMovies, toggleFavorite } = useFavorites();

  // Local state to manage the "favorite" status
  const [isFavorite, setIsFavorite] = useState(
    favoriteMovies.some((favMovie) => favMovie.id === movie.id)
  );

  // Sync the local state with the global favorites list when it changes
  useEffect(() => {
    setIsFavorite(favoriteMovies.some((favMovie) => favMovie.id === movie.id));
  }, [favoriteMovies]);

  // Handle favorite toggle
  const handleToggleFavorite = () => {
    toggleFavorite(movie);
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mx-16 relative">
      {/* Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-64 h-auto rounded-lg mb-6 md:mb-0 md:mr-6 md:w-64 transform -translate-y-12 mx-auto"
      />

      {/* Movie Info */}
      <div className="flex-1 relative">
        <h1 className="text-4xl font-bold text-center md:text-left mb-4">
          {movie.title}
        </h1>
        <p className="text-violet-200 mb-4">{movie.overview}</p>

        {/* Details */}
        <p>
          <strong>Score:</strong> {movie.vote_average}
        </p>
        <p>
          <strong>Genres:</strong>{" "}
          {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p>
          <strong>Duration:</strong> {movie.runtime} minutes
        </p>
        <p>
          <strong>Country:</strong>{" "}
          {movie.production_countries.map((c) => c.name).join(", ")}
        </p>

        {/* Star Icon for Favorites */}
        <button
          onClick={handleToggleFavorite}
          className={`relative text-5xl rounded-full py-2 ${
            isFavorite ? "text-yellow-400" : "text-white"
          } hover:text-violet-400 transition-colors duration-300 group`}
        >
          ★
          <div
            className="absolute bottom-full mb-2 right-4 translate-x-0 w-max px-2 py-1 bg-violet-950 text-violet-100 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          >
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </div>
        </button>
      </div>
    </div>
  );
};

export default MovieInfo;
