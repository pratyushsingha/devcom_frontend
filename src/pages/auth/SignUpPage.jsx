import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUpPage = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
    role: "USER",
    username: "",
  });
  const [cnfPass, setCnfPass] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      if (inputForm.password !== cnfPass) {
        console.log("password didn't match");
        return;
      } else {
        const response = await axios.post("/users/register", inputForm);
        if (response.status === 201) {
          navigate("/login");
        }
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
  }, [inputForm.username, inputForm.password, inputForm.email, inputForm.role]);
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
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  ref={userRef}
                  value={inputForm.email}
                  onChange={(e) =>
                    setInputForm({ ...inputForm, email: e.target.value })
                  }
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  value={inputForm.username}
                  onChange={(e) =>
                    setInputForm({ ...inputForm, username: e.target.value })
                  }
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm  font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  value={inputForm.password}
                  onChange={(e) =>
                    setInputForm({ ...inputForm, password: e.target.value })
                  }
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                <input
                  value={inputForm.cnfPass}
                  onChange={(e) => setCnfPass(e.target.value)}
                  id="cnfPassword"
                  name="cnfPassword"
                  type="cnfPassword"
                  autoComplete="current-password"
                  required
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
              >
                Sign in
              </button>
            </div>
          </form>
          <p ref={errRef} aria-live="assertive">
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
