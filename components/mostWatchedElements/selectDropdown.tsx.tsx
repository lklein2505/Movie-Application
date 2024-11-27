import React from "react";

interface SelectDropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const pluralize = (word: string) => {
    return word && word !== "All" ? word + "s" : word;
  };

  return (
    <div className="flex flex-col items-center space-y-2 cursor-pointer">
      <label className="text-violet-100 font-bold text-center">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="border-2 p-3 bg-violet-950 text-violet-100 border-gray-500 rounded-2xl hover:bg-violet-900 font-bold w-32 sm:w-auto cursor-pointer">
        <option value="">All {pluralize(label)}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
