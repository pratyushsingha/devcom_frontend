import React, { useState, useEffect, useContext } from "react";
import Product from "../components/Product";
import { AppContext } from "../context/AppContext";

const ProductPage = () => {
  const { products } = useContext(AppContext);

  return (
    <>
      this is product page
      {products.map((item) => (
        <Product key={item._id} item={item} />
      ))}
    </>
  );
};

export default ProductPage;
