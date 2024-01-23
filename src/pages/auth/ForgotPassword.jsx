import { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { ReloadIcon } from "@radix-ui/react-icons";

import Container from "../../components/Container";
import { AppContext } from "@/context/AppContext";

const ForgotPassword = () => {
  const { toast } = useToast();

  const { loader, setLoader } = useContext(AppContext);
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const { errors } = formState;
  const forgotPass = async ({ email }) => {
    setLoader(true);
    try {
      const data = await axios.post(
        "/users/forgot-password",
        { email: email },
        { withCredentials: true }
      );
      console.log(data.data.message);
      toast({
        title: "success",
        description: `${data.data.message}`,
      });
      setLoader(false);
    } catch (err) {
      console.log(err);
      toast({
        title: "error",
        description: "Something went wrong while sending the verification link",
      });
      setLoader(false);
    }
  };

  return (
    <Container className="flex justify-center items-center h-screen">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Have no fear. We'll email you instructions to reset your password.
            If you don't have access to your email, we can try account recovery.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(forgotPass)}>
            <div className="grid w-full max-w-sm items-center gap-2 space-y-2">
              <Label htmlFor="email">Email:</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your registered email"
                autoComplete="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(value) ||
                      "Email address must be a valid address",
                  },
                })}
              />
              <p className="text-red-600">{errors.email?.message}</p>
              <Button disabled={loader} type="submit" className="w-full">
                {loader && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                Send Verification Link
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
