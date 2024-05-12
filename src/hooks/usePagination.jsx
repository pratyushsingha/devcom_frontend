import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

const usePagination = () => {
  const { page, setPage, hasNextPage, setHasNextPage } = useContext(AppContext);

  const handlePrevClick = () => {
    setPage((prev) => prev - 1);
  };

  const handleNextClick = () => {
    setPage((prev) => prev + 1);
  };

  return {
    handlePrevClick,
    handleNextClick,
    page,
    setPage,
    hasNextPage,
    setHasNextPage,
  };
};

export default usePagination;
