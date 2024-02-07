import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Container";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputDiv from "@/components/InputDiv";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppContext } from "@/context/AppContext";

const passwordSchema = z
  .object({
    resetPass: z
      .string()
      .nonempty("Password is required")
      .min(8, { message: "Password must be 8 or more characters long" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    cnfPass: z.string(),
  })
  .refine((data) => data.resetPass === data.cnfPass, {
    message: "Password does not match",
    path: ["cnfPass"],
  });

const ResetPass = () => {
  const { setLoader } = useContext(AppContext);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      resetPass: "",
      cnfPass: "",
    },
    resolver: zodResolver(passwordSchema),
  });

  const passWordReset = async ({ resetPass }) => {
    setLoader(true);
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/reset-password/${resetToken}`,
        { newPassword: resetPass },
        { withCredentials: true }
      );
      toast({
        title: "success",
        description: data.response.message,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);

      // console.log(data);
      setLoader(false);
    } catch (err) {
      toast({
        title: "error",
        description: "something went wrong",
      });
      console.log(err.response.data.message);
      setLoader(false);
    }
  };
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  return (
    <Container className="flex justify-center items-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(passWordReset)}>
          <CardContent>
            <div className="mt-2">
              <InputDiv
                label="new password"
                placeholder="enter new password"
                {...register("resetPass", {
                  required: true,
                })}
              />
            </div>
            <p className="text-red-600">{errors.resetPass?.message}</p>
            <div className="mt-2">
              <InputDiv
                label="confirm password"
                placeholder="enter confirm password"
                {...register("cnfPass", {
                  required: true,
                })}
              />
            </div>
            <p className="text-red-600">{errors.cnfPass?.message}</p>
          </CardContent>
          <CardFooter>
            <Button
              disabled={isSubmitting || !isDirty}
              className="w-full"
              type="submit"
            >
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Container>
  );
};

export default ResetPass;
