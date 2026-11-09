require("dotenv").config();

const express = require("express");

const config = require("./config/config");

const taskRoutes = require("./routes/taskRoutes");

const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Built-in middleware
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the RESTful Task Tracker API",
  });
});

// Task routes
app.use("/api/tasks", taskRoutes);

// Error handling middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Start server
app.listen(config.port, () => {
  console.log(
    `Server running in ${config.environment} mode on port ${config.port}`
  );
});