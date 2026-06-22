import mongoose from "mongoose";

const returnRequestSchema =
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

      status: {
        type: String,
        enum: [
          "Pending",
          "Approved",
          "Rejected",
        ],
        default: "Pending",
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

export default mongoose.model(
  "ReturnRequest",
  returnRequestSchema
);