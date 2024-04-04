import React from "react";
import Image from "next/image";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="relative inline-block">
      <Image
        className="absolute top-1/2 transform -translate-y-1/2 ml-1.5"
        width={20}
        height={20}
        src={"/search.svg"}
        alt="search-icon"
      />
      <input
        type="text"
        placeholder="Search by title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-1 border outline-none rounded-md pl-8"
      />
    </div>
  );
};

export default SearchInput;
