import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [filter, setFilter] = useState("all");
  const filteredTasks = tasks.filter(task => {

    if(filter==="completed")
        return task.completed;

    if(filter==="pending")
        return !task.completed;

    return true;
});
  return (
    <div className="container">
      <h1>📝 My Task Manager</h1>

      <TaskForm tasks={tasks} setTasks={setTasks} />
<div className="filters">

<button onClick={()=>setFilter("all")}>
All
</button>

<button onClick={()=>setFilter("completed")}>
Completed
</button>

<button onClick={()=>setFilter("pending")}>
Pending
</button>

</div>
      <TaskList tasks={filteredTasks} setTasks={setTasks} />
    </div>
  );
}

export default App;