import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";
import api from "./services/api";


function App() {

 const [tasks, setTasks] = useState([]);

useEffect(() => {
  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");

      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  fetchTasks();
}, []);

  const [filter, setFilter] = useState("all");
  const filteredTasks = tasks.filter((task) => {
  if (filter === "completed") {
    return task.completed;
  }

  if (filter === "pending") {
    return !task.completed;
  }

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