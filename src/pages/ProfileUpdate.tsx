import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useForm } from "react-hook-form";
import * as apiClient from "../utils/api-client";
import { useMutation, useQueryClient } from "react-query";

export interface UpdateProfileFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast, userDetails } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileFormData>();

  const mutation = useMutation(apiClient.updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries("validateAndFetchUser");
      showToast({
        message: "Profile updated successfully",
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
        Update Profile Details
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
            placeholder={userDetails?.data.firstName}
            type="text"
            id="firstName"
            className="w-full px-3 py-2 border rounded-sm focus:border-black focus:outline-none hover:border-gray-400 "
            {...register("firstName", {
              required: false,
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
            placeholder={userDetails?.data.lastName}
            type="text"
            id="lastName"
            className="w-full px-3 py-2 border rounded-sm focus:border-black focus:outline-none hover:border-gray-400"
            {...register("lastName", {
              required: false,
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
          placeholder={userDetails?.data.email}
          type="email"
          id="email"
          className="w-full px-3 py-2 border rounded-sm focus:border-black focus:outline-none hover:border-gray-400"
          {...register("email", {
            required: false,
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
          disabled
          type="password"
          id="password"
          className="w-full px-3 py-2 border rounded-sm focus:border-black focus:outline-none hover:border-gray-400"
        />

        <span className="text-primary ">
          <Link to={"/change-password"}>
            <strong className="border-b border-transparent cursor-pointer hover:border-b-2 hover:border-blue-500">
              change password
            </strong>
          </Link>
        </span>
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
            "Update Profile"
          )}
        </button>
      </span>
    </form>
  );
};

export default ProfileUpdate;
