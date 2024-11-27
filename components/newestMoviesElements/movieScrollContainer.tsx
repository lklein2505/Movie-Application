import React from "react";
import MovieCard from "../movieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieScrollContainerProps {
  movies: Movie[];
  checkScroll: () => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const MovieScrollContainer = ({
  movies,
  checkScroll,
  scrollContainerRef,
}: MovieScrollContainerProps) => {
  const handleTouchStart = (e: React.TouchEvent) => {
    const startX = e.touches[0].pageX;
    const scrollLeftStart = scrollContainerRef.current?.scrollLeft || 0;

    const handleTouchMove = (e: TouchEvent) => {
      const moveX = e.touches[0].pageX - startX;
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollLeftStart - moveX;
      }
      checkScroll();
    };

    const handleTouchEnd = () => {};

    // Use native event listeners
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener(
        "touchmove",
        handleTouchMove as EventListener,
        { passive: true }
      );
      scrollContainerRef.current.addEventListener(
        "touchend",
        handleTouchEnd as EventListener,
        { passive: true }
      );
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="flex overflow-x-auto space-x-6 md:space-x-2 scrollbar-hide mx-2 md:mx-24 touch-pan-x"
      onScroll={checkScroll}
      onTouchStart={handleTouchStart}
    >
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="relative flex-shrink-0 w-36 sm:w-44 md:w-56 space-y-2"
        >
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MovieScrollContainer;
