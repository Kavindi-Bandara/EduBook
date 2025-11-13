import React, { useState } from 'react';

const SideBar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { id: 1, name: 'Dashboard', icon: '📊' },
    { id: 2, name: 'Students', icon: '👨‍🎓' },
    { id: 3, name: 'Attendance', icon: '📅' },
    { id: 4, name: 'Grades', icon: '📝' },
    { id: 5, name: 'Reports', icon: '📋' },
    { id: 6, name: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">EduBook</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        <ul className="space-y-1 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveItem(item.name)}
                className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors duration-200 group ${
                  activeItem === item.name
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;