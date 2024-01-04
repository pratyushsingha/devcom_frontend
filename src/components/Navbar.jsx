import React from "react";
import "../index.css";
import { FaSearch, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex flex-row justify-between">
        <Link to="/">
          <div className="self-center">
            <h1 className="text-2xl font-bold">DevCom</h1>
          </div>
        </Link>
        <div className="flex space-x-4 self-center">
          <Link to="/">
            <button className="text-xl self-center hover:text-blue-500">
              HOME
            </button>
          </Link>
          <Link to="/products">
            <button className="text-xl self-center py-2 pr-2 hover:text-blue-500">
              <FaSearch />
            </button>
          </Link>
          <Link to="/cart">
            <button className="text-xl self-center py-2 pr-2 hover:text-blue-500">
              <FaCartShopping />
            </button>
          </Link>
          <Link to="/login">
            <button className="text-xl self-center py-2 pr-2 hover:text-blue-500">
              <FaUser />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
