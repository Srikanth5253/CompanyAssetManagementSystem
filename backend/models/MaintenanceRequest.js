import mongoose from "mongoose";

const maintenanceRequestSchema =
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

      issue: {
        type: String,
        required: true,
        trim: true,
      },

      status: {
        type: String,
        enum: [
          "Pending",
          "In Progress",
          "Completed",
        ],
        default: "Pending",
      },

      cost: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "MaintenanceRequest",
  maintenanceRequestSchema
);