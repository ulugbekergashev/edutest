import React, { useState } from 'react';
import { db } from '../services/mockDb';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@edu.com');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = db.login(email);
    if (user) {
      onLogin(user);
    } else {
      setError('User not found. Try admin@edu.com, teacher@edu.com, or student@edu.com');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            OE
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500">Sign in to Online Edu Live</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center">
              <span className="mr-2">⚠️</span> {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-600/30"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-xs text-slate-500 text-center uppercase tracking-wider mb-3">Quick Login (Demo)</p>
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => setEmail('admin@edu.com')} className="text-xs py-2 px-3 bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 text-slate-600">Admin</button>
            <button onClick={() => setEmail('teacher@edu.com')} className="text-xs py-2 px-3 bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 text-slate-600">Teacher</button>
            <button onClick={() => setEmail('student@edu.com')} className="text-xs py-2 px-3 bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 text-slate-600">Student</button>
          </div>
        </div>
      </div>
    </div>
  );
};
