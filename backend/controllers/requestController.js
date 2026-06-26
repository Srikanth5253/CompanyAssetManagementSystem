import asyncHandler from "../middleware/asyncHandler.js";
import Request from "../models/Request.js";

export const createRequest =
  asyncHandler(async (req, res) => {
    const {
      assetType,
      reason,
      priority,
    } = req.body;

    const existingRequest =
      await Request.findOne({
        employee: req.user._id,
        assetType,
        status: {
          $in: [
            "Pending",
            "Approved",
          ],
        },
      });

    if (existingRequest) {
      res.status(400);

      throw new Error(
        "You already have a pending or approved request for this asset."
      );
    }

    const request =
      await Request.create({
        employee: req.user._id,
        assetType,
        reason,
        priority,
      });

    res.status(201).json({
      success: true,
      request,
    });
  });

export const getMyRequests =
  asyncHandler(
    async (req, res) => {
      const requests =
        await Request.find({
          employee:
            req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        requests,
      });
    }
  );

export const getAllRequests =
  asyncHandler(async (req, res) => {
    const requests =
      await Request.find()
        .populate(
          "employee",
          "name email employeeId"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      requests,
    });
  });

export const updateRequestStatus =
  asyncHandler(async (req, res) => {
    const {
      status,
      adminRemarks,
    } = req.body;

    const request =
      await Request.findById(
        req.params.id
      );

    if (!request) {
      res.status(404);

      throw new Error(
        "Request not found"
      );
    }

    request.status = status;

    if (adminRemarks) {
      request.adminRemarks =
        adminRemarks;
    }

    await request.save();

    res.status(200).json({
      success: true,
      request,
    });
  });