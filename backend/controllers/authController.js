import bcrypt from "bcryptjs";

import User from "../models/User.js";

import asyncHandler from "../middleware/asyncHandler.js";

import generateToken from "../utils/generateToken.js";

export const register =
    asyncHandler(
        async (req, res) => {
            const {
                name,
                email,
                password,
                role,
            } = req.body;

            if (
                !name ||
                !email ||
                !password
            ) {
                res.status(400);
                throw new Error(
                    "All fields are required"
                );
            }

            const userExists =
                await User.findOne({
                    email,
                });

            if (userExists) {
                res.status(400);
                throw new Error(
                    "User already exists"
                );
            }

            const salt =
                await bcrypt.genSalt(10);

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    salt
                );

            const user =
                await User.create({
                    name,
                    email,
                    password:
                        hashedPassword,
                    role:
                        role ||
                        "employee",
                });

            res.status(201).json({
                success: true,
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token:
                    generateToken(
                        user._id
                    ),
            });
        }
    );


export const login =
    asyncHandler(
        async (req, res) => {
            const {
                email,
                password,
            } = req.body;

            const user =
                await User.findOne({
                    email,
                });

            if (
                user &&
                (await bcrypt.compare(
                    password,
                    user.password
                ))
            ) {
                res.json({
                    success: true,
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    employeeId: user.employeeId,
                    department: user.department,
                    designation: user.designation,
                    phone: user.phone,
                    token:
                        generateToken(
                            user._id
                        ),
                });
            } else {
                res.status(401);

                throw new Error(
                    "Invalid credentials"
                );
            }
        }
    );


export const changePassword =
    asyncHandler(
        async (req, res) => {
            const {
                currentPassword,
                newPassword,
            } = req.body;

            const user =
                await User.findById(
                    req.user._id
                );

            const isMatch =
                await bcrypt.compare(
                    currentPassword,
                    user.password
                );

            if (!isMatch) {
                res.status(400);

                throw new Error(
                    "Current password is incorrect"
                );
            }

            const salt =
                await bcrypt.genSalt(10);

            user.password =
                await bcrypt.hash(
                    newPassword,
                    salt
                );

            await user.save();

            res.status(200).json({
                success: true,
                message:
                    "Password updated successfully",
            });
        }
    );