import asyncHandler from "../middleware/asyncHandler.js";

import ReturnRequest from "../models/ReturnRequest.js";
import Asset from "../models/Asset.js";
import AssetHistory from "../models/AssetHistory.js";

export const createReturnRequest =
  asyncHandler(async (req, res) => {

    const { assetId } = req.body;

    const request =
      await ReturnRequest.create({
        asset: assetId,
        employee: req.user._id,
      });

    res.status(201).json({
      success: true,
      request,
    });
  });

export const getMyReturnRequests =
  asyncHandler(async (req, res) => {

    const requests =
      await ReturnRequest.find({
        employee: req.user._id,
      })
      .populate(
        "asset",
        "assetName assetTag"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      requests,
    });
  });

export const getAllReturnRequests =
  asyncHandler(async (req, res) => {

    const requests =
      await ReturnRequest.find()
      .populate(
        "asset",
        "assetName assetTag"
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
      requests,
    });
  });

export const approveReturnRequest =
  asyncHandler(async (req, res) => {

    const request =
      await ReturnRequest.findById(
        req.params.id
      );

    if (!request) {
      throw new Error(
        "Request not found"
      );
    }

    const asset =
      await Asset.findById(
        request.asset
      );

    asset.assignedTo = null;
    asset.status = "available";

    await asset.save();

    request.status =
      "Approved";

    await request.save();

    await AssetHistory.create({
      asset: asset._id,
      employee:
        request.employee,
      action: "Returned",
    });

    res.status(200).json({
      success: true,
    });
  });