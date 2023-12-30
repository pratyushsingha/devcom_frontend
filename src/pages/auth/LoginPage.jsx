import axios from "axios";
import React, { useState, useRef, useEffect, useContext } from "react";
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
      <h1>login</h1>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="username"
          ref={userRef}
          value={inputForm.username}
          onChange={(e) =>
            setInputForm({ ...inputForm, username: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="password"
          value={inputForm.password}
          onChange={(e) =>
            setInputForm({ ...inputForm, password: e.target.value })
          }
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>don't have an account?</p>
      <br />
      <Link to={"/register"} className="underline">
        signin
      </Link>
    </div>
  );
};

export default LoginPage;
