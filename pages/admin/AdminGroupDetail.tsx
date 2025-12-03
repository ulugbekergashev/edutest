import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../services/mockDb';
import { Icons } from '../../components/Icons';
import { UserRole } from '../../types';

export const AdminGroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(db.getGroup(id || ''));
  const [students, setStudents] = useState<any[]>([]);
  const [allStudents] = useState(db.getUsers(UserRole.STUDENT));
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [selectedStudentToAdd, setSelectedStudentToAdd] = useState('');

  useEffect(() => {
    if (id) {
        const g = db.getGroup(id);
        if(!g) navigate('/admin/groups');
        setGroup(g);
        setStudents(db.getGroupStudents(id));
    }
  }, [id, navigate]);

  const handleAddStudent = () => {
      if(id && selectedStudentToAdd) {
          db.enrollStudent(selectedStudentToAdd, id);
          setStudents(db.getGroupStudents(id));
          setIsAddStudentOpen(false);
      }
  }

  if (!group) return <div>Loading...</div>;

  const teacher = db.getUser(group.teacherId);
  const course = db.getCourse(group.courseId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-4">
          <button onClick={() => navigate('/admin/groups')} className="p-2 hover:bg-slate-100 rounded-full">
              <Icons.ChevronRight className="w-6 h-6 rotate-180 text-slate-500" />
          </button>
          <div>
              <h1 className="text-2xl font-bold text-slate-900">{group.name}</h1>
              <p className="text-slate-500 text-sm">{course?.title} • {teacher?.name}</p>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Info Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm md:col-span-2">
               <h3 className="font-bold text-lg mb-4">Group Information</h3>
               <div className="grid grid-cols-2 gap-4 text-sm">
                   <div>
                       <span className="block text-slate-500">Status</span>
                       <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${group.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100'}`}>
                           {group.status}
                       </span>
                   </div>
                   <div>
                       <span className="block text-slate-500">Schedule</span>
                       <span className="font-medium">{group.schedule}</span>
                   </div>
                   <div>
                       <span className="block text-slate-500">Start Date</span>
                       <span className="font-medium">{group.startDate}</span>
                   </div>
                   <div>
                       <span className="block text-slate-500">Zoom</span>
                       <a href={group.zoomLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Open Link</a>
                   </div>
               </div>
          </div>

          {/* Actions */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-lg mb-2">Quick Actions</h3>
              <button onClick={() => setIsAddStudentOpen(true)} className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  <Icons.Add className="w-4 h-4" />
                  <span>Add Student</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 border border-slate-300 text-slate-700 py-2 rounded-lg hover:bg-slate-50">
                  <Icons.Schedule className="w-4 h-4" />
                  <span>Edit Schedule</span>
              </button>
          </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Enrolled Students ({students.length})</h3>
          </div>
          <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                  <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Join Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Balance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Progress</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                  {students.map(enrol => (
                      <tr key={enrol.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => navigate(`/admin/students/${enrol.studentId}`)}>
                          <td className="px-6 py-4 whitespace-nowrap flex items-center">
                              <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center mr-3 text-xs font-bold">
                                  {enrol.student?.name.charAt(0)}
                              </div>
                              <span className="text-sm font-medium text-slate-900">{enrol.student?.name}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(enrol.joinedAt).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                              {enrol.balance > 0 ? `-$${enrol.balance}` : <span className="text-green-600">Paid</span>}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                              <div className="w-24 bg-slate-200 rounded-full h-1.5">
                                  <div className="bg-blue-600 h-1.5 rounded-full" style={{width: `${enrol.progress}%`}}></div>
                              </div>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>

      {isAddStudentOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white p-6 rounded-xl max-w-sm w-full">
                  <h3 className="text-lg font-bold mb-4">Add Student to Group</h3>
                  <select 
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 mb-4"
                    onChange={(e) => setSelectedStudentToAdd(e.target.value)}
                    value={selectedStudentToAdd}
                  >
                      <option value="">Select a student...</option>
                      {allStudents.filter(s => !students.find(en => en.studentId === s.id)).map(s => (
                          <option key={s.id} value={s.id}>{s.name} ({s.email})</option>
                      ))}
                  </select>
                  <div className="flex justify-end space-x-2">
                      <button onClick={() => setIsAddStudentOpen(false)} className="px-4 py-2 text-slate-600">Cancel</button>
                      <button onClick={handleAddStudent} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};