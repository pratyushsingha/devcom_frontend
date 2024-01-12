import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import ProfileSidebar from "../../components/ProfileSidebar";
import axios from "axios";
import DropZone from "../../components/DropZone";
import Container from "../../components/Container";
import { toast } from "react-hot-toast";
import Button from "../../components/Button";
import Input from "../../components/Input";

const EditProfile = () => {
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
        // console.log(data);
        toast.success("avatar updated successfully");
      } catch (err) {
        console.log(err);
        toast.error(err.message);
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
      <Container className="flex mt-10 justify-evenly">
        <div>
          <ProfileSidebar />
        </div>
        <div className="space-y-5">
          <div className="flex flex-col space-y-2 rounded bg-slate-200 p-3">
            <form onSubmit={updateProfile}>
              <h1 className="text-3xl mb-3">Personal Information</h1>
              <Input
                label="First Name"
                value={profileDetails.firstName}
                onChange={(e) => handleInputChange(e, "firstName")}
                placeholder="Enter ur First Name"
              />
              <Input
                label="First Name"
                value={profileDetails.lastName}
                onChange={(e) => handleInputChange(e, "lastName")}
                placeholder="Enter ur Last Name"
              />
              <Input
                label="County Code"
                value={profileDetails.countryCode}
                onChange={(e) => handleInputChange(e, "countryCode")}
                placeholder="+91"
              />
              <Input
                label="Phone Number"
                type="number"
                value={profileDetails.phoneNumber}
                onChange={(e) => handleInputChange(e, "phoneNumber")}
                placeholder="0123456789"
              />
              <Button
                classname="mt-3 w-full"
                onClick={() => updateProfile(profileDetails)}
                disabled={isSaveDisabled}
              >
                save
              </Button>
            </form>
          </div>
          <div className="rounded bg-slate-200 p-3">
            <h1 className="text-3xl my-5">Upload Avatar</h1>
            <DropZone files={files} setFiles={setFiles} />
            <Button classname="w-full max-lg mt-3" onClick={updateAvatar}>Upload</Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default EditProfile;
