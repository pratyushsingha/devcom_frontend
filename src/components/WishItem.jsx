import { useContext } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { Button } from "./ui/button";
import { WishContext } from "@/context/WishContext";

const WishItem = ({ item }) => {
  const { removeFromWish } = useContext(WishContext);
  return (
    <div className="flex items-center hover:bg-[#00001e] px-6 py-2">
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
        <div className="flex flex-col ml-4 flex-grow">
          <span className="font-bold text-sm">{item.product.name}</span>
          <span className="text-center w-1/5 font-semibold text-sm">
            ₹ {item.product.price}
          </span>
        </div>
      </div>
      <Button onClick={() => removeFromWish(item.product._id)} className="">
        <MdDelete />
      </Button>
    </div>
  );
};

export default WishItem;
