import React, { useEffect, useMemo, useState } from "react";

/**
 * Expected backend API (you will implement in Node):
 * GET  /api/attendance?studentId=123&month=2026-01  -> returns events for that month
 * POST /api/attendance/mark (teacher) { studentId, date: "2026-01-03", status: "present"|"absent"|"holiday" }
 *
 * Data shape returned by GET:
 * {
 *   month: "2026-01",
 *   events: [
 *     { date: "2026-01-02", status: "present" },
 *     { date: "2026-01-03", status: "absent" },
 *     { date: "2026-01-09", status: "holiday" }
 *   ]
 * }
 */

function cls(...a) {
  return a.filter(Boolean).join(" ");
}

function getMonthInfo(year, monthIndex) {
  // monthIndex: 0-11
  const first = new Date(year, monthIndex, 1);
  const last = new Date(year, monthIndex + 1, 0);

  // calendar grid starts Sunday
  const startDay = first.getDay(); // 0..6
  const daysInMonth = last.getDate();

  return { first, last, startDay, daysInMonth };
}

function formatMonthTitle(year, monthIndex) {
  return new Date(year, monthIndex, 1).toLocaleString(undefined, {
    month: "long",
    year: "numeric",
  });
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function toISODate(year, monthIndex, day) {
  return `${year}-${pad2(monthIndex + 1)}-${pad2(day)}`;
}

function StatusDot({ status }) {
  const dot =
    status === "present"
      ? "bg-emerald-500"
      : status === "absent"
      ? "bg-rose-500"
      : "bg-slate-300";

  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${dot}`} />;
}

export default function MyAttendance() {
  // example student id (replace from auth/user context)
  const studentId = "student-001";

  // current month view
  const today = new Date();
  const [year, setYear] = useState(2026); // match your image
  const [monthIndex, setMonthIndex] = useState(0); // Jan = 0

  // events from backend (google calendar)
  // map: { "YYYY-MM-DD": "present"|"absent"|"holiday" }
  const [statusByDate, setStatusByDate] = useState({});
  const [loading, setLoading] = useState(false);

  // load attendance for month (from backend which reads google calendar)
  async function fetchAttendance() {
    setLoading(true);
    try {
      const month = `${year}-${pad2(monthIndex + 1)}`;
      const res = await fetch(
        `http://localhost:5000/api/attendance?studentId=${studentId}&month=${month}`
      );
      const json = await res.json();

      const map = {};
      (json.events || []).forEach((e) => {
        map[e.date] = e.status;
      });
      setStatusByDate(map);
    } catch (e) {
      console.error(e);
      // fallback: keep empty
      setStatusByDate({});
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAttendance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, monthIndex]);

  const { startDay, daysInMonth } = useMemo(
    () => getMonthInfo(year, monthIndex),
    [year, monthIndex]
  );

  // compute present/absent from events
  const stats = useMemo(() => {
    let present = 0;
    let absent = 0;

    // consider only days that have present/absent in this month
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = toISODate(year, monthIndex, d);
      const s = statusByDate[iso];
      if (s === "present") present++;
      if (s === "absent") absent++;
    }

    const totalMarked = present + absent;
    const percent = totalMarked === 0 ? 0 : Math.round((present / totalMarked) * 100);

    return { present, absent, totalMarked, percent };
  }, [statusByDate, year, monthIndex, daysInMonth]);

  function prevMonth() {
    const m = monthIndex - 1;
    if (m < 0) {
      setMonthIndex(11);
      setYear((y) => y - 1);
    } else {
      setMonthIndex(m);
    }
  }

  function nextMonth() {
    const m = monthIndex + 1;
    if (m > 11) {
      setMonthIndex(0);
      setYear((y) => y + 1);
    } else {
      setMonthIndex(m);
    }
  }

  // optional: click day to view status (Student view is read-only)
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">My Attendance</h2>
          <p className="text-sm text-slate-500">Track your daily attendance record</p>
          {loading && <p className="mt-1 text-xs text-slate-400">Loading from Google Calendar…</p>}
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {/* Left stats card */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          {/* circle */}
          <div className="flex items-center justify-center py-4">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-slate-300">
              <div className="text-center">
                <div className="text-3xl font-semibold text-slate-900">
                  {stats.percent}%
                </div>
                <div className="text-xs text-slate-500">Attendance</div>
              </div>
            </div>
          </div>

          {/* present/absent boxes */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-emerald-50 p-4 text-center">
              <div className="text-2xl font-semibold text-emerald-700">
                {stats.present}
              </div>
              <div className="mt-1 text-xs font-medium text-emerald-700">
                Days Present
              </div>
            </div>

            <div className="rounded-xl bg-rose-50 p-4 text-center">
              <div className="text-2xl font-semibold text-rose-700">
                {stats.absent}
              </div>
              <div className="mt-1 text-xs font-medium text-rose-700">
                Days Absent
              </div>
            </div>
          </div>

          {/* legend */}
          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-900">Legend</div>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <StatusDot status="present" />
                <span>Present</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusDot status="absent" />
                <span>Absent</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusDot status="holiday" />
                <span>Holiday / Weekend</span>
              </div>
            </div>
          </div>

          {/* optional selected day info */}
          {selectedDate && (
            <div className="mt-4 text-sm text-slate-600">
              <span className="font-medium text-slate-900">Selected: </span>
              {selectedDate} —{" "}
              <span className="font-semibold">
                {statusByDate[selectedDate] || "No record"}
              </span>
            </div>
          )}
        </div>

        {/* Right calendar */}
        <div className="xl:col-span-2 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-900">
              {formatMonthTitle(year, monthIndex)}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevMonth}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
              >
                ‹
              </button>
              <button
                onClick={nextMonth}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
              >
                ›
              </button>
            </div>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-500">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="py-2">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar cells */}
          <div className="mt-2 grid grid-cols-7 gap-2">
            {/* Empty slots before first day */}
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-20 rounded-xl bg-slate-50" />
            ))}

            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const iso = toISODate(year, monthIndex, day);
              const s = statusByDate[iso];

              const box =
                s === "present"
                  ? "bg-emerald-50"
                  : s === "absent"
                  ? "bg-rose-50"
                  : s === "holiday"
                  ? "bg-slate-50"
                  : "bg-white";

              const label =
                s === "present"
                  ? "Present"
                  : s === "absent"
                  ? "Absent"
                  : s === "holiday"
                  ? "Holiday"
                  : "";

              const labelColor =
                s === "present"
                  ? "text-emerald-600"
                  : s === "absent"
                  ? "text-rose-600"
                  : "text-slate-400";

              return (
                <button
                  key={iso}
                  onClick={() => setSelectedDate(iso)}
                  className={cls(
                    "h-20 rounded-xl border border-slate-200 p-3 text-left hover:bg-slate-50",
                    box
                  )}
                >
                  <div className="text-sm font-semibold text-slate-900">
                    {day}
                  </div>
                  {label ? (
                    <div className={cls("mt-6 text-[11px] font-medium", labelColor)}>
                      {label}
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
