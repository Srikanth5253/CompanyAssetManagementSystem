import bcrypt from "bcryptjs";

import User from "../models/User.js";

import asyncHandler from "../middleware/asyncHandler.js";

export const createEmployee =
    asyncHandler(
        async (req, res) => {
            const {
                name,
                email,
                password,
                employeeId,
                department,
                designation,
                phone,
            } = req.body;

            if (
                !name ||
                !email ||
                !password
            ) {
                res.status(400);

                throw new Error(
                    "Name, email and password are required"
                );
            }

            const existingUser =
                await User.findOne({
                    email,
                });

            if (existingUser) {
                res.status(400);

                throw new Error(
                    "Employee already exists"
                );
            }

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );

            const employee =
                await User.create({
                    name,
                    email,
                    password:
                        hashedPassword,

                    role: "employee",

                    employeeId,
                    department,
                    designation,
                    phone,
                });

            res.status(201).json({
                success: true,
                message:
                    "Employee created successfully",

                employee: {
                    id: employee._id,
                    name: employee.name,
                    email:
                        employee.email,
                    employeeId:
                        employee.employeeId,
                },
            });
        }
    );

export const getEmployees =
    asyncHandler(async (req, res) => {
        const employees =
            await User.find({
                role: "employee",
            }).select("-password");

        res.status(200).json({
            success: true,
            count: employees.length,
            employees,
        });
    });

export const updateEmployee =
    asyncHandler(
        async (req, res) => {
            const employee =
                await User.findById(
                    req.params.id
                );

            if (!employee) {
                res.status(404);

                throw new Error(
                    "Employee not found"
                );
            }

            employee.name =
                req.body.name ??
                employee.name;

            employee.department =
                req.body.department ??
                employee.department;

            employee.designation =
                req.body.designation ??
                employee.designation;

            employee.phone =
                req.body.phone ??
                employee.phone;

            employee.status =
                req.body.status ??
                employee.status;

            const updated =
                await employee.save();

            res.json({
                success: true,
                employee: updated,
            });
        }
    );

export const deleteEmployee =
    asyncHandler(
        async (req, res) => {
            const employee =
                await User.findById(
                    req.params.id
                );

            if (!employee) {
                res.status(404);

                throw new Error(
                    "Employee not found"
                );
            }

            await employee.deleteOne();

            res.json({
                success: true,
                message:
                    "Employee deleted successfully",
            });
        }
    );

export const getEmployeeById =
    asyncHandler(async (req, res) => {
        const employee =
            await User.findById(
                req.params.id
            ).select("-password");

        if (!employee) {
            res.status(404);

            throw new Error(
                "Employee not found"
            );
        }

        res.status(200).json({
            success: true,
            employee,
        });
    });