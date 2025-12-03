import React from 'react';
import { db } from '../../services/mockDb';
import { Icons } from '../../components/Icons';
import { UserRole } from '../../types';

export const TeacherDashboard = () => {
  const teacherId = 'u2'; // Hardcoded for demo context
  const groups = db.getGroupsByTeacher(teacherId);
  const lessons = db.getTodaysLessons(teacherId, UserRole.TEACHER);

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <Icons.Courses className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-blue-100 text-sm">Active Groups</p>
              <h3 className="text-2xl font-bold">{groups.length}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-purple-50 rounded-lg">
             <Icons.Schedule className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Today's Classes</p>
            <h3 className="text-2xl font-bold text-slate-900">{lessons.length}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed: Today's Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-800">Today's Schedule</h2>
          {lessons.length > 0 ? (
            <div className="space-y-4">
              {lessons.map(lesson => (
                <div key={lesson.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                     <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                        <Icons.Zoom className="w-6 h-6 text-blue-600" />
                     </div>
                     <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">19:00</span>
                          <span className="text-xs text-slate-500">Duration: 2h</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900">{lesson.topic}</h4>
                        <p className="text-slate-500 text-sm">Group: React-24</p>
                     </div>
                  </div>
                  <button 
                    onClick={() => window.open(lesson.zoomUrl, '_blank')}
                    className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm shadow-blue-500/30"
                  >
                    <Icons.Zoom className="w-4 h-4" />
                    <span>Start Class</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center text-slate-500">
              No classes scheduled for today.
            </div>
          )}
        </div>

        {/* Sidebar: Homework to Grade */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800">Pending Homework</h3>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">3 New</span>
             </div>
             <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-start space-x-3 p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                    <div className="w-2 h-2 mt-2 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">Alice Smith submitted "React Hooks"</p>
                      <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                    </div>
                  </div>
                ))}
             </div>
             <button className="w-full mt-4 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg">
               View All Submissions
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
