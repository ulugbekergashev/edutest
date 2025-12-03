import React from 'react';
import { db } from '../../services/mockDb';
import { Icons } from '../../components/Icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const AdminDashboard = () => {
  const stats = db.getAdminStats();
  
  const chartData = [
    { name: 'Jan', students: 40 },
    { name: 'Feb', students: 55 },
    { name: 'Mar', students: 45 },
    { name: 'Apr', students: 80 },
    { name: 'May', students: 110 },
    { name: 'Jun', students: 130 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Revenue</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">${stats.revenue.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Icons.Payments className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-4 flex items-center font-medium">
            <span className="bg-green-100 rounded-full px-1.5 py-0.5 mr-2">↑ 12%</span> from last month
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Students</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.totalStudents}</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Icons.Students className="w-6 h-6 text-blue-600" />
            </div>
          </div>
           <p className="text-xs text-blue-600 mt-4 flex items-center font-medium">
            <span className="bg-blue-100 rounded-full px-1.5 py-0.5 mr-2">↑ 5%</span> new enrollments
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Groups</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.activeGroups}</h3>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Icons.Groups className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-4">Running smoothly</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Debtors</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.debtors}</h3>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <Icons.Alert className="w-6 h-6 text-red-600" />
            </div>
          </div>
           <p className="text-xs text-red-600 mt-4 font-medium">Action required</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Enrollment Growth</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="students" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Live Classes Now</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-100 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-sm font-semibold text-slate-800">React Frontend - G12</p>
                <p className="text-xs text-slate-500">Teacher: John Doe</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-100 rounded-lg">
               <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm font-semibold text-slate-800">IELTS Speaking</p>
                <p className="text-xs text-slate-500">Starts in 15 mins</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
