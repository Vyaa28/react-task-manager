import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Manager API is running!");
});

app.use("/api/tasks", taskRoutes);

app.use((err, req, res, _next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Something went wrong on the server",
  });
});

export default app;