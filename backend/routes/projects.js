import { Router } from "express";
import * as projectController from "../controllers/projectController.js";

const router = Router();

router.delete("/:id", projectController.deleteProject);

export default router;
