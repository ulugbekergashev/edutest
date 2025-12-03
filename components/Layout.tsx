import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';
import { Icons } from './Icons';

interface LayoutProps {
  user: User;
  children: React.ReactNode;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ user, children, onLogout }) => {
  const navigate = useNavigate();

  const getNavItems = () => {
    switch (user.role) {
      case UserRole.ADMIN:
        return [
          { name: 'Dashboard', path: '/admin', icon: Icons.Dashboard },
          { name: 'Courses', path: '/admin/courses', icon: Icons.Courses },
          { name: 'Groups', path: '/admin/groups', icon: Icons.Groups },
          { name: 'Students', path: '/admin/students', icon: Icons.Students },
          { name: 'Schedule', path: '/admin/schedule', icon: Icons.Schedule },
          { name: 'Payments', path: '/admin/payments', icon: Icons.Payments },
        ];
      case UserRole.TEACHER:
        return [
          { name: 'Dashboard', path: '/teacher', icon: Icons.Dashboard },
          { name: 'My Groups', path: '/teacher/groups', icon: Icons.Groups },
          { name: 'Schedule', path: '/teacher/schedule', icon: Icons.Schedule },
        ];
      case UserRole.STUDENT:
        return [
          { name: 'Dashboard', path: '/student', icon: Icons.Dashboard },
          { name: 'My Classes', path: '/student/classes', icon: Icons.Courses },
          { name: 'Payments', path: '/student/payments', icon: Icons.Payments },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            OE
          </div>
          <span className="text-xl font-bold text-slate-800">OnlineEdu</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path !== '/admin' && item.path !== '/teacher' && item.path !== '/student'}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={onLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Icons.Logout className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-slate-800">
            {user.role === UserRole.ADMIN ? 'Admin Portal' : 
             user.role === UserRole.TEACHER ? 'Teacher Space' : 'Student Learning Hub'}
          </h2>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-blue-600 rounded-full hover:bg-blue-50 relative">
              <Icons.Notification className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user.role.toLowerCase()}</p>
              </div>
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`}
                alt={user.name}
                className="w-9 h-9 rounded-full border border-slate-200"
              />
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
