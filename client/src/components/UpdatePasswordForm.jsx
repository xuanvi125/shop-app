import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import * as authServices from "../services/authService";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
export function UpdatePasswordForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmiting },
  } = useForm();
  const { state, dispatch } = useAuth();
  const password = watch("password");
  const onSubmit = async (data) => {
    const res = await authServices.changePassword(data);
    if (res.status === "success") {
      localStorage.setItem("token", res.token);
      dispatch({ type: "LOG_IN", payload: { user: res.data.user } });
      toast.success("Password changed successfully");
      navigate("/");
    } else {
      toast.error("Current password is incorrect");
    }
  };
  return (
    <div className="container mx-auto mt-4 flex flex-col">
      <Typography variant="h4" className="m-3">
        UPDATE MY PASSWORD
      </Typography>
      <Card className="mx-auto" color="transparent" shadow={false}>
        <form
          className="mt-8 mx-auto mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Current Password
            </Typography>
            <Input
              type="password"
              size="md"
              {...register("currentPassword", { required: true })}
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <div>
              <Input
                size="md"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="********"
                type="password"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.password && (
                <Typography color="red">{errors.password.message}</Typography>
              )}
            </div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Confirm Password
            </Typography>
            <div>
              <Input
                type="password"
                size="md"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => {
                    if (value !== password) return "Password does not match";
                  },
                })}
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.confirmPassword && (
                <Typography color="red">
                  {errors.confirmPassword.message}
                </Typography>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmiting}
            className="mt-6"
            fullWidth
          >
            Change Password
          </Button>
        </form>
      </Card>
    </div>
  );
}
