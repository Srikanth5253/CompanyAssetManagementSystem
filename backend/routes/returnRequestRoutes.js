import express from "express";

import { 
    createReturnRequest, 
    getMyReturnRequests,
    getAllReturnRequests,
    approveReturnRequest
} from "../controllers/returnRequestController.js";

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
  createReturnRequest
);

router.get(
  "/my-requests",
  protect,
  authorize("employee"),
  getMyReturnRequests
);

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllReturnRequests
);

router.put(
  "/:id/approve",
  protect,
  authorize("admin"),
  approveReturnRequest
);


export default router;