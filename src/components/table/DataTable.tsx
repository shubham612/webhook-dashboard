import type { ReactNode } from "react";

interface Column<T> {
  header: string;

  render: (row: T) => ReactNode;
}

interface Props<T> {
  data: T[];

  columns: Column<T>[];

  onRowClick?: (row: T) => void;
}

const DataTable = <T,>({
  data,
  columns,
  onRowClick,
}: Props<T>) => {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow">
      <table className="w-full text-sm table-auto">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className="px-6 py-4 text-left font-semibold whitespace-nowrap"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={index}
                onClick={() =>
                  onRowClick?.(row)
                }
                className={`border-t transition ${
                  onRowClick
                    ? "hover:bg-gray-50 cursor-pointer"
                    : ""
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={column.header}
                    className="px-6 py-4 align-top"
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-8 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;