import { forgotPassData } from "../pages/ForgotPassword";
import { RegisterFormData } from "../pages/Register";
import axios, { isAxiosError } from "axios";
import { VarifyEmailFormData } from "../pages/VarifyEmail";
import { UpdateProfileFormData } from "../pages/ProfileUpdate";
import { ChangePassFormData } from "../pages/ChangePass";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const register = async (formData: RegisterFormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/users/register`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        const apiError = new Error(error.response.data.message);

        throw apiError;
      }
    }
  }
};

// export const validateAndFetchUser = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/api/v1/users/profile`, {
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     if (isAxiosError(error)) {
//       if (error.response?.status === 401) {
//         await refreshAccessToken();

//         try {
//           const response = await axios.get(
//             `${API_BASE_URL}/api/v1/users/profile`,
//             {
//               withCredentials: true,
//             }
//           );
//           return response.data;
//         } catch (retryError) {
//           if (isAxiosError(retryError)) {
//             if (retryError.response) {
//               const apiError = new Error(retryError.response.data.message);

//               throw apiError;
//             }
//           }
//         }
//       } else {
//         throw error;
//       }
//     }
//   }
// };
export const validateAndFetchUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/users/profile`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        await refreshAccessToken();

        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/v1/users/profile`,
            {
              withCredentials: true,
            }
          );
          return response.data;
        } catch (retryError) {
          if (isAxiosError(retryError) && retryError.response?.status === 401) {
            return { notLoggedIn: true };
          } else if (isAxiosError(retryError)) {
            if (retryError.response) {
              const apiError = new Error(retryError.response.data.message);
              throw apiError;
            }
          }
        }
      } else {
        throw error;
      }
    }
  }
};
async function refreshAccessToken() {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/users/refresh-token`,
      {},
      { withCredentials: true }
    );
    return response.data.accessToken;
  } catch (error) {
    console.error("Failed to refresh access token: ", error);
    throw error;
  }
}

export async function logOutUser() {
  try {
    await axios.get(`${API_BASE_URL}/api/v1/users/logout`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Failed to log out user: ", error);
    throw error;
  }
}

export const login = async (formData: RegisterFormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/users/login`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        const apiError = new Error(error.response.data.message);

        throw apiError;
      }
    }
    throw error;
  }
};

export const forgotPassword = async (formData: forgotPassData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/users/forgot-password`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        const apiError = new Error(error.response.data.message);

        throw apiError;
      }
    }
    throw error;
  }
};

export const verifyEmail = async (formData: VarifyEmailFormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/users/verify-forgot-password`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        const apiError = new Error(error.response.data.message);

        throw apiError;
      }
    }
    throw error;
  }
};

export const updateProfile = async (formData: UpdateProfileFormData) => {
  console.log(formData);
  try {
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([, value]) => value)
    );

    const response = await axios.patch(
      `${API_BASE_URL}/api/v1/users/update-profile`,
      filteredData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        const apiError = new Error(error.response.data.message);

        throw apiError;
      }
    }
    throw error;
  }
};

export const changePass = async (formData: ChangePassFormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/users/change-password`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        const apiError = new Error(error.response.data.message);

        throw apiError;
      }
    }
    throw error;
  }
};
