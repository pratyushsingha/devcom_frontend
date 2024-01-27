import Container from "@/components/Container";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import { useContext, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSortBy, useTable } from "react-table";
import usePagination from "@/hooks/usePagination";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const columns = [
  {
    Header: "Customer",
    accessor: "customer",
    Cell: ({ row }) => <p>{row.values.customer.username}</p>,
  },
  {
    Header: "Amount",
    accessor: "discountedOrderPrice",
  },
  {
    Header: "Discount",
    accessor: (row) => row.discountedOrderPrice - row.orderPrice,
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) =>
      row.values.status === "PENDING" ? (
        <Badge className="bg-yellow-700 hover:bg-yellow-600">PENDING</Badge>
      ) : row.values.status === "DELIVERED" ? (
        <Badge className="bg-green-700 hover:bg-green-600">DELIVERED</Badge>
      ) : (
        <Badge className="bg-red-700 hover:bg-red-600">CANCELLED</Badge>
      ),
  },
  {
    Header: "Action",
    accessor: "_id",
    Cell: ({ row }) => (
      <Link to={`/admin/order/${row.values._id}`}>
        <Button>Manage</Button>
      </Link>
    ),
  },
];

const Orders = () => {
  const { getOrders, orders, page, hastNextPage } = useContext(AppContext);
  const { handleNextClick, handlePrevClick } = usePagination();
  const {
    getTableProps,
    getTableBodyProps,
    rows,
    headerGroups,
    prepareRow,
    getRowProps,
  } = useTable(
    {
      columns,
      data: orders,
    },
    useSortBy
  );

  useEffect(() => {
    getOrders();
  }, [page]);
  return (
    <Container className="flex">
      <AdminSidebar />
      <div className="mx-auto w-full">
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
        <div className="flex space-x-3 justify-center my-4">
          <Button disabled={page <= 1} onClick={handlePrevClick}>
            &laquo; Previous
          </Button>
          <Button disabled={hastNextPage == false} onClick={handleNextClick}>
            Next &raquo;
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Orders;
