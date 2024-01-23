import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";

import { ReloadIcon } from "@radix-ui/react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import Container from "../../components/Container";
import { AppContext } from "@/context/AppContext";

const SignUpPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "USER",
      username: "",
      cnfPassword: "",
    },
  });
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const { loader, setLoader } = useContext(AppContext);

  const signUp = async ({ email, password, role, username }) => {
    setLoader(true);
    try {
      const response = await axios.post("/users/register", {
        email: email,
        password: password,
        role: role,
        username: username,
      });
      setLoader(false);
      if (response.status === 201) {
        toast({
          title: "success",
          description: `welcome ${response.data.data.email} `,
        });
        navigate("/login");
      }
      console.log(response);
    } catch (err) {
      console.log(err);
      if (err.response.status == 409) {
        toast({
          title: "error",
          description: "username or email already exists",
        });
      } else
        toast({
          title: "error",
          description: "something went wrong",
        });
      setLoader(false);
    }
  };

  const watchPassword = watch("password", "");

  return (
    <>
      <Container className="flex justify-center items-center mt-20">
        <Card className="w-[400px]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">DevCom</CardTitle>
            <CardDescription>Create Account</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(signUp)}>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="username">Username: </Label>
                <Input
                  label="Username"
                  placeholder="enter your username"
                  {...register("username", {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        /^[a-zA-Z0-9]{3,20}$/.test(value) ||
                        "username must be a valid address",
                    },
                  })}
                />
              </div>
              <p className="text-red-600">{errors.username?.message}</p>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="username">Email: </Label>
                <Input
                  label="Email"
                  placeholder="enter your email"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(value) ||
                        "email address must be a valid address",
                    },
                  })}
                />
              </div>
              <p className="text-red-600">{errors.email?.message}</p>
              <div className="relative grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password">Password: </Label>
                <Input
                  label="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="enter your password"
                  {...register("password", {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                          value
                        ) || "password must be strong",
                    },
                  })}
                />
                <div className="absolute bottom-1 right-2 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="rounded-full  mt-10 w-7 h-7 flex items-center justify-center hover:bg-gray-400 focus:outline-none"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                </div>
              </div>
              <p className="text-red-600">{errors.password?.message}</p>
              <div className="relative grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password">Confirm Password: </Label>
                <Input
                  label="confirm password"
                  type={!showPassword && "password"}
                  placeholder="confirm password"
                  {...register("cnfPassword", {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        value === watchPassword || "password doesnot match",
                    },
                  })}
                />
                <p className="text-red-600">{errors.cnfPassword?.message}</p>
              </div>
              <RadioGroup className="flex" defaultValue="USER">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="USER"
                    {...register("role", { required: true })}
                    id="r1"
                  />
                  <Label htmlFor="r1">User</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="ADMIN"
                    {...register("role", { required: true })}
                    id="r2"
                  />
                  <Label htmlFor="r2">Admin</Label>
                </div>
              </RadioGroup>
              <div>
                <Button disabled={loader} className="w-full">
                  {loader && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  create account
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p>Already have an account? </p>
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              ‎ Login
            </Link>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
};

export default SignUpPage;
