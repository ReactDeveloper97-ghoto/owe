import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';

import { useThemeStore } from './store/themeStore';
import SEO from './components/SEO';
import LoadingSpinner from './components/LoadingSpinner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import ParentProtected from './auth/ParentProtected';
import AdminProtected from './auth/AdminProtected';
import { useSessionStore } from './store/sessionStore';

/* ---------- Lazy Public Pages ---------- */
const Home = lazy(() => import('./pages/home/Home'));
const About = lazy(() => import('./pages/about/About'));
const Blog = lazy(() => import('./pages/blog/Blog'));
const BlogPost = lazy(() => import('./components/BlogPost'));
const Login = lazy(() => import('./pages/loginportal/Login'));
const AdminLogin = lazy(() => import('./pages/loginportal/AdminLogin'));
const Programs = lazy(() => import('./pages/programs/Programs'));
const ContactUs = lazy(() => import('./pages/contacts/ContactUs'));
const Careers = lazy(() => import('./pages/careers/Careers'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Elementary = lazy(() => import('./pages/programs/Elementary'));
const LateElementary = lazy(() => import('./pages/programs/LateElementary'));
const MiddleSchool = lazy(() => import('./pages/programs/MiddleSchool'));
const HighSchool = lazy(() => import('./pages/programs/HighSchool'));
const Competitions = lazy(() => import('./pages/programs/Competitions'));
const SummerSchool = lazy(() => import('./pages/programs/SummerSchool'));
const Tutoring = lazy(() => import('./pages/programs/Tutoring'));
const OnlineClasses = lazy(() => import('./pages/programs/OnlineClasses'));

/* ---------- Parent Dashboard ---------- */
import ParentLayout from './layouts/ParentLayout';
import ParentDashboard from './pages/parent/Dashboard';
import ParentAttendance from './pages/parent/Attendance';
import ParentFees from './pages/parent/Fees';
import ParentAssignments from './pages/parent/Assignments';
import ParentRemarks from './pages/parent/Remarks';

/* ---------- Admin Dashboard ---------- */
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminAttendance from './pages/admin/Attendance';
import AdminStudents from './pages/admin/ShowStudents';
import AdminFees from './pages/admin/Fees';
import AdminAssignments from './pages/admin/Assignments';
import AdminRemarks from './pages/admin/Remarks';

import AssignStudentSubject from './pages/admin/AssignStudentSubject';
import Subjects from './pages/admin/Subjects';
import AddStudents from './pages/admin/AddStudent';
import Parents from './pages/admin/Parents';

/* ---------- Public Layout ---------- */
const Layout = () => {
  const { theme } = useThemeStore();

  return (
    <div
      className={`${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'
        } min-h-screen transition-colors duration-300`}
    >
      <Navbar />
      <main className="pt-16">
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

/* ---------- Router ---------- */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:id', element: <BlogPost /> },
      { path: 'login', element: <Login /> },
      { path: 'admin-login', element: <AdminLogin /> },

      { path: 'programs', element: <Programs /> },
      { path: 'programs/elementary', element: <Elementary /> },
      { path: 'programs/late-elementary', element: <LateElementary /> },
      { path: 'programs/middle-school', element: <MiddleSchool /> },
      { path: 'programs/high-school', element: <HighSchool /> },
      { path: 'programs/competitions', element: <Competitions /> },
      { path: 'programs/summer-school', element: <SummerSchool /> },
      { path: 'programs/tutoring', element: <Tutoring /> },
      { path: 'programs/online', element: <OnlineClasses /> },

      { path: 'contacts', element: <ContactUs /> },
      { path: 'careers', element: <Careers /> },
      { path: '*', element: <NotFound /> },
    ],
  },

  /* ---------- Parent Protected ---------- */
  {
    path: '/parent',
    element: (
      <ParentProtected role="parent">
        <ParentLayout />
      </ParentProtected>
    ),
    children: [
      { index: true, element: <ParentDashboard /> },
      { path: 'attendance', element: <ParentAttendance /> },
      { path: 'fees', element: <ParentFees /> },
      { path: 'assignments', element: <ParentAssignments /> },
      { path: 'remarks', element: <ParentRemarks /> },
    ],
  },

  /* ---------- Admin Protected ---------- */
  {
    path: '/admin',
    element: <AdminProtected />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'attendance', element: <AdminAttendance /> },
          { path: 'all-students', element: <AdminStudents /> },
          { path: 'fees', element: <AdminFees /> },
          { path: 'assignments', element: <AdminAssignments /> },
          { path: 'remarks', element: <AdminRemarks /> },
          { path: 'parents', element: <Parents /> },
          { path: 'student-subjects', element: <AssignStudentSubject /> },
          // { path: 'students', element: <AddStudents /> },
          { path: 'add-student', element: <AddStudents /> },

          { path: 'subjects', element: <Subjects /> },
        ],
      },
    ],
  },
]);

/* ---------- App Root ---------- */
function App() {
  const fetchProfile = useSessionStore((s) => s.fetchProfile);

  // Only restore parent session (admin handled by token guards)
  if (localStorage.getItem('role') === 'parent') {
    fetchProfile();
  }

  return (
    <>
      <SEO
        title="Our World of Education - Best Online Learning Platform"
        description="Quality education with expert tutors, interactive online classes, and comprehensive learning programs for all grades in Pakistan."
        keywords="education Pakistan, online classes, tutoring"
        url="https://our-we.netlify.app"
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
