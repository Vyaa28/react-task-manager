import {
  getAllTasks,
  createTask as createTaskInDB,
  updateTask as updateTaskInDB,
    deleteTask as deleteTaskInDB
} from "../models/taskModel.js";


// GET - Retrieve all tasks
export const getTasks = (req, res) => {
  const tasks = getAllTasks();

  res.json(tasks);
};

// POST - Create a task

export const createTask = (req, res) => {
  const { title } = req.body;

  // Validate task title
  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      message: "Task title is required"
    });
  }

  // Save task into SQLite
  const newTask = createTaskInDB(title.trim());

  res.status(201).json(newTask);
};



// PUT: Update an existing task
export const updateTask = (req, res) => {
  const taskId = Number(req.params.id);

  // Validate task ID
  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({
      message: "Invalid task ID"
    });
  }

  const { title, completed } = req.body;

  // Validate title if provided
  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "Task title must be valid text"
      });
    }
  }

  // Validate completed if provided
  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({
        message: "Completed must be true or false"
      });
    }
  }

  // Update task in SQLite
  const updatedTask = updateTaskInDB(taskId, {
    title: title !== undefined ? title.trim() : undefined,
    completed
  });

  if (!updatedTask) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.json(updatedTask);
};


// DELETE: Delete an existing task
export const deleteTask = (req, res) => {
  const taskId = Number(req.params.id);

  // Validate task ID
  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({
      message: "Invalid task ID"
    });
  }

  // Delete task from SQLite
  const deleted = deleteTaskInDB(taskId);

  if (!deleted) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.json({
    message: "Task deleted successfully"
  });
};
