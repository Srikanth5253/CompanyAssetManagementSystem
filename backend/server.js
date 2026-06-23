import "./config/env.js";
import express from "express";
import cors from "cors";
import http from "http";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import assetRoutes from "./routes/assetRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import returnRequestRoutes from "./routes/returnRequestRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import maintenanceRequestRoutes from "./routes/maintenanceRequestRoutes.js";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";

const app = express();

const server = http.createServer(app);

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use(
  "/api/employees",
  employeeRoutes
);

app.use(
  "/api/assets",
  assetRoutes
);

app.use(
  "/api/requests",
  requestRoutes
);

app.use(
  "/api/history",
  historyRoutes
);

app.use(
  "/api/return-requests",
  returnRequestRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/maintenance-requests",
  maintenanceRequestRoutes
);

app.get("/api/health", (req, res) => {
  res.json({ status: "Server Running" });
});

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    server.listen(PORT, "0.0.0.0", () => {
      console.log(
        `Server running on ${PORT}`
      );
    });

  } catch (error) {
    console.error(
      "Server failed:",
      error.message
    );
  }
};

startServer();
