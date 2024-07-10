import React from "react";
import "./Kanban.css";
import AddTask from "./AddTask";
import TasksContainer from "./TasksContainer";
import io from "socket.io-client";
import { useState, useEffect } from "react";

/*
👇🏻  Pass Socket.io into the required components
    where communications are made with the server
*/

const Task = ({
  // content,
  // userPermission,
  // className,
  // user,
  userToken,
  board_id,
  // permission,

  boardname,
  // file_id,
  workspace_id,
}) => {
  const [socket, setSocket] = useState();
  useEffect(() => {
    const s = io("/");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <div>
      {socket && (
        <AddTask
          socket={socket}
          boardname={boardname}
          workspace_id={workspace_id}
          board_id={board_id}
        />
      )}
      {socket && (
        <TasksContainer
          socket={socket}
          boardname={boardname}
          workspace_id={workspace_id}
          board_id={board_id}
        />
      )}
    </div>
  );
};

export default Task;
