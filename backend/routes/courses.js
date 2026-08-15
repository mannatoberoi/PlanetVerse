import { Router } from "express";
import * as courseController from "../controllers/courseController.js";
import * as assignmentController from "../controllers/assignmentController.js";
import * as resourceController from "../controllers/resourceController.js";
import * as projectController from "../controllers/projectController.js";

const router = Router();

router.get("/", courseController.getCourses);
router.get("/:id", courseController.getCourseById);
router.post("/", courseController.createCourse);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

router.get("/:courseId/assignments", assignmentController.getAssignmentsByCourse);
router.post("/:courseId/assignments", assignmentController.createAssignment);

router.get("/:courseId/resources", resourceController.getResourcesByCourse);
router.post("/:courseId/resources", resourceController.createResource);

router.get("/:courseId/projects", projectController.getProjectsByCourse);
router.post("/:courseId/projects", projectController.createProject);

export default router;
