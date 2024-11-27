import React from "react";

interface MovieOverlayProps {
  title: string;
}

const MovieOverlay = ({ title }: MovieOverlayProps) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
      <p className="text-white text-md font-bold px-2 text-center">{title}</p>
    </div>
  );
};

export default MovieOverlay;
