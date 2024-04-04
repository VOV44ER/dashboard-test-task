import FilterModal from "@/components/FilterModal";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import { SkeletonTable } from "@/components/SekeletonTable";
import TableHeader from "@/components/TableHeader";
import { Product } from "@/types/interfaces";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Home() {
  const [items, setItems] = useState<Product[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedValue] = useDebounce(searchQuery, 500);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const itemsPerPage = 10;
  const rangeStart = (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = Math.min(currentPage * itemsPerPage, totalItems);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleFilter = (option: string) => {
    fetch(`https://dummyjson.com/products/category/${option}`)
      .then((res) => res.json())
      .then(
        (res: {
          limit: number;
          skip: number;
          total: number;
          products: Product[];
        }) => {
          setSelectedOption(option);
          setItems(res.products);
          setTotalItems(res.total);
          setCurrentPage(1);
          setShowFilterModal(false);
          setLoading(false);
        }
      );
  };

  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);
    setSelectedOption("");
    fetch(
      `https://dummyjson.com/products/search?q=${debouncedValue}&limit=${itemsPerPage}&skip=${0}`
    )
      .then((res) => res.json())
      .then(
        (res: {
          limit: number;
          skip: number;
          total: number;
          products: Product[];
        }) => {
          setItems(res.products);
          setTotalItems(res.total);
          setLoading(false);
        }
      );
  }, [debouncedValue]);

  useEffect(() => {
    if (selectedOption) {
      return;
    }
    setLoading(true);
    fetch(
      `https://dummyjson.com/products/search?q=${debouncedValue}&limit=${itemsPerPage}&skip=${
        (currentPage - 1) * itemsPerPage
      }`
    )
      .then((res) => res.json())
      .then(
        (res: {
          limit: number;
          skip: number;
          total: number;
          products: Product[];
        }) => {
          setItems(res.products);
          setTotalItems(res.total);
          setLoading(false);
        }
      );
  }, [currentPage, selectedOption]);

  useEffect(() => {
    if (!items?.length) {
      return;
    }
    const sortedItems = [...items].sort((a, b) => {
      const aValue = (a as any)[sortBy];
      const bValue = (b as any)[sortBy];

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setItems(sortedItems);
  }, [sortBy, sortOrder]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const toggleFilterModal = () => {
    setShowFilterModal((prev) => !prev);
  };

  return (
    <main className="flex w-full p-12 bg-white min-h-screen flex-col items-center justify-center">
      <div className="bg-gray-200 rounded-lg p-12 flex gap-12 flex-col">
        <div className="flex justify-between">
          <h1
            onClick={() => {
              setSearchQuery("");
            }}
            className="text-2xl text-black cursor-pointer"
          >
            Products
          </h1>
          <div className="flex items-center gap-12">
            <button
              type="button"
              onClick={toggleFilterModal}
              className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center me-2"
            >
              <svg
                className="w-3.5 h-3.5 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M22 2H2a1 1 0 0 0-.707 1.707L10 13.414V20a1 1 0 0 0 1.451.892l4-2a1 1 0 0 0 .549-.894V13.414l8.707-8.707A1 1 0 0 0 22 2zm-2 10.586L12.586 4H19v8.586z"
                  clipRule="evenodd"
                />
              </svg>
              {selectedOption ? selectedOption : "Filter"}
            </button>
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {loading && <SkeletonTable />}
          {!loading && items?.length === 0 && (
            <>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-fixed">
                <TableHeader
                  handleSort={handleSort}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              </table>
              <div className="flex h-[529.5px] text-black justify-center items-center min-h-[300px] bg-white">
                We&apos;re sorry, but it seems that there are no products
                matching your search criteria at the moment.
              </div>
            </>
          )}
          {!loading && items?.length > 0 && (
            <table className="w-full h-[570px] text-sm text-left rtl:text-right text-gray-500 table-fixed">
              <TableHeader
                handleSort={handleSort}
                sortBy={sortBy}
                sortOrder={sortOrder}
              />
              <tbody>
                {items.map(
                  ({ id, title, description, price, category, brand }) => (
                    <tr key={id} className="bg-white border-b hover:bg-gray-50">
                      <th
                        scope="row"
                        className="px-6 py-4 truncate font-medium text-gray-900 whitespace-nowrap"
                      >
                        {title}
                      </th>
                      <td className="px-6 truncate py-4">{brand}</td>
                      <td className="px-6 py-4">{category}</td>
                      <td className="px-6 py-4">${price}</td>
                      <td className="px-6 py-4 max-w-[350px] truncate">
                        {description}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
        {items?.length > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePreviousPage={handlePreviousPage}
            setCurrentPage={setCurrentPage}
            handleNextPage={handleNextPage}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            totalItems={totalItems}
          />
        )}
      </div>
      {showFilterModal && (
        <FilterModal
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          onClose={toggleFilterModal}
          handleFilter={handleFilter}
        />
      )}
    </main>
  );
}
