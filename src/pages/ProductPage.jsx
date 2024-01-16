import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import Sidebar from "../components/Sidebar";
import Container from "../components/Container";
import Button from "../components/Button";
import usePagination from "../hooks/usePagination";

const ProductPage = () => {
  const { handlePrevClick, handleNextClick } = usePagination();
  const {
    handleInputChange,
    page,
    getCategory,
    getProducts,
    result,
    query,
    hastNextPage,
  } = useContext(AppContext);
  const userRef = useRef();

  useEffect(() => {
    getProducts();
  }, [page]);

  useEffect(() => {
    userRef.current.focus();
    getProducts();
    getCategory();
  }, []);

  return (
    <Container className="flex flex-col lg:flex-row space-x-10">
      <Sidebar />
      <div>
        <h1 className="text-3xl mt-10">PRODUCTS</h1>
        <input
          type="text"
          ref={userRef}
          onChange={handleInputChange}
          value={query}
          className="my-8 mx-5 text-xl px-3 pt-2 focus:border-none focus:outline-none"
          placeholder="search by name"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">{result}</div>
        <div className="flex space-x-3 justify-center">
          <Button disabled={page <= 1} onClick={handlePrevClick}>
            &laquo; Previous
          </Button>
          <Button disabled={hastNextPage == false} onClick={handleNextClick}>
            Next &raquo;
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ProductPage;
