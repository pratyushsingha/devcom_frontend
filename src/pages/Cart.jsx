import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const getCart = async () => {
    try {
      const response = await axios.get("ecommerce/cart", {
        withCredentials: true,
      });

      console.log(response.data.data.items);
      setCartProducts(response.data.data.items);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {cartProducts.length > 0 ? (
        cartProducts.map((item) => <h1>{item.name}</h1>)
      ) : (
        <p>cart is empty</p>
      )}
    </>
  );
};

export default Cart;
