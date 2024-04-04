export const SkeletonTable = () => (
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-fixed">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th
          scope="col"
          className="px-6 py-3 cursor-pointer bg-white animate-pulse"
        >
          Product name
        </th>
        <th
          scope="col"
          className="px-6 py-3 cursor-pointer bg-white animate-pulse"
        >
          Brand
        </th>
        <th
          scope="col"
          className="px-6 py-3 cursor-pointer bg-white animate-pulse"
        >
          Category
        </th>
        <th
          scope="col"
          className="px-6 py-3 cursor-pointer bg-white animate-pulse"
        >
          Price
        </th>
        <th
          scope="col"
          className="px-6 py-3 cursor-pointer bg-white animate-pulse"
        >
          Description
        </th>
      </tr>
    </thead>
    <tbody>
      {[...Array(10)].map((_, index) => (
        <tr key={index} className="bg-white border-b hover:bg-gray-50">
          <td className="px-6 py-4">
            <div role="status" className="max-w-full">
              <div className="h-3 bg-gray-200 rounded-md w-full mb-2 animate-pulse"></div>
            </div>
          </td>
          <td className="px-6 py-4">
            <div role="status" className="max-w-full">
              <div className="h-3 bg-gray-200 rounded-md w-full mb-2 animate-pulse"></div>
            </div>
          </td>
          <td className="px-6 py-4">
            <div role="status" className="max-w-full">
              <div className="h-3 bg-gray-200 rounded-md w-full mb-2 animate-pulse"></div>
            </div>
          </td>
          <td className="px-6 py-4">
            <div role="status" className="max-w-full">
              <div className="h-3 bg-gray-200 rounded-md w-full mb-2 animate-pulse"></div>
            </div>
          </td>
          <td className="px-6 py-4 max-w-[350px]">
            <div role="status" className="max-w-full">
              <div className="h-3 bg-gray-200 rounded-md w-full mb-2 animate-pulse"></div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
