import Database from "better-sqlite3";

// Create or open the database
const db = new Database("tasks.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
  
     CHECK (completed IN (0, 1))
)
`);

// Export the database connection
export default db;
