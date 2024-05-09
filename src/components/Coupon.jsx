import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Button } from "./ui/button";
import { CouponContext } from "@/context/CouponContext";

const Coupon = ({ item }) => {
  const { applyCoupon } = useContext(CouponContext);
  return (
    <div className="mx-2 border-2 border-purple-600 flex flex-col mb-4 rounded">
      <div className="text-center bg-[#0E1629] border border-purple-500 rounded">
        <Button
          variant="ghost"
          onClick={() => applyCoupon(item.couponCode)}
          className="bg-[#0E1629] text-lg font-bold"
        >
          {item.couponCode}
        </Button>
        <button></button>
      </div>
      <p className="p-2">
        Get flat &#8377;{item.discountValue} off on minumum order of &#8377;
        {item.minimumCartValue}
      </p>
    </div>
  );
};

export default Coupon;
