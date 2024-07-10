import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Kanban.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import Drawer from "./CommentDrawer/Drawer";
import Comments from "./Comments";

const TasksContainer = ({ socket, workspace_id, boardname, board_id }) => {
  const user_token = useSelector((state) => state.reducer.user.token);
  const [tasks, setTasks] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    socket.emit("taskDragged", { source, destination, board_id });
  };

  useEffect(() => {
    socket.once("load-board", (document) => {
      setTasks(document);
      console.log("setTasks done", document);
    });

    socket.emit("fetch-board", { board_id, workspace_id });
  }, [socket, board_id, workspace_id]);

  const handleAddNew = (colId, e) => {
    e.preventDefault();
    console.log(colId);
  };

  useEffect(() => {
    const handleTasksUpdate = (data) => setTasks(data);
    socket.on("tasks", handleTasksUpdate);
    return () => socket.off("tasks", handleTasksUpdate);
  }, [socket]);

  const handleCommentClick = (task) => {
    setCurrentTask(task);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <div className="container">
        <DragDropContext onDragEnd={handleDragEnd}>
          {tasks?.col?.map((col) => (
            <div className={`col__wrapper`} key={col.title}>
              <h3>{col.title}</h3>
              <div className={`col__container`}>
                <Droppable droppableId={col._id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`droppable-area ${
                        snapshot.isDraggingOver ? "dragging-over" : ""
                      }`}
                    >
                      {col.items &&
                        col.items?.map((item, index) => (
                          <div key={item._id}>
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
                                  className={`${col.title.toLowerCase()}__items`}
                                  onClick={() =>
                                    handleCommentClick({
                                      colId: col._id,
                                      itemId: item._id,
                                    })
                                  }
                                >
                                  <p>{item.title}</p>
                                </div>
                              )}
                            </Draggable>
                          </div>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <div>
                  <div
                    onClick={(e) => {
                      handleAddNew(col._id, e);
                    }}
                  >
                    + New
                  </div>
                </div>
              </div>
            </div>
          ))}
        </DragDropContext>

        <Drawer
          workspaceId={workspace_id}
          isOpen={isDrawerOpen}
          board_id={board_id}
          col_id={currentTask.colId}
          item_id={currentTask.itemId}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Comments
            col_id={currentTask.colId}
            board_id={board_id}
            content_id={currentTask.itemId}
          />
        </Drawer>
      </div>
    </>
  );
};

export default TasksContainer;
