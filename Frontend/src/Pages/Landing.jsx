// import React from "react";

// import heroImg from "../assets/hero.jpg";
// import sectionImg from "../assets/section.jpg";

// export default function Landing() {
//   return (
//     <div className="min-h-screen bg-white text-slate-900">
//       {/* NAVBAR (inside same page) */}
//       <header className="w-full border-b bg-white">
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-2 sm:px-4 py-4">
//           {/* Logo */}
//           <div className="flex items-center gap-3">
//             <div className="h-7 w-7 rounded bg-indigo-600" />
//             <span className="text-base font-semibold text-slate-900 md:text-lg">
//               EduBook
//             </span>
//           </div>

//           {/* Links */}
//           <nav className="hidden items-center gap-10 text-base text-slate-600 md:flex">
//             <a href="#features" className="hover:text-slate-900">
//               Features
//             </a>
//           </nav>

//           {/* Login button */}
//           <button className="rounded-md bg-indigo-600 px-5 py-2.5 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
//             Login
//           </button>
//         </div>
//       </header>

//       {/* HERO SECTION */}
//       <section className="mx-auto max-w-7xl px-2 sm:px-4 py-12 md:py-16">
//         <div className="grid items-center gap-10 md:grid-cols-2">
//           {/* Left text */}
//           <div>
//             <h1 className="text-5xl font-semibold leading-tight md:text-6xl">
//               Modern Student <br />
//               <span className="text-indigo-600">Record</span> <br />
//               <span className="text-indigo-600">Management</span>
//             </h1>

//             <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
//               Manage student attendance, grades, and academic reports digitally.
//               A complete solution for teachers and students to stay connected and
//               organized.
//             </p>

//             <div className="mt-7 flex items-center gap-4">
//               <button className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
//                 Get Started <span aria-hidden>→</span>
//               </button>
//             </div>

//             <p className="mt-4 text-sm text-slate-500 md:text-base">
//               No credit card required. Free for individual teachers.
//             </p>
//           </div>

//           {/* Right image */}
//           <div className="flex justify-center md:justify-end">
//             <div className="overflow-hidden rounded-2xl border bg-white shadow-lg">
//               <img
//                 src={heroImg}
//                 alt="EduBook dashboard preview"
//                 className="h-[280px] w-[460px] object-cover md:h-[320px] md:w-[540px]"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FEATURES SECTION */}
//       <section id="features" className="bg-slate-50">
//         <div className="mx-auto max-w-7xl px-2 sm:px-4 py-14 md:py-16">
//           <div className="text-center">
//             <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
//               Everything you need to manage your class
//             </h2>
//             <p className="mx-auto mt-3 max-w-3xl text-base text-slate-600 md:text-lg">
//               EduBook streamlines administrative tasks so you can focus on what
//               matters most: teaching.
//             </p>
//           </div>

//           <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-center">
//             {/* Left content */}
//             <div className="space-y-5">
//               <h3 className="text-2xl font-semibold text-slate-900 md:text-3xl">
//                 Comprehensive Tracking
//               </h3>
//               <p className="text-base leading-7 text-slate-600 md:text-lg">
//                 Keep track of every aspect of student performance in one place.
//               </p>

//               <div className="space-y-4">
//                 {/* Feature Card 1 */}
//                 <div className="flex gap-4 rounded-xl border bg-white p-5 shadow-sm">
//                   <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 text-lg">
//                     ✓
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-slate-900 md:text-xl">
//                       Attendance Tracking
//                     </h4>
//                     <p className="mt-2 text-base leading-7 text-slate-600 md:text-lg">
//                       Mark daily attendance with a single click. View monthly
//                       summaries and identify patterns instantly.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Feature Card 2 */}
//                 <div className="flex gap-4 rounded-xl border bg-white p-5 shadow-sm">
//                   <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 text-lg">
//                     ☰
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-slate-900 md:text-xl">
//                       Grade Management
//                     </h4>
//                     <p className="mt-2 text-base leading-7 text-slate-600 md:text-lg">
//                       Record marks for exams, assignments, and projects. Track
//                       progress across terms easily.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Feature Card 3 */}
//                 <div className="flex gap-4 rounded-xl border bg-white p-5 shadow-sm">
//                   <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 text-lg">
//                     📄
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-slate-900 md:text-xl">
//                       Student Reports
//                     </h4>
//                     <p className="mt-2 text-base leading-7 text-slate-600 md:text-lg">
//                       Generate detailed report cards automatically. Download as
//                       PDF or print directly.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Feature Card 4 */}
//                 <div className="flex gap-4 rounded-xl border bg-white p-5 shadow-sm">
//                   <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 text-lg">
//                     ↗
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-slate-900 md:text-xl">
//                       Progress Monitoring
//                     </h4>
//                     <p className="mt-2 text-base leading-7 text-slate-600 md:text-lg">
//                       Visualize progress over time and identify areas where
//                       students need improvement.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right image */}
//             <div className="flex justify-center md:justify-end">
//               <div className="overflow-hidden rounded-2xl border bg-white shadow-lg">
//                 <img
//                   src={sectionImg}
//                   alt="Teacher working"
//                   className="h-[300px] w-[460px] object-cover md:h-[360px] md:w-[540px]"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="border-t bg-white">
//         <div className="mx-auto max-w-7xl px-2 sm:px-4 py-8 text-base text-slate-600">
//           <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
//             <p>© {new Date().getFullYear()} EduBook</p>
//             <p>A simple student record management system.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


