// src/teacher/pages/MyStudents.jsx
import React from "react";

function IconButton({ children, title }) {
  return (
    <button
      type="button"
      title={title}
      className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700"
    >
      {children}
    </button>
  );
}

function Avatar({ name }) {
  const letter = (name?.trim()?.[0] || "S").toUpperCase();
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
      {letter}
    </div>
  );
}

function ClassPill({ label }) {
  return (
    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
      {label}
    </span>
  );
}

export default function MyStudents() {
  // Replace with API data later
  const [query, setQuery] = React.useState("");

  const students = [
    {
      id: 1,
      name: "Alex Thompson",
      email: "alex.t@example.com",
      rollNo: "1001",
      className: "10-A",
      parentName: "John Thompson",
      parentPhone: "+1 234-567-8901",
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      rollNo: "1002",
      className: "10-A",
      parentName: "Mary Williams",
      parentPhone: "+1 234-567-8902",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
      rollNo: "1003",
      className: "10-A",
      parentName: "Robert Brown",
      parentPhone: "+1 234-567-8903",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@example.com",
      rollNo: "1004",
      className: "10-A",
      parentName: "Jennifer Davis",
      parentPhone: "+1 234-567-8904",
    },
    {
      id: 5,
      name: "James Wilson",
      email: "james.w@example.com",
      rollNo: "1005",
      className: "10-A",
      parentName: "William Wilson",
      parentPhone: "+1 234-567-8905",
    },
  ];

  const filtered = students.filter((s) => {
    const hay = `${s.name} ${s.email} ${s.rollNo} ${s.className} ${s.parentName}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  return (
    <div className="w-full">
      {/* Page Title */}
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-slate-900">My Students</h2>
      </div>

      {/* Card */}
      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        {/* Search bar area */}
        <div className="border-b border-slate-200 bg-slate-50/60 p-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search students..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-500">
              <tr className="border-b border-slate-200">
                <th className="px-6 py-4">Student Info</th>
                <th className="px-6 py-4">Roll No</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Parent Details</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50">
                  {/* Student info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Avatar name={s.name} />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{s.name}</div>
                        <div className="text-sm text-slate-500">{s.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Roll No */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600">{s.rollNo}</div>
                  </td>

                  {/* Class */}
                  <td className="px-6 py-4">
                    <ClassPill label={s.className} />
                  </td>

                  {/* Parent */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">{s.parentName}</div>
                    <div className="text-sm text-slate-500">{s.parentPhone}</div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <IconButton title="Message Parent">
                        {/* envelope */}
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-5 w-5"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 7.5v9a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 16.5v-9A2.25 2.25 0 0 1 4.5 5.25h15A2.25 2.25 0 0 1 21.75 7.5Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m3 7 8.7 6.1a2 2 0 0 0 2.6 0L23 7"
                          />
                        </svg>
                      </IconButton>

                      <IconButton title="More">
                        {/* vertical dots */}
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <circle cx="12" cy="5" r="2" />
                          <circle cx="12" cy="12" r="2" />
                          <circle cx="12" cy="19" r="2" />
                        </svg>
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-500">
                    No students found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        {/* Footer action */}
        <div className="flex justify-end p-5">
          <button
            type="button"
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            Add New Student
          </button>
        </div>
      </div>
    </div>
  );
}
