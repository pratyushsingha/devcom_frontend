import { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Spinner from "./loader/Spinner";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import useCart from "@/hooks/useCart";

const CartItem = ({ item }) => {
  const { cartItemIncrement, DeleteFromCart, addToWish } =
    useContext(AppContext);
  const { addToCart } = useCart();
  return (
    <>
      <div className="flex items-center hover:bg-[#00001e]  px-6 py-5">
        <div className="flex w-2/5">
          {" "}
          <Link to={`/product/${item.product._id}`}>
            <div className="w-20">
              <img
                className="h-24 rounded"
                src={item.product.mainImage}
                alt={item.product.name}
              />
            </div>
          </Link>
          <div className="flex flex-col justify-between ml-4 flex-grow">
            <span className="font-bold text-sm">{item.product.name}</span>
            <Button
              variant="outline"
              onClick={() => addToWish(item.product._id)}
            >
              Save to Wishlist
            </Button>
          </div>
        </div>
        <div className="flex justify-center w-1/5">
          <Button
            variant="ghost"
            onClick={() => {
              DeleteFromCart(item.product._id);
            }}
          >
            <svg
              className="fill-current text-gray-600 w-3"
              viewBox="0 0 448 512"
            >
              <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>
          </Button>
          <Badge>{item.quantity}</Badge>
          <Button
            variant="ghost"
            onClick={() => {
              cartItemIncrement(item.product._id);
            }}
          >
            <svg
              className="fill-current text-gray-600 w-3"
              viewBox="0 0 448 512"
            >
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>
          </Button>
        </div>
        <span className="text-center w-1/5 font-semibold text-sm">
          ₹ {item.product.price}
        </span>
        <Button
          variant="destructive"
          onClick={() => DeleteFromCart(item.product._id)}
        >
          remove
        </Button>
      </div>
    </>
  );
};

export default CartItem;
