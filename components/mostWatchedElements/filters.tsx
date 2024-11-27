import React from "react";
import SelectDropdown from "./selectDropdown.tsx";

interface FiltersProps {
  filters: {
    genre: string;
    year: string;
    score: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const genreOptions = [
    { value: "28", label: "Action" },
    { value: "35", label: "Comedy" },
    { value: "18", label: "Drama" },
    { value: "27", label: "Horror" },
    { value: "878", label: "Sci-Fi" },
    { value: "53", label: "Thriller" },
    { value: "12", label: "Adventure" },
    { value: "14", label: "Fantasy" },
    { value: "36", label: "History" },
    { value: "10402", label: "Music" },
  ];

  const yearOptions = [
    ...[...Array(75)].map((_, i) => ({
      value: (2024 - i).toString(),
      label: (2024 - i).toString(),
    })),
    { value: "Even earlier", label: "Even earlier" },
  ];

  const scoreOptions = [
    { value: "5-6", label: "5-6" },
    { value: "7-8", label: "7-8" },
    { value: "8-9", label: "8-9" },
    { value: "9+", label: "9+" },
  ];

  return (
    <div
      className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center mb-6 p-4"
    >
      {/* Reuse SelectDropdown for each filter */}
      <SelectDropdown
        label="Genre"
        value={filters.genre}
        options={genreOptions}
        onChange={(e) => onFilterChange("genre", e.target.value)}
      />

      <SelectDropdown
        label="Year"
        value={filters.year}
        options={yearOptions}
        onChange={(e) => onFilterChange("year", e.target.value)}
      />

      <SelectDropdown
        label="Score"
        value={filters.score}
        options={scoreOptions}
        onChange={(e) => onFilterChange("score", e.target.value)}
      />
    </div>
  );
};

export default Filters;
