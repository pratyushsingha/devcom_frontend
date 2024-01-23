import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { DropDownOptions } from "../utils";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const DropdownMenu = () => {
  const { logout } = useContext(AuthContext);
  const { profileInfo } = useContext(AppContext);
  return (
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Hii {profileInfo.username} 👋</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        {DropDownOptions.map((option) => (
          <Link to={`/${option.name}`}>
            <DropdownMenuItem key={option.id}>{option.name}</DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <a href="https://github.com/pratyushsingha/react_ecommerce" target="_blank">
          GitHub
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem>Support</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-red-600" onClick={logout}>
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default DropdownMenu;
