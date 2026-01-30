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

export default function MyGrades() {
  // Terms (you can later fetch these from backend)
  const terms = [
    "Term 1 - Fall 2024",
    "Term 2 - Spring 2025",
    "Term 3 - Fall 2025",
  ];

  // Selected term
  const [term, setTerm] = useState(terms[0]);

  // Search text
  const [query, setQuery] = useState("");

  // Example grades data (replace with API response later)
  const grades = [
    {
      id: 1,
      subject: "Mathematics",
      examType: "Mid Term",
      date: "Oct 15, 2024",
      marks: "92/100",
      grade: "A",
      remarks: "Excellent performance",
      term: "Term 1 - Fall 2024",
    },
    {
      id: 2,
      subject: "Physics",
      examType: "Mid Term",
      date: "Oct 14, 2024",
      marks: "78/100",
      grade: "B+",
      remarks: "Good understanding of concepts",
      term: "Term 1 - Fall 2024",
    },
    {
      id: 3,
      subject: "Chemistry",
      examType: "Mid Term",
      date: "Oct 12, 2024",
      marks: "85/100",
      grade: "A",
      remarks: "Very good work",
      term: "Term 1 - Fall 2024",
    },
    {
      id: 4,
      subject: "English",
      examType: "Mid Term",
      date: "Oct 10, 2024",
      marks: "89/100",
      grade: "A",
      remarks: "Great essay writing",
      term: "Term 1 - Fall 2024",
    },
    {
      id: 5,
      subject: "History",
      examType: "Mid Term",
      date: "Oct 08, 2024",
      marks: "72/100",
      grade: "B",
      remarks: "Needs improvement in timelines",
      term: "Term 1 - Fall 2024",
    },
    {
      id: 6,
      subject: "Computer Science",
      examType: "Mid Term",
      date: "Oct 06, 2024",
      marks: "95/100",
      grade: "A+",
      remarks: "Outstanding project",
      term: "Term 1 - Fall 2024",
    },
  ];

  // Filter by term + query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return grades
      .filter((g) => g.term === term)
      .filter((g) => {
        if (!q) return true;
        return (
          g.subject.toLowerCase().includes(q) ||
          g.examType.toLowerCase().includes(q) ||
          g.grade.toLowerCase().includes(q) ||
          g.remarks.toLowerCase().includes(q)
        );
      });
  }, [grades, term, query]);

  // GPA (simple example: you can compute from backend)
  const gpa = 3.8;

  function handleDownload() {
    // TODO: connect to backend to download PDF transcript
    alert("Download Transcript (connect backend later)");
  }

  return (
    <div className="space-y-5">
      {/* Header Row: Title + Download */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">My Grades</h2>
          <p className="text-sm text-slate-500">
            View your academic performance
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
        >
          Download Transcript
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-xl">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      {/* Term row + GPA */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          >
            {terms.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* GPA card */}
        <div className="rounded-2xl bg-white px-6 py-4 shadow-sm ring-1 ring-slate-200">
          <div className="text-xs font-medium text-slate-500">GPA</div>
          <div className="mt-1 text-2xl font-semibold text-indigo-600">
            {gpa.toFixed(1)}
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="text-xs text-slate-500">
              <tr className="border-b">
                <th className="py-3 pr-4 font-medium">Subject</th>
                <th className="py-3 pr-4 font-medium">Exam Type</th>
                <th className="py-3 pr-4 font-medium">Date</th>
                <th className="py-3 pr-4 font-medium">Marks</th>
                <th className="py-3 pr-4 font-medium">Grade</th>
                <th className="py-3 font-medium">Remarks</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((g) => (
                <tr key={g.id} className="border-b last:border-b-0">
                  <td className="py-4 pr-4 font-semibold text-slate-900">
                    {g.subject}
                  </td>
                  <td className="py-4 pr-4 text-slate-600">{g.examType}</td>
                  <td className="py-4 pr-4 text-slate-500">{g.date}</td>
                  <td className="py-4 pr-4 font-semibold text-slate-900">
                    {g.marks}
                  </td>
                  <td className="py-4 pr-4">
                    <GradePill grade={g.grade} />
                  </td>
                  <td className="py-4 text-slate-600">{g.remarks}</td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-500">
                    No results found for "{query}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
