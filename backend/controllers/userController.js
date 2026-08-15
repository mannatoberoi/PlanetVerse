import * as userService from "../services/userService.js";
import { parseId } from "../middleware/validate.js";
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
