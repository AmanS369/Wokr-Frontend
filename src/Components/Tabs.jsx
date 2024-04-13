import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsGrid } from "react-icons/bs";
import { CiBoxList } from "react-icons/ci";

const Tabs = ({ selectedTab, onSelectTab, viewMode, onToggleViewMode }) => {
  return (
    <div className="flex mb-4">
      <h2
        className={`text-xl font-semibold mr-4 ${
          selectedTab === "Workspaces" ? "underline text-purple-500 " : ""
        }`}
        onClick={() => onSelectTab("Workspaces")}
      >
        Workspaces
      </h2>
      <h2
        className={`text-xl font-semibold ${
          selectedTab === "Notes" ? "underline text-purple-500 " : ""
        }`}
        onClick={() => onSelectTab("Notes")}
      >
        Notes
      </h2>
      <button
        className="bg-purple-400 rounded-full ml-auto text-white text-xl p-2"
        onClick={onToggleViewMode}
      >
        {viewMode === "grid" ? (
          // Icon for Grid View
          <span role="img" aria-label="grid icon">
            <BsGrid />
          </span>
        ) : (
          // Icon for List View
          <span role="img" aria-label="list icon">
            <CiBoxList />
          </span>
        )}
      </button>
    </div>
  );
};

export default Tabs;
