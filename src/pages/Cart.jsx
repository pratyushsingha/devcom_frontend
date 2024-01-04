import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { MdRemoveCircle } from "react-icons/md";

const Cart = () => {
  const { getCart, cartProducts, cartTotal, clearCart } =
    useContext(AppContext);

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {cartProducts.length > 0 ? (
        <>
          <div className="container mx-auto mt-10">
            <div className="flex shadow-md my-10">
              <div className="w-3/4 bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                  <div className="flex space-x-5">
                    <h2 className="font-semibold text-4xl">
                      {cartProducts.length} Items
                    </h2>
                    <button onClick={() => clearCart()}>
                      <MdRemoveCircle className="self-center text-red-500 text-2xl" />
                    </button>
                  </div>
                </div>
                <div className="flex mt-10 mb-5">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                    Product Details
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    Quantity
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                    Price
                  </h3>
                </div>
                {cartProducts.map((item, index) => (
                  <CartItem item={item} key={index} />
                ))}
                <Link
                  to={"/products"}
                  className="flex font-semibold text-indigo-600 text-sm mt-10"
                >
                  <svg
                    className="fill-current mr-2 text-indigo-600 w-4"
                    viewBox="0 0 448 512"
                  >
                    <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
              <div id="summary" className="w-1/4 px-8 py-10">
                <h1 className="font-semibold text-2xl border-b pb-8">
                  Order Summary
                </h1>
                <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-sm uppercase">
                    Items {cartProducts.length}
                  </span>
                  <span className="font-semibold text-sm">₹ {cartTotal}</span>
                </div>
                <div>
                  <label className="text-green-500 font-semibold inline-block mb-3 text-sm uppercase ">
                    Have a Coupon Code??
                  </label>
                  <input
                    className="block p-2 text-grey-600 mb-3 text-sm uppercase border-2 border-gray-400 rounded-md"
                    type="text"
                    placeholder="enter your coupon"
                  />
                </div>
                <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span>₹ {cartTotal}</span>
                  </div>
                  <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 rounded-md py-3 text-sm text-white uppercase w-full">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-2xl mb-4">cart is empty</h1>
            <Link to="/products">
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded">
                Buy now
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
