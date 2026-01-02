import React, { lazy, Suspense, useState } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { Link } from 'react-router-dom';
import {
  Target,
  Clock,
  Users,
  Award,
  BookOpen,
  BarChart3,
  CheckCircle,
  Star,
  Calendar,
  Video,
  UserCheck,
  TrendingUp
} from 'lucide-react';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';

const Tutoring = () => {
  const { theme } = useThemeStore();
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');

  // Brand colors
  const primaryColor = '#007698';
  const accentColor = '#8bc540';
  const primaryLight = '#e6f4f9';
  const accentLight = '#f0f9e6';

  // Structured Data for Tutoring Service
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["EducationalOccupationalProgram", "Service"],
    "name": "One-on-One Math Tutoring & Academic Support | Our World of Education",
    "description": "Personalized 1:1 math tutoring for K-12 students. Expert tutors, customized learning plans, homework help, test preparation, and academic support.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Our World of Education",
      "url": "https://our-we.netlify.app"
    },
    "programType": "Tutoring",
    "educationalLevel": ["ElementarySchool", "MiddleSchool", "HighSchool"],
    "occupationalCategory": "Tutor",
    "timeToComplete": "PT1H",
    "numberOfCredits": "0",
    "typicalCreditsPerTerm": "0",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/PreOrder",
      "price": "Starting at $80/hour",
      "priceCurrency": "USD"
    },
    "courseprovider": {
      "@type": "EducationalOrganization",
      "name": "Our World of Education",
      "description": "Expert mathematics education with 20+ years of experience"
    }
  };

  // Tutoring subjects
  const subjects = [
    { id: 'math', name: 'Mathematics', icon: '🧮', count: 25 },
    { id: 'algebra', name: 'Algebra I/II', icon: '📐', count: 15 },
    { id: 'geometry', name: 'Geometry', icon: '△', count: 12 },
    { id: 'calculus', name: 'Calculus', icon: '∫', count: 10 },
    { id: 'statistics', name: 'Statistics', icon: '📊', count: 8 },
    { id: 'sat', name: 'SAT/ACT Math', icon: '✏️', count: 18 },
    { id: 'ap', name: 'AP Math', icon: '🏆', count: 14 },
    { id: 'competition', name: 'Math Competition', icon: '🎯', count: 7 }
  ];

  // Grade levels
  const gradeLevels = [
    { id: 'elementary', name: 'Elementary (K-5)', icon: '👶' },
    { id: 'middle', name: 'Middle School (6-8)', icon: '👦' },
    { id: 'high', name: 'High School (9-12)', icon: '👨‍🎓' },
    { id: 'college', name: 'College Level', icon: '🎓' }
  ];

  // Tutoring features
  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Personalized Learning Plans",
      description: "Custom curriculum tailored to your child's specific needs and goals"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Expert 1:1 Instruction",
      description: "Highly qualified tutors matched to your child's learning style"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Progress Tracking",
      description: "Regular assessments and detailed progress reports for parents"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Flexible Scheduling",
      description: "Book sessions at times that work for your family's schedule"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Online or In-Person",
      description: "Choose between virtual tutoring or in-person sessions"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Guaranteed Improvement",
      description: "See measurable improvement in grades and confidence"
    }
  ];

  // Tutor qualifications
  const qualifications = [
    "Advanced degrees in Mathematics or Education",
    "Minimum 3+ years teaching/tutoring experience",
    "Background checked and vetted",
    "Specialized training in OWE methodology",
    "Proven track record of student success"
  ];

  // Tutoring packages (coming soon)
  const packages = [
    {
      name: "Starter Package",
      sessions: "4 sessions",
      price: "$320",
      perSession: "$80/session",
      features: [
        "One-on-one tutoring",
        "Personalized assessment",
        "Weekly progress updates",
        "Homework support"
      ],
      popular: false,
      primaryColor: primaryColor,
      accentColor: accentColor
    },
    {
      name: "Standard Package",
      sessions: "8 sessions",
      price: "$600",
      perSession: "$75/session",
      features: [
        "Everything in Starter",
        "Custom learning plan",
        "Monthly parent conference",
        "Test preparation materials"
      ],
      popular: true,
      primaryColor: primaryColor,
      accentColor: accentColor
    },
    {
      name: "Premium Package",
      sessions: "16 sessions",
      price: "$1,120",
      perSession: "$70/session",
      features: [
        "Everything in Standard",
        "Priority scheduling",
        "24/7 homework support",
        "Progress guarantee",
        "College counseling add-on"
      ],
      popular: false,
      primaryColor: primaryColor,
      accentColor: accentColor
    }
  ];

  return (
    <>
      <SEO
        title="One-on-One Math Tutoring & Academic Support | K-12 | Our World of Education"
        description="Expert 1:1 math tutoring for K-12 students. Personalized learning plans, homework help, test preparation, and guaranteed improvement. Launching soon!"
        keywords="math tutoring, private tutor, one-on-one tutoring, homework help, test preparation, SAT math tutor, calculus tutor, algebra tutor, online tutoring, in-person tutoring"
        url="https://our-we.netlify.app/tutoring"
        structuredData={structuredData}
      />

      <Suspense fallback={<LoadingSpinner />}>
        <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
          <main className="pt-16">
            {/* Hero Section */}
            <section
              className={`relative overflow-hidden py-20 px-4 md:px-8 lg:px-16 ${theme === 'light'
                ? 'bg-linear-to-br from-blue-50 to-cyan-50'
                : 'bg-linear-to-br from-gray-800 to-gray-900'
                }`}
              aria-label="Tutoring Introduction"
            >
              <div className="relative max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className={`inline-flex items-center px-6 py-3 rounded-full ${theme === 'light' ? 'bg-[#e6f4f9]' : 'bg-gray-800'} ${theme === 'light' ? 'text-[#007698]' : 'text-gray-300'} text-lg font-semibold mb-8`}>
                      <Star className="w-5 h-5 mr-2" />
                      Premium Tutoring • Coming Soon
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                      Expert <span style={{ color: primaryColor }}>Math</span> Tutoring
                      <span className="block text-3xl md:text-4xl lg:text-5xl text-gray-700 dark:text-gray-300 mt-4">
                        Personalized. Effective. Transformative.
                      </span>
                    </h1>

                    <p className="text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                      One-on-one instruction tailored to your child's unique learning needs.
                      Our expert tutors provide the personalized attention needed to master
                      mathematics and build lasting confidence.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6">
                      <Link
                        to="/contacts"
                        className="group inline-flex items-center justify-center px-10 py-5 bg-[#007698] hover:bg-[#005a75] text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                        aria-label="Join tutoring waitlist"
                      >
                        <span className="mr-3">📝</span>
                        Join Waitlist for Early Access
                        <span className="ml-3 transform group-hover:translate-x-1 transition-transform">→</span>
                      </Link>

                      <Link
                        to="/programs"
                        className="inline-flex items-center justify-center px-10 py-5 border-2 border-[#007698] text-[#007698] hover:bg-[#e6f4f9] dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-800 font-bold text-lg rounded-xl transition-colors duration-300"
                        aria-label="Explore group programs"
                      >
                        <Users className="w-5 h-5 mr-2" />
                        Explore Group Programs
                      </Link>
                    </div>
                  </div>

                  <div className="relative">
                    <div className={`rounded-3xl overflow-hidden shadow-2xl ${theme === 'light' ? 'shadow-blue-200' : 'shadow-gray-800'
                      }`}>
                      {/* Tutoring visualization */}
                      <div className={`aspect-4/3 flex items-center justify-center ${theme === 'light'
                        ? 'bg-linear-to-br from-blue-500 to-cyan-400'
                        : 'bg-linear-to-br from-gray-700 to-gray-800'
                        }`}>
                        <div className="text-center p-8">
                          <div className="text-6xl mb-6">👩‍🏫</div>
                          <h3 className="text-3xl font-bold text-white mb-4">1:1 Expert Tutoring</h3>
                          <p className="text-blue-100">Launching Q2 2024</p>
                        </div>
                      </div>
                    </div>

                    {/* Stats overlay */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className={`grid grid-cols-3 gap-4 p-6 rounded-2xl ${theme === 'light'
                        ? 'bg-white/90 backdrop-blur-sm border border-blue-100 shadow-xl'
                        : 'bg-gray-800/90 backdrop-blur-sm border border-gray-700 shadow-xl'
                        }`}>
                        {[
                          { value: "95%", label: "Success Rate", icon: <Award className="w-4 h-4" /> },
                          { value: "50+", label: "Expert Tutors", icon: <Users className="w-4 h-4" /> },
                          { value: "1:1", label: "Student Ratio", icon: <UserCheck className="w-4 h-4" /> }
                        ].map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-2 mx-auto ${theme === 'light' ? 'bg-[#e6f4f9]' : 'bg-gray-700'
                              }`}>
                              <span className={theme === 'light' ? 'text-[#007698]' : 'text-gray-300'}>
                                {stat.icon}
                              </span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
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

            {/* Subjects & Grades Filter */}
            <section className="py-16 px-4 md:px-8 lg:px-16" aria-label="Tutoring Subjects">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Comprehensive <span style={{ color: primaryColor }}>Math</span> Support
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    From basic arithmetic to advanced calculus and competition math,
                    our expert tutors cover all mathematics subjects and grade levels.
                  </p>
                </div>

                {/* Grade Level Filter */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Select Grade Level
                  </h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {gradeLevels.map((grade) => (
                      <button
                        key={grade.id}
                        onClick={() => setSelectedGrade(grade.id)}
                        className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${selectedGrade === grade.id
                          ? theme === 'light'
                            ? 'bg-[#007698] text-white shadow-lg'
                            : 'bg-gray-700 text-white shadow-lg'
                          : theme === 'light'
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                        aria-label={`Filter by ${grade.name}`}
                      >
                        <span className="mr-2 text-xl">{grade.icon}</span>
                        <span className="font-semibold">{grade.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subjects Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {subjects.map((subject) => (
                    <div
                      key={subject.id}
                      className={`p-6 rounded-xl text-center transition-all duration-300 hover:transform hover:-translate-y-2 ${theme === 'light'
                        ? 'bg-white border border-gray-100 shadow-md hover:shadow-xl'
                        : 'bg-gray-800 border border-gray-700 shadow-lg hover:shadow-xl'
                        }`}
                    >
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 mx-auto ${theme === 'light' ? 'bg-[#e6f4f9]' : 'bg-gray-700'
                        }`}>
                        <span className="text-3xl">{subject.icon}</span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {subject.name}
                      </h3>

                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {subject.count} expert tutors
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section
              className={`py-20 px-4 md:px-8 lg:px-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                }`}
              aria-label="Tutoring Features"
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Why Choose Our <span style={{ color: primaryColor }}>Tutoring</span>?
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    We combine expert instruction with personalized attention to deliver
                    results that go beyond improved grades.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`p-8 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-2 ${theme === 'light'
                        ? 'bg-white shadow-lg hover:shadow-2xl border border-gray-100'
                        : 'bg-gray-700 shadow-xl hover:shadow-2xl border border-gray-600'
                        }`}
                    >
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${theme === 'light'
                        ? 'bg-[#007698] text-white'
                        : 'bg-gray-700 text-gray-300'
                        }`}>
                        {feature.icon}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {feature.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Qualifications */}
                <div className={`mt-16 p-8 rounded-2xl ${theme === 'light'
                  ? 'bg-linear-to-r from-blue-50 to-cyan-50 border border-blue-100'
                  : 'bg-linear-to-r from-gray-800 to-gray-900 border border-gray-700'
                  }`}>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Our Tutor Qualifications
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {qualifications.map((qualification, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className={`w-5 h-5 mr-3 ${theme === 'light' ? 'text-green-500' : 'text-green-400'
                          }`} />
                        <span className="text-gray-700 dark:text-gray-300">{qualification}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Packages Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16" aria-label="Tutoring Packages">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Tutoring <span style={{ color: primaryColor }}>Packages</span>
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Choose the package that best fits your child's needs and learning goals.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {packages.map((pkg, index) => (
                    <div
                      key={index}
                      className={`relative rounded-2xl overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-4 ${pkg.popular
                        ? theme === 'light'
                          ? `ring-4 ring-[${primaryColor}] shadow-2xl`
                          : 'ring-4 ring-gray-600 shadow-2xl'
                        : theme === 'light'
                          ? 'shadow-xl border border-gray-100'
                          : 'shadow-xl border border-gray-700'
                        }`}
                    >
                      {pkg.popular && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className={`px-6 py-2 rounded-full font-bold ${theme === 'light'
                            ? 'bg-linear-to-r from-[#007698] to-[#8bc540] text-white'
                            : 'bg-linear-to-r from-gray-700 to-gray-800 text-white'
                            }`}>
                            MOST POPULAR
                          </div>
                        </div>
                      )}

                      <div className={`h-2 ${theme === 'light' ? 'bg-[#007698]' : 'bg-gray-600'}`}></div>

                      <div className={`p-8 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          {pkg.name}
                        </h3>

                        <div className="mb-6">
                          <div className="text-4xl font-bold text-gray-900 dark:text-white">
                            {pkg.price}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400">
                            {pkg.sessions} • {pkg.perSession}
                          </div>
                        </div>

                        <ul className="space-y-4 mb-8">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className={`w-5 h-5 mr-3 mt-0.5 ${theme === 'light' ? 'text-green-500' : 'text-green-400'
                                }`} />
                              <span className="text-gray-700 dark:text-gray-300">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={() => console.log(`Selected ${pkg.name}`)}
                          className={`w-full py-4 rounded-lg font-bold transition-all duration-300 ${pkg.popular
                            ? theme === 'light'
                              ? 'bg-[#007698] hover:bg-[#005a75] text-white'
                              : 'bg-gray-700 hover:bg-gray-600 text-white'
                            : theme === 'light'
                              ? 'bg-[#e6f4f9] text-[#007698] hover:bg-[#d4e9f3]'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                          aria-label={`Select ${pkg.name} package`}
                        >
                          {pkg.popular ? 'Get Started' : 'Learn More'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <p className="text-gray-600 dark:text-gray-400">
                    Need a custom package?{' '}
                    <button
                      className={`font-semibold underline ${theme === 'light'
                        ? 'text-[#007698] hover:text-[#005a75]'
                        : 'text-gray-400 hover:text-gray-300'
                        }`}
                      onClick={() => console.log('Custom package request')}
                    >
                      Contact us for a personalized quote
                    </button>
                  </p>
                </div>
              </div>
            </section>

            {/* How It Works */}
            <section
              className={`py-20 px-4 md:px-8 lg:px-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                }`}
              aria-label="How Tutoring Works"
            >
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    How It <span style={{ color: primaryColor }}>Works</span>
                  </h2>
                </div>

                <div className="relative">
                  {/* Connection line */}
                  <div className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${theme === 'light' ? 'bg-blue-200' : 'bg-gray-700'
                    }`}></div>

                  {/* Steps */}
                  {[
                    {
                      step: "1",
                      title: "Free Assessment",
                      description: "We evaluate your child's current level and learning goals",
                      icon: "📝"
                    },
                    {
                      step: "2",
                      title: "Tutor Matching",
                      description: "We match your child with the perfect expert tutor",
                      icon: "👥"
                    },
                    {
                      step: "3",
                      title: "Personalized Plan",
                      description: "Custom learning plan created for your child's needs",
                      icon: "🎯"
                    },
                    {
                      step: "4",
                      title: "Start Learning",
                      description: "Begin sessions and track progress toward goals",
                      icon: "🚀"
                    },
                    {
                      step: "5",
                      title: "Progress Reports",
                      description: "Regular updates on improvement and achievements",
                      icon: "📊"
                    }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2 md:pl-8' : 'md:pl-1/2 md:pr-8 md:text-right'
                        }`}
                    >
                      <div className={`p-8 rounded-2xl ${theme === 'light'
                        ? 'bg-white shadow-lg border border-blue-100'
                        : 'bg-gray-700 shadow-xl border border-gray-600'
                        }`}>
                        <div className="flex md:flex-col items-center md:items-start md:space-y-4">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-6 md:mr-0 ${theme === 'light'
                            ? 'bg-[#007698] text-white'
                            : 'bg-gray-700 text-gray-300'
                            }`}>
                            <span className="text-2xl">{item.icon}</span>
                          </div>
                          <div>
                            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mr-3 md:mb-2 ${theme === 'light' ? 'bg-[#e6f4f9] text-[#007698]' : 'bg-gray-700 text-gray-300'
                              }`}>
                              {item.step}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white inline md:block">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Step dot */}
                      <div className={`absolute w-6 h-6 rounded-full border-4 ${theme === 'light' ? 'border-white' : 'border-gray-700'
                        } hidden md:block`} style={{
                          backgroundColor: primaryColor,
                          left: index % 2 === 0 ? 'calc(50% - 3px)' : 'calc(50% - 3px)',
                          top: '40px'
                        }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Waitlist CTA */}
            <section className="py-20 px-4 md:px-8 lg:px-16" aria-label="Join Waitlist">
              <div className="max-w-4xl mx-auto">
                <div className={`rounded-3xl p-8 md:p-12 text-center ${theme === 'light'
                  ? 'bg-linear-to-r from-[#007698] to-[#8bc540] text-white'
                  : 'bg-linear-to-r from-gray-800 to-gray-900 text-white'
                  }`}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to Transform Your Child's Math Journey?
                  </h2>

                  <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                    Join our waitlist to be the first to access our premium tutoring
                    services and receive exclusive early bird benefits.
                  </p>

                  <form className="max-w-2xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="tutoring-email" className="sr-only">Email Address</label>
                        <input
                          type="email"
                          id="tutoring-email"
                          placeholder="Email Address"
                          className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                      </div>
                      <div>
                        <label htmlFor="tutoring-phone" className="sr-only">Phone Number</label>
                        <input
                          type="tel"
                          id="tutoring-phone"
                          placeholder="Phone Number"
                          className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                      <div>
                        <label htmlFor="tutoring-grade" className="sr-only">Grade Level</label>
                        <select
                          id="tutoring-grade"
                          className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                          defaultValue=""
                        >
                          <option value="" className="text-gray-900">Select Grade Level</option>
                          <option value="k-2" className="text-gray-900">Grades K-2</option>
                          <option value="3-5" className="text-gray-900">Grades 3-5</option>
                          <option value="6-8" className="text-gray-900">Grades 6-8</option>
                          <option value="9-12" className="text-gray-900">Grades 9-12</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="tutoring-subject" className="sr-only">Main Subject</label>
                        <select
                          id="tutoring-subject"
                          className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                          defaultValue=""
                        >
                          <option value="" className="text-gray-900">Select Main Subject</option>
                          <option value="general" className="text-gray-900">General Math</option>
                          <option value="algebra" className="text-gray-900">Algebra</option>
                          <option value="geometry" className="text-gray-900">Geometry</option>
                          <option value="calculus" className="text-gray-900">Calculus</option>
                          <option value="sat" className="text-gray-900">SAT/ACT Prep</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full md:w-auto px-10 py-4 bg-white text-[#007698] hover:bg-gray-100 font-bold text-lg rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
                    >
                      Join Tutoring Waitlist
                    </button>

                    <p className="text-sm mt-6 opacity-80">
                      We respect your privacy and will only contact you about tutoring services.
                    </p>
                  </form>
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-4 md:px-8 lg:px-16" aria-label="Contact Information">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                  Questions About Tutoring?
                </h2>

                <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                  Our tutoring team is ready to help you find the perfect solution
                  for your child's academic success.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link
                    to="/contacts"
                    className="inline-flex items-center justify-center px-10 py-5 bg-[#007698] hover:bg-[#005a75] dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-bold text-lg rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl"
                    aria-label="Contact tutoring team"
                  >
                    <span className="mr-3">💬</span>
                    Contact Tutoring Team
                  </Link>

                  <a
                    href="tel:+15551234567"
                    className="inline-flex items-center justify-center px-10 py-5 border-2 border-[#007698] text-[#007698] hover:bg-[#e6f4f9] dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-800 font-bold text-lg rounded-xl transition-colors duration-300"
                    aria-label="Call tutoring hotline"
                  >
                    <span className="mr-3">📞</span>
                    Call: (555) 123-4567
                  </a>
                </div>
              </div>
            </section>
          </main>
        </div>
      </Suspense>
    </>
  );
};

export default Tutoring;