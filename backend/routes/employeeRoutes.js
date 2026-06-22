import express from "express";

import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  authorize,
} from "../middleware/roleMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(
    protect,
    authorize("admin"),
    createEmployee
  )
  .get(
    protect,
    authorize("admin"),
    getEmployees
  );

router
  .route("/:id")
  .get(
    protect,
    authorize("admin"),
    getEmployeeById
  )
  .put(
    protect,
    authorize("admin"),
    updateEmployee
  )
  .delete(
    protect,
    authorize("admin"),
    deleteEmployee
  );

export default router;