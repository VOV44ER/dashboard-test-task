import { useEffect, useState } from "react";

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
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(
      `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
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
        }
      );
  }, [currentPage]);

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
    <main className="flex w-full bg-white min-h-screen flex-col items-center justify-center">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
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
            {items.map(({ id, title, description, price, category, brand }) => (
              <tr
                key={id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {title}
                </th>
                <td className="px-6 py-4">{brand}</td>
                <td className="px-6 py-4">{category}</td>
                <td className="px-6 py-4">${price}</td>
                <td className="px-6 py-4 max-w-[350px] truncate">
                  {description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-col items-center gap-3">
        <div>{`Showing ${rangeStart} - ${rangeEnd} of ${totalItems}`}</div>
        <div>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-1 mr-2 bg-green-500 text-white rounded disabled:bg-gray-300 disabled:text-gray-500"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-3 py-1 mx-1 bg-green-500 text-white rounded ${
                  currentPage === pageNumber ? "bg-green-700" : ""
                }`}
              >
                {pageNumber}
              </button>
            )
          )}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 ml-2 bg-green-500 text-white rounded disabled:bg-gray-300 disabled:text-gray-500"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
