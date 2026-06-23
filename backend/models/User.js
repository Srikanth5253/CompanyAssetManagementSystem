import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      password: {
        type: String,
        required: true,
      },

      role: {
        type: String,

        enum: [
          "admin",
          "employee",
        ],

        default: "employee",
      },
      employeeId: {
        type: String,
        unique: true,
        sparse: true,
      },

      department: {
        type: String,
        trim: true,
      },

      designation: {
        type: String,
        trim: true,
      },

      phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        trim: true,
        match: [
          /^[6-9]\d{9}$/,
          "Phone number must be a valid 10-digit Indian mobile number",
        ],
      },

      status: {
        type: String,
        enum: [
          "active",
          "inactive",
        ],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

const User =
  mongoose.model(
    "User",
    userSchema
  );

export default User;