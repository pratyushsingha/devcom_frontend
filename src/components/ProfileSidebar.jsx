import React from "react";
import { Link } from "react-router-dom";

const ProfileSidebar = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Link to="/profile">
        <button className="border-2 px-20 py-2 w-full">account</button>
      </Link>
      <Link to="/profile/edit">
        <button className="border-2 px-20 py-2 w-full">edit profile</button>
      </Link>
    </div>
  );
};

export default ProfileSidebar;
