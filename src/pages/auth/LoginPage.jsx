import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ReloadIcon } from "@radix-ui/react-icons";

import { AppContext } from "../../context/AppContext";
import Container from "../../components/Container";

const LoginPage = () => {
  const { loader, setLoader } = useContext(AppContext);

  const navigate = useNavigate();
  const { toast } = useToast();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(null);

  const login = async ({ username, password }) => {
    try {
      if (localStorage.getItem("accessToken")) {
        navigate("/profile");
      } else {
        setLoader(true);
        const response = await axios.post("/users/login", {
          password: password,
          username: username,
        });
        console.log(response.data.data);
        const accessToken = response.data.data.accessToken;
        const refreshToken = response.data.data.refreshToken;
        // console.log(accessToken);
        //   console.log(auth);
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          window.location.reload(false);
        }
        setLoader(false);
      }
    } catch (err) {
      console.log(err);
      if (!err.response) {
        toast({
          title: "Error",
          description: "no server response",
        });
      } else if (err.response?.status === 400) {
        toast({
          title: "Error",
          description: "missing username or password",
        });
      } else if (err.response?.status === 401) {
        toast({
          title: "Error",
          description: "U are not authorized",
        });
      } else {
        toast({
          title: "Error",
          description: "login failed",
        });
      }
      setLoader(false);
    }
  };

  return (
    <Container className="flex justify-center items-center mt-20">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">DevCom</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit(login)}>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="username">Username: </Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                {...register("username", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^[a-zA-Z0-9]{3,20}$/.test(value) ||
                      "username must be a valid",
                  },
                })}
              />
            </div>
            <p className="text-red-600">{errors.username?.message}</p>
            <div className="relative grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Password: </Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                {...register("password", {
                  required: true,
                })}
              />
              <div className="absolute bottom-1 right-2 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="rounded-full  mt-10 w-7 h-7 flex items-center justify-center hover:bg-gray-400 focus:outline-none"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>

            <p className="text-red-600">{errors.password?.message}</p>
            <div className="text-sm">
              <Link
                to="/forget-password"
                className="flex justify-end font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forget password?
              </Link>
            </div>
            <div>
              <Button disabled={loader} className="w-full">
                {loader && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p>not a member? </p>
          <Link
            to="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 hover:underline"
          >
            ‎ signup
          </Link>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default LoginPage;
