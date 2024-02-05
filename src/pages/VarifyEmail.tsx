import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Oval } from "react-loader-spinner";

import * as apiClient from "../utils/api-client";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export interface VarifyEmailFormData {
  otp: string;
  newPassword: string;
}

const VarifyEmail = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VarifyEmailFormData>();

  const mutation = useMutation(apiClient.verifyEmail, {
    onSuccess: () => {
      queryClient.invalidateQueries("validateAndFetchUser");
      showToast({
        message: "Logged in successfully",
        type: "success",
      });
      reset();
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "error",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col max-w-screen-lg gap-2 mx-auto"
    >
      <h2 className="text-2xl font-bold capitalize text-gray sm:text-3xl">
        Verify your Email
      </h2>

      <div className="flex flex-col gap-2 mt-12">
        <label htmlFor="otp" className="text-xs font-bold text-gray-600">
          OTP:
        </label>
        <input
          type="text"
          id="otp"
          className="w-full md:w-[60%] lg:w-[40%] px-3 py-2 border rounded-sm focus:border-black focus:outline-none hover:border-gray-400 "
          {...register("otp", {
            required: "this field is required",
          })}
        />
        {errors.otp && (
          <span className="text-xs text-red-600">{errors.otp.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2 mt-12">
        <label
          htmlFor="newPassword"
          className="text-xs font-bold text-gray-600"
        >
          New Password:
        </label>
        <input
          type="password"
          id="newPassword"
          className="w-full md:w-[60%] lg:w-[40%] px-3 py-2 border rounded-sm focus:border-black focus:outline-none hover:border-gray-400 "
          {...register("newPassword", {
            required: "this field is required",
            minLength: {
              value: 6,
              message: "Last name must be at least 6 characters long",
            },
          })}
        />
        {errors.newPassword && (
          <span className="text-xs text-red-600">
            {errors.newPassword.message}
          </span>
        )}
      </div>

      <span className="self-end mt-4 mr-[40%]">
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="p-2 text-lg font-bold bg-primary text-textPrimary hover:bg-hover focus:bg-primary"
        >
          {mutation.isLoading ? (
            <Oval
              height={28}
              width={130}
              color="#e2e8f0"
              visible={true}
              secondaryColor="#e2e8f0"
            />
          ) : (
            "Verify Email"
          )}
        </button>
      </span>
    </form>
  );
};

export default VarifyEmail;
