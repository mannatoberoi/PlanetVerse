import { Router } from "express";
import * as userController from "../controllers/userController.js";

const router = Router();

// Declare /login before /:id so "login" is not parsed as an id
router.post("/login", userController.login);
router.get("/:id", userController.getUserById);

export default router;
