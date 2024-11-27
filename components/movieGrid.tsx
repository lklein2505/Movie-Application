import React from "react";
import MovieCard from "@/components/movieCard";

interface MovieGridProps {
  movies: any[];
}

function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div 
      className="mx-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-y-6 justify-items-center"
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
