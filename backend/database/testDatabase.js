import db from "./db.js";

// Insert a task
const result = db.prepare(`
  INSERT INTO tasks (title, completed)
  VALUES (?, ?)
`).run("Learn SQLite with Node.js", 0);

console.log("Inserted task ID:", result.lastInsertRowid);

// Retrieve all tasks
const tasks = db.prepare(`
  SELECT * FROM tasks
`).all();

console.log(tasks);