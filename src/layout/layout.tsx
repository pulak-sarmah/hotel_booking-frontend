import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-default">
      <Header />
      <Hero />
      <div className="container flex-1 py-10 mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
