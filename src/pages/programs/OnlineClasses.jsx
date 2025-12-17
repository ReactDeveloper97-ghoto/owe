import React, { lazy, Suspense } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';

// Import images (create or add these assets)
// import onlineLearningImage from './../../assets/online-classes-hero.jpg';
// import virtualClassIcon from './../../assets/virtual-class-icon.png'; 
// import scheduleIcon from './../../assets/schedule-icon.png'; 
// import interactiveIcon from './../../assets/interactive-icon.png'; 

const OnlineClasses = () => {
  const { theme } = useThemeStore();

  // Structured Data for Online Classes
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Course", "VirtualLocation"],
    "name": "Online Math Classes & Virtual Learning | Our World of Education",
    "description": "Interactive online mathematics classes for K-12 students. Virtual learning with expert teachers, live sessions, and personalized instruction from anywhere.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Our World of Education",
      "url": "https://our-we.netlify.app"
    },
    "educationalLevel": ["ElementarySchool", "MiddleSchool", "HighSchool"],
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseSchedule": "Flexible scheduling available",
      "educationalAlignment": {
        "@type": "AlignmentObject",
        "alignmentType": "teaches",
        "educationalFramework": "Common Core State Standards"
      }
    },
    "location": {
      "@type": "VirtualLocation",
      "name": "OWE Virtual Classroom",
      "url": "https://our-we.netlify.app/online-classes"
    }
  };

  // Features of upcoming online classes
  const features = [
    {
      id: 1,
      title: "Live Interactive Sessions",
      description: "Real-time instruction with expert mathematics teachers in virtual classrooms",
      icon: "🎯",
      color: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-800 dark:text-blue-200"
    },
    {
      id: 2,
      title: "Flexible Scheduling",
      description: "Classes designed to fit your family's schedule with multiple time options",
      icon: "⏰",
      color: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-800 dark:text-green-200"
    },
    {
      id: 3,
      title: "Personalized Attention",
      description: "Small class sizes ensuring individual attention and customized learning paths",
      icon: "👤",
      color: "bg-purple-100 dark:bg-purple-900",
      textColor: "text-purple-800 dark:text-purple-200"
    },
    {
      id: 4,
      title: "Interactive Tools",
      description: "Digital whiteboards, collaborative workspaces, and interactive learning materials",
      icon: "💻",
      color: "bg-yellow-100 dark:bg-yellow-900",
      textColor: "text-yellow-800 dark:text-yellow-200"
    }
  ];

  // Benefits of online learning
  const benefits = [
    "Learn from anywhere - no commute needed",
    "Access to expert teachers nationwide",
    "Recorded sessions for review",
    "Interactive digital materials",
    "Safe learning environment",
    "Flexible rescheduling options"
  ];

  return (
    <>
      <SEO
        title="Online Math Classes & Virtual Learning | Grades K-12 | Our World of Education"
        description="Interactive online mathematics classes for K-12 students. Virtual learning with expert teachers, live sessions, flexible scheduling, and personalized instruction. Launching soon!"
        keywords="online math classes, virtual learning, online mathematics, K-12 online classes, live math tutoring, virtual classroom, online education, remote learning, homeschool math"
        url="https://our-we.netlify.app/online-classes"
        structuredData={structuredData}
      />

      <Suspense fallback={<LoadingSpinner />}>
        <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
          <main className="pt-16">
            {/* Hero Section */}
            <section
              className={`py-16 px-4 md:px-8 lg:px-16 ${theme === 'light'
                ? 'bg-linear-to-r from-blue-50 to-cyan-50'
                : 'bg-linear-to-r from-gray-800 to-gray-900'
                }`}
              aria-label="Online Classes Introduction"
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
                      <span className="mr-2">🚀</span> Coming Soon
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                      Online Math Classes
                      <span className="block text-blue-600 dark:text-blue-400 mt-2">
                        Coming Soon!
                      </span>
                    </h1>

                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                      We're bringing our acclaimed mathematics curriculum to a virtual classroom.
                      Experience the same quality education, expert instruction, and proven results
                      from the comfort of your home.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/contacts"
                        className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
                        aria-label="Get notified when online classes launch"
                      >
                        <span className="mr-2">📧</span>
                        Get Notified at Launch
                      </Link>

                      <Link
                        to="/programs"
                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 font-semibold rounded-lg transition-colors duration-300"
                        aria-label="Explore current in-person programs"
                      >
                        Explore In-Person Programs
                      </Link>
                    </div>
                  </div>

                  <div className="relative">
                    <div className={`rounded-2xl overflow-hidden shadow-2xl ${theme === 'light' ? 'shadow-blue-200' : 'shadow-gray-800'
                      }`}>
                      {/* Placeholder for online class visualization */}
                      <div className={`h-64 md:h-96 flex items-center justify-center ${theme === 'light' ? 'bg-linear-to-br from-blue-500 to-cyan-400' : 'bg-linear-to-br from-blue-900 to-gray-800'
                        }`}>
                        <div className="text-center">
                          <div className="text-6xl mb-4">📚</div>
                          <h3 className="text-2xl font-bold text-white">Virtual Classroom</h3>
                          <p className="text-blue-100">Launching 2024</p>
                        </div>
                      </div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                      <div className="text-3xl">👩‍🏫</div>
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                      <div className="text-3xl">💬</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 md:px-8 lg:px-16" aria-label="Online Class Features">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    What to Expect from Our Virtual Classes
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Our online program will maintain the same high standards and proven methodology
                    as our in-person classes, enhanced with digital tools for optimal learning.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {features.map((feature) => (
                    <article
                      key={feature.id}
                      className={`p-6 rounded-xl ${feature.color} ${feature.textColor} transition-transform duration-300 hover:scale-[1.02]`}
                    >
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="opacity-90">{feature.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Coming Soon Timeline */}
            <section
              className={`py-16 px-4 md:px-8 lg:px-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                }`}
              aria-label="Launch Timeline"
            >
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Our Launch Timeline
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    We're working diligently to bring you the best virtual learning experience
                  </p>
                </div>

                <div className="relative">
                  {/* Timeline line */}
                  <div className={`absolute left-4 md:left-1/2 h-full w-1 transform md:-translate-x-1/2 ${theme === 'light' ? 'bg-blue-200' : 'bg-blue-900'
                    }`}></div>

                  {/* Timeline items */}
                  {[
                    { phase: "Planning & Development", status: "✅ Complete", date: "Q3 2023", description: "Curriculum adaptation for virtual delivery" },
                    { phase: "Platform Testing", status: "✅ Complete", date: "Q4 2023", description: "Testing interactive tools and platforms" },
                    { phase: "Teacher Training", status: "🔄 In Progress", date: "Q1 2024", description: "Training instructors for virtual teaching" },
                    { phase: "Beta Launch", status: "⏳ Coming Soon", date: "Q2 2024", description: "Limited beta with select students" },
                    { phase: "Full Launch", status: "🎯 Target", date: "Fall 2024", description: "Open enrollment for all grades" }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`relative mb-8 ${index % 2 === 0 ? 'md:pr-1/2 md:pl-8' : 'md:pl-1/2 md:pr-8 md:text-right'} pl-12`}
                    >
                      <div className={`p-6 rounded-lg ${theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-700 shadow-xl'
                        }`}>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {item.phase}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.status.includes("Complete")
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : item.status.includes("Progress")
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            }`}>
                            {item.status}
                          </span>
                        </div>
                        <div className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                          }`}>
                          {item.date}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      </div>
                      {/* Timeline dot */}
                      <div className={`absolute w-4 h-4 rounded-full border-4 ${theme === 'light' ? 'border-white bg-blue-500' : 'border-gray-700 bg-blue-400'
                        }`} style={{
                          left: '26px',
                          top: '32px',
                          transform: 'translate(-50%, -50%)'
                        }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 px-4 md:px-8 lg:px-16" aria-label="Benefits of Online Learning">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                      Benefits of Online Learning with OWE
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                      Our virtual classes combine the convenience of online learning with the
                      academic rigor and personal attention that OWE is known for.
                    </p>

                    <ul className="space-y-4">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <span className={`mr-3 mt-1 shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${theme === 'light'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-green-900 text-green-300'
                            }`}>
                            ✓
                          </span>
                          <span className="text-lg text-gray-700 dark:text-gray-300">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-8 rounded-2xl ${theme === 'light'
                    ? 'bg-linear-to-br from-blue-50 to-cyan-50 border border-blue-100'
                    : 'bg-linear-to-br from-blue-900/30 to-gray-800/50 border border-gray-700'
                    }`}>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Join Our Waitlist
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Be the first to know when online classes launch and receive exclusive
                      early enrollment benefits.
                    </p>

                    <form className="space-y-4">
                      <div>
                        <label htmlFor="waitlist-email" className="sr-only">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="waitlist-email"
                          placeholder="Enter your email address"
                          className={`w-full px-4 py-3 rounded-lg border ${theme === 'light'
                            ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                            : 'border-gray-600 bg-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                            } focus:outline-none`}
                        />
                      </div>
                      <div className="flex gap-4">
                        <select
                          className={`flex-1 px-4 py-3 rounded-lg border ${theme === 'light'
                            ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                            : 'border-gray-600 bg-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
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
                      <button
                        type="submit"
                        className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${theme === 'light'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                          }`}
                      >
                        Join Waitlist
                      </button>
                    </form>

                    <p className={`text-sm mt-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section
              className={`py-16 px-4 md:px-8 lg:px-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                }`}
              aria-label="Frequently Asked Questions"
              itemScope
              itemType="https://schema.org/FAQPage"
            >
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-6">
                  {[
                    {
                      question: "When will online classes be available?",
                      answer: "We're targeting a full launch in Fall 2024. Join our waitlist to be notified as soon as enrollment opens."
                    },
                    {
                      question: "Will online classes have the same curriculum as in-person?",
                      answer: "Yes, we will offer the same rigorous OWE curriculum, adapted for optimal virtual delivery with interactive digital tools."
                    },
                    {
                      question: "What technology will I need for online classes?",
                      answer: "You'll need a computer or tablet with internet access, webcam, and microphone. Most modern devices will work perfectly."
                    },
                    {
                      question: "Will classes be live or pre-recorded?",
                      answer: "Our classes will be live and interactive, allowing real-time communication with teachers and classmates, with recordings available for review."
                    },
                    {
                      question: "Can I switch between online and in-person classes?",
                      answer: "Yes, we're designing the programs to be complementary, allowing flexibility based on your family's needs."
                    }
                  ].map((faq, index) => (
                    <article
                      key={index}
                      className={`p-6 rounded-lg ${theme === 'light' ? 'bg-white shadow' : 'bg-gray-700'
                        }`}
                      itemScope
                      itemProp="mainEntity"
                      itemType="https://schema.org/Question"
                    >
                      <h3
                        className="text-xl font-bold text-gray-900 dark:text-white mb-3"
                        itemProp="name"
                      >
                        {faq.question}
                      </h3>
                      <div
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                      >
                        <p
                          className="text-gray-600 dark:text-gray-300"
                          itemProp="text"
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 px-4 md:px-8 lg:px-16" aria-label="Call to Action">
              <div className="max-w-4xl mx-auto text-center">
                <div className={`rounded-2xl p-8 md:p-12 ${theme === 'light'
                  ? 'bg-linear-to-r from-blue-600 to-cyan-600'
                  : 'bg-linear-to-r from-blue-800 to-gray-800'
                  } text-white`}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready for the Future of Math Education?
                  </h2>
                  <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                    Join our community of families committed to mathematical excellence,
                    whether in-person or online.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/contacts"
                      className="px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-colors"
                      aria-label="Contact us for more information"
                    >
                      Contact Us for Details
                    </Link>
                    <Link
                      to="/programs"
                      className="px-8 py-4 border-2 border-white text-white hover:bg-white/10 font-semibold rounded-lg transition-colors"
                      aria-label="Explore current programs"
                    >
                      Explore Current Programs
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </Suspense>
    </>
  );
};

export default OnlineClasses;