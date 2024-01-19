import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({});
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post("/users/refresh-token", {
        withCredentials: true,
      });
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
      } else {
        console.log(
          "Refresh token request failed with status:",
          response.status
        );
      }

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const logout = async () => {
    try {
      const response = await axios.post("/users/logout", {
        withCredentials: true,
      });
      console.log(response);
      if (response.status == 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.reload();
        toast.success("logout successful");
      }o
    } catch (err) {
      toast.error(err);
    }
  };

  const values = { auth, setAuth, logout };
  return (
    <AuthContext.Provider value={values}>{children} </AuthContext.Provider>
  );
}
