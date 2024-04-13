// WorkspacePage.js
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Editor from "../Components/Editor";
import WorkspaceNavbar from "../Components/WorkspaceNavbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";

const WorkspacePage = () => {
  const { workspace_id } = useParams();
  const user_token = useSelector((state) => state.reducer.user.token);
  const user = useSelector((state) => state.reducer.user.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [workspace, setWorkspace] = useState();
  const [permission, setPermission] = useState();

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
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex items-start ">
      <div
        className={`${
          isSidebarCollapsed ? "hidden" : ""
        }   px-7 py-7 border-r min-h-screen transition-all duration-300`}
      >
        <Sidebar
          onSelectFile={handleFileSelect}
          workspaceName={workspace?.title}
          allfiles={workspace?.files || []}
        />
      </div>

      <div className="flex-1 flex-col h-screen">
        <div>
          <Navbar onToggleSidebar={toggleSidebar} user={user} />
        </div>

        <div className=" px-4 py-4 overflow-y-auto h-screen">
          {selectedFile ? (
            <>
              <Editor
                content={selectedFile.content || ""}
                permission={permission}
                filename={selectedFile?.file.name}
                workspace_id={workspace?._id}
                file_id={selectedFile.file._id}
                onChange={(newContent) => {
                  console.log(newContent);
                }}
                user={user_token}
                className="w-full h-full"
              />
            </>
          ) : (
            <p className="text-gray-500">Select a file from the sidebar</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;
