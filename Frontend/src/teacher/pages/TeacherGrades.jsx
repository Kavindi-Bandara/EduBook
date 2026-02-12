import React from "react";

/*  API Base URL from Frontend/.env */
const API = import.meta.env.VITE_API_URL;

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

function uniqSorted(arr) {
  return Array.from(new Set(arr.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );
}

export default function TeacherGrades() {
  const token = localStorage.getItem("token");

  const subjects = ["Mathematics", "Physics", "English", "Chemistry", "History"];
  const examTypes = ["Mid Term Examination", "Final Examination", "Quiz", "Assignment"];

  const [students, setStudents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const [selectedClass, setSelectedClass] = React.useState("");
  const [selectedSubject, setSelectedSubject] = React.useState("Mathematics");
  const [selectedExamType, setSelectedExamType] = React.useState("Mid Term Examination");

  const [rows, setRows] = React.useState([]);

  // LocalStorage key per class+subject+examType
  const storageKey = React.useMemo(() => {
    const c = selectedClass || "NO_CLASS";
    return `edubook_grades:${c}:${selectedSubject}:${selectedExamType}`;
  }, [selectedClass, selectedSubject, selectedExamType]);

  //  Load students from backend (NO hardcode)
  const fetchStudents = React.useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/records`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to load students");
        setStudents([]);
        return;
      }

      setStudents(Array.isArray(data) ? data : data.students || []);
    } catch (err) {
      setError("Server not reachable.");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  React.useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  //  Build class list from students (auto)
  const classes = React.useMemo(() => {
    return uniqSorted(students.map((s) => s.className));
  }, [students]);

  //  If selectedClass empty or removed, auto-select first available class
  React.useEffect(() => {
    if (!selectedClass && classes.length > 0) {
      setSelectedClass(classes[0]);
    }
    if (selectedClass && classes.length > 0 && !classes.includes(selectedClass)) {
      setSelectedClass(classes[0]);
    }
  }, [classes, selectedClass]);

  //  Filter students by class
  const classStudents = React.useMemo(() => {
    if (!selectedClass) return [];
    return students
      .filter((s) => s.className === selectedClass)
      .sort((a, b) => String(a.rollNo || "").localeCompare(String(b.rollNo || "")));
  }, [students, selectedClass]);

  //  Load saved marks from localStorage + build rows whenever filters/classStudents change
  React.useEffect(() => {
    if (!selectedClass) {
      setRows([]);
      return;
    }

    let saved = {};
    try {
      saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      saved = {};
    }

    const nextRows = classStudents.map((s) => {
      const id = s._id || s.id; // stable id from backend
      const savedMarks = saved?.[id];

      return {
        id,
        rollNo: s.rollNo,
        name: s.name,
        marks: clamp100(parseInt(savedMarks ?? 0, 10)),
      };
    });

    setRows(nextRows);
  }, [classStudents, storageKey, selectedClass]);

  //  Update marks + save to localStorage
  const updateMarks = (id, val) => {
    const num = clamp100(parseInt(val || "0", 10));

    setRows((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, marks: num } : r));

      // save all marks for this filter set
      const toSave = {};
      updated.forEach((r) => {
        toSave[r.id] = r.marks;
      });
      localStorage.setItem(storageKey, JSON.stringify(toSave));

      return updated;
    });
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
        <div className="grid gap-4 md:grid-cols-3 md:items-end">
          {/* Class */}
          <div>
            <label className="text-xs font-medium text-slate-500">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              disabled={classes.length === 0}
            >
              {classes.length === 0 ? (
                <option value="">No classes</option>
              ) : (
                classes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))
              )}
            </select>

            <button
              type="button"
              onClick={fetchStudents}
              className="mt-3 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            >
              Refresh Students
            </button>
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

        {/* Status */}
        {loading ? (
          <div className="mt-4 text-sm text-slate-600">Loading students...</div>
        ) : error ? (
          <div className="mt-4 text-sm text-red-600">{error}</div>
        ) : null}
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

        {/* empty state */}
        {!loading && rows.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-slate-500">
            {selectedClass
              ? "No students found for this class."
              : "Please select a class."}
          </div>
        ) : null}

        {/* rows */}
        <div className="divide-y divide-slate-200">
          {rows.map((r) => {
            const grade = calcGrade(r.marks);
            const percentage = `${Number(r.marks).toFixed(1)}%`;

            return (
              <div
                key={r.id}
                className="grid grid-cols-12 items-center px-6 py-4 hover:bg-slate-50/50"
              >
                <div className="col-span-2 text-sm text-slate-700">{r.rollNo}</div>
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


