import React from "react";
import "./spinner.css";
// import "../../index.css"
const Spinner = ({ classname = "", ...props }) => {
  return (
    <span className="loader"></span>
  );
};

export default Spinner;
