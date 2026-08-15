import { Router } from "express";
import * as assignmentController from "../controllers/assignmentController.js";

const router = Router();

router.put("/:id", assignmentController.updateAssignment);
router.delete("/:id", assignmentController.deleteAssignment);

export default router;
