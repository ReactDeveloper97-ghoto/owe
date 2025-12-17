import React, { lazy, Suspense } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { Link } from 'react-router-dom';
import {
  Target,
  Users,
  Award,
  BookOpen,
  GraduationCap,
  BarChart3,
  Heart,
  Globe,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  Calendar
} from 'lucide-react';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';

const About = () => {
  const { theme } = useThemeStore();
  const brandColor = 'rgb(0, 118, 152)';
  // const brandColorLight = 'rgba(0, 118, 152, 0.1)';
  // const brandColorDark = 'rgba(0, 118, 152, 0.2)';

  // Structured Data for About Page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Our World of Education | Our Mission & Methodology",
    "description": "Discover our mission to revolutionize mathematics education through proven methodology, expert educators, and 20+ years of experience serving K-12 students.",
    "url": "https://our-we.netlify.app/about",
    "mainEntity": {
      "@type": "EducationalOrganization",
      "name": "Our World of Education",
      "description": "Expert mathematics education for K-12 students with proven methodology and results",
      "foundingDate": "2003",
      "foundingLocation": "New York, NY",
      "numberOfEmployees": "50-100",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Education Avenue",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "postalCode": "10001",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "telephone": "+1-555-123-4567",
        "email": "contact@our-we.edu"
      },
      "knowsAbout": [
        "Mathematics Education",
        "K-12 Curriculum Development",
        "Competition Math Training",
        "SAT/ACT Test Preparation",
        "Educational Psychology"
      ]
    }
  };

  // Mission & Values
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Excellence",
      description: "Striving for the highest standards in mathematics education",
      bgColor: "bg-[#e6f4f9]",
      textColor: "text-[#007698]"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion",
      description: "Inspiring love for mathematics through engaging instruction",
      bgColor: "bg-[#f0f9ff]",
      textColor: "text-[#007698]"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "Building supportive learning environments for students",
      bgColor: "bg-[#e6f4f9]",
      textColor: "text-[#007698]"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Growth",
      description: "Fostering continuous improvement and development",
      bgColor: "bg-[#f0f9ff]",
      textColor: "text-[#007698]"
    }
  ];

  // Milestones
  const milestones = [
    { year: "2003", event: "Founded in New York City" },
    { year: "2008", event: "Expanded to 5 locations nationwide" },
    { year: "2012", event: "Launched competition math program" },
    { year: "2015", event: "Reached 10,000+ students served" },
    { year: "2020", event: "Pioneered virtual learning platform" },
    { year: "2023", event: "Celebrated 20 years of excellence" }
  ];

  // Team members
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & Academic Director",
      expertise: "Ph.D. Mathematics, 20+ years teaching experience",
      achievement: "Former MIT Mathematics Professor"
    },
    {
      name: "Michael Rodriguez",
      role: "Director of Curriculum",
      expertise: "M.Ed. Curriculum Development, 15+ years experience",
      achievement: "Author of 5 mathematics textbooks"
    },
    {
      name: "Priya Sharma",
      role: "Head of Student Success",
      expertise: "M.S. Educational Psychology, 12+ years experience",
      achievement: "1000+ students to top universities"
    },
    {
      name: "David Kim",
      role: "Competition Program Director",
      expertise: "IMO Gold Medalist, 10+ years coaching experience",
      achievement: "50+ AIME qualifiers coached"
    }
  ];

  // Statistics
  const stats = [
    { value: "20+", label: "Years of Excellence", icon: <Clock className="w-6 h-6" /> },
    { value: "25,000+", label: "Students Served", icon: <Users className="w-6 h-6" /> },
    { value: "95%", label: "Parent Satisfaction", icon: <Star className="w-6 h-6" /> },
    { value: "50+", label: "Expert Educators", icon: <Award className="w-6 h-6" /> },
    { value: "15", label: "Locations Nationwide", icon: <Globe className="w-6 h-6" /> },
    { value: "1000+", label: "University Acceptances", icon: <GraduationCap className="w-6 h-6" /> }
  ];

  // Methodology points
  const methodology = [
    "Proven curriculum developed over 20+ years",
    "Small class sizes (max 12 students)",
    "Interactive, discussion-based learning",
    "Regular assessments and progress tracking",
    "Individualized attention and support",
    "Real-world application of concepts"
  ];

  return (
    <>
      <SEO
        title="About Our World of Education | 20+ Years of Math Excellence"
        description="Discover our mission, methodology, and team of expert educators dedicated to transforming mathematics education for K-12 students since 2003."
        keywords="about our world of education, math education philosophy, teaching methodology, expert math tutors, educational mission, K-12 mathematics, proven curriculum"
        url="https://our-we.netlify.app/about"
        structuredData={structuredData}
      />

      <Suspense fallback={<LoadingSpinner />}>
        <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>


          <main className="pt-16">
            {/* Hero Section */}
            <section
              className={`relative overflow-hidden py-20 px-4 md:px-8 lg:px-16 ${theme === 'light'
                ? 'bg-linear-to-r from-blue-50 to-cyan-50'
                : 'bg-linear-to-r from-gray-800 to-gray-900'
                }`}
              aria-label="About Introduction"
            >
              <div className="relative max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className={`inline-flex items-center px-6 py-3 rounded-full ${theme === 'light' ? 'bg-[#e6f4f9]' : 'bg-gray-800'
                      } ${theme === 'light' ? 'text-[#007698]' : 'text-gray-300'} text-lg font-semibold mb-8`}>
                      <Award className="w-5 h-5 mr-2" />
                      Established 2003 • 20+ Years of Excellence
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                      Transforming <span style={{ color: brandColor }}>Math</span> Education
                      <span className="block text-3xl md:text-4xl lg:text-5xl text-gray-700 dark:text-gray-300 mt-4">
                        One Student at a Time
                      </span>
                    </h1>

                    <p className="text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                      For over two decades, we've been revolutionizing mathematics education
                      through proven methodology, expert instruction, and a passion for
                      cultivating mathematical excellence in every student.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6">
                      <Link
                        to="/programs"
                        className="group inline-flex items-center justify-center px-10 py-5 bg-[#007698] hover:bg-[#005a75] text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                        aria-label="Explore our programs"
                      >
                        <BookOpen className="w-5 h-5 mr-2" />
                        Explore Our Programs
                        <span className="ml-3 transform group-hover:translate-x-1 transition-transform">→</span>
                      </Link>

                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center px-10 py-5 border-2 border-[#007698] text-[#007698] hover:bg-[#e6f4f9] dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-800 font-bold text-lg rounded-xl transition-colors duration-300"
                        aria-label="Contact us"
                      >
                        <Users className="w-5 h-5 mr-2" />
                        Meet Our Team
                      </Link>
                    </div>
                  </div>

                  <div className="relative">
                    <div className={`rounded-3xl overflow-hidden shadow-2xl ${theme === 'light' ? 'shadow-blue-200' : 'shadow-gray-800'
                      }`}>
                      <div className={`aspect-4/3 flex items-center justify-center ${theme === 'light'
                        ? 'bg-linear-to-r from-blue-500 to-cyan-400'
                        : 'bg-linear-to-r from-gray-700 to-gray-800'
                        }`}>
                        <div className="text-center p-8">
                          <div className="text-6xl mb-6">👨‍🏫</div>
                          <h3 className="text-3xl font-bold text-white mb-4">20+ Years of Excellence</h3>
                          <p className="text-blue-100">Since 2003</p>
                        </div>
                      </div>
                    </div>

                    {/* Stats overlay */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className={`grid grid-cols-3 gap-4 p-6 rounded-2xl ${theme === 'light'
                        ? 'bg-white/90 backdrop-blur-sm border border-blue-100 shadow-xl'
                        : 'bg-gray-800/90 backdrop-blur-sm border border-gray-700 shadow-xl'
                        }`}>
                        {stats.slice(0, 3).map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-2 mx-auto ${theme === 'light' ? 'bg-[#e6f4f9]' : 'bg-gray-700'
                              }`}>
                              <span className={theme === 'light' ? 'text-[#007698]' : 'text-gray-300'}>
                                {stat.icon}
                              </span>
                            </div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                              {stat.value}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 px-4 md:px-8 lg:px-16" aria-label="Our Mission">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                      Our <span style={{ color: brandColor }}>Mission</span>
                    </h2>

                    <div className="space-y-6">
                      <p className="text-xl text-gray-600 dark:text-gray-300">
                        To empower students with the mathematical foundation, critical thinking
                        skills, and confidence needed to excel academically and succeed in an
                        increasingly complex world.
                      </p>

                      <p className="text-xl text-gray-600 dark:text-gray-300">
                        We believe that every student has the potential to excel in mathematics
                        when provided with the right guidance, environment, and resources.
                      </p>

                      <div className={`p-6 rounded-xl ${theme === 'light'
                        ? 'bg-[#e6f4f9] border-l-4'
                        : 'bg-gray-800 border-l-4'
                        }`} style={{ borderLeftColor: brandColor }}>
                        <p className="text-lg italic text-gray-700 dark:text-gray-300">
                          "Mathematics is not about numbers, equations, computations, or algorithms:
                          it is about understanding. Our goal is to cultivate that understanding
                          in every student we serve."
                        </p>
                        <div className="mt-4 font-semibold" style={{ color: brandColor }}>
                          — Dr. Sarah Chen, Founder
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                      Our <span style={{ color: brandColor }}>Values</span>
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {values.map((value, index) => (
                        <div
                          key={index}
                          className={`p-6 rounded-xl ${value.bgColor} ${value.textColor} transition-all duration-300 hover:transform hover:-translate-y-1`}
                        >
                          <div className="mb-4">
                            {value.icon}
                          </div>
                          <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                          <p className="opacity-90">{value.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Methodology */}
            <section
              className={`py-20 px-4 md:px-8 lg:px-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                }`}
              aria-label="Our Methodology"
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Our <span style={{ color: brandColor }}>Methodology</span>
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    A proven approach to mathematics education developed over 20+ years
                    and refined through continuous research and practice.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="space-y-6">
                      {methodology.map((point, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className={`w-6 h-6 mr-4 mt-1 ${theme === 'light' ? 'text-green-500' : 'text-green-400'
                            }`} />
                          <p className="text-lg text-gray-700 dark:text-gray-300">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12 p-8 rounded-2xl" style={{ backgroundColor: brandColor, color: 'white' }}>
                      <h3 className="text-2xl font-bold mb-4">The OWE Difference</h3>
                      <p className="mb-6">
                        Unlike traditional math tutoring, our methodology focuses on
                        deep conceptual understanding rather than rote memorization,
                        preparing students for long-term success.
                      </p>
                      <Link
                        to="/programs"
                        className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-100 font-semibold rounded-lg transition-colors"
                        style={{ color: brandColor }}
                      >
                        Learn About Our Programs
                      </Link>
                    </div>
                  </div>

                  <div className="relative">
                    <div className={`rounded-3xl overflow-hidden shadow-2xl ${theme === 'light' ? 'shadow-blue-200' : 'shadow-gray-800'
                      }`}>
                      <div className={`aspect-4/3 flex items-center justify-center ${theme === 'light'
                        ? 'bg-linear-to-r from-blue-400 to-cyan-300'
                        : 'bg-linear-to-r from-gray-700 to-gray-800'
                        }`}>
                        <div className="text-center p-8">
                          <div className="text-6xl mb-6">📚</div>
                          <h3 className="text-3xl font-bold text-white mb-4">Proven Methodology</h3>
                          <p className="text-blue-100">20+ years of refinement</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16" aria-label="Our Team">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Meet Our <span style={{ color: brandColor }}>Leadership</span>
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Our team of expert educators brings decades of experience, advanced degrees,
                    and a passion for mathematics education.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-2 ${theme === 'light'
                        ? 'bg-white shadow-lg hover:shadow-xl border border-gray-100'
                        : 'bg-gray-800 shadow-xl hover:shadow-2xl border border-gray-700'
                        }`}
                    >
                      <div className={`w-20 h-20 rounded-full mb-6 mx-auto flex items-center justify-center ${theme === 'light'
                        ? 'bg-[#007698] text-white'
                        : 'bg-gray-700 text-gray-300'
                        }`}>
                        <Users className="w-10 h-10" />
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                        {member.name}
                      </h3>

                      <p className={`text-center mb-4 font-semibold ${theme === 'light' ? 'text-[#007698]' : 'text-gray-400'
                        }`}>
                        {member.role}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-start">
                          <GraduationCap className="w-4 h-4 text-gray-400 mr-2 mt-1 shrink-0" />
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {member.expertise}
                          </p>
                        </div>

                        <div className="flex items-start">
                          <Award className="w-4 h-4 text-gray-400 mr-2 mt-1 shrink-0" />
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {member.achievement}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Link
                    to="/careers"
                    className={`inline-flex items-center font-semibold ${theme === 'light'
                      ? 'text-[#007698] hover:text-[#005a75]'
                      : 'text-gray-400 hover:text-gray-300'
                      }`}
                  >
                    View All Team Members →
                  </Link>
                </div>
              </div>
            </section>

            {/* Timeline */}
            <section
              className={`py-20 px-4 md:px-8 lg:px-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                }`}
              aria-label="Our Journey"
            >
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Our <span style={{ color: brandColor }}>Journey</span>
                  </h2>
                </div>

                <div className="relative">
                  <div className={`absolute left-4 md:left-1/2 h-full w-1 transform md:-translate-x-1/2 ${theme === 'light' ? 'bg-blue-200' : 'bg-gray-700'
                    }`}></div>

                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2 md:pl-8' : 'md:pl-1/2 md:pr-8 md:text-right'
                        } pl-12`}
                    >
                      <div className={`p-6 rounded-xl ${theme === 'light'
                        ? 'bg-white shadow-lg border border-blue-100'
                        : 'bg-gray-700 shadow-xl border border-gray-600'
                        }`}>
                        <div className="text-2xl font-bold mb-2" style={{ color: brandColor }}>
                          {milestone.year}
                        </div>
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                          {milestone.event}
                        </p>
                      </div>

                      <div className={`absolute w-6 h-6 rounded-full border-4 ${theme === 'light' ? 'border-white' : 'border-gray-700'
                        }`} style={{
                          backgroundColor: brandColor,
                          left: index % 2 === 0 ? '26px' : 'calc(100% - 26px)',
                          top: '30px',
                          transform: 'translateX(-50%)'
                        }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16" aria-label="Our Impact">
              <div className="max-w-7xl mx-auto">
                <div className={`rounded-3xl p-8 md:p-12 ${theme === 'light'
                  ? 'bg-linear-to-r from-blue-600 to-cyan-600 text-white'
                  : 'bg-linear-to-r from-gray-800 to-gray-900 text-white'
                  }`}>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                      Our Impact in Numbers
                    </h2>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                      The results speak for themselves – decades of excellence
                      and thousands of transformed students.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-4xl md:text-5xl font-bold mb-3">
                          {stat.value}
                        </div>
                        <div className="flex items-center justify-center text-sm opacity-90">
                          <span className="mr-2">{stat.icon}</span>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16" aria-label="Get Started">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                  Ready to Begin Your Child's Math Journey?
                </h2>

                <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                  Join thousands of families who have transformed their children's
                  mathematical understanding and confidence through our programs.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-10 py-5 bg-[#007698] hover:bg-[#005a75] text-white font-bold text-lg rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl"
                    aria-label="Schedule a free evaluation"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Free Evaluation
                  </Link>

                  <Link
                    to="/programs"
                    className="inline-flex items-center justify-center px-10 py-5 border-2 border-[#007698] text-[#007698] hover:bg-[#e6f4f9] dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-800 font-bold text-lg rounded-xl transition-colors duration-300"
                    aria-label="Explore all programs"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Explore All Programs
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

export default About;