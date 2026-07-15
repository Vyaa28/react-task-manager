import { useState } from "react";

function TaskItem({ task, tasks, setTasks }) {

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.title);

  function deleteTask() {
    setTasks(tasks.filter((t) => t.id !== task.id));
  }

  function toggleComplete() {
    setTasks(
      tasks.map((t) =>
        t.id === task.id
          ? { ...t, completed: !t.completed }
          : t
      )
    );
  }

  function saveTask() {
    setTasks(
      tasks.map((t) =>
        t.id === task.id
          ? { ...t, title: text }
          : t
      )
    );

    setEditing(false);
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