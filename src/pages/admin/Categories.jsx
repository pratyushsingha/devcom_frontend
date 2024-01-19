// ... (previous imports)
import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useTable } from "react-table";
import Container from "../../components/Container";
import axios from "axios";

export const columns = [
  {
    Header: "Category Name",
    accessor: "name",
  },
  {
    Header: "Action",
    accessor: "_id",
    Cell: ({ row }) => {
      const updatedCategoryRef = useRef("");
      const dialogRef = useRef(null);
      return (
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Enter updated category"
            onChange={(e) => (updatedCategoryRef.current = e.target.value)}
          />
          <button
            onClick={async () => {
              try {
                await axios.patch(
                  `/ecommerce/categories/${row.values._id}`,
                  { name: updatedCategoryRef.current },
                  { withCredentials: true }
                );
                console.log("updated");
                window.location.reload(false);
              } catch (err) {
                console.log(err);
              }
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            update
          </button>
          <button
            onClick={async () => {
              try {
                await axios.delete(
                  `/ecommerce/categories/${row.values._id}`,
                  { name: updatedCategoryRef.current },
                  { withCredentials: true }
                );
                console.log("deleted");
                getCategory();
              } catch (err) {
                console.log(err);
              }
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            delete
          </button>
        </div>
      );
    },
  },
];

const Categories = () => {
  const { categories, getCategory } = useContext(AppContext);

  const {
    getTableProps,
    getTableBodyProps,
    rows,
    headerGroups,
    prepareRow,
    getRowProps,
  } = useTable({
    columns,
    data: categories,
  });

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Container>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th key={column.id}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
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
    </Container>
  );
};

export default Categories;
