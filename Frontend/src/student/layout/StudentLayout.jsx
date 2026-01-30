// import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function StudentLayout({ student }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // later: clear auth token / session here
    navigate("/", { replace: true });
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <aside className="hidden w-72 flex-col bg-slate-900 px-4 py-6 md:flex">
          {/* Brand */}
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 19.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 17h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-white">
              <div className="text-base font-semibold">EduBook</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="mt-8 space-y-2">
            <NavLink to="/student/dashboard" className={navItemClass}>
              <span>🏠</span> Dashboard
            </NavLink>
            <NavLink to="/student/attendance" className={navItemClass}>
              <span>✅</span> My Attendance
            </NavLink>
            <NavLink to="/student/grades" className={navItemClass}>
              <span>📊</span> My Grades
            </NavLink>
            <NavLink to="/student/reports" className={navItemClass}>
              <span>📄</span> My Reports
            </NavLink>
          </nav>

          {/* Bottom Logout */}
          <div className="mt-auto">
            <button
              type="button"
              onClick={handleLogout}
              className="mt-6 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
            >
              🚪 Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-6 py-6 lg:px-10">
          {/* Top bar */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div />

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                  {student?.name?.[0] ?? "S"}
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-slate-900">
                    {student?.name}
                  </div>
                  <div className="text-xs text-slate-500">Student</div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-medium text-slate-500 hover:text-slate-800"
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
