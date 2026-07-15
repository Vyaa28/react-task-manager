import { useState } from "react";

function TaskForm({ tasks, setTasks }) {
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setTask("");
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
