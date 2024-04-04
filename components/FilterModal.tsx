import React, { useState, useEffect, useRef } from "react";

interface FilterModalProps {
  onClose: () => void;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  handleFilter: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  onClose,
  selectedOption,
  setSelectedOption,
  handleFilter,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((res) => setCategories(res));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white min-w-[500px] rounded-lg p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.707 5.293a1 1 0 011.414 0L10 8.586l2.879-2.88a1 1 0 111.414 1.415L11.414 10l2.88 2.879a1 1 0 11-1.415 1.414L10 11.415l-2.879 2.88a1 1 0 01-1.414-1.415L8.586 10 5.707 7.121a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h2 className="text-lg text-black font-semibold mb-4">
          Filter by Category
        </h2>
        <div className="relative">
          <div
            className="flex relative items-center appearance-none w-full text-black bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
            onClick={toggleDropdown}
          >
            <span>{selectedOption || "Select an option"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-2 absolute top-[35%] right-[2%] ${
                isOpen ? "transform rotate-180 mt-[-4px]" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z"
              />
            </svg>
          </div>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } absolute max-h-[200px] overflow-auto mt-1 w-full bg-white text-black shadow-lg rounded border border-gray-300`}
          >
            {categories.map((category, index) => (
              <div
                key={index}
                className="cursor-pointer text-black hover:bg-gray-100 px-4 py-2"
                onClick={() => {
                  setSelectedOption(category);
                  toggleDropdown();
                }}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleFilter}
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
