import React, { useState } from 'react';
import { db } from '../../services/mockDb';
import { Icons } from '../../components/Icons';
import { UserRole } from '../../types';

export const AdminPayments = () => {
  const [payments, setPayments] = useState(db.getPayments());
  const [showModal, setShowModal] = useState(false);
  const students = db.getUsers(UserRole.STUDENT);

  const [newPayment, setNewPayment] = useState({
      studentId: students[0]?.id || '',
      amount: 100000,
      description: 'Tuition Fee'
  });

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    db.addPayment({
        ...newPayment,
        date: new Date().toISOString(),
        status: 'PAID'
    });
    setPayments(db.getPayments()); // Refresh list
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Financial Records</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Icons.Add className="w-5 h-5" />
          <span>Record Payment</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
                {payments.map(payment => {
                    const student = students.find(s => s.id === payment.studentId);
                    return (
                        <tr key={payment.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{student?.name || 'Unknown'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{payment.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(payment.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">${payment.amount.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${payment.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {payment.status}
                                </span>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
      </div>

      {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
                <h3 className="text-xl font-bold mb-4">Record New Payment</h3>
                <form onSubmit={handleRecordPayment} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Student</label>
                        <select 
                            value={newPayment.studentId}
                            onChange={e => setNewPayment({...newPayment, studentId: e.target.value})}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2"
                        >
                            {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                        <input 
                            type="number" 
                            value={newPayment.amount}
                            onChange={e => setNewPayment({...newPayment, amount: Number(e.target.value)})}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <input 
                            type="text" 
                            value={newPayment.description}
                            onChange={e => setNewPayment({...newPayment, description: e.target.value})}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2" 
                        />
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Confirm Payment</button>
                    </div>
                </form>
            </div>
          </div>
      )}
    </div>
  );
};