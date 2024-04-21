import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TiTick } from "react-icons/ti";

const SuccessPage = () => {
  const searchQuery = useSearchParams()[0];
  const refNo = searchQuery.get("ref");
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <TiTick className="text-green-500 text-9xl" />
      <h1 className="text-3xl">Order placed successfully</h1>
      <p>Ref no: {refNo}</p>
      <Link to="/">
        <button className="flex w-full justify-center rounded-md bg-indigo-600 my-3 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Home
        </button>
      </Link>
    </div>
  );
};

export default SuccessPage;
