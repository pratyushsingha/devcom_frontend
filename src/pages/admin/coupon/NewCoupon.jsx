import React, { useState } from "react";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import { couponType } from "../../../utils";

const NewCoupon = () => {
  const [newCoupon, setNewCoupon] = useState({
    name: "",
    couponCode: "",
    type: "",
    discountValue: Number,
    minimumCartValue: Number,
    expiryDate: "",
    startDate: "",
  });
  return (
    <>
      <Input
        label="name"
        value={newCoupon.name}
        onchange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
      />
      <Select
        options={couponType}
        label="select a type"
        onchange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value })}
      />
      <Input
        label="discount value"
        type="number"
        value={newCoupon.discountValue}
        onchange={(e) =>
          setNewCoupon({ ...newCoupon, discountValue: e.target.value })
        }
      />
      <Input
        label="maximum cart value"
        type="number"
        value={newCoupon.minimumCartValue}
        onchange={(e) =>
          setNewCoupon({ ...newCoupon, discountValue: e.target.value })
        }
      />
      <Input
        label="maximum cart value"
        type="datetime-local"
        value={newCoupon.expiryDate}
        onchange={(e) =>
          setNewCoupon({ ...newCoupon, expiryDate: e.target.value })
        }
      />
    </>
  );
};

export default NewCoupon;
