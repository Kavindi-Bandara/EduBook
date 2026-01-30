// src/teacher/pages/TeacherGrades.jsx
import React from "react";

/* -----------------------------
  Helpers
------------------------------*/
function GradePill({ grade }) {
  const cls =
    grade === "A+"
      ? "bg-emerald-100 text-emerald-700"
      : grade === "A"
      ? "bg-emerald-100 text-emerald-700"
      : grade === "B"
      ? "bg-indigo-100 text-indigo-700"
      : grade === "C"
      ? "bg-amber-100 text-amber-700"
      : "bg-rose-100 text-rose-700";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>
      {grade}
    </span>
  );
}

function calcGrade(mark) {
  if (mark >= 90) return "A+";
  if (mark >= 80) return "A";
  if (mark >= 70) return "B";
  if (mark >= 60) return "C";
  return "D";
}

function clamp100(n) {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

export default function TeacherGrades() {
  const classes = ["Class 10-A", "Class 10-B", "Class 11-A"];
  const subjects = ["Mathematics", "Physics", "English", "Chemistry", "History"];
  const examTypes = ["Mid Term Examination", "Final Examination", "Quiz", "Assignment"];

  const [selectedClass, setSelectedClass] = React.useState("Class 10-A");
  const [selectedSubject, setSelectedSubject] = React.useState("Mathematics");
  const [selectedExamType, setSelectedExamType] = React.useState("Mid Term Examination");

  // Replace with API data later
  const initial = React.useMemo(
    () => [
      { id: 1001, name: "Alex Thompson", marks: 85 },
      { id: 1002, name: "Sarah Williams", marks: 92 },
      { id: 1003, name: "Michael Brown", marks: 68 },
      { id: 1004, name: "Emily Davis", marks: 74 },
      { id: 1005, name: "James Wilson", marks: 88 },
      { id: 1006, name: "Jessica Garcia", marks: 95 },
    ],
    []
  );

  const [rows, setRows] = React.useState(initial);

  React.useEffect(() => {
    // In real app: fetch marks based on class/subject/examType.
    // Demo: reset same data when filters change.
    setRows(initial);
  }, [selectedClass, selectedSubject, selectedExamType, initial]);

  const updateMarks = (id, val) => {
    const num = clamp100(parseInt(val || "0", 10));
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, marks: num } : r)));
  };

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Grade Management</h2>
        <p className="text-sm text-slate-500">Enter and manage student marks</p>
      </div>

      {/* Filters Card */}
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Class */}
          <div>
            <label className="text-xs font-medium text-slate-500">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              {classes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="text-xs font-medium text-slate-500">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Exam Type */}
          <div>
            <label className="text-xs font-medium text-slate-500">Exam Type</label>
            <select
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              {examTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        {/* header */}
        <div className="grid grid-cols-12 border-b border-slate-200 bg-slate-50/60 px-6 py-4 text-xs font-semibold text-slate-500">
          <div className="col-span-2">Roll No</div>
          <div className="col-span-4">Student Name</div>
          <div className="col-span-2">Marks (100)</div>
          <div className="col-span-2">Grade</div>
          <div className="col-span-2">Percentage</div>
        </div>

        {/* rows */}
        <div className="divide-y divide-slate-200">
          {rows.map((r) => {
            const grade = calcGrade(r.marks);
            const percentage = `${r.marks.toFixed(1)}%`;

            return (
              <div
                key={r.id}
                className="grid grid-cols-12 items-center px-6 py-4 hover:bg-slate-50/50"
              >
                <div className="col-span-2 text-sm text-slate-700">{r.id}</div>
                <div className="col-span-4 text-sm font-medium text-slate-900">
                  {r.name}
                </div>

                <div className="col-span-2">
                  <input
                    value={r.marks}
                    onChange={(e) => updateMarks(r.id, e.target.value)}
                    inputMode="numeric"
                    className="w-20 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <div className="col-span-2">
                  <GradePill grade={grade} />
                </div>

                <div className="col-span-2 text-sm text-slate-600">{percentage}</div>
              </div>
            );
          })}
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}
