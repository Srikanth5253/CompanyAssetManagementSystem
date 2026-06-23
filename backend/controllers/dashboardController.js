import asyncHandler from "../middleware/asyncHandler.js";

import Asset from "../models/Asset.js";
import AssetHistory from "../models/AssetHistory.js";
import User from "../models/User.js";
import Request from "../models/Request.js";
import ReturnRequest from "../models/ReturnRequest.js";
import MaintenanceRequest from "../models/MaintenanceRequest.js";

export const getDashboardStats =
    asyncHandler(async (req, res) => {

        const totalAssets =
            await Asset.countDocuments();

        const availableAssets =
            await Asset.countDocuments({
                status: "available",
            });

        const assignedAssets =
            await Asset.countDocuments({
                status: "assigned",
            });
        
        const maintenanceAssets =
            await Asset.countDocuments({
                status: "maintenance",
            });

        const employees =
            await User.countDocuments({
                role: "employee",
            });

        const pendingRequests =
            await Request.countDocuments({
                status: "Pending",
            });

        const pendingReturnRequests =
            await ReturnRequest.countDocuments({
                status: "Pending",
            });

        const retiredAssets =
            await Asset.countDocuments({
                status: "retired",
            });

        res.json({
            success: true,

            totalAssets,
            availableAssets,
            assignedAssets,
            maintenanceAssets,
            employees,
            pendingRequests,
            pendingReturnRequests,
            retiredAssets,
        });
    });

export const getEmployeeDashboard =
    asyncHandler(async (req, res) => {

        const assets =
            await Asset.find({
                assignedTo: req.user._id,
            });

        const pendingRequests =
            await Request.countDocuments({
                employee: req.user._id,
                status: "Pending",
            });

        const pendingReturns =
            await ReturnRequest.countDocuments({
                employee: req.user._id,
                status: "Pending",
            });

        const maintenanceRequests =
            await MaintenanceRequest.countDocuments({
                employee: req.user._id,
                status: {
                    $ne: "Completed",
                },
            });

        const recentActivity =
            await AssetHistory.find({
                employee: req.user._id,
            })
                .populate(
                    "asset",
                    "assetName"
                )
                .sort({
                    createdAt: -1,
                })
                .limit(5);

        res.status(200).json({
            success: true,

            activeAssets:
                assets.filter(
                    (asset) =>
                        asset.status ===
                        "assigned"
                ).length,

            pendingRequests,

            pendingReturns,

            maintenanceRequests,

            recentActivity,
        });
    });

export const getAssetCategoryReport =
    asyncHandler(async (req, res) => {

        const report =
            await Asset.aggregate([
                {
                    $group: {
                        _id: "$category",
                        count: {
                            $sum: 1,
                        },
                    },
                },
            ]);

        res.json({
            success: true,
            report,
        });

    });

export const getRequestReport =
    asyncHandler(async (req, res) => {

        const report =
            await Request.aggregate([
                {
                    $group: {
                        _id: "$status",
                        count: {
                            $sum: 1,
                        },
                    },
                },
            ]);

        res.json({
            success: true,
            report,
        });

    });
