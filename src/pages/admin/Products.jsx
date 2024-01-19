import React, { useContext, useEffect } from "react";
import Container from "../../components/Container";
import AdminSidebar from "../../components/admin/AdminSidebar";
import usePagination from "../../hooks/usePagination";
import { AppContext } from "../../context/AppContext";
import { useSortBy, useTable } from "react-table";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

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
    <Container>
      <div className="flex space-x-3">
        <AdminSidebar />
        <div className="mx-auto">
          <p>Products</p>
          <table {...getTableProps()} className="">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      className="px-5"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
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
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td className="px-5" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex space-x-3 justify-center">
            <Button disabled={page <= 1} onClick={handlePrevClick}>
              &laquo; Previous
            </Button>

            <Button disabled={hastNextPage == false} onClick={handleNextClick}>
              Next &raquo;
            </Button>
          </div>
        </div>
        <Link to="/admin/product/new">
          <button className="text-4xl">
            <CiCirclePlus />
          </button>
        </Link>
      </div>
    </Container>
  );
};

export default Products;
