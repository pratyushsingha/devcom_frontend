import React, { useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import Container from "../../components/Container";
import Button from "../../components/Button";

const ForgotPassword = () => {
  const userRef = useRef(AppContext);
  const [email, setEmail] = useState("");

  const forgotPass = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "/users/forgot-password",
        { email: email },
        { withCredentials: true }
      );
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);
  return (
    <Container className="flex justify-center items-center h-screen">
      <div className="">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            ref={userRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="username"
            name="username"
            type="text"
            autoComplete="email"
            required
            className="block rounded-md border-0 px-2 py-1.5 my-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <Button
          onClick={forgotPass}
          className="w-full"
        >
          send verification link
        </Button>
      </div>
    </Container>
  );
};

export default ForgotPassword;
