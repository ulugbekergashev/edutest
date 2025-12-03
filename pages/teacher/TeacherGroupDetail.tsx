import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../services/mockDb';
import { Icons } from '../../components/Icons';

export const TeacherGroupDetail = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState(db.getGroup(groupId || ''));
    const [students, setStudents] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'students' | 'homework'>('students');

    useEffect(() => {
        if (groupId) {
            setStudents(db.getGroupStudents(groupId));
        }
    }, [groupId]);

    if (!group) return <div>Group not found</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        {group.name}
                        <span className="text-sm font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{group.schedule}</span>
                    </h1>
                    <p className="text-slate-500 mt-1">Zoom Link: <a href={group.zoomLink} target="_blank" className="text-blue-600 hover:underline">{group.zoomLink}</a></p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => navigate(`/teacher/chat/${group.id}`)}
                        className="flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-3 rounded-lg hover:bg-slate-200 font-medium transition-colors"
                    >
                        <Icons.Groups className="w-5 h-5" />
                        <span>Group Chat</span>
                    </button>
                    <button 
                        onClick={() => window.open(group.zoomLink, '_blank')}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-bold shadow-lg shadow-blue-500/30 transition-colors"
                    >
                        <Icons.Zoom className="w-5 h-5" />
                        <span>Start Live Lesson</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('students')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'students' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
                    >
                        Students ({students.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('homework')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'homework' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
                    >
                        Homework & Grading
                    </button>
                </nav>
            </div>

            {/* Content */}
            {activeTab === 'students' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Student</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Attendance</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Progress</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {students.map((enrollment) => (
                                <tr key={enrollment.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center mr-3">
                                                {enrollment.student?.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-slate-900">{enrollment.student?.name}</div>
                                                <div className="text-xs text-slate-500">{enrollment.student?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">92%</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="w-full bg-slate-200 rounded-full h-2 max-w-[100px]">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${enrollment.progress}%` }}></div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900">Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'homework' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 cursor-pointer transition-colors">
                        <div className="p-3 bg-blue-50 rounded-full mb-3">
                            <Icons.Add className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Create Assignment</h3>
                        <p className="text-sm text-slate-500 mt-1">Assign new task to the group</p>
                    </div>
                    {db.getHomeworks(groupId || '').map(hw => (
                        <div key={hw.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                    <Icons.Courses className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-semibold bg-slate-100 px-2 py-1 rounded">Due: {hw.deadline}</span>
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">{hw.title}</h3>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-sm text-slate-500">{hw.submissions} submissions</span>
                                <button className="text-blue-600 text-sm font-medium hover:underline">Grade Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};