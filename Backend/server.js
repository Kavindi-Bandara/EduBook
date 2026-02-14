const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Debug: prove which server.js file is running
console.log("server.js running from:", __filename);

// Debug: prove which authRoutes file is being loaded
console.log("authRoutes resolved path:", require.resolve("./routes/authRoutes"));
console.log("recordsRoutes resolved path:", require.resolve("./routes/recordsRoutes"));

const authRoutes = require("./routes/authRoutes");
const recordsRoutes = require("./routes/recordsRoutes");

const app = express();

// Middlewares
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors({
  origin: "*",
}));

app.use(express.json());

// Home test route
app.get("/", (req, res) => {
  return res.status(200).json({ message: "EduBook backend running" });
});

// show all routes (very helpful)
function listRoutes() {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // direct route
      const methods = Object.keys(middleware.route.methods).join(",").toUpperCase();
      routes.push(`${methods} ${middleware.route.path}`);
    } else if (middleware.name === "router") {
      // router middleware
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const methods = Object.keys(handler.route.methods).join(",").toUpperCase();
          routes.push(`${methods} ${handler.route.path}`);
        }
      });
    }
  });
  console.log("Registered routes:", routes);
}

// Routes
app.use("/auth", authRoutes);
app.use("/records", recordsRoutes);

// 404 JSON handler (this MUST return JSON)
app.use((req, res) => {
  return res.status(404).json({
    error: "Not Found",
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Start server after DB connect
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("MongoDB connected and server starting...");
    console.log(" Routes mounted: /auth , /records");
    listRoutes(); //  print routes

    app.listen(PORT, () => {
      console.log(` Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

