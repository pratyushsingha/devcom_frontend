import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import ProfileSidebar from "../../components/ProfileSidebar";

const Profile = () => {
  const { profileInfo, getProfile } = useContext(AppContext);

  useEffect(() => {
    getProfile();
  }, [useEffect]);

  return (
    <div className="flex space-x-6">
      <ProfileSidebar />
      <div>
        <p>{profileInfo.email}</p>
        <p>{profileInfo.username}</p>
        <img src={profileInfo.avatar} alt="" />
        <p>{profileInfo.role}</p>
      </div>
    </div>
  );
};

export default Profile;
