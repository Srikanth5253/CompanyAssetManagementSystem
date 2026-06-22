import express from "express";

import {
  getHistory,
} from "../controllers/historyController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  authorize,
} from "../middleware/roleMiddleware.js";

const router =
  express.Router();

router.get(
  "/",
  protect,
  authorize("admin"),
  getHistory
);

export default router;