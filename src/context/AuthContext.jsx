import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const toast = useToast();
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

  const logout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/logout", {
        withCredentials: true,
      });

      if (response.status == 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.reload();
        toast({
          title: "loging out",
          description: "successfully logged out",
        });
      }
      o;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Oopps",
        description: "something went wrong",
      });
    }
  };

  const values = { auth, setAuth, logout };
  return (
    <AuthContext.Provider value={values}>{children} </AuthContext.Provider>
  );
}
