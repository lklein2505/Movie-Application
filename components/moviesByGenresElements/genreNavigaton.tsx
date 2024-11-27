import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface GenreNavigationProps {
  onPrev: () => void;
  onNext: () => void;
}

function GenreNavigation ({ onPrev, onNext }: GenreNavigationProps) {
  return (
    <div className="absolute top-6 z-10 flex justify-between w-full px-4 sm:px-8 lg:px-12">
      <button
        onClick={onPrev}
        className="p-3 bg-violet-200 text-violet-950 rounded-full shadow-md hover:bg-violet-500 hover:text-violet-200 transition-all border-2 border-violet-500 hover:border-violet-200"
        aria-label="Previous genre"
      >
        <FaChevronLeft size={20} />
      </button>

      <button
        onClick={onNext}
        className="p-3 bg-violet-300 text-violet-950 rounded-full shadow-md hover:bg-violet-500 hover:text-violet-200 transition-all border-2 border-violet-500 hover:border-violet-200"
        aria-label="Next genre"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default GenreNavigation;
