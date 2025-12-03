import React from 'react';

export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

export enum CourseStatus {
  DRAFT = 'Draft',
  ACTIVE = 'Active',
  ARCHIVED = 'Archived'
}

export enum GroupStatus {
  UPCOMING = 'Upcoming',
  ACTIVE = 'Active',
  COMPLETED = 'Completed'
}

export enum LessonStatus {
  SCHEDULED = 'Scheduled',
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  status: CourseStatus;
  durationMonths: number;
}

export interface Group {
  id: string;
  courseId: string;
  teacherId: string;
  name: string; // e.g., "Frontend-12"
  startDate: string;
  schedule: string; // e.g., "Mon/Wed/Fri 19:00"
  status: GroupStatus;
  zoomLink: string;
}

export interface Lesson {
  id: string;
  groupId: string;
  topic: string;
  date: string; // ISO String
  status: LessonStatus;
  zoomUrl: string;
}

export interface StudentEnrollment {
  id: string;
  studentId: string;
  groupId: string;
  joinedAt: string;
  progress: number;
  balance: number; // Positive means debt
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  date: string;
  status: 'PAID' | 'PENDING';
  description: string;
}

export interface Homework {
  id: string;
  groupId: string;
  title: string;
  deadline: string;
  submissions: number;
}

export interface Message {
  id: string;
  groupId: string;
  userId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  createdAt: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}