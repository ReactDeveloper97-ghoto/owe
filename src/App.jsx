import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';
import { useThemeStore } from './store/themeStore';
import SEO from './components/SEO';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';  // Import Navbar
import Footer from './components/Footer';  // Import Footer

// Lazy load pages
const Home = lazy(() => import('./pages/home/Home'));
const About = lazy(() => import('./pages/about/About'));
const Blog = lazy(() => import('./pages/blog/Blog'));
const Login = lazy(() => import('./pages/loginportal/Login'));
const Programs = lazy(() => import('./pages/programs/Programs'));
const ContactUs = lazy(() => import('./pages/contacts/ContactUs'));
const Elementary = lazy(() => import('./pages/programs/Elementary'));
const LateElementary = lazy(() => import('./pages/programs/LateElementary'));
const MiddleSchool = lazy(() => import('./pages/programs/MiddleSchool'));
const HighSchool = lazy(() => import('./pages/programs/HighSchool'));
const Competitions = lazy(() => import('./pages/programs/Competitions'));
const SummerSchool = lazy(() => import('./pages/programs/SummerSchool'));
const Tutoring = lazy(() => import('./pages/programs/Tutoring'));
const OnlineClasses = lazy(() => import('./pages/programs/OnlineClasses'));
const Careers = lazy(() => import('./pages/careers/Careers'));
const NotFound = lazy(() => import('./pages/NotFound'));
const BlogPost = lazy(() => import('./components/BlogPost'));

// Parent Pages
const ParentDashboard = lazy(() => import('./components/pages/ParentDashboard'));
const ParentLogin = lazy(() => import('./components/pages/ParentLogin'));
const ParentRegister = lazy(() => import('./components/pages/ParentRegister'));

// Test Pages
const TestConnection = lazy(() => import('./components/TestConnection'));
const SetupTest = lazy(() => import('./components/SetupTest'));
const DatabaseTest = lazy(() => import('./components/DatabaseTest'));

// Layout Component (with Navbar & Footer)
const Layout = () => {
  const { theme } = useThemeStore();
  
  return (
    <div className={`${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'} min-h-screen transition-colors duration-300`}>
      <Navbar />
      <main className="pt-16"> {/* pt-16 for navbar height */}
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  const { theme } = useThemeStore();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <>
              <ScrollToTop />
              <Home />
            </>
          ),
        },
        {
          path: '/about',
          element: (
            <>
              <ScrollToTop />
              <About />
            </>
          ),
        },
        {
          path: '/blog',
          element: (
            <>
              <ScrollToTop />
              <Blog />
            </>
          ),
        },
        {
          path: '/blog/:id',
          element: (
            <>
              <ScrollToTop />
              <BlogPost />
            </>
          ),
        },
        {
          path: '/login',
          element: (
            <>
              <ScrollToTop />
              <Login />
            </>
          ),
        },
        {
          path: '/programs',
          element: (
            <>
              <ScrollToTop />
              <Programs />
            </>
          ),
        },
        {
          path: '/programs/elementary',
          element: (
            <>
              <ScrollToTop />
              <Elementary />
            </>
          ),
        },
        {
          path: '/programs/late-elementary',
          element: (
            <>
              <ScrollToTop />
              <LateElementary />
            </>
          ),
        },
        {
          path: '/programs/middle-school',
          element: (
            <>
              <ScrollToTop />
              <MiddleSchool />
            </>
          ),
        },
        {
          path: '/programs/high-school',
          element: (
            <>
              <ScrollToTop />
              <HighSchool />
            </>
          ),
        },
        {
          path: '/programs/competitions',
          element: (
            <>
              <ScrollToTop />
              <Competitions />
            </>
          ),
        },
        {
          path: '/programs/summer-school',
          element: (
            <>
              <ScrollToTop />
              <SummerSchool />
            </>
          ),
        },
        {
          path: '/programs/tutoring',
          element: (
            <>
              <ScrollToTop />
              <Tutoring />
            </>
          ),
        },
        {
          path: '/programs/online',
          element: (
            <>
              <ScrollToTop />
              <OnlineClasses />
            </>
          ),
        },
        {
          path: '/contacts',
          element: (
            <>
              <ScrollToTop />
              <ContactUs />
            </>
          ),
        },
        {
          path: '/careers',
          element: (
            <>
              <ScrollToTop />
              <Careers />
            </>
          ),
        },
        // Parent Routes
        {
          path: '/parents/dashboard',
          element: (
            <>
              <ScrollToTop />
              <ParentDashboard />
            </>
          ),
        },
        {
          path: '/parents/login',
          element: (
            <>
              <ScrollToTop />
              <ParentLogin />
            </>
          ),
        },
        {
          path: '/parents/register',
          element: (
            <>
              <ScrollToTop />
              <ParentRegister />
            </>
          ),
        },
        // Test Routes
        {
          path: '/test-connection',
          element: (
            <>
              <ScrollToTop />
              <TestConnection />
            </>
          ),
        },
        {
          path: '/setup-test',
          element: (
            <>
              <ScrollToTop />
              <SetupTest />
            </>
          ),
        },
        {
          path: '/database-test',
          element: (
            <>
              <ScrollToTop />
              <DatabaseTest />
            </>
          ),
        },
        // 404 Route
        {
          path: '*',
          element: (
            <>
              <ScrollToTop />
              <NotFound />
            </>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <SEO
        title="Our World of Education - Best Online Learning Platform"
        description="Quality education with expert tutors, interactive online classes, and comprehensive learning programs for all grades in Pakistan."
        keywords="education Pakistan, online classes, tutoring, learning platform"
        url="https://our-we.netlify.app"
      />
      
      <RouterProvider router={router} />
    </>
  );
}

export default App;