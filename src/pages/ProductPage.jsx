import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import Sidebar from "../components/Sidebar";
import Container from "../components/Container";
import usePagination from "../hooks/usePagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <Container className="flex flex-col lg:flex-row space-x-5">
      <div className="mt-10">
        <Sidebar />
      </div>
      <div className="mt-16">
        <h1 className=" scroll-m-20 text-2xl font-semibold tracking-tight uppercase">
          PRODUCTS
        </h1>
        <Input
          type="text"
          ref={userRef}
          onChange={handleInputChange}
          value={query}
          className="my-8 mx-5 w-50 text-lg"
          placeholder="search by name"
        />
        <div className="grid grid-cols-2 md:grid-cols-4">
          {result.length > 0 ? result : (
            <p className="text-center">
              no products available
            </p>
          )}
        </div>
        <div className="flex space-x-3 justify-center mt-3">
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
