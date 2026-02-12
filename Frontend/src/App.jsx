// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public pages
import Landing from "./Pages/Landing";
import SignIn from "./Pages/SignIn";
import LogIn from "./Pages/LogIn";

// Student layout + pages
import StudentLayout from "./student/layout/StudentLayout";
import StudentDashboard from "./student/pages/StudentDashboard";
import MyAttendance from "./student/pages/MyAttendance";
import MyGrades from "./student/pages/MyGrades";
import MyReports from "./student/pages/MyReports";

// Teacher layout + pages
import TeacherLayout from "./teacher/layout/TeacherLayout";
import TeacherDashboard from "./teacher/pages/TeacherDashboard";
import MyStudents from "./teacher/pages/MyStudents";
import TeacherAttendance from "./teacher/pages/TeacherAttendance";
import TeacherGrades from "./teacher/pages/TeacherGrades";

// Dummy student info (replace with backend later)
const student = { name: "Alex Thompson" };

// Dummy student dashboard data (replace with backend later)
const studentDashboardData = {
  stats: {
    attendancePercent: 94,
    attendanceDeltaText: "+2%",
    averageGrade: "A-",
    averageDeltaText: "Improved",
    assignmentsCount: 3,
    assignmentsBadge: "Due soon",
    schoolDays: 142,
    schoolDaysBadge: "",
  },
  recentGrades: [
    { id: 1, subject: "Mathematics", type: "Mid Term", date: "Oct 15, 2024", grade: "A (92%)" },
    { id: 2, subject: "Physics", type: "Quiz", date: "Oct 14, 2024", grade: "B+ (88%)" },
    { id: 3, subject: "English", type: "Assignment", date: "Oct 12, 2024", grade: "A- (89%)" },
    { id: 4, subject: "Chemistry", type: "Lab Report", date: "Oct 10, 2024", grade: "B (82%)" },
    { id: 5, subject: "History", type: "Essay", date: "Oct 08, 2024", grade: "A (95%)" },
  ],
  notifications: [
    { id: 1, title: "Physics Exam Scheduled", message: "Mid-term physics exam is scheduled for next Monday.", timeAgo: "2 hours ago" },
    { id: 2, title: "Report Card Available", message: "Term 1 report cards are now available for download.", timeAgo: "Yesterday" },
    { id: 3, title: "Holiday Announcement", message: "School will be closed on Friday for Teacher Training.", timeAgo: "2 days ago" },
  ],
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />

        {/* STUDENT ROUTES (same as previous, but nested) */}
        <Route path="/student" element={<StudentLayout student={student} />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route
            path="dashboard"
            element={<StudentDashboard data={studentDashboardData} />}
          />
          <Route path="attendance" element={<MyAttendance />} />
          <Route path="grades" element={<MyGrades />} />
          <Route path="reports" element={<MyReports />} />
        </Route>

        {/* TEACHER ROUTES */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="students" element={<MyStudents />} />
          <Route path="attendance" element={<TeacherAttendance />} />
          <Route path="grades" element={<TeacherGrades />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
