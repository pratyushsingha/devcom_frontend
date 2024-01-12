import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, authentication = true }) => {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const { authStatus } = useContext(AppContext);
  useEffect(() => {
    if (authentication && !localStorage.getItem("accessToken")) {
      navigate("/login");
    } else if (!authentication && localStorage.getItem("accessToken")) {
      navigate("/profile");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);
  return loader ? <h1>loading...</h1> : <>{children}</>;
};

export default AuthLayout;
