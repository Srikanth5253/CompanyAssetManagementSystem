import express from "express";

import {
  createAsset,
  deleteAsset,
  getAssets,
  getMyAssets,
  updateAsset,
  assignAsset,
  retireAsset,
} from "../controllers/assetController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  authorize,
} from "../middleware/roleMiddleware.js";

const router =
  express.Router();

router
  .route("/")
  .post(
    protect,
    authorize("admin"),
    createAsset
  )
  .get(
    protect,
    authorize("admin"),
    getAssets
  );

router.get(
  "/my-assets",
  protect,
  authorize("employee"),
  getMyAssets
);

router
  .route("/:id")
  .put(
    protect,
    authorize("admin"),
    updateAsset
  ).delete(
    protect,
    authorize("admin"),
    deleteAsset
  )

router.put(
  "/:id/assign",
  protect,
  authorize("admin"),
  assignAsset
);

router.put(
  "/:id/retire",
  protect,
  authorize("admin"),
  retireAsset
);

// router.put(
//   "/:id/return",
//   protect,
//   authorize("admin"),
//   returnAsset
// );

export default router;