import React, { useMemo, useState } from "react";

function GradePill({ grade }) {
  const cls =
    grade.startsWith("A")
      ? "bg-emerald-50 text-emerald-700"
      : grade.startsWith("B")
      ? "bg-sky-50 text-sky-700"
      : grade.startsWith("C")
      ? "bg-amber-50 text-amber-700"
      : "bg-rose-50 text-rose-700";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>
      {grade}
    </span>
  );
}

function ReportCardItem({ active, title, tag, date, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "w-full rounded-xl border p-4 text-left transition",
        active
          ? "border-indigo-200 bg-indigo-50"
          : "border-slate-200 bg-white hover:bg-slate-50",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
          📄
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold text-slate-900">{title}</div>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
              {tag}
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-500">{date}</div>
        </div>
      </div>
    </button>
  );
}

export default function MyReports() {
  // Example student (later fetch from auth/backend)
  const student = {
    initials: "EB",
    school: "EduBook High School",
    name: "Alex Thompson",
    rollNumber: "100",
    className: "10-A",
    attendancePercent: 94,
  };

  // Reports list (later fetch from backend)
  const reports = [
    {
      id: "term1-2024",
      title: "Term 1 Report Card",
      tag: "Academic",
      dateLabel: "Oct 2024",
      termLabel: "Academic Report Card - Term 1, 2024",
      subjects: [
        { subject: "Mathematics", marks: 92, grade: "A", remarks: "Excellent" },
        { subject: "Physics", marks: 78, grade: "B+", remarks: "Good" },
        { subject: "Chemistry", marks: 85, grade: "A", remarks: "Very good" },
        { subject: "English", marks: 89, grade: "A", remarks: "Great work" },
        { subject: "History", marks: 72, grade: "B", remarks: "Good" },
        { subject: "Computer Science", marks: 95, grade: "A+", remarks: "Outstanding" },
      ],
    },
  ];

  const [selectedId, setSelectedId] = useState(reports[0]?.id);

  const selectedReport = useMemo(
    () => reports.find((r) => r.id === selectedId),
    [reports, selectedId]
  );

  function downloadPDF() {
    // TODO: backend will generate PDF
    alert("Download PDF (connect backend later)");
  }

  function printReport() {
    window.print();
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">My Reports</h2>
          <p className="text-sm text-slate-500">
            View and download your report cards
          </p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid gap-5 xl:grid-cols-3">
        {/* Left: Available Reports */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="text-sm font-semibold text-slate-900">
            Available Reports
          </div>

          <div className="mt-4 space-y-3">
            {reports.map((r) => (
              <ReportCardItem
                key={r.id}
                active={r.id === selectedId}
                title={r.title}
                tag={r.tag}
                date={r.dateLabel}
                onClick={() => setSelectedId(r.id)}
              />
            ))}
          </div>
        </div>

        {/* Right: Report Preview */}
        <div className="xl:col-span-2 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-900">
              Report Preview
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={downloadPDF}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
              >
                Download PDF
              </button>
              <button
                onClick={printReport}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
              >
                Print
              </button>
            </div>
          </div>

          {/* Preview Paper */}
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8">
            {/* Top badge */}
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
                {student.initials}
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="text-lg font-semibold text-slate-900">
                {student.school}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                {selectedReport?.termLabel}
              </div>
            </div>

            {/* Info grid */}
            <div className="mt-8 grid grid-cols-2 gap-y-6 text-sm">
              <div>
                <div className="text-xs text-slate-500">Student Name</div>
                <div className="font-semibold text-slate-900">{student.name}</div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-500">Roll Number</div>
                <div className="font-semibold text-slate-900">{student.rollNumber}</div>
              </div>

              <div>
                <div className="text-xs text-slate-500">Class</div>
                <div className="font-semibold text-slate-900">{student.className}</div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-500">Attendance</div>
                <div className="font-semibold text-emerald-700">
                  {student.attendancePercent}%
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="mt-8">
              <div className="grid grid-cols-4 border-b pb-2 text-xs font-medium text-slate-500">
                <div>Subject</div>
                <div className="text-center">Marks</div>
                <div className="text-center">Grade</div>
                <div className="text-right">Remarks</div>
              </div>

              <div className="mt-2 space-y-3">
                {selectedReport?.subjects?.map((s, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-4 items-center text-sm"
                  >
                    <div className="font-medium text-slate-900">{s.subject}</div>
                    <div className="text-center text-slate-700">{s.marks}</div>
                    <div className="flex justify-center">
                      <GradePill grade={s.grade} />
                    </div>
                    <div className="text-right text-slate-600">{s.remarks}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature area */}
            <div className="mt-12 grid grid-cols-2 text-center text-xs text-slate-500">
              <div className="pt-6">Class Teacher</div>
              <div className="pt-6">Principal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
