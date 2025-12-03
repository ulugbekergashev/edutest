import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../services/mockDb';
import { Icons } from '../../components/Icons';
import { UserRole } from '../../types';

export const AdminStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState(db.getUsers(UserRole.STUDENT));
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    db.addUser({
        ...newStudent,
        role: UserRole.STUDENT,
        avatar: `https://ui-avatars.com/api/?name=${newStudent.name}&background=random`
    });
    setStudents(db.getUsers(UserRole.STUDENT));
    setShowModal(false);
    setNewStudent({ name: '', email: '', phone: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Student Directory</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Icons.Add className="w-5 h-5" />
          <span>Register Student</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map(student => (
          <div 
            key={student.id} 
            onClick={() => navigate(`/admin/students/${student.id}`)}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4 hover:shadow-md transition-shadow cursor-pointer hover:border-blue-300"
          >
            <img 
              src={student.avatar} 
              alt={student.name} 
              className="w-16 h-16 rounded-full border-2 border-slate-100"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-slate-900 truncate">{student.name}</h3>
              <p className="text-sm text-slate-500 truncate">{student.email}</p>
              <p className="text-sm text-slate-500">{student.phone}</p>
            </div>
            <button className="text-slate-400 hover:text-blue-600">
               <Icons.ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
             <h2 className="text-xl font-bold mb-4 text-slate-800">Register New Student</h2>
             <form onSubmit={handleAddStudent} className="space-y-4">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                   <input required type="text" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                   <input required type="email" value={newStudent.email} onChange={e => setNewStudent({...newStudent, email: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                   <input required type="tel" value={newStudent.phone} onChange={e => setNewStudent({...newStudent, phone: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-2" placeholder="+998..." />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                   <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">Cancel</button>
                   <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Student</button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};