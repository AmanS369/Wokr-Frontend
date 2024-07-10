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
    socket.once("load-board", (document) => setTasks(document));
    socket.emit("fetch-board", { board_id, workspace_id });
  }, [socket, board_id, workspace_id]);

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
    <div className="container">
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.entries(tasks).map(([key, task]) => (
          <div
            className={`${task.col.title.toLowerCase()}__wrapper`}
            key={task.title}
          >
            <h3>{task.title} Tasks</h3>
            <div className={`${task.title.toLowerCase()}__container`}>
              <Droppable droppableId={task.title}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`droppable-area ${
                      snapshot.isDraggingOver ? "dragging-over" : ""
                    }`}
                  >
                    {task.items &&
                      task.items.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`${task.title.toLowerCase()}__items`}
                              onClick={() =>
                                handleCommentClick({
                                  title: task.title,
                                  id: item.id,
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
    </div>
  );
};

export default TasksContainer;
