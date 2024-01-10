import axios from "axios";
import React, { useState, useRef, useEffect, useContext } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {

  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [inputForm, setInputForm] = useState({
    password: "",
    username: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [inputForm.username, inputForm.password]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/login", inputForm);
      //   console.log(response);
      const accessToken = response.data.data.accessToken;
      // console.log(accessToken);
      //   console.log(auth);
      if (accessToken) {
        navigate("/products");
      }
      //   console.log(auth);
    } catch (err) {
      console.log(err);
      if (!err.response) {
        setErrMsg("no server response");
      } else if (err.response?.status === 400) {
        setErrMsg("missing username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("unAuthorized");
      } else {
        setErrMsg("login failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div>
      <p ref={errRef} aria-live="assertive">
        {errMsg}
      </p>
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
          <form className="space-y-6" onSubmit={login}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  ref={userRef}
                  value={inputForm.username}
                  onChange={(e) =>
                    setInputForm({ ...inputForm, username: e.target.value })
                  }
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="forgot-password"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
              <div className="flex justify-between relative">
                  <input
                    value={inputForm.password}
                    onChange={(e) =>
                      setInputForm({ ...inputForm, password: e.target.value })
                    }
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
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
    </div>
  );
};

export default LoginPage;
