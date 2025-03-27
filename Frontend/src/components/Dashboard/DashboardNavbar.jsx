import React, { useContext, useState, useRef, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { GoChecklist } from "react-icons/go";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoWalletOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";
import { LuIndianRupee } from "react-icons/lu";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { MdOutlineElectricBolt } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";
import assets from "../../assets/asset";

const DashboardNavbar = () => {

  const [isProductListOpen, setIsProductListOpen] = useState(false);
  const [isStoreListOpen, setIsStoreListOpen] = useState(false); // New state for store dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const storeDropdownRef = useRef(null); // New ref for store dropdown
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const toggleDropdown = () => {
    setIsProductListOpen((prev) => !prev);
  };

  const toggleStoreDropdown = () => {
    setIsStoreListOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const { userData, logout } = useContext(AppContext);

  const username = userData?.name;
  const firstChar = username?.charAt(0).toUpperCase();
  const userPlan = userData?.userPlan;
  const navigate = useNavigate();

  // Close dropdowns and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProductListOpen(false);
      }

      if (
        storeDropdownRef.current &&
        !storeDropdownRef.current.contains(event.target)
      ) {
        setIsStoreListOpen(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="sticky top-0 w-full bg-gradient-to-r from-blue-600 to-purple-600 h-auto md:h-screen px-4 md:px-6 py-3 select-none shadow-lg flex flex-col">
      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden flex justify-between items-center">
        <div
          className="select-none cursor-pointer"
          onClick={() => navigate("/user/dashboard")}
        >
          <img
            src={assets.zahoPayLogo}
            alt="Logo"
            className="h-14"
          />
        </div>
        <button
          ref={menuButtonRef}
          onClick={toggleMobileMenu}
          className="text-2xl text-white"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Logo for Desktop */}
      <div
        className="hidden md:block select-none cursor-pointer"
        onClick={() => navigate("/user/dashboard")}
      >
        <img
          src={assets.zahoPayLogo}
          alt="Logo"
          className="h-16"
        />
        <hr className="my-3 border-gray-300" />
      </div>

      {/* Mobile Nav Links */}
      <div
        ref={mobileMenuRef}
        className={`mt-6 ${isMobileMenuOpen ? "block" : "hidden"} md:hidden`}
      >
        <NavLinks
          isProductListOpen={isProductListOpen}
          toggleDropdown={toggleDropdown}
          dropdownRef={dropdownRef}
          isStoreListOpen={isStoreListOpen}
          toggleStoreDropdown={toggleStoreDropdown}
          storeDropdownRef={storeDropdownRef}
          logout={logout}
        />
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:block mt-6">
        <NavLinks
          isProductListOpen={isProductListOpen}
          toggleDropdown={toggleDropdown}
          dropdownRef={dropdownRef}
          isStoreListOpen={isStoreListOpen}
          toggleStoreDropdown={toggleStoreDropdown}
          storeDropdownRef={storeDropdownRef}
          logout={logout}
        />
      </div>
      
    </div>
  );
};

// NavLinks Component (Extracted for reusability)
const NavLinks = ({
  isProductListOpen,
  toggleDropdown,
  dropdownRef,
  isStoreListOpen,
  toggleStoreDropdown,
  storeDropdownRef,
}) => {
  return (
    <ul className="flex flex-col gap-3">
      <Link
        to="dashboard"
        className="text-lg flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-all duration-300 text-white"
      >
        <GoHome className="text-white" />
        <li>Home</li>
      </Link>

      <Link
        to="all-purchase"
        className="text-lg flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-all duration-300 text-white"
      >
        <RiBillLine className="text-white" />
        <li>Purchase</li>
      </Link>

      {/* Your Products Dropdown */}
      <div
        className="relative flex flex-col text-lg cursor-pointer"
        onClick={toggleDropdown}
        ref={dropdownRef}
      >
        <div className="flex gap-2 items-center p-2 hover:bg-white/10 rounded-lg transition-all duration-300 text-white">
          <IoIosArrowDropdown className="text-white" />
          Your Payment Form
        </div>
        {/* Dropdown Menu */}
        <div
          className={`bg-white/10 rounded-md transition-all ease-in-out duration-300 overflow-hidden ${
            isProductListOpen
              ? "max-h-48 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 translate-y-[-10px]"
          }`}
        >
          <hr className="border-gray-300" />
          <Link
            to="all-payment-form"
            className="text-base flex items-center gap-2 p-2 hover:bg-white/20 text-white"
          >
            <GoChecklist className="text-white" />
            <li>All Payment Form</li>
          </Link>
          <Link
            to="add-payment-form"
            className="text-base flex items-center gap-2 p-2 hover:bg-white/20 text-white"
          >
            <IoIosAddCircleOutline className="text-white" />
            <li>Add Payment Form</li>
          </Link>
        </div>
      </div>


      {/* Other Links */}

      <Link
        to="plans"
        className="text-lg flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-all duration-300 text-white"
      >
        <MdOutlineElectricBolt className="text-white" />
        <li>Plans</li>
      </Link>

      <Link
        to="profile"
        className="text-lg flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-all duration-300 text-white"
      >
        <CiUser className="text-white" />
        <li>Profile</li>
      </Link>
    </ul>
  );
};

export default DashboardNavbar;
