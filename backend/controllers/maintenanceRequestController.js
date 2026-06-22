import asyncHandler from "../middleware/asyncHandler.js";

import MaintenanceRequest from "../models/MaintenanceRequest.js";
import Asset from "../models/Asset.js";
import AssetHistory from "../models/AssetHistory.js";

export const createMaintenanceRequest =
    asyncHandler(async (req, res) => {

        const {
            assetId,
            issue,
        } = req.body;

        const asset =
            await Asset.findById(assetId);

        if (!asset) {
            throw new Error(
                "Asset not found"
            );
        }

        if (asset.status !== "assigned") {
            throw new Error(
                "Only assigned assets can be reported for maintenance"
            );
        }

        if (
            asset.assignedTo?.toString() !==
            req.user._id.toString()
        ) {
            throw new Error(
                "You can only report issues for your assigned assets"
            );
        }

        const existingRequest =
            await MaintenanceRequest.findOne({
                asset: assetId,
                status: {
                    $in: [
                        "Pending",
                        "In Progress",
                    ],
                },
            });

        if (existingRequest) {
            throw new Error(
                "Maintenance request already exists for this asset"
            );
        }

        const request =
            await MaintenanceRequest.create({
                asset: assetId,
                employee: req.user._id,
                issue,
            });

        res.status(201).json({
            success: true,
            request,
        });
    });


export const getMyMaintenanceRequests =
    asyncHandler(async (req, res) => {

        const requests =
            await MaintenanceRequest.find({
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

export const getAllMaintenanceRequests =
    asyncHandler(async (req, res) => {

        const requests =
            await MaintenanceRequest.find()
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

export const startRepair =
    asyncHandler(async (req, res) => {

        const request =
            await MaintenanceRequest.findById(
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

        request.status =
            "In Progress";

        asset.status =
            "maintenance";

        await request.save();
        await asset.save();

        await AssetHistory.create({
            asset: asset._id,
            employee:
                request.employee,
            action:
                "Maintenance Started",
        });

        res.status(200).json({
            success: true,
        });
    });

export const completeRepair =
    asyncHandler(async (req, res) => {

        const request =
            await MaintenanceRequest.findById(
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

        request.status =
            "Completed";

        asset.status =
            "assigned";

        await request.save();
        await asset.save();

        await AssetHistory.create({
            asset: asset._id,
            employee:
                request.employee,
            action:
                "Maintenance Completed",
        });

        res.status(200).json({
            success: true,
        });
    });