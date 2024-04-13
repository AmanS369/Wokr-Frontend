import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const Sidebar = ({ onSelectFile, workspaceName, allfiles }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [toggle, setToggle] = useState(true);

  const handleClick = (file) => {
    onSelectFile(file);
    setSelectedFile(file);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      {toggle ? (
        <div className="w-full">
          <div className="flex justify-end mb-2">
            <button onClick={handleToggle}>
              <FaBars size={20} />
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">{workspaceName}</h1>
          </div>
          <ul>
            {allfiles.map((file) => (
              <li
                key={file._id}
                className={`cursor-pointer p-2 rounded-xl mb-2 ${
                  selectedFile === file ? "bg-rainbow-300 " : ""
                } relative`}
                onClick={() => handleClick(file)}
              >
                {selectedFile === file && (
                  <div className="absolute left-0 top-0 bottom-0 bg-purple-500 w-2"></div>
                )}
                <span className="ml-2">{file.name.split("_")[0]}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex justify-cen mb-2">
            <button onClick={handleToggle}>
              <FaBars size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
