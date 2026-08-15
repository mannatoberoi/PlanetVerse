import { Router } from "express";
import * as resourceController from "../controllers/resourceController.js";

const router = Router();

router.delete("/:id", resourceController.deleteResource);

export default router;
