import * as userService from "../services/userService.js";
import { parseId, requireFields } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/errorHandler.js";

export const getUserById = asyncHandler(async (req, res) => {
  const userId = parseId(req.params.id, "user id");
  const user = await userService.findUserById(userId);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const enrollments = await userService.findEnrollmentsForUser(userId);

  res.json({
    success: true,
    data: {
      ...user,
      enrollments,
    },
  });
});

/**
 * Simple college-demo login against MySQL users table.
 * No JWT — frontend stores the safe user object in localStorage.
 */
export const login = asyncHandler(async (req, res) => {
  requireFields(req.body, ["email", "password"]);

  const email = String(req.body.email).trim().toLowerCase();
  const password = String(req.body.password);

  const user = await userService.findUserByEmailWithPassword(email);

  if (!user || user.password !== password) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  const enrollments = await userService.findEnrollmentsForUser(user.user_id);

  res.json({
    success: true,
    message: "Login successful",
    data: {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      enrollments,
    },
  });
});
