import React from 'react';
import { db } from '../../services/mockDb';
import { Icons } from '../../components/Icons';
import { Link } from 'react-router-dom';

export const TeacherGroups = () => {
    // In a real app, we'd get the current user ID from context. 
    // Hardcoded to 'u2' (John Teacher) for demo.
    const teacherId = 'u2'; 
    const groups = db.getGroupsByTeacher(teacherId);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">My Groups</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map(group => {
                    const studentCount = db.getGroupStudents(group.id).length;
                    return (
                        <Link to={`/teacher/groups/${group.id}`} key={group.id} className="block group">
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all h-full">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                            <Icons.Groups className="w-6 h-6" />
                                        </div>
                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">Active</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{group.name}</h3>
                                    <p className="text-slate-500 text-sm mb-4">{group.schedule}</p>
                                    
                                    <div className="flex items-center text-sm text-slate-600 space-x-4 border-t border-slate-100 pt-4">
                                        <div className="flex items-center">
                                            <Icons.Students className="w-4 h-4 mr-1" />
                                            <span>{studentCount} Students</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Icons.Courses className="w-4 h-4 mr-1" />
                                            <span>3 Homeworks</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};