import User from "../models/user.js";
import jwt from "jsonwebtoken";

//Middleware to check if the User is authenticated
export const protect = async (req, res, next) => {
  console.log("[authMiddleware] Incoming request:", {
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    auth: req.auth,
  });

  // Add early return if req.auth is undefined
  if (!req.auth) {
    console.warn("[authMiddleware] req.auth is undefined");
    return res
      .status(401)
      .json({ success: false, message: "Authentication required" });
  }

  const userId = req.auth.userId;
  if (!userId) {
    console.warn("[authMiddleware] No userId found in req.auth");
    return res
      .status(401)
      .json({ success: false, message: "not authenticated" });
  } else {
    try {
      const user = await User.findById(userId);
      if (!user) {
        console.warn(`[authMiddleware] No user found for userId: ${userId}`);
      } else {
        console.log(
          `[authMiddleware] Authenticated user: ${user.email || user._id}`
        );
      }
      req.user = user;
      next();
    } catch (error) {
      console.error("[authMiddleware] Error fetching user:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
};
