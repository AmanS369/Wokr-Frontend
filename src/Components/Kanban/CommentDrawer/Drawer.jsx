import React, { useState, useEffect } from "react";
import "./Drawer.css";
import { useSelector } from "react-redux";

const Drawer = ({
  isOpen,
  workspaceId,
  board_id,
  col_id,
  item_id,
  onClose,
  children,
  currentAssignees,
  onAddAssignee,
}) => {
  console.log("this is i", board_id);
  const [newAssignee, setNewAssignee] = useState("");
  const [currentAssignee, setCurrentAssignees] = useState("");
  const [members, setMembers] = useState([]);

  const user_token = useSelector((state) => state.reducer.user.token);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(`/api/v1/work/show-members/${workspaceId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: user_token,
          },
        });
        const data = await res.json();
        setMembers([...data.data.members]);
      } catch (error) {
        console.error(error);
      }
    };

    if (isOpen && workspaceId) {
      fetchMembers();
    }
  }, [workspaceId, isOpen]);

  useEffect(() => {
    if (col_id && item_id) {
      // Fetch the current assignees for the specific item
      const fetchAssignees = async () => {
        try {
          const res = await fetch(`/api/v1/work/show-members/${workspaceId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: user_token,
            },
          });
          const data = await res.json();

          // setCurrentAssignees(data.data.admin);
          setCurrentAssignees(data.data.members);
          console.log("this all drawr", data, currentAssignees);
        } catch (error) {
          console.error(error);
        }
      };
      fetchAssignees();
    }
  }, [col_id, item_id, board_id, user_token]);

  const handleAddAssignee = async () => {
    try {
      const response = await fetch(
        `/api/v1/work/add-assignee/${workspaceId}/${board_id._id}/${col_id}/${item_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: user_token,
          },
          body: JSON.stringify({ user_id: newAssignee }),
        },
      );
      const data = await response.json();
      setCurrentAssignees([...currentAssignees, data.assignee]);
      setNewAssignee("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={`drawer ${isOpen ? "open" : ""}`}>
      <button className="drawer__close" onClick={onClose}>
        Back
      </button>
      <div className="drawer__content">
        <div className="assignees-section">
          <h3>Current Assignees</h3>
          <ul>
            {currentAssignees &&
              currentAssignees.map((assignee, index) => (
                <li key={index}>{assignee}</li>
              ))}
          </ul>
          <div className="add-assignee">
            <select
              value={newAssignee}
              onChange={(e) => setNewAssignee(e.target.value)}
            >
              <option value="">Select a member</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
            <button onClick={handleAddAssignee}>Add</button>
          </div>
        </div>
        <div className="comments-section">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
