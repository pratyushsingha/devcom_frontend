import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCart = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const addToCart = async (productId) => {
    try {
      setLoader(true);
      if (localStorage.getItem("accessToken")) {
        const cartItems = await axios.get("/ecommerce/cart", {
          withCredentials: true,
        });

        const cartProductIds = cartItems.data.data.items.map(
          (item) => item.product._id
        );

        if (cartProductIds.includes(productId)) {
          toast.success("Item is already in the cart");
          setProductStatus("Go to cart")
        } else {
          const response = await axios.post(
            `/ecommerce/cart/item/${productId}`,
            {},
            {
              withCredentials: true,
            }
          );

          if (response.data.success) {
            toast.success("Item added to cart");
            navigate("/cart");
          } else {
            toast.error("Failed to add item to cart");
          }
        }
        setLoader(false);
      } else {
        toast.error("Please login to add items to the cart");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return { addToCart, loader };
};

export default useCart;
