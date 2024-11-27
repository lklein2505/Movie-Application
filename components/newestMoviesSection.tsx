import React, { useState, useEffect } from "react";
import ScrollArrows from "./newestMoviesElements/scrollArrows";
import MovieScrollContainer from "./newestMoviesElements/movieScrollContainer";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface NewestMoviesProps {
  movies: Movie[];
}

const NewestMoviesSection = ({ movies }: NewestMoviesProps) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

  // Check if we can scroll left or right
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const clientWidth = scrollContainerRef.current.clientWidth;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Recalculate whether the arrows should be visible when the container scrolls
  useEffect(() => {
    checkScroll();
  }, [movies]);

  return (
    <section className="px-4 relative pt-8">
      {/* Centered Title */}
      <div className="flex justify-center items-center mb-2 h-32">
        <h2 className="text-3xl md:text-4xl font-bold">Newest Movies</h2>
      </div>

      <div className="relative">
        <ScrollArrows
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
          scrollContainerRef={scrollContainerRef}
        />

        <MovieScrollContainer
          movies={movies}
          checkScroll={checkScroll}
          scrollContainerRef={scrollContainerRef}
        />
      </div>
    </section>
  );
};

export default NewestMoviesSection;
