import React from "react";

function StatCard({ title, value, subtitle, badgeText, badgeType = "good", icon }) {
  const badgeClass =
    badgeType === "good"
      ? "bg-emerald-50 text-emerald-700"
      : badgeType === "warn"
      ? "bg-amber-50 text-amber-700"
      : "bg-slate-100 text-slate-700";

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium text-slate-500">{title}</div>
          <div className="mt-2 text-3xl font-semibold text-slate-900">{value}</div>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 text-lg">
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs">
        {badgeText ? (
          <span className={`rounded-full px-2 py-1 font-medium ${badgeClass}`}>
            {badgeText}
          </span>
        ) : null}
        <span className="text-slate-500">{subtitle}</span>
      </div>
    </div>
  );
}

function GradePill({ grade }) {
  const color =
    grade.startsWith("A")
      ? "bg-emerald-50 text-emerald-700"
      : grade.startsWith("B")
      ? "bg-sky-50 text-sky-700"
      : "bg-amber-50 text-amber-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}>
      {grade}
    </span>
  );
}

export default function StudentDashboard({ data }) {
  const { stats, recentGrades, notifications } = data;

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Attendance"
          value={`${stats.attendancePercent}%`}
          subtitle="from last month"
          badgeText={stats.attendanceDeltaText}
          badgeType="good"
          icon="✅"
        />
        <StatCard
          title="Average Grade"
          value={stats.averageGrade}
          subtitle="from last month"
          badgeText={stats.averageDeltaText}
          badgeType="good"
          icon="📘"
        />
        <StatCard
          title="Assignments"
          value={stats.assignmentsCount}
          subtitle="from last month"
          badgeText={stats.assignmentsBadge}
          badgeType="warn"
          icon="📝"
        />
        <StatCard
          title="School Days"
          value={stats.schoolDays}
          subtitle="this term"
          badgeText={stats.schoolDaysBadge}
          badgeType="neutral"
          icon="📅"
        />
      </div>

      {/* Main grid */}
      <div className="grid gap-5 xl:grid-cols-3">
        {/* Recent Grades */}
        <div className="xl:col-span-2 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Recent Grades</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-slate-500">
                <tr className="border-b">
                  <th className="py-3 pr-4 font-medium">Subject</th>
                  <th className="py-3 pr-4 font-medium">Type</th>
                  <th className="py-3 pr-4 font-medium">Date</th>
                  <th className="py-3 text-right font-medium">Grade</th>
                </tr>
              </thead>
              <tbody>
                {recentGrades.map((row) => (
                  <tr key={row.id} className="border-b last:border-b-0">
                    <td className="py-3 pr-4 font-medium text-slate-900">
                      {row.subject}
                    </td>
                    <td className="py-3 pr-4 text-slate-600">{row.type}</td>
                    <td className="py-3 pr-4 text-slate-500">{row.date}</td>
                    <td className="py-3 text-right">
                      <GradePill grade={row.grade} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-sm font-semibold text-slate-900">Notifications</h2>

          <div className="mt-4 space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="text-sm font-semibold text-slate-900">
                  {n.title}
                </div>
                <div className="mt-1 text-sm text-slate-600">{n.message}</div>
                <div className="mt-2 text-xs text-slate-400">{n.timeAgo}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
