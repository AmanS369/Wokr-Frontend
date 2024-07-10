import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai"; // Modern icon for file add
import { useSelector } from "react-redux";

const Sidebar = ({
  toggle,
  onSelectFile,
  workspace_id,
  workspaceName,
  allfiles,
  userPermission,
  onSettingsClick,
  showSidebar,
}) => {
  const user_token = useSelector((state) => state.reducer.user.token);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleClick = (file) => {
    onSelectFile(file);
    setSelectedFile(file);
  };

  const handlenewFile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/v1/work/create-file/${workspace_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user_token,
        },
        body: JSON.stringify({ fileName }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          window.location.reload();
          alert(data.message);
        } else {
          alert(data.message);
        }
        setShowModal(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while creating new Content");
    }
  };

  return (
    <>
      <div
        className={`flex flex-col h-full p-2 bg-gray-100 transition-all duration-300 ${
          showSidebar ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {workspaceName}
          </h1>
        </div>

        {userPermission <= 2 && (
          <div className="mt-4">
            <button
              onClick={() => setShowModal(true)}
              className="text-gray-600 hover:text-purple-700 transition-colors duration-200 flex items-center"
            >
              <AiOutlineFileAdd size={28} />
              <span className="ml-2 text-lg">New File</span>
            </button>
          </div>
        )}

        <div className="flex-grow mt-4">
          <ul className="space-y-2 overflow-y-auto">
            {allfiles.map((file) => (
              <li
                key={file._id}
                className={`cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition-all duration-200 ${
                  selectedFile === file ? "bg-gray-300" : ""
                }`}
                onClick={() => handleClick(file)}
              >
                <span className="ml-2">{file.name.split("_")[0]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex justify-center">
          {userPermission <= 2 && (
            <button
              onClick={onSettingsClick}
              className="text-gray-600 hover:text-purple-700 transition-colors duration-200"
            >
              <FaCog size={28} />
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add New File</h2>
            <form onSubmit={handlenewFile}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-bold mb-2">
                  FileName:
                </label>
                <input
                  type="text"
                  id="title"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
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

export default Sidebar;
