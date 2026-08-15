import * as resourceService from "../services/resourceService.js";
import * as courseService from "../services/courseService.js";
import { requireFields, parseId } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/errorHandler.js";

export const getResourcesByCourse = asyncHandler(async (req, res) => {
  const courseId = parseId(req.params.courseId, "course id");
  const course = await courseService.findCourseById(courseId);
  if (!course) {
    return res.status(404).json({ success: false, message: "Course not found" });
  }

  const resources = await resourceService.findResourcesByCourse(courseId);
  res.json({ success: true, data: resources });
});

export const createResource = asyncHandler(async (req, res) => {
  const courseId = parseId(req.params.courseId, "course id");
  requireFields(req.body, [
    "title",
    "description",
    "resource_url",
    "resource_type",
  ]);

  const course = await courseService.findCourseById(courseId);
  if (!course) {
    return res.status(404).json({ success: false, message: "Course not found" });
  }

  const resource = await resourceService.createResource(courseId, req.body);
  res.status(201).json({ success: true, data: resource });
});

export const deleteResource = asyncHandler(async (req, res) => {
  const resourceId = parseId(req.params.id, "resource id");
  const deleted = await resourceService.deleteResource(resourceId);

  if (!deleted) {
    return res.status(404).json({ success: false, message: "Resource not found" });
  }

  res.json({ success: true, message: "Resource deleted" });
});
