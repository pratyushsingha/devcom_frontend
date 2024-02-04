import { useContext, useEffect } from "react";
import { FaGithub, FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import Spinner from "../loader/Spinner";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Container from "../Container";
import { AppContext } from "@/context/AppContext";
import { Button } from "../ui/button";
import { RiAdminLine } from "react-icons/ri";
import { MdContactMail } from "react-icons/md";
import { AuthContext } from "@/context/AuthContext";
import { IoLogOut } from "react-icons/io5";

const AdminNavbar = () => {
  const { loader, profileInfo, getProfile } = useContext(AppContext);
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    getProfile();
  }, []);
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
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>
                    Hii {profileInfo.username} 👋
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator/>
                  <Link to="/">
                    <DropdownMenuItem className="flex space-x-3">
                      <RiAdminLine className="w-5 h-5" />
                      <span>User portal</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <a
                      className="flex space-x-2"
                      href="https://github.com/pratyushsingha/react_ecommerce"
                      target="_blank"
                    >
                      <FaGithub className="w-5 h-5" />
                      <span>Github</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex space-x-3">
                    <MdContactMail className="w-5 h-5" />
                    <span>Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 flex space-x-3"
                    onClick={logout}
                  >
                    <IoLogOut className="w-5 h-5" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
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

export default AdminNavbar;
