import db from "./database/db.js";
import express from "express";
import cors from "cors";
import "dotenv/config";


import taskRoutes from "./routes/taskRoutes.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Manager API is running!");
});

app.use("/api/tasks", taskRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Something went wrong on the server"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
