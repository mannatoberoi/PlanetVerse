import * as projectService from "../services/projectService.js";
import * as courseService from "../services/courseService.js";
import { requireFields, parseId } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/errorHandler.js";

export const getProjectsByCourse = asyncHandler(async (req, res) => {
  const courseId = parseId(req.params.courseId, "course id");
  const course = await courseService.findCourseById(courseId);
  if (!course) {
    return res.status(404).json({ success: false, message: "Course not found" });
  }

  const projects = await projectService.findProjectsByCourse(courseId);
  res.json({ success: true, data: projects });
});

export const createProject = asyncHandler(async (req, res) => {
  const courseId = parseId(req.params.courseId, "course id");
  requireFields(req.body, ["title", "description"]);

  const course = await courseService.findCourseById(courseId);
  if (!course) {
    return res.status(404).json({ success: false, message: "Course not found" });
  }

  const project = await projectService.createProject(courseId, req.body);
  res.status(201).json({ success: true, data: project });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const projectId = parseId(req.params.id, "project id");
  const deleted = await projectService.deleteProject(projectId);

  if (!deleted) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }

  res.json({ success: true, message: "Project deleted" });
});
