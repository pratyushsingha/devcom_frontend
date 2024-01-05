import React, { useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";

const AddressForm = () => {
  const { address, setAddress, saveAddress } =
    useContext(AppContext);
  return (
    <form onSubmit={saveAddress}>
      <div className=" flex flex-col justify-center items-center space-y-5">
        <input
          value={address.addressLine1}
          type="text"
          className="border-2 p-3 text-lg rounded focus:outline-none"
          placeholder="Address 1"
          onChange={(e) =>
            setAddress({ ...address, addressLine1: e.target.value })
          }
          required
        />
        <input
          value={address.addressLine2}
          type="text"
          className="border-2 p-3 text-lg rounded focus:outline-none"
          placeholder="Address 2"
          onChange={(e) =>
            setAddress({ ...address, addressLine2: e.target.value })
          }
          required
        />
        <input
          value={address.city}
          type="text"
          className="border-2 p-3 text-lg rounded focus:outline-none"
          placeholder="City"
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          required
        />
        <input
          value={address.state}
          type="text"
          className="border-2 p-3 text-lg rounded focus:outline-none"
          placeholder="State"
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
          required
        />

        <input
          value={address.pincode}
          type="text"
          className="border-2 p-3 text-lg rounded focus:outline-none"
          placeholder="Pin Code"
          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
          required
        />
        <select
          value={address.country}
          className="appearance-none border-2 rounded p-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-10/12"
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
          required
        >
          <option value="country" disabled>
            Choose Country
          </option>
          <option value="India">India</option>
        </select>
        <button
          className="bg-indigo-500 font-semibold hover:bg-indigo-600 rounded-md py-3 text-sm text-white uppercase w-10/12"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
