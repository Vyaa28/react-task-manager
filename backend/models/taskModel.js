
import db from "../database/db.js";

// READ: Get all tasks
export const getAllTasks = () => {
  const tasks = db.prepare(`
    SELECT * FROM tasks
  `).all();

 return tasks.map((task) => ({
    ...task,
    completed: Boolean(task.completed)
  }));
};

// CREATE: Insert a new task
export const createTask = (title) => {
  const result = db.prepare(`
    INSERT INTO tasks (title, completed)
    VALUES (?, ?)
  `).run(title, 0);

  return {
    id: Number(result.lastInsertRowid),
    title,
    completed: false
  };
};


// UPDATE: Update an existing task
export const updateTask = (id, fields) => {
  const existingTask = db.prepare(`
    SELECT * FROM tasks
    WHERE id = ?
  `).get(id);

  if (!existingTask) {
    return null;
  }

  const title = fields.title ?? existingTask.title;
  const completed =
    fields.completed ?? Boolean(existingTask.completed);

  db.prepare(`
    UPDATE tasks
    SET title = ?, completed = ?
    WHERE id = ?
  `).run(title, completed ? 1 : 0, id);

  return {
    id,
    title,
    completed
  };
};

// DELETE: Delete an existing task
export const deleteTask = (id) => {
  const result = db.prepare(`
    DELETE FROM tasks
    WHERE id = ?
  `).run(id);

  return result.changes > 0;
};
