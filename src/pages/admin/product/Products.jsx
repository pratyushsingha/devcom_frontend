import { useContext, useEffect } from "react";
import Container from "../../../components/Container";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { AppContext } from "../../../context/AppContext";
import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import AdminTable from "@/components/admin/AdminTable";

const columns = [
  {
    Header: "Product Image",
    accessor: "mainImage",
    Cell: ({ row }) => (
      <img
        src={row.values.mainImage.url}
        alt={row.values.name}
        className="w-20 h-20 rounded"
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
    Cell: ({ row }) => <p> &#8377; {row.values.price}</p>,
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
  const { products, getProducts, page } = useContext(AppContext);
  useEffect(() => {
    getProducts();
  }, [page]);

  return (
    <Container className="flex space-x-5">
      <AdminSidebar />
      <AdminTable
        columns={columns}
        data={products}
        cardLabel="Products"
        inputPlaceholder="Filter products..."
      />
      <Link to="/admin/product/new">
        <Button variant="ghost" className="text-4xl">
          <CiCirclePlus />
        </Button>
      </Link>
    </Container>
  );
};

export default Products;
