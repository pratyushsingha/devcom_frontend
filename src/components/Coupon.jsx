import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Coupon = ({ item }) => {
  const { applyCoupon } = useContext(AppContext);
  return (
    <div className="mx-2 border-2 border-orange-600 flex flex-col mb-4">
      <div className="text-center bg-yellow-400 border border-orange-500">
        <button
          onClick={() => applyCoupon(item.couponCode)}
          className="bg-yellow-400 text-lg font-bold"
        >
          {item.couponCode}
        </button>
        <button></button>
      </div>
      <p>
        Get flat &#8377;{item.discountValue} off on minumum order of &#8377;
        {item.minimumCartValue}
      </p>
    </div>
  );
};

export default Coupon;
