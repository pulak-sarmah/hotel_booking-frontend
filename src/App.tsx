import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import ForgotPassCond from "./components/conditional/ForgotPassCond";
import VerifyEmailCond from "./components/conditional/VerifyEmailCond";
import PageNotFound from "./pages/PageNotFound";
import RegisterCond from "./components/conditional/RegisterCond";
import ProfileUpdateCond from "./components/conditional/ProfileUpdateCond";
import ChangePassCond from "./components/conditional/ChangePassCond";
import SignInCond from "./components/conditional/SignInCond";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route path="/UserRegister" element={<RegisterCond />} />
        <Route path="/sign-in" element={<SignInCond />} />
        <Route path="/forgot-password" element={<ForgotPassCond />} />
        <Route path="/verify-email" element={<VerifyEmailCond />} />
        <Route path="/update-profile" element={<ProfileUpdateCond />} />
        <Route path="/change-password" element={<ChangePassCond />} />
      </Routes>
    </Router>
  );
}

export default App;
