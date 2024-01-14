import { useState } from "react";
import "../index.css";
import { FaSearch, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Container from "./Container";
import DropDownMenu from "./DropDownMenu";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <Container>
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
          {localStorage.getItem("accessToken") ? (
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="text-xl self-center py-2 pr-2 hover:text-blue-500"
              >
                <FaUser />
              </button>
              {openDropdown && <DropDownMenu />}
            </div>
          ) : (
            <div className="self-center space-x-3">
              <Link to="/login">
                <button className="p-2 bg-slate-600 rounded text-white hover:bg-slate-500">Login</button>
              </Link>
              <Link to="/register">
                <button className="p-2 bg-slate-600 rounded text-white hover:bg-slate-500">Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
