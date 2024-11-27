import React from "react";

interface MoviePosterProps {
  posterPath: string;
  title: string;
}

const MoviePoster = ({ posterPath, title }: MoviePosterProps) => {
  return (
    <img
      src={`https://image.tmdb.org/t/p/w500${posterPath}`}
      alt={title}
      className="rounded-lg w-full h-auto cursor-pointer transition-transform duration-300 hover:scale-105 font-bold"
    />
  );
};

export default MoviePoster;
