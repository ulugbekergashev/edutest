import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../services/mockDb';
import { Icons } from '../../components/Icons';
import { GroupStatus, UserRole } from '../../types';

export const AdminGroups = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState(db.getGroups());
  const [showModal, setShowModal] = useState(false);
  const [courses] = useState(db.getCourses());
  const [teachers] = useState(db.getUsers(UserRole.TEACHER));

  // Form State
  const [newGroup, setNewGroup] = useState({
    name: '',
    courseId: courses[0]?.id || '',
    teacherId: teachers[0]?.id || '',
    startDate: '',
    schedule: '',
    zoomLink: 'https://zoom.us/j/'
  });

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    db.addGroup({
      ...newGroup,
      status: GroupStatus.UPCOMING
    });
    setGroups([...db.getGroups()]);
    setShowModal(false);
    setNewGroup({ ...newGroup, name: '', startDate: '', schedule: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Groups Management</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Icons.Add className="w-5 h-5" />
          <span>Create Group</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Group Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Teacher</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Schedule</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {groups.map((group) => {
              const course = courses.find(c => c.id === group.courseId);
              const teacher = teachers.find(t => t.id === group.teacherId);
              return (
                <tr 
                  key={group.id} 
                  onClick={() => navigate(`/admin/groups/${group.id}`)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{group.name}</div>
                    <div className="text-xs text-slate-500">Starts: {group.startDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{course?.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs mr-2">
                        {teacher?.name.charAt(0)}
                      </div>
                      <span className="text-sm text-slate-600">{teacher?.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{group.schedule}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      group.status === GroupStatus.ACTIVE ? 'bg-green-100 text-green-800' : 
                      group.status === GroupStatus.UPCOMING ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {group.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                    <a href={group.zoomLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-500 mr-4">
                      <Icons.Zoom className="w-5 h-5 inline" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-slate-800">Launch New Group</h2>
            <form onSubmit={handleCreateGroup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Group Name</label>
                <input 
                  type="text" required 
                  value={newGroup.name}
                  onChange={e => setNewGroup({...newGroup, name: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. React-25" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Course</label>
                   <select 
                      value={newGroup.courseId}
                      onChange={e => setNewGroup({...newGroup, courseId: e.target.value})}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2"
                    >
                     {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Teacher</label>
                   <select 
                      value={newGroup.teacherId}
                      onChange={e => setNewGroup({...newGroup, teacherId: e.target.value})}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2"
                    >
                     {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                   </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                <input 
                  type="date" required 
                  value={newGroup.startDate}
                  onChange={e => setNewGroup({...newGroup, startDate: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Schedule (Days & Time)</label>
                <input 
                  type="text" required 
                  value={newGroup.schedule}
                  onChange={e => setNewGroup({...newGroup, schedule: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2" 
                  placeholder="e.g. Mon/Wed/Fri 18:00" 
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-lg shadow-blue-500/30">
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};