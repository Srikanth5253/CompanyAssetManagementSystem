import mongoose from "mongoose";

const assetSchema =
  new mongoose.Schema(
    {
      assetName: {
        type: String,
        required: true,
        trim: true,
      },

      assetTag: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      category: {
        type: String,
        required: true,
        trim: true,
      },

      serialNumber: {
        type: String,
        trim: true,
      },

      purchaseDate: {
        type: Date,
      },

      status: {
        type: String,
        enum: [
          "available",
          "assigned",
          "maintenance",
          "retired",
        ],
        default: "available",
      },

      assignedTo: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        default: null,
      },

      notes: {
        type: String,
        trim: true,
      },

      assignedDate: {
        type: Date,
      },

      returnedDate: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );

const Asset =
  mongoose.model(
    "Asset",
    assetSchema
  );

export default Asset;