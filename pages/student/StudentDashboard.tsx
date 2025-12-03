import React from 'react';
import { db } from '../../services/mockDb';
import { Icons } from '../../components/Icons';
import { UserRole } from '../../types';

export const StudentDashboard = () => {
  const studentId = 'u3';
  const myEnrollments = db.getStudentEnrollments(studentId);
  
  // Mock next class
  const nextClass = {
    title: 'Advanced State Management',
    group: 'React-24',
    time: '19:00 Today',
    zoomLink: 'https://zoom.us/test'
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Ready to learn, Alice?</h1>
          <p className="text-indigo-100 mb-6 max-w-xl">You have an upcoming class. Check your microphone and camera before joining.</p>
          
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="mr-4">
              <p className="text-xs text-indigo-200 uppercase tracking-wide font-semibold">Next Class</p>
              <h3 className="font-bold text-lg">{nextClass.title}</h3>
              <p className="text-sm text-indigo-100">{nextClass.group} • {nextClass.time}</p>
            </div>
            <button 
               onClick={() => window.open(nextClass.zoomLink, '_blank')}
               className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors shadow-lg flex items-center space-x-2"
            >
              <Icons.Zoom className="w-5 h-5" />
              <span>Join Live Class</span>
            </button>
          </div>
        </div>
        
        {/* Decorative circle */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full opacity-50"></div>
        <div className="absolute top-12 right-12 w-32 h-32 bg-indigo-400 rounded-full opacity-30"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Courses */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <Icons.Courses className="w-5 h-5 mr-2" />
            My Enrollments
          </h2>
          <div className="space-y-4">
            {myEnrollments.map(enrollment => {
              const group = db.getGroups().find(g => g.id === enrollment.groupId);
              return (
                <div key={enrollment.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors group">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{group?.name}</h3>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Active</span>
                  </div>
                  
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${enrollment.progress}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Progress</span>
                    <span>{enrollment.progress}%</span>
                  </div>

                  <div className="mt-4 flex space-x-3">
                    <button className="flex-1 py-2 text-sm bg-slate-50 text-slate-700 font-medium rounded-lg hover:bg-slate-100 border border-slate-200">
                      Materials
                    </button>
                    <button className="flex-1 py-2 text-sm bg-slate-50 text-slate-700 font-medium rounded-lg hover:bg-slate-100 border border-slate-200">
                      Homework
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payments/Debt */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <Icons.Payments className="w-5 h-5 mr-2" />
            Financial Status
          </h2>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="text-center py-6">
                <p className="text-slate-500 mb-1">Total Outstanding Balance</p>
                <h3 className="text-3xl font-bold text-slate-900">$0.00</h3>
                <div className="mt-2 inline-flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                  <Icons.Success className="w-4 h-4 mr-1" />
                  All caught up!
                </div>
             </div>
             
             <div className="border-t border-slate-100 pt-4 mt-4">
                <h4 className="font-semibold text-slate-800 mb-3 text-sm">Payment History</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Oct 1, 2023</span>
                    <span className="font-medium text-slate-900">-$200.00 (Paid)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Sep 1, 2023</span>
                    <span className="font-medium text-slate-900">-$200.00 (Paid)</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
