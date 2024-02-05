import { useForm } from "react-hook-form";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../utils/api-client";
import { Oval } from "react-loader-spinner";
export interface forgotPassData {
  email: string;
}

const ForgotPassword = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<forgotPassData>();

  const mutation = useMutation(apiClient.forgotPassword, {
    onSuccess: () => {
      reset();
      showToast({
        message: "OTP sent successfully",
        type: "success",
      });
      navigate("/verify-email");
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
    <form onSubmit={onSubmit}>
      <h2 className="mt-12 text-xl font-bold capitalize text-primary">
        Enter your email to Proceed
      </h2>

      <div className="flex flex-col">
        <div className="flex flex-col gap-2 mt-4">
          <input
            type="email"
            id="email"
            className="w-full md:w-[60%] px-3 py-2 border rounded-sm focus:border-black focus:outline-none hover:border-gray-400"
            {...register("email", {
              required: "This field is required or not a valid input",
            })}
          />
          {errors.email && (
            <span className="text-xs text-red-600">{errors.email.message}</span>
          )}
        </div>

        <span className="self-end mt-4 md:mr-[40%]">
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
              "Find Account"
            )}
          </button>
        </span>
      </div>
    </form>
  );
};

export default ForgotPassword;
