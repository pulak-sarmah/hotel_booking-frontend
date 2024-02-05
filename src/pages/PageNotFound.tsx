import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="px-4 lg:py-12">
          <div className="lg:gap-4 lg:flex">
            <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
              <h1 className="font-bold text-textPrimary text-9xl">404</h1>
              <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                <span className="text-red-500">Oops!</span> Page not found
              </p>
              <p className="mb-8 text-center text-gray-500 md:text-lg">
                The page you’re looking for doesn’t exist.
              </p>
              <Link
                to="/"
                className="px-5 py-2 rounded-none text-textPrimary bg-primary hover:bg-hover focus:bg-primary"
              >
                Go home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
