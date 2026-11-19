import { useState } from "react";
import api from "../services/api";

function TaskItem({ task, tasks, setTasks }) {

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.title);

 async function deleteTask() {
  try {
    await api.delete(`/tasks/${task.id}`);

    setTasks(tasks.filter((t) => t.id !== task.id));
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

 async function toggleComplete() {
  try {
    const response = await api.put(`/tasks/${task.id}`, {
      completed: !task.completed,
    });

    setTasks(
      tasks.map((t) =>
        t.id === task.id ? response.data : t
      )
    );
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

 async function saveTask() {
  if (!text.trim()) return;

  try {
    const response = await api.put(`/tasks/${task.id}`, {
      title: text.trim(),
    });

    setTasks(
      tasks.map((t) =>
        t.id === task.id ? response.data : t
      )
    );

    setEditing(false);
  } catch (error) {
    console.error("Error editing task:", error);
  }
}

  return (
    <div className="task">

      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleComplete}
      />

      {editing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <span
          className={task.completed ? "completed" : ""}
        >
          {task.title}
        </span>
      )}

      {editing ? (
        <button onClick={saveTask}>Save</button>
      ) : (
        <button onClick={() => setEditing(true)}>
          Edit
        </button>
      )}

      <button onClick={deleteTask}>
        Delete
      </button>

    </div>
  );
}

export default TaskItem;