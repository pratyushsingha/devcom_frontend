import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const { setProgress, progress, setLoader } = useContext(AppContext);
  const { toast } = useToast();
  const [auth, setAuth] = useState({});
  const [profileInfo, setProfileInfo] = useState({
    avatar: "",
    email: "",
    username: "",
    role: "",
  });
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/refresh-token`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
      } else {
        console.log(
          "Refresh token request failed with status:",
          response.status
        );
      }
      // console.log(response);        {/* ))} */}
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
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // window.location.reload();
      toast({
        title: "loging out",
        description: "successfully logging out",
      });
      setTimeout(() => {
        window.location.reload(false);
      }, 1500);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Oopps",
        description: "something went wrong",
      });
    }
  };

  const getProfile = async () => {
    try {
      setLoader(true);
      setProgress(progress + 10);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/current-user`,
        { withCredentials: true }
      );
      // console.log(response.data.data.avatar.url);

      console.log(response.data.data);

      setProfileInfo({
        avatar: response.data.data.avatar,
        email: response.data.data.email,
        username: response.data.data.username,
        role: response.data.data.role,
      });
      console.log(response);
      setLoader(false);
      setProgress(progress + 100);
    } catch (err) {
      console.log(err);
      setLoader(false);
      setProgress(progress + 100);
    }
  };

  useEffect(() => {
    localStorage.getItem("accessToken") && getProfile();
  }, []);

  const values = { auth, setAuth, logout, getProfile, profileInfo };
  return (
    <AuthContext.Provider value={values}>{children} </AuthContext.Provider>
  );
}
