import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { RegisterFormData } from "./Register";
import { Link, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import * as apiClient from "../utils/api-client";
import { useAppContext } from "../contexts/AppContext";

export interface LoginData {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.login, {
    onSuccess: () => {
      queryClient.invalidateQueries("validateAndFetchUser");
      showToast({
        message: "Account logged in successfully",
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
      <h2 className="text-xl font-bold capitalize text-gray sm:text-3xl text-primary">
        LogIn to your Account
      </h2>

      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="email" className="text-xs font-bold text-gray-600">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="w-full md:w-[80%] px-3 py-2 border rounded-sm focus:border-black focus:outline-none hover:border-gray-400"
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
          className="w-full md:w-[80%] px-3 py-2 border rounded-sm focus:border-black focus:outline-none hover:border-gray-400"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Not a valid Password",
            },
          })}
        />
        {errors.password && (
          <span className="text-xs text-red-600">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="flex flex-row text-primary">
        <p>
          Don't have an account?
          <strong className="border-b border-transparent cursor-pointer hover:border-b-2 hover:border-blue-500">
            <Link to={"/UserRegister"}> Register</Link>
          </strong>
        </p>

        <p className="pl-2 ">
          |{" "}
          <Link
            to={"/forgot-password"}
            className="font-bold border-b border-transparent cursor-pointer hover:border-b-2 hover:border-blue-500"
          >
            Forgot Password?
          </Link>
        </p>
      </div>

      <span className="self-end mt-4 md:mr-[20%]">
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
            "Sign In"
          )}
        </button>
      </span>
    </form>
  );
};

export default SignIn;
