import React, { useState, useRef, useEffect } from "react";
import { logout } from "../Redux/Slices/authSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Logout button clicked");
    dispatch(logout());
    navigate("/");
  };

  const calculatePosition = () => {
    const rect = dropdownRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < rect.height) {
      dropdownRef.current.style.top = `-${rect.height - spaceAbove}px`;
    } else {
      dropdownRef.current.style.top = "100%";
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="bg-transparent text-white p-4 flex justify-between items-center">
      <Link to="/user/home">
        <button className="text-2xl text-black font-semibold">Workr</button>
      </Link>
      <div className="flex items-center relative">
        <div
          className="w-8 h-8 bg-gray-300 rounded-full mr-2 cursor-pointer"
          onClick={toggleDropdown}
        ></div>
        <div
          ref={dropdownRef}
          className={`absolute right-0 bg-white rounded-md shadow-lg py-2 w-48 ${
            isDropdownOpen ? "block" : "hidden"
          }`}
          style={{ top: "100%" }}
        >
          <button
            className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={() => {
              // closeDropdown();
              // Add any additional logic for "Visit Profile" button here
            }}
          >
            Visit Profile
          </button>
          <button
            className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>

          <button
            className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={() => {
              // closeDropdown();
              // Add any additional logic for "Help" button here
            }}
          >
            Help
          </button>
        </div>
      </div>
      {isDropdownOpen && calculatePosition()}
    </header>
  );
};

export default Navbar;
