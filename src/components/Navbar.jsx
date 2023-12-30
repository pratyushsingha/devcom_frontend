import React from "react";
import "../index.css";

const Navbar = () => {
  return (
    <div className="mx-10 my-2">
      <div className="flex flex-row justify-between">
        <div className="self-center">
          <h1 className="text-xl font-bold">DevCom</h1>
        </div>
        <div className="flex space-x-3">
            <button className="btn btn-primary">Login</button>
            <button className="btn btn-secondary">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
