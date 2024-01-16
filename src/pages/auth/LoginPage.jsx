import axios from "axios";
import React, { useState, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { Spinner } from "../../components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import Container from "../../components/Container";
import { AppContext } from "../../context/AppContext";
const LoginPage = () => {
  const { loader, setLoader } = useContext(AppContext);
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    username: "",
    password: "",
  });

  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(null);

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  const login = async ({ username, password }) => {
    try {
      if (localStorage.getItem("accessToken")) {
        navigate("/profile");
      } else {
        setLoader(true);
        const response = await axios.post("/users/login", {
          password: password,
          username: username,
        });
        console.log(response.data.data);
        const accessToken = response.data.data.accessToken;
        const refreshToken = response.data.data.refreshToken;
        // console.log(accessToken);
        //   console.log(auth);
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          window.location.reload(false);
        }
        setLoader(false);
      }
    } catch (err) {
      console.log(err);
      if (!err.response) {
        toast.error("no server response");
      } else if (err.response?.status === 400) {
        toast.error("missing username or password");
      } else if (err.response?.status === 401) {
        toast.error("unAuthorized");
      } else {
        toast.error("login failed");
      }
      setLoader(false);
    }
  };

  return (
    <Container>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
          <form className="space-y-6" onSubmit={handleSubmit(login)}>
            <Input
              label="username"
              placeholder="enter ur username"
              {...register("username", {
                required: true,
              })}
            />
            <p className="text-red-600">{errors.username?.message}</p>
            <div className="relative">
              <Input
                label="password"
                type={showPassword ? "text" : "password"}
                placeholder="enter ur password"
                {...register("password", {
                  required: true,
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
            <div className="text-sm">
              <Link
                to="/forget-password"
                className="flex justify-end font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forget password?
              </Link>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loader && <Spinner classname="mx-3"/>}
                <p>Sign in</p>
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              signup
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
