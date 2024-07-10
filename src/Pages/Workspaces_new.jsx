import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Components/Sidebar";
import Editor from "../Components/Editor";
import Navbar from "../Components/Navbar";
import WorkspaceSetting from "../Components/WorkspaceSetting";

const WorkspacePage = () => {
  const { workspace_id } = useParams();
  const user_token = useSelector((state) => state.reducer.user.token);
  const user = useSelector((state) => state.reducer.user.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [workspace, setWorkspace] = useState();
  const [permission, setPermission] = useState();
  const [currentView, setCurrentView] = useState("file"); // 'file' or 'settings'

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await fetch(
          `/api/v1/work/get-workspace/${workspace_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: user_token,
            },
          },
        );
        const data = await response.json();
        console.log(data);
        setWorkspace(data.data.workspace);
        setPermission(data.data.userPermission);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };

    fetchWorkspaces();
  }, [user_token, workspace_id]);

  const handleFileSelect = async (file) => {
    try {
      const response = await fetch(`/api/v1/files/${file.name}.json`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: user_token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch file content");
      }

      const data = await response.text(); // Use response.text() for plain text content
      setSelectedFile({ file: file, content: data });
      setCurrentView("file"); // Switch to file view
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSettingsClick = () => {
    setCurrentView("settings"); // Switch to settings view
  };

  return (
    <div className="relative h-screen">
      {/* Sidebar */}
      <div
        className={`absolute top-0 left-0 h-full ${
          isSidebarCollapsed ? "w-0" : "w-2/12"
        } bg-gray-800 p-4 transition-all duration-300 z-20`}
      >
        {!isSidebarCollapsed ? (
          <button
            className="absolute top-2 right-2 text-white"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        ) : (
          <Sidebar
            toggle={isSidebarCollapsed}
            onSelectFile={handleFileSelect}
            workspaceName={workspace?.title}
            allfiles={workspace?.files || []}
            onSettingsClick={handleSettingsClick}
            workspace_id={workspace?._id}
            userPermission={permission}
          />
        )}
      </div>

      {/* Main content */}
      <div
        className={`h-full ${
          isSidebarCollapsed ? "w-full" : "w-full"
        } p-4 transition-opacity duration-300 ${
          isSidebarCollapsed ? "opacity-100" : "opacity-50"
        }`}
      >
        <Navbar />
        {currentView === "file" && selectedFile ? (
          <Editor file={selectedFile} />
        ) : currentView === "settings" ? (
          <WorkspaceSetting workspace={workspace} permission={permission} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Select a file to start editing or go to settings</p>
          </div>
        )}
      </div>

      {/* Small icon to reopen sidebar when collapsed */}
      {isSidebarCollapsed && (
        <button
          className="absolute top-2 left-2 bg-gray-800 text-white rounded-full p-2 z-30"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}
    </div>
  );
};

export default WorkspacePage;
