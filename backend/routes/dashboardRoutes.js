import express from "express";

import {
  getDashboardStats,
  getEmployeeDashboard,
  getAssetCategoryReport,
  getRequestReport,
} from "../controllers/dashboardController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/stats",
  protect,
  authorize("admin"),
  getDashboardStats
);

router.get(
  "/employee",
  protect,
  authorize("employee"),
  getEmployeeDashboard
);

router.get(
  "/asset-category-report",
  protect,
  authorize("admin"),
  getAssetCategoryReport
);

router.get(
  "/request-report",
  protect,
  authorize("admin"),
  getRequestReport
);

export default router;