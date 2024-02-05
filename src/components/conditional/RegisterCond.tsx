import { useAppContext } from "../../contexts/AppContext";
import PageNotFound from "../../pages/PageNotFound";
import { MutatingDots } from "react-loader-spinner";
import Layout from "../../layout/layout";
import Register from "../../pages/Register";

const RegisterCond = () => {
  const { isLoggedIn, isLoading } = useAppContext();
  console.log(isLoggedIn, isLoading);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <MutatingDots
          visible={true}
          height="200"
          width="200"
          color="#020617"
          secondaryColor="#020617"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
        />
      </div>
    );
  } else if (isLoggedIn) {
    return <PageNotFound />;
  } else {
    return (
      <Layout>
        <Register />
      </Layout>
    );
  }
};

export default RegisterCond;
