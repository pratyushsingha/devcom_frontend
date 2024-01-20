import React, { forwardRef } from "react";
import Container from "../../components/Container";
import { useSortBy, useTable, usePagination } from "react-table";
import Button from "../Button";

const Table = forwardRef(function table(
  { classname = "", columns, data, ...props },
  ref
) {
  const {
    getTableProps,
    getTableBodyProps,
    page,
    headerGroups,
    prepareRow,
    getRowProps,
    nextPage,
    previousPage,
    hasNextPage,
    hasPrevPage,
    state: { pageIndex },
    pageCount,
  } = useTable(
    {
      columns,
      data: data,
    },
    useSortBy,
    usePagination
  );
  return (
    <div className="mx-auto">
      <table ref={ref} {...getTableProps()} {...props}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  className="px-5"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                >
                  {column.render("Header")}
                  {column.isSorted && (
                    <span>{column.isSortedDesc ? " ↓" : " ↑"}</span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex space-x-3 justify-center">
        <Button disabled={!hasPrevPage} onClick={previousPage}>
          Previous
        </Button>
        <span>
          {pageIndex + 1} of {pageCount}
        </span>
        <Button disabled={!hasNextPage} onClick={nextPage}>
          next
        </Button>
      </div>
    </div>
  );
});
export default Table;
