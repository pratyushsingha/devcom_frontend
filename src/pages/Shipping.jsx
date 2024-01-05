import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import AddressForm from "../components/AddressForm";
import { RxCross2 } from "react-icons/rx";

const Shipping = () => {
  const dialogRef = useRef(null);
  const { getAddress, allAddress } = useContext(AppContext);

  useEffect(() => {
    getAddress();
  }, [allAddress]);
  return (
    <div className="my-10">
      <h1 className="text-2xl">choose an address</h1>
      {allAddress.map(
        ({
          addressLine1,
          addressLine2,
          city,
          state,
          country,
          pincode,
          _id,
        }) => (
          <p key={_id}>
            {addressLine1},{addressLine2},{city},{state},{country},pin-{pincode}
          </p>
        )
      )}
      <dialog ref={dialogRef}>
        <div className="mx-10 my-5">
          <div className="flex">
            <h1 className="uppercase text-gray-500 mx-20 my-5 font-semibold">
              available coupons
            </h1>
            <button className="mx-3" onClick={() => dialogRef.current.close()}>
              <RxCross2 className="text-2xl self-center" />
            </button>
          </div>
          <AddressForm />
        </div>
      </dialog>
      <button onClick={() => dialogRef.current.showModal()}>
        add new address
      </button>
    </div>
  );
};

export default Shipping;
