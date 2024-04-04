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
  const [items, setItems] = useState<Product[]>();
  const [totalItems, setTotalItems] = useState<number>();

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=10&skip=0")
      .then((res) => res.json())
      .then((res) => setItems(res.products));
  }, []);

  return (
    <main className="flex w-full bg-white min-h-screen flex-col items-center justify-center">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {items?.map(
              ({ id, title, description, price, category, brand }) => (
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
                  <td className="px-6 py-4">{price}</td>
                  <td className="px-6 py-4 max-w-[350px] truncate">
                    {description}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
