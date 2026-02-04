import React from "react";

/*  API Base URL from Frontend/.env (same as MyStudents.jsx) */
const API = import.meta.env.VITE_API_URL;

/* -----------------------------
  Small UI helpers
------------------------------*/
function StatusPill({ status }) {
  const isPresent = status === "Present";
  return (
    <span
      className={[
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        isPresent ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700",
      ].join(" ")}
    >
      {status}
    </span>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={[
        "relative inline-flex h-6 w-11 items-center rounded-full transition",
        checked ? "bg-emerald-500" : "bg-slate-200",
      ].join(" ")}
    >
      <span
        className={[
          "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition",
          checked ? "translate-x-5" : "translate-x-1",
        ].join(" ")}
      />
    </button>
  );
}

function Metric({ label, value, valueClass }) {
  return (
    <div className="text-center">
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className={["mt-1 text-lg font-semibold", valueClass].join(" ")}>
        {value}
      </div>
    </div>
  );
}

/* -----------------------------
  Page
------------------------------*/
export default function TeacherAttendance() {
  const token = localStorage.getItem("token");

  // IMPORTANT: these should match EXACT values saved in student.className
  // Example: in your DB you have "11A", but your dropdown currently says "Class 10-A"
  // So either:
  //  1) change your student className values to "Class 10-A"
  //  OR
  //  2) change this dropdown options to "11A", "10A", etc.
  const classes = ["Class 10-A", "Class 10-B", "Class 11-A"];

  const [selectedClass, setSelectedClass] = React.useState("Class 10-A");
  const [selectedDate, setSelectedDate] = React.useState(() => {
    // default: today (YYYY-MM-DD)
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [students, setStudents] = React.useState([]);

  // attendance state for UI (local for now)
  // key format: `${date}__${studentId}`
  const [attendance, setAttendance] = React.useState({});

  //  Load students from backend (same endpoint MyStudents.jsx uses)
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

      const list = Array.isArray(data) ? data : data.students || [];
      setStudents(list);
    } catch (e) {
      setError("Server not reachable.");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // load once
  React.useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // filter students by selectedClass
  const classStudents = React.useMemo(() => {
    return students.filter((s) => (s.className || "").trim() === selectedClass.trim());
  }, [students, selectedClass]);

  // ensure attendance keys exist for current class/date (default: Present)
  React.useEffect(() => {
    if (!classStudents.length) return;

    setAttendance((prev) => {
      const next = { ...prev };
      for (const s of classStudents) {
        const sid = s._id || s.id || s.rollNo;
        const key = `${selectedDate}__${sid}`;
        if (next[key] === undefined) next[key] = true; // default present
      }
      return next;
    });
  }, [classStudents, selectedDate]);

  const rows = React.useMemo(() => {
    return classStudents
      .map((s) => {
        const sid = s._id || s.id || s.rollNo;
        const key = `${selectedDate}__${sid}`;
        const present = attendance[key] ?? true;

        return {
          key: sid,
          rollNo: s.rollNo,
          name: s.name,
          present,
        };
      })
      // nice sorting by rollNo if numeric
      .sort((a, b) => {
        const an = Number(a.rollNo);
        const bn = Number(b.rollNo);
        if (!Number.isNaN(an) && !Number.isNaN(bn)) return an - bn;
        return String(a.rollNo).localeCompare(String(b.rollNo));
      });
  }, [classStudents, attendance, selectedDate]);

  const presentCount = rows.filter((r) => r.present).length;
  const absentCount = rows.length - presentCount;

  const markAll = (present) => {
    setAttendance((prev) => {
      const next = { ...prev };
      for (const r of rows) {
        const key = `${selectedDate}__${r.key}`;
        next[key] = present;
      }
      return next;
    });
  };

  const setOne = (rowKey, present) => {
    const key = `${selectedDate}__${rowKey}`;
    setAttendance((prev) => ({ ...prev, [key]: present }));
  };

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Attendance</h2>
        <p className="text-sm text-slate-500">Mark and manage daily attendance</p>
      </div>

      {/* Controls row */}
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
          {/* Select class */}
          <div className="lg:col-span-4">
            <label className="text-xs font-medium text-slate-500">Select Class</label>
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

            {/* optional refresh */}
            <button
              type="button"
              onClick={fetchStudents}
              className="mt-3 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            >
              Refresh Students
            </button>
          </div>

          {/* Select date */}
          <div className="lg:col-span-4">
            <label className="text-xs font-medium text-slate-500">Select Date</label>
            <div className="relative mt-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="lg:col-span-2">
            <Metric label="Present" value={presentCount} valueClass="text-emerald-600" />
          </div>
          <div className="lg:col-span-2">
            <Metric label="Absent" value={absentCount} valueClass="text-rose-600" />
          </div>

          {/* Actions */}
          <div className="lg:col-span-12 mt-2 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => markAll(true)}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
              disabled={loading || !!error}
            >
              Mark All Present
            </button>
            <button
              type="button"
              onClick={() => markAll(false)}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
              disabled={loading || !!error}
            >
              Mark All Absent
            </button>
          </div>
        </div>

        {/* Status */}
        {loading ? (
          <div className="mt-4 text-sm text-slate-600">Loading students...</div>
        ) : error ? (
          <div className="mt-4 text-sm text-rose-600">{error}</div>
        ) : null}
      </div>

      {/* Table card */}
      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        {/* Table header */}
        <div className="grid grid-cols-12 border-b border-slate-200 bg-slate-50/60 px-6 py-4 text-xs font-semibold text-slate-500">
          <div className="col-span-3">Roll No</div>
          <div className="col-span-5">Student Name</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-200">
          {!loading && !error && rows.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-slate-500">
              No students found for <span className="font-semibold">{selectedClass}</span>.
              <div className="mt-2">
                Add students in <span className="font-semibold">My Students</span> page (with the same Class value).
              </div>
            </div>
          ) : null}

          {rows.map((r) => {
            const status = r.present ? "Present" : "Absent";
            return (
              <div
                key={r.key}
                className="grid grid-cols-12 items-center px-6 py-4 hover:bg-slate-50/50"
              >
                <div className="col-span-3 text-sm text-slate-700">{r.rollNo}</div>
                <div className="col-span-5 text-sm font-medium text-slate-900">{r.name}</div>
                <div className="col-span-2">
                  <StatusPill status={status} />
                </div>
                <div className="col-span-2 flex justify-end">
                  <Toggle
                    checked={r.present}
                    onChange={(val) => setOne(r.key, val)}
                    label={`Toggle attendance for ${r.name}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}
