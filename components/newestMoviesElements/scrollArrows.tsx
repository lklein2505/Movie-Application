import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ScrollArrowsProps {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const ScrollArrows = ({
  canScrollLeft,
  canScrollRight,
  scrollContainerRef,
}: ScrollArrowsProps) => {
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const maxScrollLeft =
        scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({
        left: maxScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 p-4 bg-gray-700 text-white rounded-full shadow-md hover:bg-violet-800 transition-all border-2 border-gray-900 z-10"
        >
          <FaChevronLeft size={30} />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 p-4 bg-gray-700 text-white rounded-full shadow-md hover:bg-violet-800 transition-all border-2 border-gray-900 z-10"
        >
          <FaChevronRight size={30} />
        </button>
      )}
    </>
  );
};

export default ScrollArrows;
