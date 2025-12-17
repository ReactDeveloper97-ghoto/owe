import React, { lazy, Suspense } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, Award, BookOpen, MapPin } from 'lucide-react';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';

const SummerSchool = () => {
  const { theme } = useThemeStore();

  // Structured Data for Summer School
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Camp", "EducationalOrganization"],
    "name": "Summer Math Camp & Enrichment Program | Our World of Education",
    "description": "Summer math enrichment program for K-12 students. Intensive mathematics camps, review courses, and acceleration programs during summer break.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Our World of Education",
      "url": "https://our-we.netlify.app"
    },
    "campCategory": "Mathematics Enrichment",
    "typicalAgeRange": "5-18",
    "programType": ["Day Camp", "Academic Camp"],
    "season": "Summer",
    "startDate": "2026-06-01",
    "endDate": "2026-08-31",
    "duration": "P4W",
    "educationalAlignment": {
      "@type": "AlignmentObject",
      "alignmentType": "educationalLevel",
      "educationalFramework": "Common Core State Standards"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/PreOrder",
      "price": "Varies",
      "priceCurrency": "USD"
    }
  };

  // Program offerings (coming soon)
  const programs = [
    {
      id: 1,
      title: "Math Acceleration Camp",
      description: "Get ahead for the next school year with advanced concepts and problem-solving skills",
      duration: "4-8 weeks",
      grades: "K-12",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-400",
      darkColor: "from-blue-600 to-cyan-500"
    },
    {
      id: 2,
      title: "Competition Prep Intensive",
      description: "Focused training for math competitions like AMC, MathCounts, and more",
      duration: "2-4 weeks",
      grades: "6-12",
      icon: <Award className="w-8 h-8" />,
      color: "from-purple-500 to-pink-400",
      darkColor: "from-purple-600 to-pink-500"
    },
    {
      id: 3,
      title: "Foundations Review Program",
      description: "Strengthen core math skills and address learning gaps from previous year",
      duration: "3-6 weeks",
      grades: "K-8",
      icon: <Users className="w-8 h-8" />,
      color: "from-green-500 to-emerald-400",
      darkColor: "from-green-600 to-emerald-500"
    }
  ];

  // Features of summer program
  const features = [
    {
      icon: "🎯",
      title: "Focused Learning",
      description: "Intensive daily sessions for maximum retention and skill development"
    },
    {
      icon: "👥",
      title: "Small Groups",
      description: "Personalized attention with 8-12 students per class"
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description: "Regular assessments and progress reports for parents"
    },
    {
      icon: "🎨",
      title: "Interactive Curriculum",
      description: "Engaging activities, games, and real-world applications"
    }
  ];

  // Locations (coming soon)
  const locations = [
    { city: "New York", state: "NY", status: "Confirmed" },
    { city: "Los Angeles", state: "CA", status: "Confirmed" },
    { city: "Chicago", state: "IL", status: "Planned" },
    { city: "Houston", state: "TX", status: "Planned" },
    { city: "Miami", state: "FL", status: "Coming Soon" },
    { city: "Seattle", state: "WA", status: "Coming Soon" }
  ];

  return (
    <>
      <SEO
        title="Summer Math Camp & Enrichment Program 2026 | Our World of Education"
        description="Summer math enrichment programs for K-12 students. Math acceleration camps, competition preparation, and skill-building programs during summer break. Launching soon!"
        keywords="summer math camp, math summer school, summer enrichment, math acceleration, competition prep summer, STEM summer camp, K-12 summer programs, math review summer"
        url="https://our-we.netlify.app/summer-school"
        structuredData={structuredData}
      />

      <Suspense fallback={<LoadingSpinner />}>
        <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
          <main className="pt-16">
            {/* Hero Section */}
            <section
              className={`relative overflow-hidden py-20 px-4 md:px-8 lg:px-16 ${theme === 'light'
                ? 'bg-linear-to-br from-yellow-50 via-orange-50 to-amber-50'
                : 'bg-linear-to-br from-amber-900/20 via-orange-900/20 to-gray-900'
                }`}
              aria-label="Summer School Introduction"
            >
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-200 dark:bg-yellow-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-orange-200 dark:bg-orange-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

              <div className="relative max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center px-6 py-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-lg font-semibold mb-8">
                    <Calendar className="w-5 h-5 mr-2" />
                    Summer 2026 • Coming Soon
                  </div>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                    Summer <span className="text-yellow-600 dark:text-yellow-400">Math</span> Camp
                    <span className="block text-3xl md:text-4xl lg:text-5xl text-gray-700 dark:text-gray-300 mt-4">
                      Accelerate. Enrich. Excel.
                    </span>
                  </h1>

                  <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed">
                    Transform your summer into a mathematical adventure. Our intensive programs
                    help students accelerate learning, prepare for competitions, or build strong
                    foundations for the coming school year.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link
                      to="/contacts"
                      className="group inline-flex items-center justify-center px-10 py-5 bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                      aria-label="Join summer program waitlist"
                    >
                      <span className="mr-3">📝</span>
                      Join Waitlist for Early Access
                      <span className="ml-3 transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>

                    <Link
                      to="/programs"
                      className="inline-flex items-center justify-center px-10 py-5 border-2 border-yellow-500 dark:border-yellow-400 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/30 font-bold text-lg rounded-xl transition-colors duration-300"
                      aria-label="Explore year-round programs"
                    >
                      <BookOpen className="w-5 h-5 mr-2" />
                      Explore Year-Round Programs
                    </Link>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                  {[
                    { label: "Weeks of Learning", value: "4-8", icon: <Clock className="w-6 h-6" /> },
                    { label: "Grade Levels", value: "K-12", icon: <Users className="w-6 h-6" /> },
                    { label: "Student Ratio", value: "1:8", icon: <Users className="w-6 h-6" /> },
                    { label: "Years Experience", value: "20+", icon: <Award className="w-6 h-6" /> }
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-2xl text-center ${theme === 'light'
                        ? 'bg-white/80 backdrop-blur-sm border border-yellow-100'
                        : 'bg-gray-800/80 backdrop-blur-sm border border-yellow-900/30'
                        }`}
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${theme === 'light' ? 'bg-yellow-100' : 'bg-yellow-900/30'
                        }`}>
                        <span className={theme === 'light' ? 'text-yellow-600' : 'text-yellow-400'}>
                          {stat.icon}
                        </span>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Programs Preview */}
            <section className="py-20 px-4 md:px-8 lg:px-16" aria-label="Summer Program Offerings">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Summer Program <span className="text-yellow-600 dark:text-yellow-400">Offerings</span>
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Choose from our specialized summer programs designed to meet every student's
                    needs, whether they want to get ahead, catch up, or explore advanced topics.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {programs.map((program) => (
                    <article
                      key={program.id}
                      className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:scale-[1.02] ${theme === 'light'
                        ? 'bg-linear-to-br from-gray-50 to-white border border-gray-100 shadow-lg hover:shadow-2xl'
                        : 'bg-linear-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-xl hover:shadow-2xl'
                        }`}
                    >
                      {/* Background gradient */}
                      <div className={`absolute inset-0 bg-linear-to-br ${program.color} dark:bg-linear-to-br ${program.darkColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                      <div className="relative">
                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${theme === 'light'
                          ? `bg-linear-to-br ${program.color} text-white`
                          : `bg-linear-to-br ${program.darkColor} text-white`
                          }`}>
                          {program.icon}
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          {program.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                          {program.description}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {program.duration}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Grades {program.grades}
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section
              className={`py-20 px-4 md:px-8 lg:px-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                }`}
              aria-label="Program Features"
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                      Why Choose Our <span className="text-yellow-600 dark:text-yellow-400">Summer</span> Program?
                    </h2>

                    <div className="space-y-8">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <div className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl mr-6 ${theme === 'light'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-yellow-900/30 text-yellow-400'
                            }`}>
                            {feature.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                              {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className={`rounded-3xl overflow-hidden shadow-2xl ${theme === 'light' ? 'shadow-yellow-200' : 'shadow-yellow-900/30'
                      }`}>
                      {/* Summer camp visualization */}
                      <div className={`aspect-4/3 flex items-center justify-center ${theme === 'light'
                        ? 'bg-linear-to-br from-yellow-400 via-orange-300 to-amber-300'
                        : 'bg-linear-to-br from-yellow-900 via-orange-800 to-amber-800'
                        }`}>
                        <div className="text-center p-8">
                          <div className="text-6xl mb-6">🌞</div>
                          <h3 className="text-3xl font-bold text-white mb-4">Summer Learning Adventures</h3>
                          <p className="text-yellow-100">Launching Summer 2026</p>
                        </div>
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400 dark:bg-yellow-600 rounded-full opacity-20"></div>
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-400 dark:bg-orange-600 rounded-full opacity-20"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Locations Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16" aria-label="Summer Camp Locations">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Summer Camp <span className="text-yellow-600 dark:text-yellow-400">Locations</span>
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    We're bringing our summer programs to cities across the country.
                    More locations to be announced soon!
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {locations.map((location, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-xl text-center transition-all duration-300 hover:transform hover:-translate-y-2 ${theme === 'light'
                        ? 'bg-white border border-gray-100 shadow-md hover:shadow-xl'
                        : 'bg-gray-800 border border-gray-700 shadow-lg hover:shadow-xl'
                        }`}
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${theme === 'light' ? 'bg-yellow-100' : 'bg-yellow-900/30'
                        }`}>
                        <MapPin className={`w-6 h-6 ${theme === 'light' ? 'text-yellow-600' : 'text-yellow-400'
                          }`} />
                      </div>

                      <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {location.city}, {location.state}
                      </div>

                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${location.status === 'Confirmed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : location.status === 'Planned'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                        {location.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <p className="text-gray-600 dark:text-gray-400">
                    Don't see your city?{' '}
                    <button
                      className={`font-semibold underline ${theme === 'light'
                        ? 'text-yellow-600 hover:text-yellow-700'
                        : 'text-yellow-400 hover:text-yellow-300'
                        }`}
                      onClick={() => console.log('Request location clicked')}
                    >
                      Request a location
                    </button>
                  </p>
                </div>
              </div>
            </section>

            {/* Waitlist CTA */}
            <section
              className={`py-20 px-4 md:px-8 lg:px-16 ${theme === 'light'
                ? 'bg-linear-to-r from-yellow-400 via-orange-400 to-amber-400'
                : 'bg-linear-to-r from-yellow-800 via-orange-800 to-amber-800'
                }`}
              aria-label="Join Waitlist"
            >
              <div className="max-w-5xl mx-auto">
                <div className={`rounded-3xl p-8 md:p-12 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'
                  } text-center`}>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    Be the First to Know When Enrollment Opens
                  </h2>

                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
                    Join our exclusive waitlist to receive early access, special pricing,
                    and priority registration for our summer programs.
                  </p>

                  <form className="max-w-2xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="first-name" className="sr-only">First Name</label>
                        <input
                          type="text"
                          id="first-name"
                          placeholder="First Name"
                          className={`w-full px-4 py-3 rounded-lg border ${theme === 'light'
                            ? 'border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200'
                            : 'border-gray-600 bg-gray-800 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-900'
                            } focus:outline-none`}
                        />
                      </div>
                      <div>
                        <label htmlFor="last-name" className="sr-only">Last Name</label>
                        <input
                          type="text"
                          id="last-name"
                          placeholder="Last Name"
                          className={`w-full px-4 py-3 rounded-lg border ${theme === 'light'
                            ? 'border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200'
                            : 'border-gray-600 bg-gray-800 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-900'
                            } focus:outline-none`}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="email" className="sr-only">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Email Address"
                          className={`w-full px-4 py-3 rounded-lg border ${theme === 'light'
                            ? 'border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200'
                            : 'border-gray-600 bg-gray-800 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-900'
                            } focus:outline-none`}
                        />
                      </div>
                      <div>
                        <label htmlFor="grade" className="sr-only">Student Grade</label>
                        <select
                          id="grade"
                          className={`w-full px-4 py-3 rounded-lg border ${theme === 'light'
                            ? 'border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200'
                            : 'border-gray-600 bg-gray-800 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-900'
                            } focus:outline-none`}
                          defaultValue=""
                        >
                          <option value="">Select Grade Level</option>
                          <option value="k-2">Grades K-2</option>
                          <option value="3-5">Grades 3-5</option>
                          <option value="6-8">Grades 6-8</option>
                          <option value="9-12">Grades 9-12</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={`w-full md:w-auto px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${theme === 'light'
                        ? 'bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl'
                        : 'bg-linear-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl'
                        }`}
                    >
                      Join Summer Program Waitlist
                    </button>

                    <p className={`text-sm mt-6 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      We respect your privacy and will only contact you about summer program updates.
                    </p>
                  </form>
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-4 md:px-8 lg:px-16" aria-label="Contact Information">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                  Questions About Summer Programs?
                </h2>

                <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                  Our team is here to help you plan the perfect summer learning experience
                  for your child.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link
                    to="/contacts"
                    className="inline-flex items-center justify-center px-10 py-5 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white font-bold text-lg rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl"
                    aria-label="Contact us for summer program information"
                  >
                    <span className="mr-3">📞</span>
                    Contact Our Summer Team
                  </Link>

                  <Link
                    to="/programs"
                    className="inline-flex items-center justify-center px-10 py-5 border-2 border-yellow-500 dark:border-yellow-400 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/30 font-bold text-lg rounded-xl transition-colors duration-300"
                    aria-label="Explore current programs"
                  >
                    Explore Current Programs
                  </Link>
                </div>
              </div>
            </section>
          </main>
        </div>
      </Suspense>
    </>
  );
};

export default SummerSchool;