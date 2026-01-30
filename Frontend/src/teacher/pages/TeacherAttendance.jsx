// src/teacher/pages/TeacherAttendance.jsx
import React from "react";

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
  const classes = ["Class 10-A", "Class 10-B", "Class 11-A"];

  const [selectedClass, setSelectedClass] = React.useState("Class 10-A");
  const [selectedDate, setSelectedDate] = React.useState("2026-01-29");

  // Replace with API data later
  const initialRows = React.useMemo(
    () => [
      { id: 1001, name: "Alex Thompson", present: true },
      { id: 1002, name: "Sarah Williams", present: true },
      { id: 1003, name: "Michael Brown", present: false },
      { id: 1004, name: "Emily Davis", present: true },
      { id: 1005, name: "James Wilson", present: true },
      { id: 1006, name: "Jessica Garcia", present: true },
      { id: 1007, name: "David Miller", present: true },
      { id: 1008, name: "Robert Martinez", present: false },
    ],
    []
  );

  const [rows, setRows] = React.useState(initialRows);

  React.useEffect(() => {
    // when class/date changes you would fetch new attendance data
    // for demo we keep the same dataset
    setRows(initialRows);
  }, [selectedClass, selectedDate, initialRows]);

  const presentCount = rows.filter((r) => r.present).length;
  const absentCount = rows.length - presentCount;

  const markAll = (present) => {
    setRows((prev) => prev.map((r) => ({ ...r, present })));
  };

  const setOne = (id, present) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, present } : r)));
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
                {/* calendar icon */}
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
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
            >
              Mark All Present
            </button>
            <button
              type="button"
              onClick={() => markAll(false)}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
            >
              Mark All Absent
            </button>
          </div>
        </div>
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
          {rows.map((r) => {
            const status = r.present ? "Present" : "Absent";
            return (
              <div
                key={r.id}
                className="grid grid-cols-12 items-center px-6 py-4 hover:bg-slate-50/50"
              >
                <div className="col-span-3 text-sm text-slate-700">{r.id}</div>
                <div className="col-span-5 text-sm font-medium text-slate-900">
                  {r.name}
                </div>
                <div className="col-span-2">
                  <StatusPill status={status} />
                </div>
                <div className="col-span-2 flex justify-end">
                  <Toggle
                    checked={r.present}
                    onChange={(val) => setOne(r.id, val)}
                    label={`Toggle attendance for ${r.name}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer space like screenshot */}
        <div className="h-4" />
      </div>
    </div>
  );
}
