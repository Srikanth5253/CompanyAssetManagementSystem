import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js"
import Asset from "../models/Asset.js";
import AssetHistory from "../models/AssetHistory.js";
import Request from "../models/Request.js";


export const createAsset =
  asyncHandler(
    async (req, res) => {
      const {
        assetName,
        assetTag,
        category,
        serialNumber,
        purchaseDate,
        notes,
      } = req.body;

      const assetExists =
        await Asset.findOne({
          assetTag,
        });

      if (assetExists) {
        res.status(400);

        throw new Error(
          "Asset tag already exists"
        );
      }

      const asset =
        await Asset.create({
          assetName,
          assetTag,
          category,
          serialNumber,
          purchaseDate,
          notes,
        });

      res.status(201).json({
        success: true,
        asset,
      });
    }
  );

export const getAssets =
  asyncHandler(
    async (req, res) => {
      const assets =
        await Asset.find()
          .populate(
            "assignedTo",
            "employeeId name department"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        count: assets.length,
        assets,
      });
    }
  );

export const updateAsset =
  asyncHandler(
    async (req, res) => {
      const asset =
        await Asset.findById(
          req.params.id
        );

      if (!asset) {
        res.status(404);
        throw new Error(
          "Asset not found"
        );
      }

      asset.assetName =
        req.body.assetName ??
        asset.assetName;

      asset.assetTag =
        req.body.assetTag ??
        asset.assetTag;

      asset.category =
        req.body.category ??
        asset.category;

      asset.serialNumber =
        req.body.serialNumber ??
        asset.serialNumber;

      asset.purchaseDate =
        req.body.purchaseDate ??
        asset.purchaseDate;

      asset.notes =
        req.body.notes ??
        asset.notes;

      asset.status =
        req.body.status ??
        asset.status;

      const updatedAsset =
        await asset.save();

      res.status(200).json({
        success: true,
        asset: updatedAsset,
      });
    }
  );

export const deleteAsset =
  asyncHandler(
    async (req, res) => {
      const asset =
        await Asset.findById(
          req.params.id
        );

      if (!asset) {
        res.status(404);

        throw new Error(
          "Asset not found"
        );
      }

      await asset.deleteOne();

      res.status(200).json({
        success: true,
        message:
          "Asset deleted successfully",
      });
    }
  );

export const assignAsset =
  asyncHandler(async (req, res) => {

    const { employeeId } = req.body;

    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      res.status(404);
      throw new Error("Asset not found");
    }

    const approvedRequest = await Request.findOne({
      employee: employeeId,
      status: "Approved",
      assetType: asset.category,
    });

    if (!approvedRequest) {
      res.status(400);
      throw new Error(
        `Employee does not have an approved ${asset.category} request`
      );
    }

    const employee = await User.findById(employeeId);

    if (!employee) {
      res.status(404);
      throw new Error("Employee not found");
    }

    if (asset.status === "assigned") {
      res.status(400);
      throw new Error("Asset is already assigned");
    }

    asset.assignedTo = employeeId;
    asset.assignedDate = new Date();
    asset.returnedDate = null;
    asset.status = "assigned";

    await asset.save();

    approvedRequest.status = "Completed";
    await approvedRequest.save();

    await AssetHistory.create({
      asset: asset._id,
      employee: employee._id,
      action: "Assigned",
    });

    const updatedAsset = await Asset.findById(asset._id).populate(
      "assignedTo",
      "employeeId name department"
    );

    res.status(200).json({
      success: true,
      asset: updatedAsset,
    });
  });

export const getMyAssets =
  asyncHandler(async (req, res) => {
    const assets = await Asset.find({
      assignedTo: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: assets.length,
      assets,
    });
  });

export const retireAsset =
  asyncHandler(async (req, res) => {

    const asset =
      await Asset.findById(
        req.params.id
      );

    if (!asset) {
      throw new Error(
        "Asset not found"
      );
    }

    if (
      asset.status === "retired"
    ) {
      throw new Error(
        "Asset is already retired"
      );
    }

    asset.status =
      "retired";

    asset.assignedTo =
      null;

    await asset.save();

    await AssetHistory.create({
      asset: asset._id,
      employee:
        req.user._id,
      action: "Retired",
      remarks:
        req.body.reason || "",
    });

    res.status(200).json({
      success: true,
      message:
        "Asset retired successfully",
    });

  });

// export const returnAsset =
//   asyncHandler(
//     async (req, res) => {
//       const asset =
//         await Asset.findById(
//           req.params.id
//         );

//       if (!asset) {
//         res.status(404);

//         throw new Error(
//           "Asset not found"
//         );
//       }

//       asset.returnedDate =
//         new Date();

//       const employeeId = asset.assignedTo;
//       asset.assignedTo = null;

//       asset.status =
//         "available";

//       await asset.save();
//       await AssetHistory.create({
//         asset: asset._id,
//         employee: employeeId,
//         action: "Returned",
//       });

//       res.status(200).json({
//         success: true,
//         message:
//           "Asset returned successfully",
//         asset,
//       });
//     }
//   );
