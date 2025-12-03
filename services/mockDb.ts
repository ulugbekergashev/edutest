import { User, UserRole, Course, CourseStatus, Group, GroupStatus, Lesson, LessonStatus, StudentEnrollment, Payment, Homework, Message } from '../types';

// Initial Mock Data
const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Admin User', email: 'admin@edu.com', role: UserRole.ADMIN, avatar: 'https://picsum.photos/200' },
  { id: 'u2', name: 'John Teacher', email: 'teacher@edu.com', role: UserRole.TEACHER, phone: '+998901234567', avatar: 'https://ui-avatars.com/api/?name=John+Teacher&background=random' },
  { id: 'u3', name: 'Alice Student', email: 'student@edu.com', role: UserRole.STUDENT, phone: '+998909876543', avatar: 'https://ui-avatars.com/api/?name=Alice+Student&background=random' },
  { id: 'u4', name: 'Bob Student', email: 'bob@edu.com', role: UserRole.STUDENT, phone: '+998901112233', avatar: 'https://ui-avatars.com/api/?name=Bob+Student&background=random' },
  { id: 'u5', name: 'Sarah Teacher', email: 'sarah@edu.com', role: UserRole.TEACHER, phone: '+998905556677', avatar: 'https://ui-avatars.com/api/?name=Sarah+Teacher&background=random' },
];

const MOCK_COURSES: Course[] = [
  { id: 'c1', title: 'Frontend Development (React)', description: 'Zero to Hero in React', price: 1200000, status: CourseStatus.ACTIVE, durationMonths: 6 },
  { id: 'c2', title: 'IELTS Intensive', description: 'Band 7.0+ Guaranteed', price: 800000, status: CourseStatus.ACTIVE, durationMonths: 3 },
  { id: 'c3', title: 'Python Backend', description: 'Django & FastAPI', price: 1100000, status: CourseStatus.DRAFT, durationMonths: 5 },
];

const MOCK_GROUPS: Group[] = [
  { id: 'g1', courseId: 'c1', teacherId: 'u2', name: 'React-24', startDate: '2023-10-01', schedule: 'Mon/Wed/Fri 19:00', status: GroupStatus.ACTIVE, zoomLink: 'https://zoom.us/j/123456789' },
  { id: 'g2', courseId: 'c2', teacherId: 'u5', name: 'IELTS-Online-5', startDate: '2023-11-15', schedule: 'Tue/Thu/Sat 18:00', status: GroupStatus.UPCOMING, zoomLink: 'https://zoom.us/j/987654321' },
];

const MOCK_LESSONS: Lesson[] = [
  { id: 'l1', groupId: 'g1', topic: 'Intro to React Hooks', date: new Date().toISOString(), status: LessonStatus.SCHEDULED, zoomUrl: 'https://zoom.us/j/123456789' },
  { id: 'l2', groupId: 'g1', topic: 'State Management', date: new Date(Date.now() + 86400000).toISOString(), status: LessonStatus.SCHEDULED, zoomUrl: 'https://zoom.us/j/123456789' },
];

const MOCK_ENROLLMENTS: StudentEnrollment[] = [
  { id: 'e1', studentId: 'u3', groupId: 'g1', joinedAt: '2023-10-01', progress: 15, balance: 0 },
  { id: 'e2', studentId: 'u4', groupId: 'g1', joinedAt: '2023-10-01', progress: 12, balance: 1200000 },
];

const MOCK_PAYMENTS: Payment[] = [
  { id: 'p1', studentId: 'u3', amount: 1200000, date: '2023-10-01', status: 'PAID', description: 'Month 1 - Frontend' },
  { id: 'p2', studentId: 'u4', amount: 0, date: '2023-10-01', status: 'PENDING', description: 'Month 1 - Frontend' },
];

const MOCK_HOMEWORKS: Homework[] = [
  { id: 'h1', groupId: 'g1', title: 'Build a Todo App', deadline: '2023-11-20', submissions: 2 },
  { id: 'h2', groupId: 'g1', title: 'React Router Setup', deadline: '2023-11-25', submissions: 0 },
];

const MOCK_MESSAGES: Message[] = [
  { id: 'm1', groupId: 'g1', userId: 'u2', senderName: 'John Teacher', senderAvatar: 'https://ui-avatars.com/api/?name=John+Teacher&background=random', content: 'Hello class! Don\'t forget the homework due tomorrow.', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'm2', groupId: 'g1', userId: 'u3', senderName: 'Alice Student', senderAvatar: 'https://ui-avatars.com/api/?name=Alice+Student&background=random', content: 'Hi teacher, I have a question about useEffect.', createdAt: new Date(Date.now() - 80000000).toISOString() },
];

class MockDBService {
  private users = MOCK_USERS;
  private courses = MOCK_COURSES;
  private groups = MOCK_GROUPS;
  private lessons = MOCK_LESSONS;
  private enrollments = MOCK_ENROLLMENTS;
  private payments = MOCK_PAYMENTS;
  private homeworks = MOCK_HOMEWORKS;
  private messages = MOCK_MESSAGES;

