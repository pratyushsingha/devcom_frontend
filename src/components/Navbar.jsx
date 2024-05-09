import { useContext, useEffect } from "react";
import "../index.css";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import { AppContext } from "../context/AppContext";
import Spinner from "./loader/Spinner";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropDown from "./NavDropDown";
import { CartContext } from "@/context/CartContext";

const Navbar = () => {
  const { loader, profileInfo, getProfile } = useContext(AppContext);
  const { cartProducts, getCart, setCartProducts } = useContext(CartContext);

  useEffect(() => {
    getCart();
  }, [setCartProducts]);

  return (
    <div className="flex relative">
      <Container>
        <div className="flex flex-row justify-between">
          <Link to="/">
            <div className="self-center">
              <h1 className="text-2xl font-bold">DevCom</h1>
            </div>
          </Link>
          <div className="flex space-x-4 self-center">
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-500" : "text-white"
                } text-xl self-center hover:text-blue-500`
              }
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-500" : "text-white"
                } text-xl self-center py-2 pr-2 hover:text-blue-500`
              }
              to="/products"
            >
              <FaSearch />
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? "text-blue-500" : "text-white"}`
              }
              to="/cart"
            >
              <button className="flex text-xl self-center py-2 pr-2 hover:text-blue-500">
                <FaCartShopping />
                <p className="bg-red-500 w-4 h-4 rounded-full text-xs text-white">
                  {cartProducts.length}
                </p>
              </button>
            </NavLink>
            {localStorage.getItem("accessToken") ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button>
                    <img
                      src={profileInfo && profileInfo.avatar}
                      className="w-10 h-10 rounded-full"
                      alt={profileInfo.username}
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropDown />
              </DropdownMenu>
            ) : (
              <div className="self-center space-x-3">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
      {loader && (
        <Spinner classname="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 text-end" />
      )}
    </div>
  );
};

export default Navbar;
