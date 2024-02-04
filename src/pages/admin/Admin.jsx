import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const Admin = () => {
  const { progress, setProgress } = useContext(AppContext);
  return (
    <>
      <LoadingBar
        color="#3F51B5"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        shadow="true"
        className="pb-1"
      />
      <Outlet />
    </>
  );
};

export default Admin;
