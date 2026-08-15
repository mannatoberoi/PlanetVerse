import * as assignmentService from "../services/assignmentService.js";
import * as courseService from "../services/courseService.js";
import { requireFields, parseId } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/errorHandler.js";

export const getAssignmentsByCourse = asyncHandler(async (req, res) => {
  const courseId = parseId(req.params.courseId, "course id");
  const course = await courseService.findCourseById(courseId);
  if (!course) {
    return res.status(404).json({ success: false, message: "Course not found" });
  }

  const assignments = await assignmentService.findAssignmentsByCourse(courseId);
  res.json({ success: true, data: assignments });
});

export const createAssignment = asyncHandler(async (req, res) => {
  const courseId = parseId(req.params.courseId, "course id");
  requireFields(req.body, ["title", "description", "deadline"]);

  const course = await courseService.findCourseById(courseId);
  if (!course) {
    return res.status(404).json({ success: false, message: "Course not found" });
  }

  const assignment = await assignmentService.createAssignment(courseId, req.body);
  res.status(201).json({ success: true, data: assignment });
});

export const updateAssignment = asyncHandler(async (req, res) => {
  const assignmentId = parseId(req.params.id, "assignment id");
  requireFields(req.body, ["title", "description", "deadline", "status"]);

  const existing = await assignmentService.findAssignmentById(assignmentId);
  if (!existing) {
    return res
      .status(404)
      .json({ success: false, message: "Assignment not found" });
  }

  const assignment = await assignmentService.updateAssignment(
    assignmentId,
    req.body
  );
  res.json({ success: true, data: assignment });
});

export const deleteAssignment = asyncHandler(async (req, res) => {
  const assignmentId = parseId(req.params.id, "assignment id");
  const deleted = await assignmentService.deleteAssignment(assignmentId);

  if (!deleted) {
    return res
      .status(404)
      .json({ success: false, message: "Assignment not found" });
  }

  res.json({ success: true, message: "Assignment deleted" });
});
