import { useContext, useEffect, useState } from "react";
import Container from "../../../components/Container";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { AppContext } from "../../../context/AppContext";
import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import AdminTable from "@/components/admin/AdminTable";
import axios from "axios";

const columns = [
  {
    Header: "Product Image",
    accessor: "mainImage",
    Cell: ({ row }) => (
      <img
        src={row.values.mainImage}
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
  const [products, setProducts] = useState([]);
  const { page } = useContext(AppContext);

  const adminAllProducts = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/admin/products?page=${page}&limit=12`,
        { withCredentials: true }
      );
      setProducts(response.data.data.products);
      console.log(response.data.data.products);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    adminAllProducts();
  }, []);

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
