import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Cart = () => {
  const { cartItemUpdate } = useContext(AppContext);
  const [cartProducts, setCartProducts] = useState([]);

  const getCart = async () => {
    try {
      const response = await axios.get("ecommerce/cart", {
        withCredentials: true,
      });
      setCartProducts(response.data.data.items);
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

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {cartProducts.length > 0 ? (
        cartProducts.map((item, index) => (
          <div key={index}>
            <p>{item.product.name}</p>
            <button
              onClick={() => {
                item.quantity > 1
                  ? cartItemIncrement(item.product._id, item.quantity - 1)
                  : DeleteFromCart(item.product._id);
              }}
            >
              -
            </button>
            <p>{item.quantity}</p>
            <button
              onClick={() => {
                cartItemIncrement(item.product._id, item.quantity + 1);
              }}
            >
              +
            </button>
          </div>
        ))
      ) : (
        <p>Cart is empty</p>
      )}
    </>
  );
};

export default Cart;
