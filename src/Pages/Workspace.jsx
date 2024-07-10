import React, { useState, useEffect } from "react";
import Kanbanboard from "../Components/Kanban/KanbanBaord";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdOutlineHome } from "react-icons/md";
import {
  RiSettings4Line,
  RiLogoutBoxRLine,
  RiProfileLine,
} from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { AiOutlineFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Components/Sidebar";
import Editor from "../Components/Editor";
import Navbar from "../Components/Navbar";
import WorkspaceSetting from "../Components/WorkspaceSetting";
import WorkSpaceLanding from "../Components/WorkSpaceLanding";

const WorkspacePage = () => {
  const [open, setOpen] = useState(true);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedBoardName, setSelectedBoardName] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("dashboard"); // Track selected menu
  const { workspace_id } = useParams();
  const user_token = useSelector((state) => state.reducer.user.token);
  const user = useSelector((state) => state.reducer.user.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [workspace, setWorkspace] = useState();
  const [permission, setPermission] = useState();
  const [currentView, setCurrentView] = useState("file"); // 'file' or 'settings'
  const [allFiles, setAllFiles] = useState([]);
  const [allBoards, setAllBoards] = useState([]);
  const [isFilesDropdownOpen, setIsFilesDropdownOpen] = useState(false);
  const [isBoardsDropdownOpen, setBoardsDropdownOpen] = useState(false);
  const [newContentName, setnewContentName] = useState("");
  const [AddNewContentType, setAddNewContentType] = useState("");
  const [showModal, setShowModal] = useState(false);

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
        setAllFiles(data.data.workspace.files);
        setAllBoards(data.data.workspace.boards);
        console.log(allFiles);
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
      setSelectedFileName(file.name.split("_")[0]);
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };

  const handlenewFile = async (e) => {
    e.preventDefault();
    try {
      if (AddNewContentType === "AddNewFile") {
        const response = await fetch(
          `/api/v1/work/create-file/${workspace_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: user_token,
            },
            body: JSON.stringify({ fileName: newContentName }),
          },
        );
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setAllFiles((prevFiles) => [...prevFiles, data.newFile]);
            alert(data.message);
          } else {
            alert(data.message);
          }
          setShowModal(false);
        } else {
          alert(response.data.message);
        }
      } else {
        const response = await fetch(
          `/api/v1/work/create-board/${workspace_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: user_token,
            },
            body: JSON.stringify({ boardName: newContentName }),
          },
        );
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setAllBoards((prevBoards) => [...prevBoards, data.newBoard]);
            alert(data.message);
          } else {
            alert(data.message);
          }
          setShowModal(false);
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while creating new Content");
    }
  };

  const menus = [];

  if (permission <= 2) {
    menus.push(
      {
        name: "Add file",
        link: "#",
        icon: AiOutlineFileAdd,
        action: () => setShowModal(true),
      },
      {
        name: "Settings",
        link: "#",
        icon: RiSettings4Line,
        action: () => setSelectedMenu("settings"),
      },
    );
  }
  menus.push(
    {
      name: "Files",
      link: "#",
      icon: FiFolder,
      action: () => {
        setIsFilesDropdownOpen(!isFilesDropdownOpen);
        setOpen(true);
      },
    },
    {
      name: "Boards",
      link: "#",
      icon: FiFolder,
      action: () => {
        setBoardsDropdownOpen(!isBoardsDropdownOpen);
        setOpen(true);
      },
    },
  );

  const utils = [
    {
      name: "Logout",
      link: "/user/home",
      icon: RiLogoutBoxRLine,
    },
    {
      name: "Home",
      link: "/user/home",
      icon: MdOutlineHome,
    },
    {
      name: "Profile",
      link: "#",
      icon: RiProfileLine,
    },
  ];

  const renderContent = () => {
    console.log("thesele", selectedMenu);
    switch (selectedMenu) {
      case "addFidle":
        return <AddFileComponent />;
      case "allFiles":
        return <AllFilesComponent />;
      case "settings":
        return <WorkspaceSetting workspaceID={workspace?._id} />;
      case "file":
        if (selectedFile) {
          return (
            <Editor
              content={selectedFile.content || ""}
              permission={permission}
              filename={selectedFile?.file.name}
              workspace_id={workspace?._id}
              file_id={selectedFile.file._id}
              onChange={(newContent) => {
                console.log(newContent);
              }}
              user={user}
              userToken={user_token}
              className="w-full h-full"
            />
          );
        } else {
          return <div>No file selected</div>;
        }
      case "board":
        console.log("thecontent", selectedBoard);
        return (
          <Kanbanboard
            // content={" " || selectedBoard.content}
            // permission={permission}
            boardname={selectedBoard.name}
            workspace_id={workspace?._id}
            board_id={selectedBoard}
            // onChange={(newContent) => {
            //   console.log(newContent);
            // }}
            // user={user}
            userToken={user_token}
            // className="w-full h-full"
          />
        );
      default:
        return <WorkSpaceLanding />;
    }
  };

  return (
    <>
      <section className="flex flex-row h-screen">
        <div
          className={`bg-purple-600 min-h-screen ${
            open ? "w-60" : "w-16"
          } duration-500 flex-grow h-full text-white px-4 flex flex-col justify-between`}
        >
          <div>
            <div className="py-3 flex justify-end">
              <HiMenuAlt3
                size={26}
                className="cursor-pointer"
                onClick={() => {
                  setOpen(!open);
                  setIsFilesDropdownOpen(false);
                }}
              />
            </div>
            <div className="mt-4 flex flex-col gap-4 relative">
              <h1
                className={`whitespace-pre text-lg font-bold text-center duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {workspace?.title}
              </h1>
              {menus?.map((menu, i) => (
                <div key={i}>
                  <Link
                    to={menu?.link}
                    onClick={menu?.action}
                    className={` ${
                      menu?.margin && "mt-5"
                    } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-[#F99417] rounded-md`}
                  >
                    <div>{React.createElement(menu?.icon, { size: "24" })}</div>
                    <h2
                      style={{
                        transitionDelay: "50ms",
                      }}
                      className={`whitespace-pre font-semibold text-base duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      {menu?.name}
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold  whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                    >
                      {menu?.name}
                    </h2>
                  </Link>
                  {menu.name === "Files" && isFilesDropdownOpen && (
                    <div className="pl-8 mt-2">
                      {allFiles.map((file) => (
                        <div
                          key={file._id}
                          className="text-base cursor-pointer hover:text-[#F99417] mb-1"
                          onClick={() => {
                            handleFileSelect(file);
                            setSelectedMenu("file");
                            setSelectedBoard(null);
                          }}
                          style={{
                            color:
                              selectedFile?.file._id === file._id
                                ? "#F99417"
                                : "inherit",
                          }}
                        >
                          {file.name.split("_")[0]}
                        </div>
                      ))}
                    </div>
                  )}

                  {menu.name === "Boards" && isBoardsDropdownOpen && (
                    <div className="pl-8 mt-2">
                      {allBoards.map((board) => (
                        <div
                          key={board._id}
                          className="text-base cursor-pointer hover:text-[#F99417] mb-1"
                          onClick={() => {
                            setSelectedBoard(board);
                            setSelectedMenu("board");
                            setSelectedFile(null);
                          }}
                          style={{
                            color:
                              selectedBoard?._id === board._id
                                ? "#F99417"
                                : "inherit",
                          }}
                        >
                          {board.name.split("_")[0]}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 mb-4">
            {utils?.map((util, i) => (
              <div key={i}>
                <Link
                  to={util?.link}
                  className={` ${
                    util?.margin && "mt-5"
                  } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-[#F99417] rounded-md`}
                >
                  <div>{React.createElement(util?.icon, { size: "24" })}</div>
                  <h2
                    style={{
                      transitionDelay: "50ms",
                    }}
                    className={`whitespace-pre font-semibold text-base duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {util?.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                  >
                    {util?.name}
                  </h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="m-3 text-xl text-gray-900 overflow-auto h-auto  flex-grow w-full">
          {renderContent()}
        </div>
      </section>
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Content</h2>
            <form onSubmit={handlenewFile}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-bold mb-2">
                  FileName:
                </label>
                <input
                  type="text"
                  id="title"
                  value={newContentName}
                  onChange={(e) => setnewContentName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#5D3891]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Content Type:
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contentType"
                      value="file"
                      checked={AddNewContentType === "AddNewFile"}
                      onChange={() => setAddNewContentType("AddNewFile")}
                      className="mr-2"
                    />
                    File
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contentType"
                      value="board"
                      checked={AddNewContentType === "AddNewBoard"}
                      onChange={() => setAddNewContentType("AddNewBoard")}
                      className="mr-2"
                    />
                    Board
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="bg-[#F99417] text-white px-4 py-2 rounded hover:bg-[#e08314] transition-colors duration-200"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-200"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const AddFileComponent = () => {
  // Component logic for adding a file
  return <div>Add File Component</div>;
};

const AllFilesComponent = () => {
  // Component logic for displaying all files
  return <div>All Files Component</div>;
};

const DashboardComponent = () => {
  // Component logic for dashboard
  return <div>Dashboard Component</div>;
};

export default WorkspacePage;
