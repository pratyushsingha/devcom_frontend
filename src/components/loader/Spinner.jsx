import React from "react";
import "./spinner.css";
import "../../index.css"
const Spinner = ({ classname = "", ...props }) => {
  return (
    <div class={`loader`}></div>
  );
};

export default Spinner;
