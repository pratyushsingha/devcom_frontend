import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import ProductItem from "../components/ProductItem";
import Sidebar from "../components/Sidebar";

const ProductPage = () => {
  const { products } = useContext(AppContext);
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row space-x-10">
      <Sidebar />
      <div>
        <h1 className="text-3xl mt-10">PRODUCTS</h1>
        <input
          type="text"
          ref={userRef}
          className="my-8 mx-5 text-xl px-3 pt-2 focus:border-none focus:outline-none"
          placeholder="search by name"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {products.map((item) => (
            <ProductItem key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
