import React, { forwardRef, useContext } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import usePagination from "@/hooks/usePagination";
import { AppContext } from "@/context/AppContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import TableSearchFilter from "./TableSearchFilter";

const AdminTable = forwardRef(function table(
  {
    classname = "",
    columns,
    data,
    cardLabel = "",
    inputPlaceholder = "",
    ...props
  },
  ref
) {
  const { handleNextClick, handlePrevClick } = usePagination();
  const { page, hastNextPage } = useContext(AppContext);
  const {
    getTableProps,
    getTableBodyProps,
    rows,
    headerGroups,
    prepareRow,
    state: { globalFilter },
    setGlobalFilter,
    getRowProps,
  } = useTable(
    {
      columns,
      data: data,
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <Card
      className="mx-auto rounded-sm w-full bg-[#0E1629]"
      ref={ref}
      {...props}
    >
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="text-3xl">{cardLabel}</CardTitle>
        <TableSearchFilter
          filter={globalFilter}
          setFilter={setGlobalFilter}
          inputPlaceholder={inputPlaceholder}
        />
      </CardHeader>
      <CardContent>
        <Table {...getTableProps()} className="">
          <TableHeader>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableHead
                    className="px-10"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {column.isSorted && (
                      <span>{column.isSortedDesc ? " ↓" : " ↑"}</span>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell className="px-10" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex space-x-3 justify-center my-4">
        <Button disabled={page <= 1} onClick={handlePrevClick}>
          &laquo; Previous
        </Button>
        <Button disabled={hastNextPage == false} onClick={handleNextClick}>
          Next &raquo;
        </Button>
      </CardFooter>
    </Card>
  );
});
export default AdminTable;
