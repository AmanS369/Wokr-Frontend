import React, { useState, useRef } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
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

  return (
    <header className="bg-transparent text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl text-black font-semibold">Workr</h1>
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
          onMouseLeave={closeDropdown}
        >
          <button
            className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={closeDropdown}
          >
            Visit Profile
          </button>
          <button
            className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={closeDropdown}
          >
            Logout
          </button>
          <button
            className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={closeDropdown}
          >
            Help
          </button>
        </div>
      </div>
      {isDropdownOpen && (
        <div className="fixed inset-0 z-10" onClick={closeDropdown}></div>
      )}
      {isDropdownOpen && calculatePosition()}
    </header>
  );
};

export default Navbar;
