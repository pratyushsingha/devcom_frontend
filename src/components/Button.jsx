import React from "react";

const Button = ({ children, type = "button", classname = "", ...props }) => {
  return (
    <button
      className={`${classname} bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
