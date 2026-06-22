import mongoose from "mongoose";

const assetHistorySchema =
  new mongoose.Schema(
    {
      asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
        required: true,
      },

      employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      action: {
        type: String,
        enum: [
          "Assigned",
          "Returned",
          "Maintenance Started",
          "Maintenance Completed",
          "Retired",
        ],
        required: true,
      },

      remarks: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

const AssetHistory =
  mongoose.model(
    "AssetHistory",
    assetHistorySchema
  );

export default AssetHistory;