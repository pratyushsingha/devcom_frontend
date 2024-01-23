import React, { useContext, useEffect } from "react";
import Container from "../../../components/Container";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import usePagination from "../../../hooks/usePagination";
import { AppContext } from "../../../context/AppContext";
import { useSortBy, useTable } from "react-table";
import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const columns = [
  {
    Header: "Product Image",
    accessor: "mainImage",
    Cell: ({ row }) => (
      <img
        src={row.values.mainImage.url}
        alt={row.values.name}
        className="w-24 h-24 rounded"
      />
    ),
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "_id",
    Cell: ({ row }) => (
      <Link to={`/admin/product/${row.values._id}`}>
        <Button>Manage</Button>
      </Link>
    ),
  },
];

const Products = () => {
  const { products, getProducts, page, hastNextPage, setProducts } =
    useContext(AppContext);
  const { handlePrevClick, handleNextClick } = usePagination();
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
      data: products,
    },
    useSortBy
  );

  useEffect(() => {
    getProducts();
  }, [page]);

  return (
    <Container className="flex">
      <AdminSidebar />
      <div className="mx-auto">
        <h2 className="text-2xl my-5">Products</h2>
        <div className="rounded-md border bg-[#0E1629]">
          <Table {...getTableProps()} className="">
            <TableHeader>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableHead
                      className=""
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
        </div>
        <div className="flex space-x-3 justify-center my-4">
          <Button disabled={page <= 1} onClick={handlePrevClick}>
            &laquo; Previous
          </Button>

          <Button disabled={hastNextPage == false} onClick={handleNextClick}>
            Next &raquo;
          </Button>
        </div>
      </div>
      <Link to="/admin/product/new">
        <Button variant="ghost" className="text-4xl">
          <CiCirclePlus />
        </Button>
      </Link>
    </Container>
  );
};

export default Products;
