import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get("/ecommerce/products?page=1&limit=12");
      setProducts(response.data.data.products);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const getCategory = async () => {
    try {
      const response = await axios.get("/ecommerce/categories?page=1&limit=10");
      setCategories(response.data.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const addToCart = async (productId) => {
    try {
      const cartItems = await axios.get("/ecommerce/cart", {
        withCredentials: true,
      });

      const cartProductIds = cartItems.data.data.items.map(
        (item) => item.product._id
      );

      if (cartProductIds.includes(productId)) {
        navigate("/cart");
      } else {
        const response = await axios.post(`/ecommerce/cart/item/${productId}`, {
          withCredentials: true,
        });
        console.log("new item added", response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const cartItemUpdate = async (id, qty) => {
    try {
      const response = await axios.post(
        `/ecommerce/cart/item/${id}`,
        {
          quantity: qty,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const value = {
    getProducts,
    products,
    addToCart,
    quantity,
    setQuantity,
    cartItemUpdate,
    categories,
    getCategory,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
