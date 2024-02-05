import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import NavBar from "./NavBar";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../utils/api-client";
import { Oval } from "react-loader-spinner";

const Header = () => {
  const queryClient = useQueryClient();
  const { isLoggedIn, showToast, isLoading, userDetails } = useAppContext();

  const mutation = useMutation(apiClient.logOutUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("validateAndFetchUser");
      showToast({
        message: "Account logged out successfully",
        type: "success",
      });
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "error",
      });
    },
  });

  const handleLogOut = () => {
    mutation.mutate();
  };

  const location = useLocation();
  return (
    <div className="pt-6 sm:pb-4 bg-primary">
      <div className="container flex items-center justify-between mx-auto">
        <span className="pl-1 text-2xl font-bold tracking-tight sm:text-4xl text-textPrimary">
          <Link to="/">Holidays.com</Link>
        </span>

        <span className="flex pr-1 space-x-2">
          {isLoggedIn && !isLoading && userDetails?.data && (
            <NavBar onLogout={handleLogOut} isLoading={mutation.isLoading} />
          )}

          {!isLoggedIn && isLoading && (
            <Oval
              height={28}
              width={130}
              color="#e2e8f0"
              visible={true}
              secondaryColor="#e2e8f0"
            />
          )}

          {!isLoggedIn &&
            !(
              location.pathname.startsWith("/UserRegister") ||
              location.pathname.startsWith("/sign-in")
            ) && (
              <Link to="/sign-in" className="navButton">
                Sign In
              </Link>
            )}
        </span>
      </div>
    </div>
  );
};

export default Header;
