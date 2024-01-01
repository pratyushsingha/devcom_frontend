import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProductDetails = () => {
  const { id } = useParams();
  // console.log(id);
  const [ProductDetails, setProductDetails] = useState([]);
  const { products, addToCart, quantity, setQuantity } = useContext(AppContext);
  useEffect(() => {
    const product = products.find((item) => item._id === id);
    if (product) {
      setProductDetails([product]);
    }
  }, [id, products]);

  return (
    <>
      {ProductDetails.map((item) => (
        <div key={item._id}>
          this is product details {item._id}poage
          <img src={item.mainImage.url} alt="" />
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <p>&#8377;{item.price}</p>
          <button onClick={() => addToCart(item._id,quantity)}>Add To Cart</button>
          <button>Add To Wishlist</button>
        </div>
      ))}
      <br />
    </>
  );
};

export default ProductDetails;
