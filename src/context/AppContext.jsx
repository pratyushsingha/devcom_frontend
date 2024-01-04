import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState([]);
  const [page, setpage] = useState(1);
  const [itemOffset, setItemOffset] = useState(1);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState();

  const itemPerPage = 12;

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `/ecommerce/products?page=${page}&limit=${itemPerPage}`
      );
      setProducts(response.data.data.products);
      // console.log(response)
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

  const endOffset = itemOffset + itemPerPage;
  // console.log(`Loading products from ${itemOffset} to ${endOffset}`);
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemPerPage);

  function handlePageClick(event) {
    const newOffset = (event.selected * itemPerPage) % products.length;
    setItemOffset(newOffset);
    setpage(event.selected + 1);
    getProducts();
  }

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

  const getCart = async () => {
    try {
      const response = await axios.get("ecommerce/cart", {
        withCredentials: true,
      });
      setCartProducts(response.data.data.items);
      setCartTotal(response.data.data.cartTotal);
    } catch (err) {
      console.error(err);
    }
  };

  const cartItemIncrement = async (id, quantity) => {
    try {
      await cartItemUpdate(id, quantity);
      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  const DeleteFromCart = async (id) => {
    try {
      const response = await axios.delete(`/ecommerce/cart/item/${id}`, {
        withCredentials: true,
      });
      console.log(response);
      getCart();
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
    handlePageClick,
    pageCount,
    getCart,
    cartItemIncrement,
    DeleteFromCart,
    cartProducts,
    cartTotal
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
