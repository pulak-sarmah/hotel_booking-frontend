import { useRef, useState } from "react";
import UserSvg from "./svg/UserSvg";
import MobileNavClose from "./svg/MobileNavClose";
import MobileNav from "./svg/MobileNav";
import useClickOutside from "../hooks/ClickOutside";
import { navItems } from "../constances/navMenu";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { Oval } from "react-loader-spinner";

interface NavBarProps {
  onLogout: () => void;
  isLoading: boolean;
}

const NavBar = ({ onLogout, isLoading }: NavBarProps) => {
  const { userDetails } = useAppContext();
  const navigate = useNavigate();
  const [toggleUser, setToggleUser] = useState(false);
  const [toggleMobileNav, setToggleMobileNav] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useClickOutside(dropdownRef, () => setToggleUser(false));
  useClickOutside(mobileMenuRef, () => setToggleMobileNav(false));

  return (
    <nav className="gap-4 text-light nav">
      <div className="order-2 md:order-1">
        <ul className="flex flex-row gap-4 cursor-pointer text-light md:hidden">
          <li onClick={() => setToggleMobileNav(!toggleMobileNav)}>
            {toggleMobileNav ? <MobileNavClose /> : <MobileNav />}
          </li>
        </ul>

        <div
          ref={mobileMenuRef}
          className={`absolute top-0 left-0 bg-default w-[20rem] h-full transition-transform duration-500 ease-in-out ${
            toggleMobileNav
              ? "transform translate-x-0"
              : "transform -translate-x-full"
          }`}
        >
          <span className="p-2 mt-2 text-2xl font-bold tracking-tight sm:text-4xl text-primary">
            Holidays.com
          </span>
          <ul className="flex flex-col items-center justify-center space-y-4 mt-44">
            {navItems.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  setToggleMobileNav(false);
                  navigate(item.path);
                }}
                className="text-lg font-medium text-gray-900 uppercase cursor-pointer"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <ul className="flex-row hidden gap-4 md:flex text-light">
          {navItems.map((item) => (
            <Link to={item.path} key={item.id}>
              <li className="navButton">{item.name}</li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="relative flex-col order-1 md:order-2 felx">
        <div
          data-testid="user-icon"
          className="p-2 rounded-full cursor-pointer bg-primaryLight hover:bg-hover active:active-95"
          onClick={() => setToggleUser(!toggleUser)}
        >
          <UserSvg />
        </div>

        <div
          ref={dropdownRef}
          className={`absolute right-1 top-[110%] transition-all duration-200 ease-in-out ${
            toggleUser ? "opacity-100 visible" : "opacity-0 invisible"
          } w-max p-4 bg-default rounded-sm`}
        >
          <div className="text-secondary">
            <strong>{userDetails?.data?.firstName}</strong>
            <p>{userDetails?.data?.email}</p>
          </div>
          <hr className="m-2 border-t border-gray-400" />
          <ul className="flex flex-col gap-2">
            <li
              onClick={() => {
                setToggleUser(false);
                navigate("/update-profile");
              }}
              className="userNav"
            >
              Update Profile
            </li>

            <li onClick={onLogout} className="userNav">
              Log Out
              {isLoading && (
                <Oval
                  height="15"
                  width="20"
                  color="#e2e8f0"
                  visible={true}
                  secondaryColor="#e2e8f0"
                />
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
