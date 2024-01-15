import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Spinner from "./loader/Spinner";

const CartItem = ({ item }) => {
  const { cartItemIncrement, DeleteFromCart, addToWish} =
    useContext(AppContext);
  return (
    <>
      <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
        <div className="flex w-2/5">
          {" "}
          <Link to={`/product/${item.product._id}`}>
            <div className="w-20">
              <img
                className="h-24 rounded"
                src={item.product.mainImage.url}
                alt={item.product.name}
              />
            </div>
          </Link>
          <div className="flex flex-col justify-between ml-4 flex-grow">
            <span className="font-bold text-sm">{item.product.name}</span>
            <button
              onClick={() => addToWish(item.product._id)}
              className="text-red-500 text-xs"
            >
              Save to Wishlist
            </button>
          </div>
        </div>
        <div className="flex justify-center w-1/5">
          <button
            onClick={() => {
              item.quantity > 1
                ? cartItemIncrement(item.product._id, item.quantity - 1)
                : DeleteFromCart(item.product._id);
            }}
          >
            <svg
              className="fill-current text-gray-600 w-3"
              viewBox="0 0 448 512"
            >
              <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>
          </button>
          <p className="mx-2 border text-center w-8">{item.quantity}</p>
          <button
            onClick={() => {
              cartItemIncrement(item.product._id, item.quantity + 1);
            }}
          >
            <svg
              className="fill-current text-gray-600 w-3"
              viewBox="0 0 448 512"
            >
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>
          </button>
        </div>
        <span className="text-center w-1/5 font-semibold text-sm">
          ₹ {item.product.price}
        </span>
        <button
          onClick={() => DeleteFromCart(item.product._id)}
          className="bg-red-500 hover:bg-red-600 px-5 rounded-md py-2 text-sm text-white uppercase"
        >
          remove
        </button>
      </div>
    </>
  );
};

export default CartItem;
