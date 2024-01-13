import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        try {
          const response = await axios.post(
            "/users/refresh-token",
            refreshToken,
            { withCredentials: true }
          );
          const accessToken = localStorage.setItem("accessToken", accessToken);
          const refreshToken = localStorage.setItem(
            "refreshToken",
            refreshToken
          );
        } catch (err) {
          console.log(err);
        }
      };
      refreshAccessToken();
    }, 30000);
    return clearInterval(interval);
  }, []);

  const values = { auth, setAuth };
  return (
    <AuthContext.Provider value={values}>{children} </AuthContext.Provider>
  );
}
