import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import ProfileSidebar from "../../components/ProfileSidebar";
import { FaEdit } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Container from "../../components/Container";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import { toast } from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const { profileInfo, getProfile } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [cnfShowPassword, setCnfShowPassword] = useState(false);
  const { register, handleSubmit, formState } = useForm({
    newPassword: "",
    oldPassword: "",
  });

  const { errors } = formState;

  const changePassword = async ({ newPassword, oldPassword }) => {
    try {
      const data = await axios.post(
        "/users/change-password",
        {
          newPassword: newPassword,
          oldPassword: oldPassword,
        },
        { withCredentials: true }
      );
      // console.log(data);
      toast.success("password changed successfully");
    } catch (err) {
      // console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Container className="flex mt-10 justify-evenly">
      <div>
        <ProfileSidebar />
      </div>
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl mb-3">My Profile</h1>
        <div className="flex space-x-12 items-center justify-between bg-slate-200 rounded p-3">
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
            <Button className="flex space-x-2 bg-indigo-500 font-semibold hover:bg-indigo-600 rounded-md px-3 py-2 text-sm text-white uppercase w-full">
              <p className="text-lg">edit</p>
              <FaEdit className="self-center" />
            </Button>
          </Link>
        </div>
        <div className="flex space-x-3 text-xl font-bold w-full">
          <CgDanger className="self-center" />
          <p>Danzer Zone</p>
        </div>
        <div className="border-2 border-dotted rounded border-red-500 p-3">
          <p className="text-center mb-5 font-semibold">Change password</p>
          <form onSubmit={handleSubmit(changePassword)}>
            <div>
              <div className="flex space-x-6">
                <div className="relative">
                  <Input
                    label="Old password"
                    type={showPassword ? "text" : "password"}
                    {...register("oldPassword", {
                      required: true,
                    })}
                  />
                  <div className="absolute bottom-1 right-2 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="rounded-full  mt-10 w-7 h-7 flex items-center justify-center hover:bg-gray-400 focus:outline-none"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </button>
                  </div>
                </div>
                <p className="text-red-600">{errors.oldPassword?.message}</p>
                <div className="relative">
                  <Input
                    label="New password"
                    type={cnfShowPassword ? "text" : "password"}
                    {...register("newPassword", {
                      required: true,
                      validate: {
                        matchPattern: (value) =>
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                            value
                          ) || "password must be strong",
                      },
                    })}
                  />
                  <div className="absolute bottom-1 right-2 flex items-center">
                    <button
                      type="button"
                      onClick={() => setCnfShowPassword(!cnfShowPassword)}
                      className="rounded-full  mt-10 w-7 h-7 flex items-center justify-center hover:bg-gray-400 focus:outline-none"
                    >
                      {cnfShowPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-3 mr-9">
                <p className="text-red-600">{errors.newPassword?.message}</p>
                <Button type="submit">Save</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
