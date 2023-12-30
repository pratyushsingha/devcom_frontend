import React from "react";
import { Link } from "react-router-dom";

const Product = ({ item }) => {
  return (
    <div>
      <Link to={`/product/${item._id}`}>
        <img className="w-24" src={item.mainImage.url} alt="" />
        <h1>{item.name}</h1>
        <h2>&#8377;{item.price}</h2>
        {/* <p>{item._id}</p> */}
      </Link>
    </div>
  );
};

export default Product;
