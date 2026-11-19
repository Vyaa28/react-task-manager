
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} from "../models/taskModel.js";

// CREATE
const newTask = createTask("Practice database CRUD");

console.log("Created:", newTask);

// READ
console.log("All tasks:", getAllTasks());

// UPDATE
const updatedTask = updateTask(
  newTask.id,
  "Practice SQLite properly",
  true
);

console.log("Updated:", updatedTask);

// DELETE
const deleted = deleteTask(newTask.id);

console.log("Deleted:", deleted);

// READ again
console.log("Remaining tasks:", getAllTasks());
