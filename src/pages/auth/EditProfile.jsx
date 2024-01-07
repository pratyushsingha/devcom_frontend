import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import ProfileSidebar from "../../components/ProfileSidebar";
import axios from "axios";
import DropZone from "../../components/DropZone";

const EditProfile = () => {
  const { profileInfo, setProfileInfo } = useContext(AppContext);
  const [files, setFiles] = useState([]);
  const [profileDetails, setProfileDetails] = useState({
    firstName: "",
    lastName: "",
    countryCode: "",
    phoneNumber: "",
  });

  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const getProfileDetails = async () => {
    try {
      const response = await axios.get("/ecommerce/profile", {
        withCredentials: true,
      });
      setProfileDetails({
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        countryCode: response.data.data.countryCode,
        phoneNumber: response.data.data.phoneNumber,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateProfile = async (profileDetails) => {
    try {
      const response = await axios.patch("/ecommerce/profile", profileDetails, {
        withCredentials: true,
      });
      console.log(response);
      setIsFormDirty(false);
      setIsSaveDisabled(true);
    } catch (err) {
      console.log(err);
    }
  };

  const updateAvatar = async () => {
    if (files) {
      try {
        const formData = new FormData();
        formData.append("avatar", files);
        const data = await axios.patch("/users/avatar", formData, {
          withCredentials: true,
        });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleInputChange = (e, field) => {
    setProfileDetails({
      ...profileDetails,
      [field]: e.target.value,
    });
    setIsFormDirty(true);
    setIsSaveDisabled(false);
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  return (
    <>
      <div className="flex space-x-10">
        <ProfileSidebar />
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={profileDetails.firstName}
            onChange={(e) => handleInputChange(e, "firstName")}
            placeholder="First Name"
          />
          <input
            type="text"
            value={profileDetails.lastName}
            onChange={(e) => handleInputChange(e, "lastName")}
            placeholder="Last Name"
          />
          <input
            type="text"
            value={profileDetails.countryCode}
            onChange={(e) => handleInputChange(e, "countryCode")}
            placeholder="+91"
          />
          <input
            type="text"
            value={profileDetails.phoneNumber}
            onChange={(e) => handleInputChange(e, "phoneNumber")}
            placeholder="0123456789"
          />
          <button
            onClick={() => updateProfile(profileDetails)}
            disabled={isSaveDisabled}
          >
            save
          </button>
        </div>
        <p>Upload avatar</p>
        <DropZone files={files} setFiles={setFiles} />
        <button onClick={updateAvatar}>update image</button>
      </div>
    </>
  );
};

export default EditProfile;
