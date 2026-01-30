// import React from "react";

// function StatCard({ title, value, subtitle, badgeText, badgeType = "good", icon }) {
//   const badgeClass =
//     badgeType === "good"
//       ? "bg-emerald-50 text-emerald-700"
//       : badgeType === "warn"
//       ? "bg-amber-50 text-amber-700"
//       : badgeType === "bad"
//       ? "bg-rose-50 text-rose-700"
//       : "bg-slate-100 text-slate-700";

//   return (
//     <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
//       <div className="flex items-start justify-between">
//         <div>
//           <div className="text-xs font-medium text-slate-500">{title}</div>
//           <div className="mt-2 text-3xl font-semibold text-slate-900">{value}</div>
//         </div>
//         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 text-lg">
//           {icon}
//         </div>
//       </div>

//       <div className="mt-4 flex items-center gap-2 text-xs">
//         {badgeText ? (
//           <span className={`rounded-full px-2 py-1 font-medium ${badgeClass}`}>
//             {badgeText}
//           </span>
//         ) : null}
//         {subtitle ? <span className="text-slate-500">{subtitle}</span> : null}
//       </div>
//     </div>
//   );
// }

// function ActivityRow({ icon, text, bold, time }) {
//   return (
//     <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
//       <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200">
//         {icon}
//       </div>
//       <div className="flex-1">
//         <div className="text-sm text-slate-700">
//           {text} <span className="font-semibold text-slate-900">{bold}</span>
//         </div>
//         <div className="mt-1 text-xs text-slate-400">{time}</div>
//       </div>
//     </div>
//   );
// }

// function QuickAction({ title, sub }) {
//   return (
//     <button
//       type="button"
//       className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left hover:bg-slate-50"
//     >
//       <div>
//         <div className="text-sm font-semibold text-slate-900">{title}</div>
//         <div className="mt-1 text-xs text-slate-500">{sub}</div>
//       </div>
//       <div className="text-slate-400 group-hover:text-slate-700">→</div>
//     </button>
//   );
// }

// function ScheduleItem({ subject, time, className, room }) {
//   return (
//     <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
//       <div>
//         <div className="text-sm font-semibold text-slate-900">{subject}</div>
//         <div className="mt-1 text-xs text-slate-500">
//           {className} <span className="mx-2 text-slate-300">•</span> {room}
//         </div>
//       </div>

//       <div className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
//         {time}
//       </div>
//     </div>
//   );
// }

// export default function TeacherDashboard() {
//   // replace with real data later
//   const teacher = { name: "Sarah Johnson" };

//   const stats = [
//     {
//       title: "Total Students",
//       value: "156",
//       badgeText: "+12%",
//       badgeType: "good",
//       subtitle: "from last month",
//       icon: "👥",
//     },
//     {
//       title: "Classes Assigned",
//       value: "5",
//       badgeText: "",
//       badgeType: "neutral",
//       subtitle: "",
//       icon: "🏫",
//     },
//     {
//       title: "Attendance Today",
//       value: "94%",
//       badgeText: "+2%",
//       badgeType: "good",
//       subtitle: "from last month",
//       icon: "✅",
//     },
//     {
//       title: "Pending Grades",
//       value: "24",
//       badgeText: "5",
//       badgeType: "bad",
//       subtitle: "from last month",
//       icon: "⏳",
//     },
//   ];

//   const activity = [
//     {
//       icon: "✅",
//       text: "You marked attendance for",
//       bold: "Class 10-A",
//       time: "2 hours ago",
//     },
//     {
//       icon: "📝",
//       text: "You updated grades for",
//       bold: "Mathematics Mid-Term",
//       time: "4 hours ago",
//     },
//     {
//       icon: "📄",
//       text: "You generated report for",
//       bold: "Michael Brown",
//       time: "Yesterday",
//     },
//   ];

//   const schedule = [
//     { subject: "Mathematics", time: "09:00 AM", className: "Class 10-A", room: "Room 301" },
//     { subject: "Physics", time: "10:30 AM", className: "Class 11-B", room: "Lab 2" },
//     { subject: "Mathematics", time: "01:00 PM", className: "Class 9-C", room: "Room 301" },
//   ];

//   return (
//     // IMPORTANT: w-full + no max-w
//     <div className="w-full space-y-6">
//       {/* Page header */}
//       <div>
//         <h2 className="text-xl font-semibold text-slate-900">Dashboard</h2>
//         <p className="text-sm text-slate-500">
//           Welcome back, <span className="font-medium text-slate-700">{teacher.name}</span>.
//           {" "}Here&apos;s what&apos;s happening today.
//         </p>
//       </div>

//       {/* Stat cards (full width grid) */}
//       <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
//         {stats.map((s) => (
//           <StatCard key={s.title} {...s} />
//         ))}
//       </div>

