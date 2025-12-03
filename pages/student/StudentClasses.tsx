import React from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../services/mockDb';
import { Icons } from '../../components/Icons';

export const StudentClasses = () => {
    const studentId = 'u3';
    const enrollments = db.getStudentEnrollments(studentId);
    const groups = db.getGroups();
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">My Classes</h1>
            <div className="grid grid-cols-1 gap-6">
                {enrollments.map(enrol => {
                    const group = groups.find(g => g.id === enrol.groupId);
                    if(!group) return null;

                    return (
                        <div key={enrol.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-64 h-40 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icons.Courses className="w-12 h-12 text-slate-300" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between">
                                        <h3 className="text-xl font-bold text-slate-900">{group.name}</h3>
                                        <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{group.status}</span>
                                    </div>
                                    <p className="text-slate-500 mt-1 mb-4">{group.schedule} • Started {new Date(group.startDate).toLocaleDateString()}</p>
                                    
                                    <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${enrol.progress}%` }}></div>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-4">{enrol.progress}% Complete</p>
                                </div>
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => window.open(group.zoomLink, '_blank')}
                                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <Icons.Zoom className="w-4 h-4" />
                                        <span>Join Live</span>
                                    </button>
                                    <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium text-slate-700">
                                        Materials
                                    </button>
                                    <button 
                                        onClick={() => navigate(`/student/chat/${group.id}`)}
                                        className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium text-slate-700 flex items-center gap-2"
                                    >
                                        <Icons.Groups className="w-4 h-4" />
                                        Chat
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};