import React from "react";
import ProductItem from "../components/ProductItem";
import Container from "../components/Container";
import { HomeProducts } from "../utils";



const Home = () => {
  return (
    <Container>
      <div className="flex justify-center items-center">
        <img
          className="w-fit-content"
          src="https://i.postimg.cc/7YHVjpJK/15275006-5594188.jpg"
          alt=""
        />
      </div>
      <h1 className="text-3xl my-3">LATEST PRODUCTS</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {HomeProducts.map((item) => (
          <ProductItem key={item._id} product={item} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
