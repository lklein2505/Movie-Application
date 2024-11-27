interface GenreDotsProps {
  activeGenreIndex: number;
  onChange: (index: number) => void;
}

function GenreDots ({ activeGenreIndex, onChange }: GenreDotsProps) {
  return (
    <div className="flex justify-center space-x-2">
      {[...Array(8)].map((_, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`w-2 h-2 rounded-full ${
            activeGenreIndex === index
              ? "bg-yellow-500"
              : "bg-gray-400 hover:bg-gray-500"
          } transition-all`}
        />
      ))}
    </div>
  );
};

export default GenreDots;
