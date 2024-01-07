import React from "react";
import { Link } from "react-router-dom";

const ProfileSidebar = () => {
  return (
    <div className="flex flex-col">
      <Link to="/profile">
        <button>account</button>
      </Link>
      <Link to="/profile/edit">
        <button className="w-full">edit profile</button>
      </Link>
    </div>
  );
};

export default ProfileSidebar;
