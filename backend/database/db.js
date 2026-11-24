import Database from "better-sqlite3";

const dbPath = process.env.DB_PATH || "tasks.db";

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
      CHECK (completed IN (0, 1))
  )
`);

export default db;