import asyncHandler from "./asyncHandler.js";

export const authorize =
    (...roles) =>
        asyncHandler(
            async (
                req,
                res,
                next
            ) => {
                if (
                    !roles.includes(
                        req.user.role
                    )
                ) {
                    res.status(403);

                    throw new Error(
                        "Access denied"
                    );
                }

                next();
            }
        );