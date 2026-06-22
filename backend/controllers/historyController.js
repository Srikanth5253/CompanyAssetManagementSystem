import asyncHandler
  from "../middleware/asyncHandler.js";

import AssetHistory
  from "../models/AssetHistory.js";

export const getHistory =
  asyncHandler(
    async (req, res) => {
      const history =
        await AssetHistory.find()
          .populate(
            "asset",
            "assetName serialNumber"
          )
          .populate(
            "employee",
            "name employeeId"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        history,
      });
    }
  );