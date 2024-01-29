import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";

const GenerateCoupon = ({ newCoupon, setNewCoupon }) => {
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isSpecialChar, setIsSpecialChar] = useState(false);

  const generatedCoupon = useCallback(() => {
    let coupon = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (isNumber) {
      str += "1234567890";
    }
    if (isSpecialChar) {
      str += "!@#$%^&*_+-=";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      coupon += str.charAt(char);
    }

    setNewCoupon({ ...newCoupon, couponCode: coupon });
  }, [length, isNumber, isSpecialChar, setNewCoupon]);

  useEffect(() => {
    generatedCoupon();
  }, [length, isNumber, isSpecialChar, generatedCoupon]);

  return (
    <div className="space-y-2">
      <div className="flex space-x-3">
        <Input
          value={newCoupon.couponCode}
          onChange={(e) => {
            setNewCoupon({ ...newCoupon, couponCode: e.target.value });
          }}
          required
          placeholder="coupon code"
        />
        <Slider
          value={[length]}
          onValueChange={(value) => setLength(value[0])}
          defaultValue={[8]}
          max={25}
          min={8}
          step={1}
        />
        <span className="self-center">({length})</span>
      </div>
      <Label htmlFor="include">Include</Label>
      <div
        id="include"
        className="outline-dotted px-2 py-3 my-2 outline-1 outline-slate-800 rounded flex space-x-3 justify-center"
      >
        <div className="flex items-center space-x-2">
          <Checkbox
            onCheckedChange={(prev) => setIsNumber(prev)}
            id="numbers"
          />
          <label
            htmlFor="numbers"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Numbers
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            onCheckedChange={(prev) => setIsSpecialChar(prev)}
            id="symbols"
          />
          <label
            htmlFor="symbols"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Symbols
          </label>
        </div>
      </div>
    </div>
  );
};
export default GenerateCoupon;
