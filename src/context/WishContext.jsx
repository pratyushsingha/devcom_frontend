import { createContext, useCallback, useContext, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { AppContext } from "./AppContext";

export const WishContext = createContext();

export default function WishContextProvider({ children }) {
  const { toast } = useToast();
  const [wishList, setWishList] = useState([]);
  const { products } = useContext(AppContext);

  const addToWish = async (productId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/wishlist/${productId}`,
        {},
        { withCredentials: true }
      );
      const product = products.find((item) => item._id === productId);
      setWishList([...wishList, { product: product }]);
      toast({
        title: "success",
        description: `${response.data.message}`,
      });
    } catch (err) {
      console.log("error in adding to wishlist", err);
      toast({
        variant: "destructive",
        title: "success",
        description: `${err.response?.data?.message}`,
      });
    }
  };

  const removeFromWish = async (productId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/wishlist/${productId}`,
        { withCredentials: true }
      );

      setWishList(wishList.filter((item) => item.product._id !== productId));
      toast({
        title: "success",
        description: `${response.data.message}`,
      });
    } catch (error) {
      console.log("error in deleting item from wishlist", error);
      toast({
        variant: "destructive",
        title: "success",
        description: `${error.response.message}` ?? `${error.message}`,
      });
    }
  };

  const getWishlist = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/wishlist`,
        { withCredentials: true }
      );
      console.log(response.data.data.items);
      if (response.data.data.items.length > 0) {
        setWishList(response.data.data.items);
      } else {
        setWishList([]);
      }
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      throw err;
    }
  }, [removeFromWish, addToWish, setWishList]);

  const values = {
    getWishlist,
    addToWish,
    removeFromWish,
    wishList,
    setWishList,
  };

  return <WishContext.Provider value={values}>{children}</WishContext.Provider>;
}
