import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../services/mockDb';
import { Icons } from '../../components/Icons';

export const AdminStudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(db.getUser(id || ''));
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
        setStudent(db.getUser(id));
        setEnrollments(db.getStudentEnrollments(id));
        setPayments(db.getPayments(id));
    }
  }, [id]);

  if (!student) return <div>Student not found</div>;

  return (
    <div className="space-y-6">
       <div className="flex items-center space-x-4 mb-4">
          <button onClick={() => navigate('/admin/students')} className="p-2 hover:bg-slate-100 rounded-full">
              <Icons.ChevronRight className="w-6 h-6 rotate-180 text-slate-500" />
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Student Profile</h1>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-start gap-6">
          <img src={student.avatar} alt={student.name} className="w-24 h-24 rounded-full border-4 border-slate-50" />
          <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900">{student.name}</h2>
              <p className="text-slate-500">{student.email} • {student.phone}</p>
              <div className="mt-4 flex space-x-4">
                  <div className="text-center px-4 py-2 bg-slate-50 rounded-lg">
                      <span className="block text-xs text-slate-500 uppercase">Enrolled</span>
                      <span className="font-bold text-lg">{enrollments.length} Groups</span>
                  </div>
                  <div className="text-center px-4 py-2 bg-slate-50 rounded-lg">
                      <span className="block text-xs text-slate-500 uppercase">Total Paid</span>
                      <span className="font-bold text-lg text-green-600">
                          ${payments.reduce((acc, p) => acc + p.amount, 0).toLocaleString()}
                      </span>
                  </div>
              </div>
          </div>
          <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">Edit Profile</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enrollments */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Active Courses</h3>
              <div className="space-y-4">
                  {enrollments.map(enrol => {
                      const group = db.getGroup(enrol.groupId);
                      return (
                          <div key={enrol.id} className="p-4 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer" onClick={() => navigate(`/admin/groups/${group?.id}`)}>
                              <div className="flex justify-between">
                                  <h4 className="font-bold">{group?.name}</h4>
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span>
                              </div>
                              <p className="text-sm text-slate-500 mt-1">Progress: {enrol.progress}%</p>
                              {enrol.balance > 0 && (
                                  <p className="text-sm text-red-600 font-medium mt-2">Outstanding: ${enrol.balance}</p>
                              )}
                          </div>
                      );
                  })}
              </div>
          </div>

          {/* Payments */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Payment History</h3>
              <div className="space-y-3">
                  {payments.map(p => (
                      <div key={p.id} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                          <div>
                              <p className="font-medium text-slate-800">{p.description}</p>
                              <p className="text-xs text-slate-500">{new Date(p.date).toLocaleDateString()}</p>
                          </div>
                          <span className="font-bold text-slate-700">${p.amount.toLocaleString()}</span>
                      </div>
                  ))}
                  {payments.length === 0 && <p className="text-slate-400 text-sm">No payment history.</p>}
              </div>
          </div>
      </div>
    </div>
  );
};