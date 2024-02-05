import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Oval } from "react-loader-spinner";

import * as apiClient from "../utils/api-client";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      queryClient.invalidateQueries("validateAndFetchUser");
      showToast({
        message: "Account created successfully",
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
      className="flex flex-col max-w-screen-lg gap-5 mx-auto"
      onSubmit={onSubmit}
    >
      <h2 className="text-2xl font-bold capitalize text-primary sm:text-3xl">
        Create an Account
      </h2>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-2 mt-4">
          <label
            htmlFor="firstName"
            className="text-xs font-bold text-gray-600"
          >
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full px-3 py-2 border rounded-sm focus:border-black focus:outline-none hover:border-gray-400 "
            {...register("firstName", {
              required: "this field is required",

              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters long",
              },
            })}
          />
          {errors.firstName && (
            <span className="text-xs text-red-600">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="lastName" className="text-xs font-bold text-gray-600">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full px-3 py-2 border rounded-sm focus:border-black focus:outline-none hover:border-gray-400"
            {...register("lastName", {
              required: "This field is required",
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters long",
              },
            })}
          />
          {errors.lastName && (
            <span className="text-xs text-red-600">
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="email" className="text-xs font-bold text-gray-600">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 border rounded-sm focus:border-black focus:outline-none hover:border-gray-400"
          {...register("email", {
            required: "This field is required or not a valid input",
          })}
        />
        {errors.email && (
          <span className="text-xs text-red-600">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="password" className="text-xs font-bold text-gray-600">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 border rounded-sm focus:border-black focus:outline-none hover:border-gray-400"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.password && (
          <span className="text-xs text-red-600">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label
          htmlFor="confirmpassword"
          className="text-xs font-bold text-gray-600"
        >
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmpassword"
          className="w-full px-3 py-2 border rounded-sm focus:border-black focus:outline-none hover:border-gray-400"
          {...register("confirmPassword", {
            validate: (value) => {
              if (!value) {
                return "This field is required";
              } else if (value !== watch("password")) {
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

      <div>
        <p className="text-primary">
          Already have an account?
          <strong className="border-b border-transparent cursor-pointer hover:border-b-2 hover:border-blue-500">
            <Link to={"/sign-In"}> Sign In</Link>
          </strong>
        </p>
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
            "Create Account"
          )}
        </button>
      </span>
    </form>
  );
};

export default Register;
