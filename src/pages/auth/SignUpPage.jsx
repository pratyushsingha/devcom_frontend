import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <p ref={errRef} aria-live="assertive">
        {errMsg}
      </p>
      <p>signup</p>
      <form onSubmit={register}>
        <input
          type="text"
          placeholder="email"
          ref={userRef}
          value={inputForm.email}
          onChange={(e) =>
            setInputForm({ ...inputForm, email: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="username"
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
        <input
          type="password"
          placeholder="cnf password"
          value={cnfPass}
          onChange={(e) => setCnfPass(e.target.value)}
          required
        />
        <label>
          <input
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
            type="radio"
            value="USER"
            checked={inputForm.role === "USER"}
            onChange={(e) =>
              setInputForm({ ...inputForm, role: e.target.value })
            }
          />
          User
        </label>

        <button type="submit">register</button>
      </form>
    </div>
  );
};

export default SignUpPage;