  // Auth
  login(email: string): User | null {
    return this.users.find(u => u.email === email) || null;
  }
  getUser(id: string) { return this.users.find(u => u.id === id); }

  // Users
  getUsers(role?: UserRole) {
    if (role) return this.users.filter(u => u.role === role);
    return this.users;
  }
  
  addUser(user: Omit<User, 'id'>) {
    const newUser = { ...user, id: `u${Date.now()}` };
    this.users.push(newUser);
    return newUser;
  }

  // Courses
  getCourses() { return this.courses; }
  getCourse(id: string) { return this.courses.find(c => c.id === id); }
  addCourse(course: Omit<Course, 'id'>) {
    const newCourse = { ...course, id: `c${Date.now()}` };
    this.courses.push(newCourse);
    return newCourse;
  }

  // Groups
  getGroups() { return this.groups; }
  getGroup(id: string) { return this.groups.find(g => g.id === id); }
  
  addGroup(group: Omit<Group, 'id'>) {
    const newGroup = { ...group, id: `g${Date.now()}` };
    this.groups.push(newGroup);
    return newGroup;
  }

  getGroupsByTeacher(teacherId: string) { return this.groups.filter(g => g.teacherId === teacherId); }
  getGroupsByCourse(courseId: string) { return this.groups.filter(g => g.courseId === courseId); }

  // Lessons
  getLessons(groupId?: string) {
    if (groupId) return this.lessons.filter(l => l.groupId === groupId);
    return this.lessons;
  }
  getTodaysLessons(userId: string, role: UserRole) {
    // Simplified for demo: return all lessons for demo purposes if date matching is too strict
    const today = new Date().toISOString().split('T')[0];
    if (role === UserRole.TEACHER) {
      const myGroupIds = this.groups.filter(g => g.teacherId === userId).map(g => g.id);
      return this.lessons.filter(l => myGroupIds.includes(l.groupId));
    }
    return this.lessons; 
  }

  addLesson(lesson: Omit<Lesson, 'id'>) {
    const newLesson = { ...lesson, id: `l${Date.now()}` };
    this.lessons.push(newLesson);
    return newLesson;
  }

  updateLesson(id: string, updates: Partial<Lesson>) {
    const index = this.lessons.findIndex(l => l.id === id);
    if (index !== -1) {
      this.lessons[index] = { ...this.lessons[index], ...updates };
      return this.lessons[index];
    }
    return null;
  }

  deleteLesson(id: string) {
    this.lessons = this.lessons.filter(l => l.id !== id);
  }

  // Enrollments
  getStudentEnrollments(studentId: string) {
    return this.enrollments.filter(e => e.studentId === studentId);
  }
  
  enrollStudent(studentId: string, groupId: string) {
    const exists = this.enrollments.find(e => e.studentId === studentId && e.groupId === groupId);
    if (exists) return exists;
    
    const newEnrollment: StudentEnrollment = {
        id: `e${Date.now()}`,
        studentId,
        groupId,
        joinedAt: new Date().toISOString(),
        progress: 0,
        balance: 0
    };
    this.enrollments.push(newEnrollment);
    return newEnrollment;
  }

  getGroupStudents(groupId: string) {
    return this.enrollments
      .filter(e => e.groupId === groupId)
      .map(e => ({
        ...e,
        student: this.users.find(u => u.id === e.studentId)
      }));
  }

  // Payments
  getPayments(studentId?: string) {
    if (studentId) return this.payments.filter(p => p.studentId === studentId);
    return this.payments;
  }

  addPayment(payment: Omit<Payment, 'id'>) {
    const newPayment = { ...payment, id: `p${Date.now()}` };
    this.payments.push(newPayment);
    const enrollment = this.enrollments.find(e => e.studentId === payment.studentId);
    if (enrollment && payment.status === 'PAID') {
        enrollment.balance = Math.max(0, enrollment.balance - payment.amount);
    }
    return newPayment;
  }

  // Homework
  getHomeworks(groupId: string) {
    return this.homeworks.filter(h => h.groupId === groupId);
  }

  // Chat
  getMessages(groupId: string) {
    return this.messages
        .filter(m => m.groupId === groupId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  sendMessage(groupId: string, userId: string, content: string) {
    const user = this.getUser(userId);
    const newMessage: Message = {
        id: `m${Date.now()}`,
        groupId,
        userId,
        senderName: user?.name || 'Unknown',
        senderAvatar: user?.avatar,
        content,
        createdAt: new Date().toISOString()
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  // Stats
  getAdminStats() {
    const totalRevenue = this.payments.filter(p => p.status === 'PAID').reduce((acc, p) => acc + p.amount, 0);
    const debtStudents = this.enrollments.filter(e => e.balance > 0).length;
    return {
      activeGroups: this.groups.filter(g => g.status === GroupStatus.ACTIVE).length,
      totalStudents: this.users.filter(u => u.role === UserRole.STUDENT).length,
      revenue: totalRevenue,
      debtors: debtStudents
    };
  }
}

export const db = new MockDBService();