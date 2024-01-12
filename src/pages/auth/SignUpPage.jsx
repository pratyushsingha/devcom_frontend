import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import toast from "react-hot-toast";
import { Spinner } from "../../components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Container from "../../components/Container";

const SignUpPage = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "USER",
      username: "",
      cnfPassword: "",
    },
  });
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  const signUp = async ({ email, password, role, username }) => {
    setLoader(true);
    try {
      const response = await axios.post("/users/register", {
        email: email,
        password: password,
        role: role,
        username: username,
      });
      setLoader(false);
      if (response.status === 201) {
        toast.success("account created successfully");
        navigate("/login");
      }
      console.log(response);
    } catch (err) {
      console.log(err);
      if (err.response.status == 409) {
        toast.error("email or username already exists");
      } else toast.error(err.message);
      setLoader(false);
    }
  };
  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  const watchPassword = watch("password", "");

  return (
    <>
      <Container className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto w-2/5"
            src="https://i.postimg.cc/9FLrHVRz/image-removebg-preview.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(signUp)}>
            <Input
              ref={userRef}
              label="Username"
              placeholder="enter your username"
              {...register("username", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9]{3,20}$/.test(value) ||
                    "username must be a valid address",
                },
              })}
            />
            <p className="text-red-600">{errors.username?.message}</p>
            <Input
              label="Email"
              placeholder="enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(value) ||
                    "email address must be a valid address",
                },
              })}
            />
            <p className="text-red-600">{errors.email?.message}</p>
            <div className="relative">
              <Input
                label="password"
                type={showPassword ? "text" : "password"}
                placeholder="enter your password"
                {...register("password", {
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
                  onClick={() => setShowPassword(!showPassword)}
                  className="rounded-full  mt-10 w-7 h-7 flex items-center justify-center hover:bg-gray-400 focus:outline-none"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>
            <p className="text-red-600">{errors.password?.message}</p>
            <Input
              label="confirm password"
              type={!showPassword && "password"}
              placeholder="confirm password"
              {...register("cnfPassword", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    value === watchPassword || "password doesnot match",
                },
              })}
            />
            <p className="text-red-600">{errors.cnfPassword?.message}</p>
            <div className="flex space-x-4">
              <label>
                <input
                  className="mx-1"
                  type="radio"
                  value="ADMIN"
                  {...register("role", { required: true })}
                />
                Admin
              </label>
              <label>
                <input
                  className="mx-1"
                  type="radio"
                  value="USER"
                  {...register("role", { required: true })}
                />
                User
              </label>
            </div>
            <Button type="submit" classname="w-full">
              {loader && <Spinner />}
              SignUp
            </Button>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              login
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
};

export default SignUpPage;
