import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Container";

const ResetPass = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const [resetPass, setResetPass] = useState("");
  const [cnfPass, setCnfPass] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const passWordReset = async (e) => {
    e.preventDefault();

    try {
      if (resetPass === cnfPass) {
        const data = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/users/reset-password/${resetToken}`,
          { newPassword: resetPass },
          { withCredentials: true }
        );
        if (data.status === 200) {
          navigate("/login");
        }
        console.log(data);
      } else {
        console.log("password didn't match");
        setErrMsg("password didn't match");
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
  }, [cnfPass, resetPass]);

  return (
    <Container className="flex justify-center items-center h-screen">
      <form onSubmit={passWordReset}>
        <div className="">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            new password
          </label>
          <div className="mt-2">
            <input
              ref={userRef}
              value={resetPass}
              onChange={(e) => setResetPass(e.target.value)}
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              className="block rounded-md border-0 px-2 py-1.5 my-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label
              htmlFor="cnfPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              confirm password
            </label>
            <div className="mt-2">
              <input
                value={cnfPass}
                onChange={(e) => setCnfPass(e.target.value)}
                id="cnfPassword"
                name="cnfPassword"
                type="password"
                required
                className="block rounded-md border-0 px-2 py-1.5 my-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <p ref={errRef} aria-live="assertive">
            {errMsg}
          </p>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            confirm
          </button>
        </div>
      </form>
    </Container>
  );
};

export default ResetPass;
