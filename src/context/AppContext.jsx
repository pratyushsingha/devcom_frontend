import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get("/ecommerce/products?page=1&limit=10");
      // console.log(response.data.data.products);
      setProducts(response.data.data.products);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const addToCart = async (id) => {
    try {
      const response = await axios.post(`cart/item/${id}`);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const value = {
    getProducts,
    products,
    addToCart
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
