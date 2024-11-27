import React from "react";
import Link from "next/link";
import MoviePoster from "./movieCard/moviePoster";
import MovieOverlay from "./movieCard/movieOverlay";
import FavoriteButton from "./movieCard/favoriteButton";
import { useFavorites } from "@/app/context/favoritesContext";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { favoriteMovies, toggleFavorite } = useFavorites();

  const isFavorite = favoriteMovies.some(favMovie => favMovie.id === movie.id);

  return (
    <div
      className="flex-shrink-0 relative w-40 sm:w-44 md:w-48 lg:w-52 transition-all duration-300"
    >
      {/* Wrap only the clickable part (poster) with Link */}
      <Link href={`/movie/${movie.id}`}>
        <div className="relative cursor-pointer">
          <MoviePoster posterPath={movie.poster_path} title={movie.title} />
          <MovieOverlay title={movie.title} />
        </div>
      </Link>

      {/* Favorite button is placed outside the Link */}
      <FavoriteButton
        movieId={movie.id}
        isFavorite={isFavorite}
        onToggleFavorite={() => toggleFavorite(movie)}
      />
    </div>
  );
};

export default MovieCard;
