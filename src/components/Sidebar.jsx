import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Sidebar = () => {
  const { categories } = useContext(AppContext);
  const [selectedPrice, setSelectedPrice] = useState(1000);
  const handlePrice = (e) => {
    setSelectedPrice(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="text-center">
        <h1 className="text-2xl my-10">FILTERS</h1>
      </div>
      <div className="flex flex-row lg:flex-col space-x-5 lg:space-x-0 lg:space-y-5">
        <div>
          <p className="font-bold">Sort</p>
          <div className="relative inline-block border rounded-lg">
            <select className="appearance-none  px-3 py-2 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option className="text-xs" value="">
                Select an option
              </option>
              <option className="text-xs" value="option1">
                None
              </option>
              <option className="text-xs" value="option2">
                Price(Low-High)
              </option>
              <option className="text-xs" value="option3">
                Price(High-Low)
              </option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6z" />
              </svg>
            </div>
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
            <select className="appearance-none  px-3 py-2 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option className="text-xs" value="">
                Select an option
              </option>
              {categories.map((item) => (
                <option key={item._id} className="text-xs" value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
