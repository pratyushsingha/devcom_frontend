import { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const useOrder = () => {
  const { toast } = useToast();
  const { setLoader } = useContext(AppContext);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [order, setOrder] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");

  const orderDetails = async (productId) => {
    try {
      setLoader(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/orders/${productId}`,
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
        description: err.response.data.message,
      });
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
      // console.log(data);
      toast({
        title: "success",
        description: data.data.message,
      });
      orderDetails(productId);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    orderedProducts,
    order,
    orderDetails,
    updateStatus,
  };
};

export default useOrder;
