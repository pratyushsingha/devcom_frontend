import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const usePagination = () => {
  const { setPage } = useContext(AppContext);

  const handlePrevClick = () => {
    setPage((prev) => prev - 1);
  };

  const handleNextClick = () => {
    setPage((prev) => prev + 1);
  };

  return { handlePrevClick, handleNextClick };
};

export default usePagination;
