import React from 'react';
import { db } from '../../services/mockDb';
import { Icons } from '../../components/Icons';

export const StudentPayments = () => {
    const studentId = 'u3';
    const payments = db.getPayments(studentId);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Payment History</h1>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {payments.length > 0 ? (
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {payments.map(p => (
                                <tr key={p.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {new Date(p.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 font-medium">
                                        {p.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        ${p.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            {p.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-8 text-center text-slate-500">
                        <Icons.Payments className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                        <p>No payment history found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};