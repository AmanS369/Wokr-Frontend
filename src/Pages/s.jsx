// import React, { useEffect, useState } from "react";
// import Sidebar from "../Components/Sidebar";
// import Editor from "../Components/Editor";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// import Navbar from "../Components/Navbar";
// import WorkspaceSetting from "../Components/WorkspaceSetting";

// const WorkspacePage = () => {
//   const { workspace_id } = useParams();
//   const user_token = useSelector((state) => state.reducer.user.token);
//   const user = useSelector((state) => state.reducer.user.user);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const [workspace, setWorkspace] = useState();
//   const [permission, setPermission] = useState();
//   const [currentView, setCurrentView] = useState("file"); // 'file' or 'settings'

//   useEffect(() => {
//     const fetchWorkspaces = async () => {
//       try {
//         const response = await fetch(
//           `/api/v1/work/get-workspace/${workspace_id}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: user_token,
//             },
//           },
//         );
//         const data = await response.json();
//         console.log(data);
//         setWorkspace(data.data.workspace);
//         setPermission(data.data.userPermission);
//       } catch (error) {
//         console.error("Error fetching workspaces:", error);
//       }
//     };

//     fetchWorkspaces();
//   }, [user_token, workspace_id]);

//   const handleFileSelect = async (file) => {
//     try {
//       const response = await fetch(`/api/v1/files/${file.name}.json`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: user_token,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch file content");
//       }

//       const data = await response.text(); // Use response.text() for plain text content
//       setSelectedFile({ file: file, content: data });
//       setCurrentView("file"); // Switch to file view
//     } catch (error) {
//       console.error("Error fetching file content:", error);
//     }
//   };

//   const toggleSidebar = () => {
//     setIsSidebarCollapsed(!isSidebarCollapsed);
//   };

//   const handleSettingsClick = () => {
//     setCurrentView("settings"); // Switch to settings view
//   };

//   return (
//     <div className="flex h-screen">
//       <div
//         className={`${
//           isSidebarCollapsed ? "hidden" : "w-1/4"
//         } min-h-screen transition-all duration-300`}
//       >
//         <Sidebar
//           onSelectFile={handleFileSelect}
//           workspaceName={workspace?.title}
//           allfiles={workspace?.files || []}
//           onSettingsClick={handleSettingsClick}
//           workspace_id={workspace?._id}
//           userPermission={permission}
//         />
//       </div>

//       <div
//         className={`flex-1 flex flex-col ${
//           isSidebarCollapsed ? "w-full" : "w-3/4"
//         }`}
//       >
//         <div>
//           <Navbar onToggleSidebar={toggleSidebar} user={user} />
//         </div>

//         <div className="px-4 py-4 overflow-y-auto h-full">
//           {currentView === "settings" ? (
//             <WorkspaceSetting
//               workspaceID={workspace?._id}
//               onClose={() => setCurrentView("file")}
//             />
//           ) : selectedFile ? (
//             <Editor
//               content={selectedFile.content || ""}
//               permission={permission}
//               filename={selectedFile?.file.name}
//               workspace_id={workspace?._id}
//               file_id={selectedFile.file._id}
//               onChange={(newContent) => {
//                 console.log(newContent);
//               }}
//               user={user}
//               userToken={user_token}
//               className="w-full h-full"
//             />
//           ) : (
//             <p className="text-gray-500">Select a file from the sidebar</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkspacePage;
<div className="container">
  <DragDropContext onDragEnd={handleDragEnd}>
    {Object.entries(tasks).map(([key, task]) => (
      <div className={`${task.col.title}__wrapper`} key={task.col.title}>
        <h3>{task.col.title} Tasks</h3>
        <div className={`${task.col.title.toLowerCase()}__container`}>
          <Droppable droppableId={task.col.title}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`droppable-area ${
                  snapshot.isDraggingOver ? "dragging-over" : ""
                }`}
              >
                {task.col.items &&
                  task.col.items.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${task.col.title.toLowerCase()}__items`}
                          onClick={() =>
                            handleCommentClick({
                              // title: task.title,
                              // id: item.id,
                            })
                          }
                        >
                          <p>{item.title}</p>

                          {/* <p className="comment">
                        <button
                          onClick={() =>
                            handleCommentClick({
                              title: task.title,
                              id: item.id,
                            })
                          }
                        >
                          {item.comments.length > 0
                            ? "View Comments"
                            : "Add Comment"}
                        </button>
                      </p> */}
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    ))}
  </DragDropContext>

  <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
    <Comments
      category={currentTask.title}
      id={currentTask.id}
      board_id={board_id}
    />
  </Drawer>
</div>;
