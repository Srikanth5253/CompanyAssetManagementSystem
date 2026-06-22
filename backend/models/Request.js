import mongoose from "mongoose";

const requestSchema =
  new mongoose.Schema(
    {
      employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      assetType: {
        type: String,
        required: true,
        trim: true,
      },

      reason: {
        type: String,
        required: true,
        trim: true,
      },

      priority: {
        type: String,
        enum: [
          "Low",
          "Medium",
          "High",
        ],
        default: "Medium",
      },

      status: {
        type: String,
        enum: [
          "Pending",
          "Approved",
          "Rejected",
        ],
        default: "Pending",
      },

      adminRemarks: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

const Request =
  mongoose.model(
    "Request",
    requestSchema
  );

export default Request;