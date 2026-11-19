
import { useState } from "react";
import api from "../services/api";

function TaskForm({ tasks, setTasks }) {
  const [task, setTask] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (task.trim() === "") return;

    try {
      const response = await api.post("/tasks", {
        title: task.trim(),
      });

      setTasks([...tasks, response.data]);

      setTask("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}

export default TaskForm;
