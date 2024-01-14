import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { DropDownOptions } from "../utils";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const DropDownMenu = () => {
  const { logout } = useContext(AuthContext);
  const { profileInfo } = useContext(AppContext);
  return (
    <div className="absolute flex flex-col space-y-3 bg-slate-200 py-3 w-max rounded">
      <ul className="px-3">
        Hi{" "}
        <span className="text-red-400 font-semibold">
          {profileInfo.username}
        </span>
      </ul>
      <div className="border-t border-gray-500"></div>
      <ul>
        {DropDownOptions.map((option) => (
          <li className="px-3 py-1.5 hover:bg-slate-300" key={option.id}>
            <Link to={`/${option.name}`}>{option.name}</Link>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-500"></div>
      <ul>
        <a href="https://github.com/pratyushsingha" target="_blank">
          <li className="px-3 py-1.5 hover:bg-slate-300">Github</li>
        </a>
        <li
          onClick={() => logout()}
          className="cursor-pointer text-red-500 px-3 py-1.5 hover:bg-slate-300"
        >
          logout
        </li>
      </ul>
    </div>
  );
};

export default DropDownMenu;
