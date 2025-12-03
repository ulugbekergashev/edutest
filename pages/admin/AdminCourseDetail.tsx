import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../services/mockDb';
import { Icons } from '../../components/Icons';

export const AdminCourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(db.getCourse(id || ''));
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
      if (id) {
          setCourse(db.getCourse(id));
          setGroups(db.getGroupsByCourse(id));
      }
  }, [id]);

  if (!course) return <div>Course not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-4">
          <button onClick={() => navigate('/admin/courses')} className="p-2 hover:bg-slate-100 rounded-full">
              <Icons.ChevronRight className="w-6 h-6 rotate-180 text-slate-500" />
          </button>
          <h1 className="text-2xl font-bold text-slate-900">{course.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Description</h3>
              <p className="text-slate-600 leading-relaxed">{course.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-500">Price</p>
                      <p className="text-xl font-bold text-slate-800">${course.price.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-500">Duration</p>
                      <p className="text-xl font-bold text-slate-800">{course.durationMonths} Months</p>
                  </div>
              </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Stats</h3>
              <div className="space-y-4">
                  <div className="flex justify-between items-center">
                      <span className="text-slate-600">Active Groups</span>
                      <span className="font-bold">{groups.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                      <span className="text-slate-600">Total Students</span>
                      <span className="font-bold">
                          {groups.reduce((acc, g) => acc + db.getGroupStudents(g.id).length, 0)}
                      </span>
                  </div>
              </div>
          </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-lg mb-4">Active Groups</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groups.map(group => (
                  <div 
                    key={group.id} 
                    onClick={() => navigate(`/admin/groups/${group.id}`)}
                    className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all"
                  >
                      <h4 className="font-bold text-slate-800">{group.name}</h4>
                      <p className="text-sm text-slate-500 mt-1">{group.schedule}</p>
                      <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{group.status}</span>
                          <span className="text-xs text-blue-600 font-medium">View Group &rarr;</span>
                      </div>
                  </div>
              ))}
              {groups.length === 0 && <p className="text-slate-400">No active groups for this course.</p>}
          </div>
      </div>
    </div>
  );
};