/**
 * Temporary mock course data for the visual prototype.
 * Later this will be replaced by MySQL → Express API responses.
 */
export const mockCourses = [
  {
    id: "dbms-101",
    name: "Database Management Systems",
    code: "DBMS-101",
    description:
      "Learn relational models, normalization, indexing, and how real systems store knowledge across tables and relationships.",
    color: "#5ad2ff",
    accent: "#1a6cff",
    size: 118,
    orbitRadius: 220,
    orbitSpeed: 48,
    angle: 20,
    progress: 68,
    assignments: [
      {
        id: "a1",
        title: "ER Diagram Challenge",
        dueDate: "2026-09-05",
        status: "pending",
      },
      {
        id: "a2",
        title: "Normalize a Library Schema",
        dueDate: "2026-09-18",
        status: "completed",
      },
    ],
    resources: [
      { id: "r1", title: "Relational Algebra Notes", type: "PDF", url: "#" },
      { id: "r2", title: "Indexing Walkthrough", type: "Video", url: "#" },
    ],
    projects: [
      {
        id: "p1",
        title: "Campus Library Schema",
        summary: "Design a normalized schema for a college library.",
      },
    ],
  },
  {
    id: "sql-201",
    name: "Structured Query Language",
    code: "SQL-201",
    description:
      "Master queries, joins, aggregations, and subqueries to retrieve meaning from structured data.",
    color: "#3dffe0",
    accent: "#0f9f86",
    size: 96,
    orbitRadius: 320,
    orbitSpeed: 62,
    angle: 110,
    progress: 42,
    assignments: [
      {
        id: "a3",
        title: "Multi-table Join Lab",
        dueDate: "2026-09-10",
        status: "pending",
      },
      {
        id: "a4",
        title: "Aggregation Report",
        dueDate: "2026-09-22",
        status: "pending",
      },
    ],
    resources: [
      { id: "r3", title: "SQL Cheat Sheet", type: "PDF", url: "#" },
      { id: "r4", title: "Window Functions Intro", type: "Article", url: "#" },
    ],
    projects: [
      {
        id: "p2",
        title: "Analytics Query Pack",
        summary: "Write reporting queries for a fictional e-learning platform.",
      },
    ],
  },
  {
    id: "react-301",
    name: "React Frontiers",
    code: "REACT-301",
    description:
      "Build interactive interfaces with components, state, and routing — the cockpit of modern web apps.",
    color: "#f0c75e",
    accent: "#c9851a",
    size: 110,
    orbitRadius: 280,
    orbitSpeed: 55,
    angle: 210,
    progress: 55,
    assignments: [
      {
        id: "a5",
        title: "Component Architecture Sketch",
        dueDate: "2026-09-08",
        status: "completed",
      },
      {
        id: "a6",
        title: "State & Effects Lab",
        dueDate: "2026-09-20",
        status: "pending",
      },
    ],
    resources: [
      { id: "r5", title: "Hooks Field Guide", type: "PDF", url: "#" },
      { id: "r6", title: "React Router Basics", type: "Article", url: "#" },
    ],
    projects: [
      {
        id: "p3",
        title: "Mini Learning Dashboard",
        summary: "Compose reusable UI for a student dashboard.",
      },
    ],
  },
  {
    id: "web-110",
    name: "HTML & CSS Worlds",
    code: "WEB-110",
    description:
      "Shape structure and style — semantic HTML and expressive CSS that bring interfaces to life.",
    color: "#ff7b9c",
    accent: "#c43d62",
    size: 88,
    orbitRadius: 170,
    orbitSpeed: 40,
    angle: 300,
    progress: 80,
    assignments: [
      {
        id: "a7",
        title: "Semantic Landing Page",
        dueDate: "2026-09-03",
        status: "completed",
      },
    ],
    resources: [
      { id: "r7", title: "Flex & Grid Atlas", type: "PDF", url: "#" },
    ],
    projects: [
      {
        id: "p4",
        title: "Glass UI Kit",
        summary: "Design translucent panels for a space-themed app.",
      },
    ],
  },
  {
    id: "js-220",
    name: "JavaScript Orbit",
    code: "JS-220",
    description:
      "Logic, events, and asynchronous flows — the gravity that holds interactive experiences together.",
    color: "#8b7bff",
    accent: "#5646c8",
    size: 102,
    orbitRadius: 360,
    orbitSpeed: 70,
    angle: 150,
    progress: 35,
    assignments: [
      {
        id: "a8",
        title: "Async Mission Control",
        dueDate: "2026-09-12",
        status: "pending",
      },
    ],
    resources: [
      { id: "r8", title: "ES Modules Primer", type: "Article", url: "#" },
      { id: "r9", title: "Array Methods Map", type: "PDF", url: "#" },
    ],
    projects: [
      {
        id: "p5",
        title: "Interactive Quiz Engine",
        summary: "Build quiz logic with vanilla JavaScript patterns.",
      },
    ],
  },
];
