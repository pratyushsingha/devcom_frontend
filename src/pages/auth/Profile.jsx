import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import ProfileSidebar from "../../components/ProfileSidebar";
import { FaEdit } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Container from "../../components/Container";

const Profile = () => {
  const { profileInfo, getProfile } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [cnfShowPassword, setCnfShowPassword] = useState(false);

  useEffect(() => {
    getProfile();
  }, [useEffect]);

  return (
    <Container className="flex">
        <ProfileSidebar />
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl mb-3">My Profile</h1>
        <div className="flex space-x-12 items-center justify-between">
          <img
            className="rounded-full w-32 h-32"
            src={profileInfo.avatar}
            alt={profileInfo.name}
          />
          <div className="flex flex-col">
            <h3 className="text-xl">{profileInfo.username}</h3>
            <p>{profileInfo.email}</p>
            <p className="text-green-500 font-extrabold">{profileInfo.role}</p>
          </div>
          <Link to="/profile/edit">
            <button className="flex space-x-2 bg-indigo-500 font-semibold hover:bg-indigo-600 rounded-md px-3 py-2 text-sm text-white uppercase w-full">
              <p className="text-lg">edit</p>
              <FaEdit className="self-center" />
            </button>
          </Link>
        </div>
        <div className="flex space-x-3 text-xl font-bold w-full">
          <CgDanger className="self-center" />
          <p>Danzer Zone</p>
        </div>
        <div className="border rounded border-red-500 p-3">
          <div className="flex space-x-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <div className="flex justify-between relative">
                  <input
                    // value={inputForm.password}
                    // onChange={(e) =>
                    //   setInputForm({ ...inputForm, password: e.target.value })
                    // }
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-none pr-8"
                  />
                  {showPassword ? (
                    <AiFillEyeInvisible
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <AiFillEye
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="cnfPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <div className="flex justify-between relative">
                  <input
                    // value={inputForm.password}
                    // onChange={(e) =>
                    //   setInputForm({ ...inputForm, password: e.target.value })
                    // }
                    id="cnfPassword"
                    name="cnfPassword"
                    type={cnfShowPassword ? "text" : "password"}
                    required
                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-none pr-8"
                  />
                  {cnfShowPassword ? (
                    <AiFillEyeInvisible
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <AiFillEye
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
