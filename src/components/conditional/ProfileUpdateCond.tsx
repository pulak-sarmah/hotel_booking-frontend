import { MutatingDots } from "react-loader-spinner";
import { useAppContext } from "../../contexts/AppContext";
import Layout from "../../layout/layout";
import ProfileUpdate from "../../pages/ProfileUpdate";
import { useNavigate } from "react-router-dom";

const ProfileUpdateCond = () => {
  const { isLoggedIn, isLoading } = useAppContext();
  const navigate = useNavigate();

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
  } else if (!isLoggedIn) {
    navigate("/");
    return null;
  } else {
    return (
      <Layout>
        <ProfileUpdate />
      </Layout>
    );
  }
};

export default ProfileUpdateCond;
