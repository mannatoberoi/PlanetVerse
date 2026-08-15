import * as courseService from "../services/courseService.js";
import { requireFields, parseId } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/errorHandler.js";

export const getCourses = asyncHandler(async (req, res) => {
  const courses = await courseService.findAllCourses();
  res.json({ success: true, data: courses });
});

export const getCourseById = asyncHandler(async (req, res) => {
  const courseId = parseId(req.params.id, "course id");
  const course = await courseService.findCourseById(courseId);

  if (!course) {
    return res.status(404).json({ success: false, message: "Course not found" });
  }

  res.json({ success: true, data: course });
});

export const createCourse = asyncHandler(async (req, res) => {
  requireFields(req.body, [
    "course_name",
    "course_code",
    "description",
    "planet_type",
    "planet_color",
  ]);

  try {
    const course = await courseService.createCourse(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      err.status = 409;
      err.message = "Course code already exists";
    }
    throw err;
  }
});

export const updateCourse = asyncHandler(async (req, res) => {
  const courseId = parseId(req.params.id, "course id");
  requireFields(req.body, [
    "course_name",
    "course_code",
    "description",
    "planet_type",
    "planet_color",
  ]);

  const existing = await courseService.findCourseById(courseId);
  if (!existing) {
    return res.status(404).json({ success: false, message: "Course not found" });
  }

  try {
    const course = await courseService.updateCourse(courseId, req.body);
    res.json({ success: true, data: course });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      err.status = 409;
      err.message = "Course code already exists";
    }
    throw err;
  }
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const courseId = parseId(req.params.id, "course id");
  const deleted = await courseService.deleteCourse(courseId);

  if (!deleted) {
    return res.status(404).json({ success: false, message: "Course not found" });
  }

  res.json({ success: true, message: "Course deleted" });
});