import React from "react";
import { Link } from "react-router-dom";

import heroImg from "../assets/hero.jpg";
import sectionImg from "../assets/section.jpg";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* NAVBAR */}
      <header className="w-full border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-2 sm:px-4 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded bg-indigo-600" />
            <span className="text-base font-semibold text-slate-900 md:text-lg">
              EduBook
            </span>
          </div>

          {/* Links */}
          <nav className="hidden items-center gap-10 text-base text-slate-600 md:flex">
            <a href="#features" className="hover:text-slate-900">
              Features
            </a>
          </nav>

          {/* Login Button */}
          <Link
            to="/login"
            className="rounded-md bg-indigo-600 px-5 py-2.5 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Login
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-2 sm:px-4 py-12 md:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left text */}
          <div>
            <h1 className="text-5xl font-semibold leading-tight md:text-6xl">
              Modern Student <br />
              <span className="text-indigo-600">Record</span> <br />
              <span className="text-indigo-600">Management</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Manage student attendance, grades, and academic reports digitally.
              A complete solution for teachers and students to stay connected and
              organized.
            </p>

            {/* Get Started Button */}
            <div className="mt-7 flex items-center gap-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Get Started <span aria-hidden>→</span>
              </Link>
            </div>

            <p className="mt-4 text-sm text-slate-500 md:text-base">
              No credit card required. Free for individual teachers.
            </p>
          </div>

          {/* Right image */}
          <div className="flex justify-center md:justify-end">
            <div className="overflow-hidden rounded-2xl border bg-white shadow-lg">
              <img
                src={heroImg}
                alt="EduBook dashboard preview"
                className="h-[280px] w-[460px] object-cover md:h-[320px] md:w-[540px]"
              />
            </div>
          </div>
        </div>
      </section>

  {/* FEATURES SECTION */}
      <section id="features" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 py-14 md:py-16">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              Everything you need to manage your class
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-base text-slate-600 md:text-lg">
              EduBook streamlines administrative tasks so you can focus on what
              matters most: teaching.
            </p>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-center">
            {/* Left content */}
            <div className="space-y-5">
              <h3 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                Comprehensive Tracking
              </h3>
              <p className="text-base leading-7 text-slate-600 md:text-lg">
                Keep track of every aspect of student performance in one place.
              </p>

              <div className="space-y-4">
                {/* Feature Card 1 */}
                <div className="flex gap-4 rounded-xl border bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 text-lg">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 md:text-xl">
                      Attendance Tracking
                    </h4>
                    <p className="mt-2 text-base leading-7 text-slate-600 md:text-lg">
                      Mark daily attendance with a single click. View monthly
                      summaries and identify patterns instantly.
                    </p>
                  </div>
                </div>

                {/* Feature Card 2 */}
                <div className="flex gap-4 rounded-xl border bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 text-lg">
                    ☰
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 md:text-xl">
                      Grade Management
                    </h4>
                    <p className="mt-2 text-base leading-7 text-slate-600 md:text-lg">
                      Record marks for exams, assignments, and projects. Track
                      progress across terms easily.
                    </p>
                  </div>
                </div>

                {/* Feature Card 3 */}
                <div className="flex gap-4 rounded-xl border bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 text-lg">
                    📄
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 md:text-xl">
                      Student Reports
                    </h4>
                    <p className="mt-2 text-base leading-7 text-slate-600 md:text-lg">
                      Generate detailed report cards automatically. Download as
                      PDF or print directly.
                    </p>
                  </div>
                </div>

                {/* Feature Card 4 */}
                <div className="flex gap-4 rounded-xl border bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 text-lg">
                    ↗
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 md:text-xl">
                      Progress Monitoring
                    </h4>
                    <p className="mt-2 text-base leading-7 text-slate-600 md:text-lg">
                      Visualize progress over time and identify areas where
                      students need improvement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div className="flex justify-center md:justify-end">
              <div className="overflow-hidden rounded-2xl border bg-white shadow-lg">
                <img
                  src={sectionImg}
                  alt="Teacher working"
                  className="h-[300px] w-[460px] object-cover md:h-[360px] md:w-[540px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
