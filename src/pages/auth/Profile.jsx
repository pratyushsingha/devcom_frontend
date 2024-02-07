import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import ProfileSidebar from "../../components/ProfileSidebar";
import { FaEdit } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Container from "../../components/Container";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import InputDiv from "../../components/InputDiv";
import PassStrengthBar from "@/components/PassStrengthBar";
import { passwordStrength } from "check-password-strength";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const passwordSchema = z.object({
  oldPassword: z.string().nonempty("old password is required"),
  newPassword: z
    .string()
    .nonempty("new password is required")
    .min(8, { message: "new password must be 8 or more characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
});

const Profile = () => {
  const { toast } = useToast();
  const { profileInfo, getProfile } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [cnfShowPassword, setCnfShowPassword] = useState(false);
  const [passStrength, setPassStrength] = useState(-1);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      newPassword: "",
      oldPassword: "",
    },
    resolver: zodResolver(passwordSchema),
  });

  const changePassword = async ({ newPassword, oldPassword }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/change-password`,
        {
          newPassword: newPassword,
          oldPassword: oldPassword,
        },
        { withCredentials: true }
      );
      const message = response.data.message;
      toast({
        title: "Success",
        description: message,
        status: "success",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.response
          ? err.response.data.message
          : "Something went wrong",
        status: "error",
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <Container className="flex mt-10 justify-evenly space-x-5">
      <div>
        <ProfileSidebar />
      </div>
      <Card className="w-full ">
        <CardHeader>
          <CardTitle className="text-2xl">My profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-12 items-center justify-between bg-[#0E1629] rounded p-3">
            <img
              className="rounded-full w-32 h-32"
              src={profileInfo.avatar}
              alt={profileInfo.name}
            />
            <div className="flex flex-col">
              <h3 className="text-xl">{profileInfo.username}</h3>
              <p>{profileInfo.email}</p>
              <p className="text-green-500 font-extrabold">
                {profileInfo.role}
              </p>
            </div>
            <Link to="/profile/edit">
              <Button className="flex space-x-2 uppercase">
                <p className="text-lg">edit</p>
                <FaEdit className="self-center" />
              </Button>
            </Link>
          </div>
          <div className="flex space-x-3 text-xl font-bold my-5 w-full">
            <CgDanger className="self-center" />
            <p className="text-2xl">Danzer Zone</p>
          </div>
          <div className="border-2 border-dotted rounded border-red-500 p-3">
            <p className="text-center mb-5 font-semibold">Change password</p>
            <form onSubmit={handleSubmit(changePassword)}>
              <div className="justify-center">
                <div className="flex justify-center space-x-6">
                  <div className="relative">
                    <InputDiv
                      className="w-full"
                      label="Old password"
                      type={showPassword ? "text" : "password"}
                      {...register("oldPassword", {
                        required: true,
                      })}
                      placeholder="enter old password"
                    />
                    <div className="absolute bottom-6 right-2 flex items-center">
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
                  <div className="relative">
                    <InputDiv
                      className="w-full"
                      label="New password"
                      type={cnfShowPassword ? "text" : "password"}
                      {...register("newPassword", {
                        required: true,
                      })}
                      onChange={(e) => {
                        e.target.value !== ""
                          ? setPassStrength(passwordStrength(e.target.value).id)
                          : setPassStrength(-1);
                      }}
                      placeholder="enter new password"
                    />
                    <div className="absolute bottom-6 right-2 flex items-center">
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
                    <PassStrengthBar passStrength={passStrength} />
                  </div>
                </div>
                <div className="flex justify-between mt-3 mr-9">
                  <div className="flex flex-col space-y-2">
                    <p className="text-red-600">
                      {errors.oldPassword?.message}
                    </p>
                    <p className="text-red-600">
                      {errors.newPassword?.message}
                    </p>
                  </div>
                  <Button disabled={isSubmitting || !isDirty} type="submit">
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
