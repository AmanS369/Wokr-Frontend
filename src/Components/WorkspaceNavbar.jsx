// WorksapceNavbar.js
import React from "react";
import { FaBars } from "react-icons/fa";

const WorksapceNavbar = ({ onToggleSidebar, user }) => {
  return (
    <div className="flex  p-3 w-full justify-end sticky top-0">
      <div className="flex items-center">
        {user.photo ? (
          <img
            src={user.photo}
            alt="User"
            className="w-8 h-8 rounded-full object-cover mr-2"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-500 rounded-full mr-2"></div>
        )}
        <span className="truncate">{user.name.split(" ")[0]}</span>
      </div>
    </div>
  );
};

export default WorksapceNavbar;
