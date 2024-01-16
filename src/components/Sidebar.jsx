import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Select from "./Select";
import { sortFilter } from "../utils";

const Sidebar = () => {
  const {
    categories,
    handlePrice,
    selectedPrice,
    handleCategory,
    selectedCategory,
  } = useContext(AppContext);

  return (
    <div className="flex flex-col">
      <div className="text-center">
        <h1 className="text-2xl my-10">FILTERS</h1>
      </div>
      <div className="flex flex-row lg:flex-col space-x-5 lg:space-x-0 lg:space-y-5">
        <div>
          <p className="font-bold">Sort</p>
          <div className="relative inline-block border rounded-lg">
            <Select label="All" options={sortFilter} />
          </div>
        </div>
        <div>
          <p className="font-bold">MAX PRICE-{selectedPrice}</p>
          <input
            className="self-center"
            type="range"
            value={selectedPrice}
            name="price"
            min={100}
            max={1000}
            step={1}
            onChange={handlePrice}
          />
        </div>
        <div>
          <p className="font-bold">Category</p>
          <div className="relative inline-block border rounded-lg">
            <Select label="none" options={categories} onChange={handleCategory}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;