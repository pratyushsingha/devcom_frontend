import { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const useOrder = () => {
  const { toast } = useToast();
  const { setLoader } = useContext(AppContext);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [customer, setCustomer] = useState({});
  const [address, setAddress] = useState({});
  const [order, setOrder] = useState({});
  const [couponCode, setCouponCode] = useState({});

  const orderDetails = async (id) => {
    try {
      setLoader(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/orders/${id}`,
        {
          withCredentials: true,
        }
      );
      setAddress(response.data.data.address);
      setCustomer(response.data.data.customer);
      response.data.data.map((item) => setOrderedProducts([item.items]));
      setOrder(response.data.data);
      setCouponCode(response.data.data.coupon);
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

  return {
    orderedProducts,
    customer,
    address,
    order,
    couponCode,
    orderDetails,
  };
};

export default useOrder;
