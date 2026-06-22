import express from "express";

import {
  createMaintenanceRequest,
  getMyMaintenanceRequests,
  getAllMaintenanceRequests,
  startRepair,
  completeRepair,
} from "../controllers/maintenanceRequestController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  authorize,
} from "../middleware/roleMiddleware.js";

const router =
  express.Router();

router.post(
  "/",
  protect,
  authorize("employee"),
  createMaintenanceRequest
);

router.get(
  "/my-requests",
  protect,
  authorize("employee"),
  getMyMaintenanceRequests
);

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllMaintenanceRequests
);

router.put(
  "/:id/start",
  protect,
  authorize("admin"),
  startRepair
);

router.put(
  "/:id/complete",
  protect,
  authorize("admin"),
  completeRepair
);

export default router;