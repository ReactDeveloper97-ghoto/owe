import React, { lazy, Suspense, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, BookOpen, Users, ArrowLeft, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';

// Lazy load components for better performance
const Logo = lazy(() => import('../components/Logo'));

const NotFound = () => {
  const location = useLocation();

  // Log 404 errors (for analytics integration)
  useEffect(() => {
    console.warn(`404 Error: User attempted to access non-existent route: ${location.pathname}`);
    // In production, you would send this to your analytics service
    // Example: trackEvent('404_error', { path: location.pathname });
  }, [location.pathname]);

  // Structured Data for Error Page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Page Not Found - Our World of Education",
    "description": "The page you're looking for doesn't exist. Find quality mathematics education programs for K-12 students.",
    "url": "https://our-we.netlify.app/404",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://our-we.netlify.app"
    }
  };

  // Popular pages users might be looking for
  const popularPages = [
    {
      title: "Homepage",
      description: "Main landing page with program overview",
      path: "/",
      icon: <Home className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
    },
    {
      title: "All Programs",
      description: "Browse all K-12 math education programs",
      path: "/programs",
      icon: <BookOpen className="w-5 h-5" />,
      color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
    },
    {
      title: "About Us",
      description: "Learn about our methodology and mission",
      path: "/about",
      icon: <Users className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
    },
    {
      title: "Contact",
      description: "Get in touch for evaluations and inquiries",
      path: "/contacts",
      icon: <Mail className="w-5 h-5" />,
      color: "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300"
    }
  ];

  // Search suggestions based on common 404 paths
  const searchSuggestions = [
    "Elementary Math Program",
    "Middle School Mathematics",
    "High School AP Calculus",
    "Math Competition Preparation",
    "Summer Math Camp",
    "Online Math Classes",
    "Tutoring Services",
    "Parent Portal Login"
  ];

  return (
    <>
      <SEO
        title="Page Not Found (404) | Our World of Education"
        description="The page you're looking for doesn't exist. Explore our mathematics education programs for K-12 students or return to our homepage."
        keywords="404, page not found, math education, K-12 programs, mathematics tutoring, education programs"
        url="https://our-we.netlify.app/404"
        noindex={true}
        nofollow={true}
        structuredData={structuredData}
      />

      <Suspense fallback={<LoadingSpinner />}>
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
          {/* Header
          <header className="py-6 px-4 md:px-8 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center">
                <Link to="/" className="flex items-center" aria-label="Go to homepage">
                  <Logo width={180} height={60} />
                </Link>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Error 404 • Page Not Found
                </div>
              </div>
            </div>
          </header> */}

          <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
              {/* Error Code & Message */}
              <div className="mb-8">
                <h1 className="text-9xl font-black text-gray-300 dark:text-gray-700 mb-4">
                  404
                </h1>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                  Page Not Found
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                  The page you're looking for doesn't exist or has been moved.
                </p>
                <p className="text-gray-500 dark:text-gray-500">
                  You tried to access: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">{location.pathname}</code>
                </p>
              </div>

              {/* Primary CTA */}
              <div className="mb-12">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  aria-label="Go to homepage"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Return to Homepage
                </Link>
              </div>

              {/* Search Suggestions */}
              <div className="mb-12 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <div className="flex items-center justify-center mb-6">
                  <Search className="w-6 h-6 text-gray-400 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    What were you looking for?
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {searchSuggestions.map((suggestion, index) => (
                    <Link
                      key={index}
                      to="/programs"
                      className="px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 text-left"
                    >
                      {suggestion}
                    </Link>
                  ))}
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Can't find what you're looking for?{' '}
                  <Link
                    to="/contacts"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    Contact our support team
                  </Link>
                </p>
              </div>

              {/* Popular Pages Grid */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8">
                  Popular Pages You Might Like
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {popularPages.map((page, index) => (
                    <Link
                      key={index}
                      to={page.path}
                      className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                      aria-label={`Go to ${page.title}`}
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${page.color}`}>
                        {page.icon}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {page.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {page.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Program Categories */}
              <div className="p-8 bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                  Explore Our Math Programs
                </h3>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {[
                    { label: "Elementary (K-5)", path: "/programs/elementary" },
                    { label: "Middle School (6-8)", path: "/programs/middle-school" },
                    { label: "High School (9-12)", path: "/programs/high-school" },
                    { label: "Competitions", path: "/programs/competitions" },
                    { label: "Summer Camp", path: "/summer-school" },
                    { label: "Online Classes", path: "/online-classes" }
                  ].map((program, index) => (
                    <Link
                      key={index}
                      to={program.path}
                      className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg font-medium transition-colors duration-200 border border-gray-200 dark:border-gray-700"
                    >
                      {program.label}
                    </Link>
                  ))}
                </div>

                <div className="text-center">
                  <Link
                    to="/programs"
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold"
                  >
                    View all programs
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>

              {/* Additional Help */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Need additional help?
                </h4>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contacts"
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors duration-200"
                  >
                    Contact Support
                  </Link>
                  <a
                    href="mailto:support@our-we.edu"
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors duration-200"
                  >
                    Email Us
                  </a>
                  <a
                    href="tel:+15551234567"
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors duration-200"
                  >
                    Call: (555) 123-4567
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Suspense>
    </>
  );
};

export default NotFound;