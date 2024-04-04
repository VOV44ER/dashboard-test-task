import React from "react";

const columns = [
  { title: "Product name", key: "title" },
  { title: "Brand", key: "brand" },
  { title: "Category", key: "category" },
  { title: "Price", key: "price" },
  { title: "Description", key: "description" },
];

interface Props {
  handleSort: (column: string) => void;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

const TableHeader: React.FC<Props> = ({ handleSort, sortBy, sortOrder }) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            scope="col"
            className="px-6 py-3 cursor-pointer"
            onClick={() => handleSort(column.key)}
          >
            {column.title}
            {sortBy === column.key && (
              <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
