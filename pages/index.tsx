import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import { SkeletonTable } from "@/components/SekeletonTable";
import TableHeader from "@/components/TableHeader";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export default function Home() {
  const [items, setItems] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedValue] = useDebounce(searchQuery, 500);
  const [loading, setLoading] = useState<boolean>(false);
  const itemsPerPage = 10;

  useEffect(() => {
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
  }, [currentPage, debouncedValue]);

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

  const totalPages = Math.ceil(totalItems / itemsPerPage);

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

  const rangeStart = (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <main className="flex w-full p-12 bg-white min-h-screen flex-col items-center justify-center">
      <div className="bg-gray-200 rounded-lg p-12 flex gap-12 flex-col">
        <div className="flex justify-between">
          <h1 className="text-2xl">Products</h1>
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {loading && <SkeletonTable />}
          {!loading && items?.length === 0 && (
            <>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed">
                <TableHeader
                  handleSort={handleSort}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              </table>
              <div className="flex h-[529.5px] justify-center items-center min-h-[300px] bg-white">
                We&apos;re sorry, but it seems that there are no products
                matching your search criteria at the moment.
              </div>
            </>
          )}
          {!loading && items?.length > 0 && (
            <table className="w-full h-[570px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 truncate cursor-pointer"
                    onClick={() => handleSort("title")}
                  >
                    Product name
                    {sortBy === "title" && (
                      <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("brand")}
                  >
                    Brand
                    {sortBy === "brand" && (
                      <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("category")}
                  >
                    Category
                    {sortBy === "category" && (
                      <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("price")}
                  >
                    Price
                    {sortBy === "price" && (
                      <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("description")}
                  >
                    Description
                    {sortBy === "description" && (
                      <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map(
                  ({ id, title, description, price, category, brand }) => (
                    <tr
                      key={id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 truncate font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
    </main>
  );
}
