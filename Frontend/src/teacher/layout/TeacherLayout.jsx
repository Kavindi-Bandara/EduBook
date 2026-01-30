// import React from "react";
// import { NavLink, Outlet } from "react-router-dom";

// function SidebarLink({ to, icon, label }) {
//   return (
//     <NavLink
//       to={to}
//       end
//       className={({ isActive }) =>
//         [
//           "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
//           isActive
//             ? "bg-indigo-600 text-white shadow-sm"
//             : "text-slate-300 hover:bg-white/10 hover:text-white",
//         ].join(" ")
//       }
//     >
//       <span className="text-base">{icon}</span>
//       <span>{label}</span>
//     </NavLink>
//   );
// }

// export default function TeacherLayout() {
//   const teacher = { name: "Sarah Johnson", role: "Teacher" };

//   return (
//     <div className="min-h-screen w-full bg-slate-50">
//       {/* FULL WIDTH: no mx-auto / no max-w */}
//       <div className="flex min-h-screen w-full">
//         {/* SIDEBAR - flush to left */}
//         <aside className="w-[280px] shrink-0 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
//           <div className="flex h-full flex-col p-5">
//             {/* Logo */}
//             <div className="flex items-center gap-3 px-2 py-2">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
//                 📘
//               </div>
//               <div className="text-sm font-semibold">EduBook</div>
//             </div>

//             {/* Nav */}
//             <nav className="mt-6 space-y-2">
//               <SidebarLink to="/teacher/dashboard" icon="▦" label="Dashboard" />
//               <SidebarLink to="/teacher/students" icon="👥" label="My Students" />
//               <SidebarLink to="/teacher/attendance" icon="🗓️" label="Attendance" />
//               <SidebarLink to="/teacher/grades" icon="📝" label="Grades" />
//             </nav>

//             {/* Logout */}
//             <div className="mt-auto border-t border-white/10 pt-5">
//               <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white">
//                 <span className="text-base">↩</span>
//                 Logout
//               </button>
//             </div>
//           </div>
//         </aside>

//         {/* MAIN CONTENT - takes full remaining width */}
//         <main className="flex-1 w-full px-6 py-6">
//           {/* Top Bar */}
//           <div className="mb-6 flex items-center justify-between gap-4">

//             {/* Right side */}
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
//                 <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
//                   {teacher.name?.[0] || "T"}
//                 </div>
//                 <div className="leading-tight">
//                   <div className="text-sm font-semibold text-slate-900">{teacher.name}</div>
//                   <div className="text-xs text-slate-500">{teacher.role}</div>
//                 </div>
//               </div>

//               <button className="text-sm font-medium text-slate-600 hover:text-slate-900">
//                 Logout
//               </button>
//             </div>
//           </div>

//           {/* Outlet */}
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function SidebarLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        [
          "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
          isActive
            ? "bg-indigo-600 text-white shadow-sm"
            : "text-slate-300 hover:bg-white/10 hover:text-white",
        ].join(" ")
      }
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}

export default function TeacherLayout() {
  const teacher = { name: "Sarah Johnson", role: "Teacher" };
  const navigate = useNavigate();

  const handleLogout = () => {
    // later: clear auth token / session here
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="flex min-h-screen w-full">
        {/* SIDEBAR */}
        <aside className="w-[280px] shrink-0 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
          <div className="flex h-full flex-col p-5">
            {/* Logo */}
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                📘
              </div>
              <div className="text-sm font-semibold">EduBook</div>
            </div>

            {/* Nav */}
            <nav className="mt-6 space-y-2">
              <SidebarLink to="/teacher/dashboard" icon="▦" label="Dashboard" />
              <SidebarLink to="/teacher/students" icon="👥" label="My Students" />
              <SidebarLink to="/teacher/attendance" icon="🗓️" label="Attendance" />
              <SidebarLink to="/teacher/grades" icon="📝" label="Grades" />
            </nav>

            {/* Sidebar Logout */}
            <div className="mt-auto border-t border-white/10 pt-5">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white"
              >
                <span className="text-base">↩</span>
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 w-full px-6 py-6">
          {/* Top Bar */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div />

            {/* Right side */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                  {teacher.name?.[0] || "T"}
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-slate-900">
                    {teacher.name}
                  </div>
                  <div className="text-xs text-slate-500">{teacher.role}</div>
                </div>
              </div>

              {/* Top Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Logout
              </button>
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
