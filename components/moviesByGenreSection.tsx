import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./movieCard";
import GenreNavigation from "./moviesByGenresElements/genreNavigaton";
import GenreDots from "./moviesByGenresElements/genreDots";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MoviesByGenreSectionProps {
  genreName: string;
  movies: Movie[];
  activeGenreIndex: number;
  setActiveGenreIndex: React.Dispatch<React.SetStateAction<number>>;
}

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
  { id: 14, name: "Fantasy" },
  { id: 16, name: "Animation" },
];

const MoviesByGenreSection = ({
  genreName,
  movies,
  activeGenreIndex,
  setActiveGenreIndex,
}: MoviesByGenreSectionProps) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleNextGenre = () => {
    setActiveGenreIndex((prevIndex) => (prevIndex + 1) % genres.length);
  };

  const handlePrevGenre = () => {
    setActiveGenreIndex((prevIndex) =>
      prevIndex === 0 ? genres.length - 1 : prevIndex - 1
    );
  };

  // Handle the mouse wheel event for genre navigation
  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    if (event.deltaY > 0) {
      handleNextGenre();
    } else {
      handlePrevGenre();
    }
  };

  // Event listener for mouse wheel when the component mounts
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const carouselElement = carouselRef.current;

    if (carouselElement) {
      // Wheel event listener to prevent default scrolling behavior
      carouselElement.addEventListener("wheel", handleWheel, { passive: false });

      // Cleanup the event listener on unmount
      return () => {
        if (carouselElement) {
          carouselElement.removeEventListener("wheel", handleWheel);
        }
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // Drag start function
  const handleDragStart = (e: React.MouseEvent) => {
    if (isMobile) {
      setDragging(true);
      setDragStartX(e.clientX);
      setScrollLeft(carouselRef.current?.scrollLeft || 0);
    }
  };

  // Dragging function
  const handleDragging = (e: React.MouseEvent) => {
    if (!dragging || !isMobile) return;
    const moveX = e.clientX - dragStartX;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - moveX;
    }
  };

  // Drag end function
  const handleDragEnd = () => {
    setDragging(false);
  };

  return (
    <section className="my-16 px-6 sm:px-12 md:px-16 lg:px-20">
      <div
        ref={carouselRef}
        className="relative flex flex-col items-center w-full max-w-5xl mx-auto rounded-3xl bg-gradient-to-b opacity-80 from-violet-950 via-gray-800/80 to-black p-6 overflow-hidden border-gray-600"
        style={{
          overflowX: isMobile ? "hidden" : "auto",
          userSelect: "none",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragging}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        {/* Title (hidden on small screens) */}
        {!isMobile && (
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-violet-200">
              {genreName}
            </h2>
          </div>
        )}

        {/* Genre Arrow Navigation (for desktop) */}
        {!isMobile && (
          <GenreNavigation onPrev={handlePrevGenre} onNext={handleNextGenre} />
        )}

        {/* Mobile Dropdown for Genre Navigation */}
        {isMobile && (
          <div className="mb-6 w-full flex justify-center">
            <select
              value={activeGenreIndex}
              onChange={(e) => setActiveGenreIndex(Number(e.target.value))}
              className="w-48 sm:w-64 p-3 bg-gradient-to-b font-bold from-violet-500 to-violet-700 text-violet-100 rounded-md border-2 border-violet-900 focus:ring-2 focus:ring-violet-300 focus:outline-none"
            >
              {genres.map((genre, index) => (
                <option
                  key={genre.id}
                  value={index}
                  className="bg-violet-200 text-violet-950 font-bold"
                >
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Movie Cards (Carousel) */}
        <div
          className={`flex gap-4 mb-6 ${isMobile ? "flex-col" : "flex-row"} overflow-x-auto px-4 sm:px-6 lg:px-8`}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Genre Dots Navigation (hidden on small screens) */}
        {!isMobile && (
          <GenreDots
            activeGenreIndex={activeGenreIndex}
            onChange={setActiveGenreIndex}
          />
        )}
      </div>
    </section>
  );
};

export default MoviesByGenreSection;
