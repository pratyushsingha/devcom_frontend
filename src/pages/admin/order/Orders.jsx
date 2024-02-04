import { useContext, useEffect } from "react";
import Container from "@/components/Container";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

import AdminTable from "@/components/admin/AdminTable";

const columns = [
  {
    Header: "Customer",
    accessor: "customer",
    Cell: ({ row }) => <span>{row.values.customer.username}</span>,
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
  const { getOrders, orders, page } = useContext(AppContext);

  useEffect(() => {
    getOrders();
  }, [page]);
  return (
    <Container className="flex space-x-5">
      <AdminSidebar />
      <AdminTable
        columns={columns}
        data={orders}
        cardLabel="Orders"
        inputPlaceholder="Filter orders..."
      />
    </Container>
  );
};

export default Orders;
