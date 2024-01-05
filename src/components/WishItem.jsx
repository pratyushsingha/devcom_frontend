import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { MdDelete } from "react-icons/md";

const WishItem = ({ item }) => {
  const { cartProducts, deleteFromCart,addToCart,removeFromWish } = useContext(AppContext);
  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        {" "}
        <Link to={`/product/${item._id}`}>
          <div className="w-20">
            <img className="h-24" src={item.mainImage.url} alt={item.name} />
          </div>
        </Link>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{item.name}</span>
          <span className="text-red-500 text-xs">{item.company}</span>
          <span className="font-semibold hover:text-red-500 text-gray-500 text-xs">
            {}
          </span>
        </div>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">
        ₹ {item.price}
      </span>
      <div className="flex justify-center w-1/5">
        {cartProducts.some((cartItem) => cartItem.id === item._id) ? (
          <button
            onClick={() => deleteFromCart(item._id)}
            className="bg-green-500 hover:bg-green-600 rounded-md px-5 py-2 text-sm text-white uppercase"
          >
            Remove from cart
          </button>
        ) : (
          <button
            onClick={() => addToCart(item._id)}
            className="bg-green-500 hover:bg-green-600 rounded-md px-5 py-2 text-sm text-white uppercase"
          >
            Add to cart
          </button>
        )}
      </div>
      <button
        onClick={() => removeFromWish(item._id)}
        className="bg-red-500 hover:bg-red-600 rounded-md px-5 py-2 text-sm text-white uppercase"
      >
        <MdDelete className="text-lg" />
      </button>
    </div>
  );
};

export default WishItem;
