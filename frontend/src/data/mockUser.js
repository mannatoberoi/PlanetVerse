/**
 * Temporary mock user for the visual prototype.
 * Will later come from authentication + MySQL user tables.
 */
export const mockUser = {
  id: "u-001",
  name: "Nova Explorer",
  email: "nova@planetverse.edu",
  role: "Student",
  bio: "Navigating the learning universe — DBMS, SQL, React, and the web stack.",
  avatarInitials: "NE",
  enrolledCourseIds: [
    "dbms-101",
    "sql-201",
    "react-301",
    "web-110",
    "js-220",
  ],
  stats: {
    courses: 5,
    completedAssignments: 3,
    streakDays: 12,
  },
};
