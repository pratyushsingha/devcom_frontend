import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { TiInputChecked } from "react-icons/ti";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const USER_REGEX = /^[a-zA-Z0-9]{3,20}$/;
const PASS_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const SignUpPage = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [validUserName, setValidUserName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [validPassword, setValidPassword] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  const [cnfPass, setCnfPass] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [cnfShowPassword, setCnfShowPassword] = useState(false);

  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
    role: "USER",
    username: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const result = USER_REGEX.test(inputForm.username);
    console.log(result);
    setValidUserName(result);
  }, [inputForm.username]);

  useEffect(() => {
    const result = PASS_REGEX.test(inputForm.password);
    // console.log(result);
    setValidPassword(result);
    const match = inputForm.password === cnfPass;
    setValidMatch(match);
  }, [inputForm.password, cnfPass]);

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/register", inputForm);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [
    inputForm.username,
    inputForm.password,
    inputForm.email,
    inputForm.role,
    cnfPass,
  ]);
  return (
    <>
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
          <form className="space-y-6" onSubmit={register}>
            <div>
              <label
                htmlFor="username"
                className="flex text-sm font-medium leading-6 text-gray-900"
              >
                Username
                <span
                  className={
                    validUserName
                      ? "block self-center ml-1 text-xl text-green-500"
                      : "hidden"
                  }
                >
                  <TiInputChecked />
                </span>
                <span
                  className={
                    validUserName || !inputForm.username
                      ? "hidden"
                      : "block self-center ml-1  text-red-500"
                  }
                >
                  <ImCross />
                </span>
              </label>
              <div className="mt-2">
                <input
                  ref={userRef}
                  value={inputForm.username}
                  onChange={(e) =>
                    setInputForm({ ...inputForm, username: e.target.value })
                  }
                  aria-invalid={validUserName ? "false" : "true"}
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  name="username"
                  type="text"
                  autoComplete="off"
                  required
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p
                  className={
                    userFocus && inputForm.username && !validUserName
                      ? "text-red-500"
                      : "hidden"
                  }
                >
                  3 to 20 charracters <br />
                  Allows alphanumeric characters (both uppercase and lowercase).
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  value={inputForm.email}
                  onChange={(e) =>
                    setInputForm({ ...inputForm, email: e.target.value })
                  }
                  name="email"
                  type="email"
                  autoComplete="off"
                  required
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="flex text-sm  font-medium leading-6 text-gray-900"
              >
                Password
                <span
                  className={
                    validPassword
                      ? "block self-center ml-1 text-xl text-green-500"
                      : "hidden"
                  }
                >
                  <TiInputChecked />
                </span>
                <span
                  className={
                    validPassword || !inputForm.password
                      ? "hidden"
                      : "block self-center ml-1  text-red-500"
                  }
                >
                  <ImCross />
                </span>
              </label>
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
                    onFocus={() => setPassFocus(true)}
                    onBlur={() => setPassFocus(false)}
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
                <p
                  className={
                    passFocus && inputForm.password && !validPassword
                      ? "text-red-500"
                      : "hidden"
                  }
                >
                  Minimum length: 8 characters. <br />
                  Requires at least one uppercase letter, one lowercase letter,
                  one digit, and one special character.
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="cnfPassword"
                className="flex text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
                <span
                  className={
                    validMatch && cnfPass
                      ? "block self-center ml-1 text-xl text-green-500"
                      : "hidden"
                  }
                >
                  <TiInputChecked />
                </span>
                <span
                  className={
                    validMatch || !cnfPass
                      ? "hidden"
                      : "block self-center ml-1  text-red-500"
                  }
                >
                  <ImCross />
                </span>
              </label>
              <div className="mt-2">
                <div className="flex justify-between relative">
                  <input
                    value={cnfPass}
                    onChange={(e) => setCnfPass(e.target.value)}
                    id="cnfPassword"
                    name="cnfPassword"
                    type={cnfShowPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-none pr-8"
                  />
                  {cnfShowPassword ? (
                    <AiFillEyeInvisible
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setCnfShowPassword(false)}
                    />
                  ) : (
                    <AiFillEye
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setCnfShowPassword(true)}
                    />
                  )}
                </div>
                <p
                  className={
                    matchFocus && cnfPass && !validMatch
                      ? "text-red-500"
                      : "hidden"
                  }
                >
                  password & confirm password must be same
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <label>
                <input
                  className="mx-1"
                  type="radio"
                  value="ADMIN"
                  checked={inputForm.role === "ADMIN"}
                  onChange={(e) =>
                    setInputForm({ ...inputForm, role: e.target.value })
                  }
                />
                Admin
              </label>
              <label>
                <input
                  className="mx-1"
                  type="radio"
                  value="USER"
                  checked={inputForm.role === "USER"}
                  onChange={(e) =>
                    setInputForm({ ...inputForm, role: e.target.value })
                  }
                />
                User
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={!validUserName || !validPassword || !validMatch}
              >
                Sign in
              </button>
            </div>
          </form>
          <p ref={errRef} className={errMsg ? "text-red-600" : "hidden"}>
            {errMsg}
          </p>
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
      </div>
    </>
  );
};

export default SignUpPage;
