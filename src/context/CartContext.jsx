import { useToast } from "@/components/ui/use-toast";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import axios from "axios";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { setLoader, setProgress, progress } = useContext(AppContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartDetails, setCartDetails] = useState({
    cartTotal: 0,
    discountCartValue: 0,
  });

  const cartItemUpdate = async (productId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/item/${productId}`,
        {},
        {
          withCredentials: true,
        }
      );
      getCart();
    } catch (err) {
      console.error(err);
      toast({
        varinat: "destructive",
        title: "error",
        description: `${err.response?.data?.message}`,
      });
    }
  };

  const cartItemDecrement = async (productId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/cart/item/${productId}`,

        {
          withCredentials: true,
        }
      );
      getCart();
    } catch (error) {
      console.log(error);
      toast({
        varinat: "destructive",
        title: "error",
        description: `${err.response?.data?.message}`,
      });
    }
  };

  const addToCart = async (productId) => {
    try {
      setLoader(true);
      if (localStorage.getItem("accessToken")) {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/cart/item/${productId}`,
          {},
          {
            withCredentials: true,
          }
        );
        console.log(cartProducts);
        if (response.data.success) {
          console.log(response);
          toast({
            title: "success",
            description: response.data.message,
          });
          setTimeout(() => {
            navigate("/cart");
          }, 1000);
        } else {
          toast({
            title: "error",
            description: "something went wrong",
          });
          setLoader(false);
        }
      } else {
        toast({
          title: "error",
          description: "Please login to add items to the cart",
        });
        setLoader(false);
      }
    } catch (err) {
      console.error(err);
      toast({
        varinat: "destructive",
        title: "error",
        description: `${err.response?.data?.message}`,
      });
      setLoader(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoader(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/cart/clear`,

        {
          withCredentials: true,
        }
      );
      setCartProducts([]);
      console.log(response);
      toast({
        title: "Success",
        description: `${response.data.message}`,
      });
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  const removeItemFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/cart/remove/item/${productId}`,

        {
          withCredentials: true,
        }
      );
      setCartProducts(
        cartProducts.filter((item) => item.product._id !== productId)
      );
      toast({
        title: "Success",
        description: `${response.data.message}`,
      });
    } catch (error) {
      console.error(error);
      toast({
        varinat: "destructive",
        title: "error",
        description: `${error.response?.data?.message}`,
      });
    }
  };

  const getCart = useCallback(async () => {
    try {
      setLoader(true);
      setProgress(progress + 10);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/cart`,

        {
          withCredentials: true,
        }
      );
      setCartProducts(response.data.data.items);
      setCartDetails({
        cartTotal: response.data.data.cartTotal,
        discountCartValue: response.data.data.discountCartValue,
      });
      setLoader(false);
      setProgress(progress + 100);
    } catch (err) {
      console.error(err);
      setLoader(false);
      setProgress(progress + 100);
    }
  }, [
    clearCart,
    cartItemUpdate,
    setCartDetails,
    setCartProducts,
    cartItemUpdate,
    cartItemDecrement,
    removeItemFromCart,
    setCartProducts,
  ]);


  const values = {
    addToCart,
    clearCart,
    cartItemUpdate,
    cartDetails,
    cartProducts,
    getCart,
    cartItemDecrement,
    removeItemFromCart,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
}
