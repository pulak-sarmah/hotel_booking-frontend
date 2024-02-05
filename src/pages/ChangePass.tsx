import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Oval } from "react-loader-spinner";

import * as apiClient from "../utils/api-client";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export interface ChangePassFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePass = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePassFormData>();

  const mutation = useMutation(apiClient.changePass, {
    onSuccess: () => {
      queryClient.invalidateQueries("validateAndFetchUser");
      showToast({
        message: "Password changed successfully!",
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
      className="flex flex-col max-w-screen-lg gap-5 mx-auto"
    >
      <h2 className="text-2xl font-bold capitalize text-primary sm:text-3xl">
        Change Password
      </h2>

      <div className="flex flex-col gap-2 mt-4">
        <label
          htmlFor="OldPassword"
          className="text-xs font-bold text-gray-600"
        >
          Old Password:
        </label>
        <input
          type="password"
          id="OldPassword"
          className="w-full px-3 py-2 border rounded-sm focus:border-black focus:outline-none hover:border-gray-400"
          {...register("oldPassword", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.oldPassword && (
          <span className="text-xs text-red-600">
            {errors.oldPassword.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label
          htmlFor="Newpassword"
          className="text-xs font-bold text-gray-600"
        >
          New Password:
        </label>
        <input
          type="password"
          id="Newpassword"
          className="w-full px-3 py-2 border rounded-sm focus:border-black focus:outline-none hover:border-gray-400"
          {...register("newPassword", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.newPassword && (
          <span className="text-xs text-red-600">
            {errors.newPassword.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label
          htmlFor="confirmPass"
          className="text-xs font-bold text-gray-600"
        >
          confirm New Password:
        </label>
        <input
          type="password"
          id="confirmPass"
          className="w-full px-3 py-2 border rounded-sm focus:border-black focus:outline-none hover:border-gray-400"
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value) => {
              if (!value) {
                return "This field is required";
              } else if (value !== watch("newPassword")) {
                return "Passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-xs text-red-600">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <span className="self-end mt-4">
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
            "Update Password"
          )}
        </button>
      </span>
    </form>
  );
};

export default ChangePass;
