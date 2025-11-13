// // DashBoard.jsx
// import React from 'react';

// const Dashboard = () => {
//   const weeklyAttendance = [
//     { day: 'Mon', value: 85 },
//     { day: 'Tue', value: 92 },
//     { day: 'Wed', value: 78 },
//     { day: 'Thu', value: 95 },
//     { day: 'Fri', value: 88 }
//   ];

//   const subjectPerformance = [
//     { subject: 'Math', value: 90 },
//     { subject: 'English', value: 85 },
//     { subject: 'Art', value: 75 }
//   ];

//   const getBarHeight = (value) => {
//     return `${value}%`;
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//         <p className="text-gray-600 mt-1">Welcome back, John Doe</p>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column - Stats */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Total Students Card */}
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//               <h3 className="text-gray-600 text-sm font-medium mb-2">Attendance</h3>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500">Total Students</p>
//                   <p className="text-2xl font-bold text-gray-900 mt-1">1,234</p>
//                 </div>
//               </div>
//             </div>

//             {/* Attendance Today Card */}
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//               <h3 className="text-gray-600 text-sm font-medium mb-2">Attendance</h3>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500">Today</p>
//                   <p className="text-2xl font-bold text-gray-900 mt-1">92%</p>
//                 </div>
//               </div>
//             </div>

//             {/* Classes Card */}
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//               <h3 className="text-gray-600 text-sm font-medium mb-2">Classes</h3>
//               <p className="text-2xl font-bold text-gray-900">28</p>
//             </div>

//             {/* Average Grade Card */}
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//               <h3 className="text-gray-600 text-sm font-medium mb-2">Average Grade</h3>
//               <p className="text-2xl font-bold text-gray-900">B+</p>
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="border-t border-gray-200 my-6"></div>

//           {/* Weekly Attendance Chart */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Attendance</h3>
//             <div className="flex items-end justify-between h-48 px-4">
//               {weeklyAttendance.map((item, index) => (
//                 <div key={index} className="flex flex-col items-center flex-1">
//                   <div className="text-center mb-2">
//                     <span className="text-sm text-gray-600">{item.value}%</span>
//                   </div>
//                   <div
//                     className="w-10 bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-600 cursor-pointer"
//                     style={{ height: getBarHeight(item.value) }}
//                     title={`${item.value}% attendance`}
//                   ></div>
//                   <span className="text-sm text-gray-600 mt-2 font-medium">{item.day}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Settings and Subject Performance */}
//         <div className="space-y-6">
//           {/* Settings Card */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
//             <ul className="space-y-3">
//               <li>
//                 <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
//                   Weekly Attendance
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
//                   Logout
//                 </a>
//               </li>
//             </ul>
//             <div className="mt-6 pt-4 border-t border-gray-200">
//               <div className="flex justify-between text-sm text-gray-600">
//                 {weeklyAttendance.map((item, index) => (
//                   <span key={index}>{item.day}</span>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Subject Performance Card */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             <h3 className="text-lg font-semibold text-gray-900 mb-6">Subject Performance</h3>
//             <div className="flex items-end justify-between h-48 px-4">
//               {subjectPerformance.map((item, index) => (
//                 <div key={index} className="flex flex-col items-center flex-1">
//                   <div className="text-center mb-2">
//                     <span className="text-sm text-gray-600">{item.value}%</span>
//                   </div>
//                   <div
//                     className={`w-10 ${
//                       item.subject === 'Math' ? 'bg-red-500' : 
//                       item.subject === 'English' ? 'bg-blue-500' : 'bg-green-500'
//                     } rounded-t-lg transition-all duration-300 hover:opacity-90 cursor-pointer`}
//                     style={{ height: getBarHeight(item.value) }}
//                     title={`${item.value}% in ${item.subject}`}
//                   ></div>
//                   <span className="text-sm text-gray-600 mt-2 font-medium">{item.subject}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem('adminEmail') || 'Admin';

  const weeklyAttendance = [
    { day: 'Mon', value: 85 },
    { day: 'Tue', value: 92 },
    { day: 'Wed', value: 78 },
    { day: 'Thu', value: 95 },
    { day: 'Fri', value: 88 }
  ];

  const subjectPerformance = [
    { subject: 'Math', value: 90 },
    { subject: 'English', value: 85 },
    { subject: 'Art', value: 75 }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/');
  };

  const getBarHeight = (value) => {
    return `${value}%`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {adminEmail}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Students Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Attendance</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">1,234</p>
                </div>
              </div>
            </div>

            {/* Attendance Today Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Attendance</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Today</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">92%</p>
                </div>
              </div>
            </div>

            {/* Classes Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Classes</h3>
              <p className="text-2xl font-bold text-gray-900">28</p>
            </div>

            {/* Average Grade Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Average Grade</h3>
              <p className="text-2xl font-bold text-gray-900">B+</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Weekly Attendance Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Attendance</h3>
            <div className="flex items-end justify-between h-48 px-4">
              {weeklyAttendance.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="text-center mb-2">
                    <span className="text-sm text-gray-600">{item.value}%</span>
                  </div>
                  <div
                    className="w-10 bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-600 cursor-pointer"
                    style={{ height: getBarHeight(item.value) }}
                    title={`${item.value}% attendance`}
                  ></div>
                  <span className="text-sm text-gray-600 mt-2 font-medium">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Settings and Subject Performance */}
        <div className="space-y-6">
          {/* Settings Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Manage Students
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                  View Reports
                </a>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>

          {/* Subject Performance Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Subject Performance</h3>
            <div className="flex items-end justify-between h-48 px-4">
              {subjectPerformance.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="text-center mb-2">
                    <span className="text-sm text-gray-600">{item.value}%</span>
                  </div>
                  <div
                    className={`w-10 ${
                      item.subject === 'Math' ? 'bg-red-500' : 
                      item.subject === 'English' ? 'bg-blue-500' : 'bg-green-500'
                    } rounded-t-lg transition-all duration-300 hover:opacity-90 cursor-pointer`}
                    style={{ height: getBarHeight(item.value) }}
                    title={`${item.value}% in ${item.subject}`}
                  ></div>
                  <span className="text-sm text-gray-600 mt-2 font-medium">{item.subject}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;