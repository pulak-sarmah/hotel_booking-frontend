import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../utils/api-client";

type TostMessage = {
  message: string;
  type: "success" | "error";
};

type fetchedData = {
  statusCode: number;
  data: {
    username: string;
    email: string;
    id: string;
    firstName: string;
    lastName: string;
  };
  message: string;
  notLoggedIn: boolean;
};

interface AppContext {
  showToast: (toastMessage: TostMessage) => void;
  userDetails: fetchedData | undefined;
  isLoading: boolean;
  isLoggedIn: boolean;
}

const AppContext = createContext<AppContext | undefined>(undefined);

const AppProvider = AppContext.Provider;

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<TostMessage | undefined>(undefined);

  const { isLoading, data, isError } = useQuery<fetchedData | undefined>(
    "validateAndFetchUser",

    () => apiClient.validateAndFetchUser(),

    {
      retry: false,
    }
  );

  return (
    <AppProvider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },

        isLoggedIn: !isLoading && !isError && !data?.notLoggedIn,
        isLoading,
        userDetails: data,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppProvider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
};
