import React from "react";

interface FavoriteButtonProps {
  movieId: number;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const FavoriteButton = ({movieId, isFavorite, onToggleFavorite,}: FavoriteButtonProps) => {
  return (
    <div className="absolute bottom-2 right-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(movieId);
        }}
        className={`relative text-2xl rounded-full p-2 ${
          isFavorite ? "text-yellow-400" : "text-white"
        } bg-gray-800 hover:bg-yellow-400 hover:text-black transition-colors duration-300 group`}
      >
        ★
        <div
          className="absolute bottom-full mb-2 right-4 translate-x-0 w-max px-2 py-1 bg-violet-950 text-violet-100 text-sm font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        >
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </div>
      </button>
    </div>
  );
};

export default FavoriteButton;
