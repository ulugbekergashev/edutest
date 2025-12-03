import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { User, UserRole } from './types';
import { Chat } from './pages/Chat';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCourses } from './pages/admin/AdminCourses';
import { AdminCourseDetail } from './pages/admin/AdminCourseDetail';
import { AdminGroups } from './pages/admin/AdminGroups';
import { AdminGroupDetail } from './pages/admin/AdminGroupDetail';
import { AdminStudents } from './pages/admin/AdminStudents';
import { AdminStudentDetail } from './pages/admin/AdminStudentDetail';
import { AdminSchedule } from './pages/admin/AdminSchedule';
import { AdminPayments } from './pages/admin/AdminPayments';

// Teacher Pages
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { TeacherGroups } from './pages/teacher/TeacherGroups';
import { TeacherGroupDetail } from './pages/teacher/TeacherGroupDetail';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentClasses } from './pages/student/StudentClasses';
import { StudentPayments } from './pages/student/StudentPayments';

type ProtectedRouteProps = React.PropsWithChildren<{
  allowedRoles: UserRole[];
  user: User | null;
  onLogout: () => void;
}>;

const ProtectedRoute = ({ children, allowedRoles, user, onLogout }: ProtectedRouteProps) => {
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return <Layout user={user} onLogout={onLogout}>{children}</Layout>;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
        
        {/* Root Redirect */}
        <Route path="/" element={
          user ? (
            user.role === UserRole.ADMIN ? <Navigate to="/admin" /> :
            user.role === UserRole.TEACHER ? <Navigate to="/teacher" /> :
            <Navigate to="/student" />
          ) : (
            <Navigate to="/login" />
          )
        } />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]} user={user} onLogout={handleLogout}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/courses" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]} user={user} onLogout={handleLogout}>
            <AdminCourses />
          </ProtectedRoute>
        } />
        <Route path="/admin/courses/:id" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]} user={user} onLogout={handleLogout}>
            <AdminCourseDetail />
          </ProtectedRoute>
        } />
        <Route path="/admin/groups" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]} user={user} onLogout={handleLogout}>
            <AdminGroups />
          </ProtectedRoute>
        } />
        <Route path="/admin/groups/:id" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]} user={user} onLogout={handleLogout}>
            <AdminGroupDetail />
          </ProtectedRoute>
        } />
        <Route path="/admin/students" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]} user={user} onLogout={handleLogout}>
            <AdminStudents />
          </ProtectedRoute>
        } />
        <Route path="/admin/students/:id" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]} user={user} onLogout={handleLogout}>
            <AdminStudentDetail />
          </ProtectedRoute>
        } />
        <Route path="/admin/schedule" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]} user={user} onLogout={handleLogout}>
            <AdminSchedule />
          </ProtectedRoute>
        } />
        <Route path="/admin/payments" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]} user={user} onLogout={handleLogout}>
            <AdminPayments />
          </ProtectedRoute>
        } />

        {/* TEACHER ROUTES */}
        <Route path="/teacher" element={
          <ProtectedRoute allowedRoles={[UserRole.TEACHER]} user={user} onLogout={handleLogout}>
            <TeacherDashboard />
          </ProtectedRoute>
        } />
        <Route path="/teacher/groups" element={
          <ProtectedRoute allowedRoles={[UserRole.TEACHER]} user={user} onLogout={handleLogout}>
            <TeacherGroups />
          </ProtectedRoute>
        } />
        <Route path="/teacher/groups/:groupId" element={
          <ProtectedRoute allowedRoles={[UserRole.TEACHER]} user={user} onLogout={handleLogout}>
            <TeacherGroupDetail />
          </ProtectedRoute>
        } />
        <Route path="/teacher/chat/:groupId" element={
          <ProtectedRoute allowedRoles={[UserRole.TEACHER]} user={user} onLogout={handleLogout}>
            <Chat currentUser={user} />
          </ProtectedRoute>
        } />
         <Route path="/teacher/schedule" element={
          <ProtectedRoute allowedRoles={[UserRole.TEACHER]} user={user} onLogout={handleLogout}>
            <AdminSchedule />
          </ProtectedRoute>
        } />

        {/* STUDENT ROUTES */}
        <Route path="/student" element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]} user={user} onLogout={handleLogout}>
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/student/classes" element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]} user={user} onLogout={handleLogout}>
            <StudentClasses />
          </ProtectedRoute>
        } />
        <Route path="/student/chat/:groupId" element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]} user={user} onLogout={handleLogout}>
            <Chat currentUser={user} />
          </ProtectedRoute>
        } />
        <Route path="/student/payments" element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]} user={user} onLogout={handleLogout}>
            <StudentPayments />
          </ProtectedRoute>
        } />

      </Routes>
    </HashRouter>
  );
};

export default App;