import { useContext, useEffect } from "react";
import Container from "@/components/Container";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/table";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import TableSearchFilter from "@/components/admin/TableSearchFilter";
import usePagination from "@/hooks/usePagination";
import { OrderContext } from "@/context/OrderContext";

const statusFilteropts = [
  { id: 1, name: "Delivered", value: "DELIVERED" },
  { id: 2, name: "Pending", value: "PENDING" },
  { id: 3, name: "Cancelled", value: "CANCELLED" },
];

const columns = [
  {
    Header: "Customer",
    accessor: "customer",
    Cell: ({ row }) => <span>{row.original.customer.username}</span>,
  },
  {
    Header: "Amount",
    accessor: "discountedOrderPrice",
    Cell: ({ row }) => (
      <span> &#8377; {row.original.disCountedOrderPrice}</span>
    ),
  },
  {
    Header: "Dicount",
    accessor: "discountedOrderPricee",
    Cell: ({ row }) => (
      <span>
        {" "}
        &#8377; {row.original.disCountedOrderPrice - row.original.orderPrice}
      </span>
    ),
  },
  {
    Header: () => {
      const { adminStatusFilter, handleAdminOrderStatus, getAdminOrders } =
        useContext(OrderContext);

      useEffect(() => {
        getAdminOrders();
      }, [adminStatusFilter]);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">Status</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Status filter</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={adminStatusFilter}
              onValueChange={handleAdminOrderStatus}
            >
              {statusFilteropts.map((filter) => (
                <DropdownMenuRadioItem key={filter.id} value={filter.value}>
                  {filter.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    accessor: "status",
    Cell: ({ row }) =>
      row.values.status === "PENDING" ? (
        <Badge className="bg-yellow-700 hover:bg-yellow-600">PENDING</Badge>
      ) : row.values.status === "DELIVERED" ? (
        <Badge className="bg-green-700 hover:bg-green-600">DELIVERED</Badge>
      ) : (
        <Badge className="bg-red-700 hover:bg-red-600">CANCELLED</Badge>
      ),
    disableSortBy: true,
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
  const {
    orders,
    getAdminOrders,
    adminStatusFilter,
    setAdminStatusFilter,
    hastNextPage,
  } = useContext(OrderContext);
  const { handlePrevClick, handleNextClick, page, setPage } = usePagination();
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
      data: orders,
    },
    useGlobalFilter,
    useSortBy
  );
  useEffect(() => {
    getAdminOrders();
  }, [page]);
  return (
    <Container className="flex space-x-5">
      <AdminSidebar />
      <Card className="mx-auto rounded-sm w-full bg-[#0E1629]">
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="text-3xl">Orders</CardTitle>
          <div className="flex justify-end space-x-5 w-full">
            <div className="self-center">
              {adminStatusFilter && (
                <>
                  <span className="text-lx font-semibold tracking-tight">
                    Filter:{" "}
                  </span>
                  {adminStatusFilter === "PENDING" ? (
                    <Badge className="bg-yellow-700 hover:bg-yellow-600 gap-2">
                      PENDING{" "}
                      <button onClick={() => setAdminStatusFilter("")}>
                        X
                      </button>
                    </Badge>
                  ) : adminStatusFilter === "DELIVERED" ? (
                    <Badge className="bg-green-700 hover:bg-green-600 gap-2">
                      DELIVERED
                      <button onClick={() => setAdminStatusFilter("")}>
                        X
                      </button>
                    </Badge>
                  ) : (
                    <Badge className="bg-red-700 hover:bg-red-600 gap-2">
                      CANCELLED{" "}
                      <button onClick={() => setAdminStatusFilter("")}>
                        X
                      </button>
                    </Badge>
                  )}
                </>
              )}
            </div>
            <TableSearchFilter
              className="w-3/4"
              filter={globalFilter}
              setFilter={setGlobalFilter}
              inputPlaceholder="Filter orders..."
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table {...getTableProps()}>
            <TableHeader>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableHead
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
                      <TableCell {...cell.getCellProps()}>
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
          <Button disabled={hastNextPage !== true} onClick={handleNextClick}>
            Next &raquo;
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default Orders;
