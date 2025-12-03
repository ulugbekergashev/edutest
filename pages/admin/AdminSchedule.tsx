import React, { useState } from 'react';
import { db } from '../../services/mockDb';
import { Icons } from '../../components/Icons';
import { LessonStatus } from '../../types';

export const AdminSchedule = () => {
  const [lessons, setLessons] = useState(db.getLessons());
  const groups = db.getGroups();
  const [showModal, setShowModal] = useState(false);
  
  // New Lesson Form
  const [newLesson, setNewLesson] = useState({
      groupId: groups[0]?.id || '',
      topic: '',
      date: '',
      time: '19:00',
      zoomUrl: 'https://zoom.us/j/...'
  });

  const handleDelete = (id: string) => {
      if(window.confirm('Are you sure you want to delete this lesson?')) {
          db.deleteLesson(id);
          setLessons(db.getLessons());
      }
  };

  const handleSaveLesson = (e: React.FormEvent) => {
      e.preventDefault();
      // Combine date and time for ISO string if needed, or keep simple
      const dateTime = new Date(`${newLesson.date}T${newLesson.time}`).toISOString();
      
      db.addLesson({
          groupId: newLesson.groupId,
          topic: newLesson.topic,
          date: dateTime,
          status: LessonStatus.SCHEDULED,
          zoomUrl: newLesson.zoomUrl
      });
      setLessons(db.getLessons());
      setShowModal(false);
      setNewLesson({ ...newLesson, topic: '', date: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">Master Schedule</h1>
          <button 
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
              <Icons.Add className="w-5 h-5" />
              <span>Add Lesson</span>
          </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h2 className="font-semibold text-slate-700">All Scheduled Classes</h2>
            <div className="flex space-x-2 text-sm">
                <select className="border-slate-300 rounded-md shadow-sm border px-2 py-1">
                    <option>All Groups</option>
                    {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
            </div>
         </div>
         <div className="divide-y divide-slate-100">
            {lessons.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(lesson => {
                const group = groups.find(g => g.id === lesson.groupId);
                const lessonDate = new Date(lesson.date);
                return (
                    <div key={lesson.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50 transition-colors group">
                        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                            <div className="flex flex-col items-center justify-center w-14 h-14 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 flex-shrink-0">
                                <span className="text-xs font-bold uppercase">{lessonDate.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                                <span className="text-lg font-bold">{lessonDate.getDate()}</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">{lesson.topic}</h4>
                                <p className="text-sm text-slate-500">
                                    {group?.name} • {lessonDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end space-x-4 w-full sm:w-auto">
                             <div className="text-right">
                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                    lesson.status === LessonStatus.COMPLETED ? 'bg-slate-100 text-slate-600' :
                                    lesson.status === LessonStatus.ONGOING ? 'bg-green-100 text-green-600 animate-pulse' :
                                    'bg-blue-50 text-blue-600'
                                }`}>
                                    {lesson.status}
                                </span>
                             </div>
                             <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button className="p-2 text-slate-400 hover:text-blue-600 border border-slate-200 rounded-lg bg-white">
                                    Edit
                                 </button>
                                 <button 
                                    onClick={() => handleDelete(lesson.id)}
                                    className="p-2 text-red-400 hover:text-red-600 border border-slate-200 rounded-lg bg-white"
                                 >
                                    <Icons.Logout className="w-4 h-4" /> {/* Trash Icon substitute */}
                                 </button>
                             </div>
                        </div>
                    </div>
                );
            })}
         </div>
      </div>

      {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl max-w-lg w-full p-6">
                  <h3 className="text-xl font-bold mb-4">Schedule New Class</h3>
                  <form onSubmit={handleSaveLesson} className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Group</label>
                          <select 
                            required
                            className="w-full border border-slate-300 rounded-lg px-4 py-2"
                            value={newLesson.groupId}
                            onChange={e => setNewLesson({...newLesson, groupId: e.target.value})}
                          >
                              {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                          </select>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Topic</label>
                          <input 
                            required
                            type="text" 
                            className="w-full border border-slate-300 rounded-lg px-4 py-2" 
                            placeholder="e.g. Advanced State Management"
                            value={newLesson.topic}
                            onChange={e => setNewLesson({...newLesson, topic: e.target.value})}
                          />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                              <input 
                                required
                                type="date" 
                                className="w-full border border-slate-300 rounded-lg px-4 py-2" 
                                value={newLesson.date}
                                onChange={e => setNewLesson({...newLesson, date: e.target.value})}
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                              <input 
                                required
                                type="time" 
                                className="w-full border border-slate-300 rounded-lg px-4 py-2" 
                                value={newLesson.time}
                                onChange={e => setNewLesson({...newLesson, time: e.target.value})}
                              />
                          </div>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Zoom Link</label>
                          <input 
                            type="url" 
                            className="w-full border border-slate-300 rounded-lg px-4 py-2" 
                            value={newLesson.zoomUrl}
                            onChange={e => setNewLesson({...newLesson, zoomUrl: e.target.value})}
                          />
                      </div>
                      <div className="flex justify-end space-x-3 mt-6">
                          <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">Cancel</button>
                          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add to Schedule</button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};