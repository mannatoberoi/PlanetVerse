import express from "express";
import cors from "cors";
import config from "./config/index.js";
import { testConnection } from "./db/pool.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import coursesRouter from "./routes/courses.js";
import assignmentsRouter from "./routes/assignments.js";
import resourcesRouter from "./routes/resources.js";
import projectsRouter from "./routes/projects.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    await testConnection();
    res.json({
      success: true,
      message: "PlanetVerse API is online",
      database: "connected",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "API is up but database connection failed",
      error: err.message,
    });
  }
});

app.use("/api/courses", coursesRouter);
app.use("/api/assignments", assignmentsRouter);
app.use("/api/resources", resourcesRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/users", usersRouter);

app.use(notFound);
app.use(errorHandler);

async function start() {
  try {
    await testConnection();
    console.log("MySQL connection successful");
  } catch (err) {
    console.error("MySQL connection failed:", err.message);
    console.error("Check backend/.env and make sure MySQL is running.");
    process.exit(1);
  }

  app.listen(config.port, () => {
    console.log(`PlanetVerse API listening on http://localhost:${config.port}`);
  });
}

start();
