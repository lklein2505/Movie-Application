import React from "react";

interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

interface CastSectionProps {
  cast: Actor[];
}

function CastSection({ cast }: CastSectionProps ) {
  // Disable page scrolling when interacting with the cast section
  const handleWheel = (e: React.WheelEvent) => {
    const castSection = document.getElementById("cast-section");
    if (castSection && e.target === castSection) {
      e.preventDefault();
      castSection.scrollLeft += e.deltaY;
    }
  };

  return (
    <div
      id="cast-section"
      className="mx-16 py-8 relative overflow-x-auto flex flex-col"
      onWheel={handleWheel}
    >
      <h2 className="text-2xl font-bold text-violet-200 mb-8">Cast:</h2>

      {/* Cast list */}
      <div className="flex overflow-x-auto space-x-4 scrollbar-hidden">
        {cast && cast.length > 0 ? (
          cast.map((actor) => (
            <div key={actor.id} className="text-center flex-shrink-0 w-32">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : "/assets/unknown_person.jpg"
                }
                alt={actor.name}
                className="w-24 h-32 object-cover rounded-lg mx-auto"
              />
              <p className="mt-2 text-sm font-bold">{actor.name || "Name Not Available"}</p>
              <p className="text-xs text-violet-200">{actor.character}</p>
            </div>
          ))
        ) : (
          <p>No cast information available.</p>
        )}
      </div>
    </div>
  );
};

export default CastSection;
