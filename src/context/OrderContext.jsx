import { createContext, useCallback, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { AppContext } from "./AppContext";

export const OrderContext = createContext();

export default function OrderContextProvider({ children }) {
  const { toast } = useToast();
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [order, setOrder] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");
  const [myOrders, setMyOrders] = useState([]);
  const { progress, setProgress, setLoader, page } = useContext(AppContext);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");

  const getOrders = async () => {
    try {
      setLoader(true);
      setProgress(progress + 10);
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/orders/my-orders?page=${page}&limit=20&status=${statusFilter}`,

        {
          withCredentials: true,
        }
      );
      setMyOrders(response.data.data.orders);
      setHasNextPage(response.data.data.hasNextPage);
      setLoader(false);
      setProgress(progress + 100);
    } catch (err) {
      console.log(err);
      toast({
        varinat: "destructive",
        title: "error",
        description: err.response.data.message,
      });
      setLoader(false);
      setProgress(progress + 100);
    }
  };

  const updateStatus = async (e, productId) => {
    e.preventDefault();
    try {
      const data = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/orders/status/${productId}`,
        { status: orderStatus },
        { withCredentials: true }
      );
      toast({
        title: "success",
        description: data.data.message,
      });
      const updatedOrder = order.map((item) => {
        if (item._id === productId) {
          return { ...item, status: orderStatus };
        }
        return item;
      });
      setOrder(updatedOrder);
      console.log(order);
    } catch (err) {
      console.log(err);
    }
  };

  const orderDetails = useCallback(
    async (id) => {
      try {
        setLoader(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/orders/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data.data);
        response.data.data.map((item) => {
          setOrderedProducts(item.items);
        });
        setOrder(response.data.data);

        setLoader(false);
      } catch (err) {
        console.log(err);
        setLoader(false);

        toast({
          variant: "destructive",
          title: "error",
          description: err.response?.data?.message,
        });
      }
    },
    [updateStatus, setOrderStatus, setOrder]
  );

  const values = {
    orderedProducts,
    order,
    orderDetails,
    updateStatus,
    orderStatus,
    setOrderStatus,
    getOrders,
    setMyOrders,
    myOrders,
    hasNextPage,
    statusFilter,
    setStatusFilter,
  };

  return (
    <OrderContext.Provider value={values}>{children}</OrderContext.Provider>
  );
}
