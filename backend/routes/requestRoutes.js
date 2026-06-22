import express from "express";

import {
  createRequest,
  getMyRequests,
  getAllRequests,
  updateRequestStatus,
} from "../controllers/requestController.js";

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
  createRequest
);

router.get(
  "/my-requests",
  protect,
  authorize("employee"),
  getMyRequests
);

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllRequests
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateRequestStatus
);

export default router;