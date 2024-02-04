import { useEffect, useRef } from "react";
import { Input } from "../ui/input";

const TableSearchFilter = ({ filter, setFilter, inputPlaceholder }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Input
      ref={inputRef}
      value={filter || ""}
      onChange={(e) => {
        setFilter(e.target.value);
      }}
      placeholder={inputPlaceholder}
      className="w-1/3"
    />
  );
};

export default TableSearchFilter;
