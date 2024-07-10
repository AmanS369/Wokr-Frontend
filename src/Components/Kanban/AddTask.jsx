import React, { useState } from "react";
import { useSelector } from "react-redux";
const AddTask = ({ socket, boardname, workspace_id, board_id }) => {
  const [task, setTask] = useState("");
  const user_ID = useSelector((state) => state.reducer.user.user);

  const handleAddTodo = (e) => {
    e.preventDefault();

    socket.emit("createTask", { task, board_id, user_ID });
    setTask("");
  };
  return (
    <form className="form__input" onSubmit={handleAddTodo}>
      <label htmlFor="task">Add Todo</label>
      <input
        type="text"
        name="task"
        id="task"
        value={task}
        className="input"
        required
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="addTodoBtn">ADD TODO</button>
    </form>
  );
};

export default AddTask;
