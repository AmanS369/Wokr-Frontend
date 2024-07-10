import React, { useState } from "react";
import { useSelector } from "react-redux";
import ShowMembers from "./WorkspaceSetting/ShowMembers";

const WorkspaceSetting = ({ workspaceID, onClose }) => {
  const [emails, setEmails] = useState("");
  const [permission, setPermission] = useState("READ");
  const user_token = useSelector((state) => state.reducer.user.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailArray = emails.split(",").map((email) => email.trim());
    try {
      const response = await fetch(`/api/v1/work/send-invite/${workspaceID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user_token,
        },
        body: JSON.stringify({ email: emailArray, permission: permission }),
      });
      if (!response.ok) {
        throw new Error("Failed to send invite");
      }
      const responseData = await response.json();
      if (responseData.success) {
        alert(responseData.message);
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      alert("Failed to send invite. Please try again.");
    }
    setEmails("");
    setPermission("view");
  };

  const handleDeleteWorkspace = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this workspace?",
    );
    if (confirmDelete) {
      console.log("Workspace deleted.");
    }
  };

  return (
    <div className="w-full h-full bg-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2">
          Email(s):
          <textarea
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            className="block w-full border-gray-300 rounded-md p-2 mt-1"
            rows="3"
            required
          />
        </label>
        <div className="flex items-center mb-2">
          Permission:
          <select
            value={permission}
            onChange={(e) => setPermission(e.target.value)}
            className="block ml-2 border-gray-300 rounded-md p-2 mt-1"
          >
            <option value="READ">READ</option>
            <option value="EDIT">EDIT</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Send Invite
        </button>
      </form>
      <button
        onClick={handleDeleteWorkspace}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Delete Workspace
      </button>
      <ShowMembers workspaceId={workspaceID} />
      <button onClick={onClose} className="text-sm mt-4">
        Close
      </button>
    </div>
  );
};

export default WorkspaceSetting;
