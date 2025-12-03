import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../services/mockDb';
import { Icons } from '../../components/Icons';
import { CourseStatus } from '../../types';

export const AdminCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(db.getCourses());
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Courses Directory</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Icons.Add className="w-5 h-5" />
          <span>Add Course</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div 
            key={course.id} 
            onClick={() => navigate(`/admin/courses/${course.id}`)}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer hover:border-blue-300"
          >
            <div className="h-2 bg-blue-600"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  course.status === CourseStatus.ACTIVE 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-slate-100 text-slate-600'
                }`}>
                  {course.status}
                </span>
                <Icons.ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{course.title}</h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-2">{course.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="text-sm text-slate-600">
                  <span className="font-semibold">{course.durationMonths}</span> Months
                </div>
                <div className="text-lg font-bold text-blue-600">
                  ${course.price.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h2 className="text-xl font-bold mb-4">Create New Course</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Course Title</label>
                <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2" placeholder="e.g. Advanced Java" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                <input type="number" className="w-full border border-slate-300 rounded-lg px-4 py-2" placeholder="e.g. 1500000" />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Create Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};