//       {/* Main content row (full width) */}
//       <div className="grid gap-5 xl:grid-cols-3">
//         {/* Recent Activity */}
//         <div className="xl:col-span-2 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
//           <div className="mb-4 flex items-center justify-between">
//             <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
//             <button className="text-xs font-semibold text-slate-500 hover:text-slate-900">
//               View All
//             </button>
//           </div>

//           <div className="space-y-3">
//             {activity.map((a, i) => (
//               <ActivityRow key={i} {...a} />
//             ))}
//           </div>

//           {/* Quick actions */}
//           <div className="mt-5 grid gap-4 sm:grid-cols-2">
//             <QuickAction title="Mark Attendance" sub="For today's classes" />
//             <QuickAction title="Update Grades" sub="Pending for 2 exams" />
//           </div>
//         </div>

//         {/* Today's Schedule */}
//         <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
//           <h3 className="text-sm font-semibold text-slate-900">Today&apos;s Schedule</h3>

//           <div className="mt-4 space-y-3">
//             {schedule.map((s, i) => (
//               <ScheduleItem key={i} {...s} />
//             ))}
//           </div>

//           <button
//             type="button"
//             className="mt-4 w-full rounded-xl bg-slate-50 py-3 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
//           >
//             View Full Schedule
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";

function StatCard({ title, value, subtitle, badgeText, badgeType = "good", icon }) {
  const badgeClass =
    badgeType === "good"
      ? "bg-emerald-50 text-emerald-700"
      : badgeType === "warn"
      ? "bg-amber-50 text-amber-700"
      : badgeType === "bad"
      ? "bg-rose-50 text-rose-700"
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

function ActivityRow({ icon, text, bold, time }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm text-slate-700">
          {text} <span className="font-semibold text-slate-900">{bold}</span>
        </div>
        <div className="mt-1 text-xs text-slate-400">{time}</div>
      </div>
    </div>
  );
}

function QuickAction({ title, sub }) {
  return (
    <button
      type="button"
      className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left hover:bg-slate-50"
    >
      <div>
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="mt-1 text-xs text-slate-500">{sub}</div>
      </div>
      <div className="text-slate-400 group-hover:text-slate-700">→</div>
    </button>
  );
}

function ScheduleItem({ subject, time, className, room }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <div>
        <div className="text-sm font-semibold text-slate-900">{subject}</div>
        <div className="mt-1 text-xs text-slate-500">
          {className} <span className="mx-2 text-slate-300">•</span> {room}
        </div>
      </div>

      <div className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
        {time}
      </div>
    </div>
  );
}

export default function TeacherDashboard() {
  const teacher = { name: "Sarah Johnson" };

  const stats = [
    { title: "Total Students", value: "156", subtitle: "from last month", badgeText: "+12%", badgeType: "good", icon: "👥" },
    { title: "Classes Assigned", value: "5", subtitle: "", badgeText: "", badgeType: "neutral", icon: "🏫" },
    { title: "Attendance Today", value: "94%", subtitle: "from last month", badgeText: "+2%", badgeType: "good", icon: "✅" },
    { title: "Pending Grades", value: "24", subtitle: "from last month", badgeText: "5", badgeType: "bad", icon: "⏳" },
  ];

  const activity = [
    { icon: "✅", text: "You marked attendance for", bold: "Class 10-A", time: "2 hours ago" },
    { icon: "📝", text: "You updated grades for", bold: "Mathematics Mid-Term", time: "4 hours ago" },
    { icon: "📄", text: "You generated report for", bold: "Michael Brown", time: "Yesterday" },
  ];

  const schedule = [
    { subject: "Mathematics", time: "09:00 AM", className: "Class 10-A", room: "Room 301" },
    { subject: "Physics", time: "10:30 AM", className: "Class 11-B", room: "Lab 2" },
    { subject: "Mathematics", time: "01:00 PM", className: "Class 9-C", room: "Room 301" },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Dashboard</h2>
        <p className="text-sm text-slate-500">
          Welcome back, <span className="font-medium text-slate-700">{teacher.name}</span>. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      {/* Main */}
      <div className="grid gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
            <button className="text-xs font-semibold text-slate-500 hover:text-slate-900">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {activity.map((a, i) => (
              <ActivityRow key={i} {...a} />
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <QuickAction title="Mark Attendance" sub="For today's classes" />
            <QuickAction title="Update Grades" sub="Pending for 2 exams" />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-sm font-semibold text-slate-900">Today&apos;s Schedule</h3>

          <div className="mt-4 space-y-3">
            {schedule.map((s, i) => (
              <ScheduleItem key={i} {...s} />
            ))}
          </div>

          <button className="mt-4 w-full rounded-xl bg-slate-50 py-3 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100">
            View Full Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
