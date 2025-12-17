import React, { useState, lazy, Suspense } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';

// Lazy load components for better performance
const Logo = lazy(() => import('../../components/Logo'));

// Import images with lazy loading
import streitigy from './../../assets/streitigy-high-bg-remove.png';
import icon1 from './../../assets/icon1.png';
import icon2 from './../../assets/icon2.png';
import icon3 from './../../assets/icon3.png';
import icon4 from './../../assets/icon4.png';
import ElementaryTestimonial from './../../assets/high-school-testimonial.png';

const HighSchool = () => {
  const { theme } = useThemeStore();
  const [open, setOpen] = useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  // Structured Data for High School Program
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "High School Math Program (Grades 9-12) | AP Calculus, SAT Prep - Our World of Education",
    "description": "Comprehensive high school mathematics program covering Algebra, Geometry, Trigonometry, Pre-Calculus, Calculus AB/BC, Statistics. SAT, ACT, AP test preparation and college readiness.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Our World of Education",
      "url": "https://our-we.netlify.app"
    },
    "educationalLevel": "High School",
    "timeToComplete": "P9M",
    "typicalAgeRange": "14-18",
    "courseCode": "HS-MATH",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": ["classroom", "online"],
      "courseWorkload": "PT2H",
      "educationalAlignment": {
        "@type": "AlignmentObject",
        "alignmentType": "educationalLevel",
        "educationalFramework": "Common Core",
        "targetName": "Grades 9-12 Mathematics"
      },
      "coursePrerequisites": "Algebra I proficiency recommended"
    }
  };

  const whatExpect = [
    {
      id: '1',
      heading: '2 hours per week',
      para: 'Our classes meet for 1.5 hrs - 2 hrs a week, depending on age.',
      icon: icon1,
      alt: 'Weekly class hours icon'
    },
    {
      id: '2',
      heading: 'The Classroom',
      para: 'A classroom environment is key to our methodology. Classes consist of up to 12 students and an expert teacher leading an interactive lesson.',
      icon: icon2,
      alt: 'Classroom environment icon'
    },
    {
      id: '3',
      heading: 'Homework',
      para: 'Homework is assigned each week to reinforce the math concepts taught in class that week.',
      icon: icon3,
      alt: 'Homework assignment icon'
    },
    {
      id: '4',
      heading: 'A Unique Curriculum',
      para: 'Perfected over two decades by our team of gifted academics, our curriculum is inspired by elite mathematical schools and adapted for the U.S. educational environment.',
      icon: icon4,
      alt: 'Unique curriculum icon'
    },
  ];

  const results = [
    {
      heading: '6th',
      para: 'Team OWE places 6th out of 150 on the Harvard-MIT Math Tournament',
      metric: 'HMMT Ranking'
    },
    {
      heading: '774',
      para: 'Average 11th Grade Math SAT score',
      metric: 'SAT Math Average'
    },
    {
      heading: '75%',
      para: 'of our competition program high-school students qualified for AIME',
      metric: 'AIME Qualification Rate'
    },
    {
      heading: '250k+',
      para: 'OWE alumni go on to attend the best universities in the world',
      metric: 'Successful Alumni'
    },
  ];

  const FAQ = [
    {
      id: '1',
      heading: 'Is High School too late for my child to begin your program?',
      para: "Though we believe it is best to begin mathematical training early, high school is not too late to start our program. During your evaluation, the principal will discuss your goals with you and your child, and explain how our program can best help you meet them.",
    },
    {
      id: '2',
      heading: 'Why are you called "Our World of Education"?',
      para: 'The "Our World" comes from our approach - which is based on elite math schools, adapted to the U.S. environment. According to tradition - the study of mathematics is the pre-eminent tool of mental development. We teach math to build mathematical excellence, intellect and character.',
    },
    {
      id: '3',
      heading: 'Where does your curriculum come from?',
      para: 'We offer one continuous curriculum, from K-12. Our curriculum and methodology, perfected over 20 years by our team of gifted academics, is inspired by elite mathematical schools and adapted for the American educational environment.',
    },
    {
      id: '4',
      heading: 'How much homework should I expect?',
      para: 'The goal of homework is to reinforce what was taught in class. Our teachers assign just enough to strengthen skills developed in class. Homework should take approximately half the length of your child\'s lesson to complete.',
    },
    {
      id: '5',
      heading: 'How long are your classes?',
      para: 'Our high school classes typically meet once a week for 2-3 hours, depending on the specific course and level of instruction.',
    },
    {
      id: '6',
      heading: 'How big are your classes? What is the teacher to student ratio?',
      para: 'Our average class size is 12, with three levels per grade to ensure each child is placed appropriately. Classrooms enable students to verbalize and debate ideas and exposes them to different ways of thinking.',
    },
    {
      id: '7',
      heading: 'Who are your teachers?',
      para: 'All our teachers have a background in mathematics or related field and passion for the subject. They undergo extensive training to teach according to our specific methodology and curriculum.',
    },
    {
      id: '8',
      heading: 'Will your program confuse my child in school?',
      para: 'The concepts we cover are fundamental and studied in depth from multiple angles. This empowers students by deepening their understanding. Children master concepts that help them adapt to any school format.',
    },
    {
      id: '9',
      heading: 'What is your tuition?',
      para: 'For specific tuition details, please visit the "tuition" section of your OWE branch of choice.',
    },
    {
      id: '10',
      heading: 'Is your program right for my child?',
      para: 'We have designed multiple levels for every grade to serve each child\'s development. We recommend scheduling a free evaluation to recommend a class best suited to your child.',
    },
  ];

  const strategies = [
    {
      id: '1',
      heading: 'Abstract thinking',
      para: "Our students are exposed to math problems that require manipulating and integrating multiple abstract ideas - those that are new and already mastered. This way students master new concepts on a deeper and connected level.",
      colorLight: '#8bc540',
      colorDark: '#bbeb7d',
    },
    {
      id: '2',
      heading: 'Mental flexibility',
      para: "We focus on perfecting our students' ability to leverage their deep math foundation, logic, and reasoning skills in order to solve highly complex problems.",
      colorDark: '#90def3',
      colorLight: '#007698',
    },
    {
      id: '3',
      heading: 'Challenge',
      para: "Our rigorous instruction encourages students to perform to their full potential. Students are also familiarized with working under pressure, particularly as it relates to examinations and competitions.",
      colorDark: '#fdf3b3',
      colorLight: '#ebd85e',
    },
    {
      id: '4',
      heading: 'Environment',
      para: "Students compete with one another and also collaborate to solve complex problems. They learn how to thrive in an environment of peers with competing ideas and intellect - preparing them for college and career.",
      colorDark: '#f8deb3',
      colorLight: '#feb746',
    },
  ];

  const programLevels = [
    {
      level: 'I - Accelerated Level',
      description: 'Often the best fit for new students, this curriculum meets students where they are, builds their math foundation, and brings them to international standards.',
    },
    {
      level: 'II - Advanced Level',
      description: 'Most students continue here, where we offer challenging mathematics that provides deep understanding, reasoning skills, and confidence for success.',
    },
    {
      level: 'III - Honors Level',
      description: 'This rigorous curriculum goes into great depth and employs competition-level problems. Many Honors students also choose to participate in math competitions.',
    },
  ];

  return (
    <>
      <SEO
        title="High School Math Program (Grades 9-12) | AP Calculus, SAT/ACT Prep - Our World of Education"
        description="Comprehensive high school mathematics program: Algebra, Geometry, Trigonometry, Pre-Calculus, Calculus AB/BC, Statistics. SAT, ACT, AP test preparation and college readiness support."
        keywords="high school math, AP calculus, SAT math preparation, ACT math, college prep math, algebra 2, trigonometry, pre-calculus, statistics, math competition, AIME preparation"
        url="https://our-we.netlify.app/programs/high-school"
        structuredData={structuredData}
      />

      <Suspense fallback={<LoadingSpinner />}>
        <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
          <main>
            {/* Hero Section */}
            <section
              className={`min-h-[55vh] md:min-h-[76vh] pt-16 py-4 md:pt-20 px-4 md:px-16 ${theme === 'light' ? 'bg-[#ceb007a6]' : 'bg-gray-800'
                }`}
              aria-label="High School Program Overview"
            >
              <div className="max-w-7xl mx-auto">
                <div className="hidden sm:block">
                  <div className="min-h-[40vh] flex flex-col items-start justify-center">
                    <h1 className="font-extrabold text-3xl md:text-4xl lg:text-5xl text-[#007698] dark:text-white mb-4 lg:max-w-2xl">
                      Positioned for Success
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 lg:max-w-2xl">
                      Whether our high school students need to shine on rigorous high school courses or college resumes, our math program prepares them to succeed whatever their goal.
                    </p>
                    <Link
                      to="/contacts"
                      className="inline-block px-8 py-3 bg-[#007698] dark:bg-[#8bc540] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                      aria-label="Schedule an evaluation for high school program"
                    >
                      Schedule an Evaluation
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Mobile Hero Section */}
            <section
              className={`sm:hidden ${theme === 'light' ? 'bg-[#007698]' : 'bg-gray-700'} text-white`}
              aria-label="Mobile High School Overview"
            >
              <div className="p-4 flex flex-col items-center">
                <Link
                  to="/contacts"
                  className="w-full py-3 bg-white dark:bg-gray-800 text-[#007698] dark:text-white text-center rounded-b-md font-medium"
                  aria-label="Schedule evaluation mobile"
                >
                  Schedule an Evaluation
                </Link>
                <h2 className="text-2xl font-bold mt-6 mb-4 text-center">
                  Positioned for Success
                </h2>
                <p className="text-gray-100 text-center">
                  Whether our high school students need to shine on rigorous high school courses or college resumes, our math program prepares them to succeed whatever their goal.
                </p>
              </div>
            </section>

            {/* Program Philosophy Section */}
            <section className="py-12 px-4 md:px-16" aria-label="Program Philosophy">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-extrabold text-3xl md:text-4xl lg:text-5xl text-gray-800 dark:text-white mb-8">
                  Our students develop a mastery of Algebra, Geometry, Trigonometry,
                  Pre-Calculus, Calculus AB/BC, and Statistics. We also work to
                  prepare them for the SAT, ACT, AP tests, and math competitions.
                </h2>
              </div>
            </section>

            {/* How It Works Section */}
            <section
              className="py-12 px-4 md:px-16 bg-gray-50 dark:bg-gray-800"
              aria-label="How Our Program Works"
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="font-bold text-3xl md:text-4xl text-gray-800 dark:text-white mb-6">
                      How It Works
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8">
                      Our high school program builds on the foundation laid in years before
                      to further deepen our students' knowledge of advanced algebraic and
                      geometric concepts as well as calculus. We also ensure our students
                      are well prepared for university entrance exams, APs, and math competitions.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {strategies.map((strategy) => (
                        <div key={strategy.id} className="mb-6">
                          <h3
                            className="text-xl md:text-2xl font-bold mb-3"
                            style={{
                              color: theme === 'light' ? strategy.colorLight : strategy.colorDark
                            }}
                          >
                            {strategy.heading}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {strategy.para}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <figure>
                      <img
                        src={streitigy}
                        alt="High school educational strategy visualization"
                        className="w-full max-w-md"
                        loading="lazy"
                        width="400"
                        height="300"
                      />
                    </figure>
                    <div className="mt-6">
                      <Logo width={150} height={60} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Program Levels Section */}
            <section className="py-12 px-4 md:px-16" aria-label="Program Levels">
              <div className="max-w-7xl mx-auto">
                <h2 className="font-extrabold text-3xl md:text-4xl text-gray-800 dark:text-white mb-12 text-center">
                  With multiple levels in each grade, from beginner to competition,
                  we are able to ensure that each child is placed in an environment best suited to them.
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                  {programLevels.map((level, index) => (
                    <article
                      key={index}
                      className={`p-6 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                        }`}
                    >
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                        {level.level}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {level.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Competition Preparation Banner */}
            <section className="py-12 px-4 md:px-16" aria-label="Competition Preparation">
              <div className="max-w-7xl mx-auto">
                <div className={`rounded-xl p-8 ${theme === 'light' ? 'bg-[#007698] text-white' : 'bg-[#8bc540] text-gray-900'
                  }`}>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h2 className="text-3xl font-bold mb-6">
                        Math Competition Preparation
                      </h2>
                      <p className="text-lg mb-6">
                        Success with math competitions comes first with the deep
                        and broad foundation best delivered in our core classes.
                        For those interested in focused competition study,
                        we offer a selective program for national and international math competitions.
                      </p>
                    </div>
                    <div className="text-right">
                      <Link
                        to="/programs/competitions"
                        className="inline-block px-8 py-3 bg-white text-[#007698] rounded-lg hover:opacity-90 transition-opacity font-medium text-lg"
                        aria-label="Learn more about competition preparation"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonial & Video Section */}
            <section className="py-12 px-4 md:px-16" aria-label="Student Testimonials">
              <div className="max-w-7xl mx-auto">
                <div className={`rounded-lg p-8 border-l-8 ${theme === 'light' ? 'bg-gray-50 border-l-[#007698]' : 'bg-gray-800 border-l-[#8bc540]'
                  }`}>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <blockquote className="text-2xl italic text-gray-700 dark:text-gray-300 mb-6">
                        <span className="text-4xl text-[#007698] dark:text-[#8bc540] font-bold mr-2">"</span>
                        Learn more about our program and hear from our students in this video.
                      </blockquote>
                    </div>
                    <div className="aspect-video">
                      <iframe
                        src="https://www.youtube.com/embed/lhv72TsRvHU"
                        title="Our World of Education High School Program Video"
                        className="w-full h-full rounded-lg"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* What to Expect Section */}
            <section
              className="py-12 px-4 md:px-16 bg-gray-50 dark:bg-gray-800"
              aria-label="What to Expect"
            >
              <div className="max-w-7xl mx-auto">
                <h2 className="font-bold text-3xl md:text-4xl text-gray-800 dark:text-white mb-12">
                  What to Expect
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {whatExpect.map((item) => (
                    <article key={item.id} className="text-center">
                      <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
                        }`}>
                        <img
                          src={item.icon}
                          alt={item.alt}
                          className="w-12 h-12"
                          loading="lazy"
                          width="48"
                          height="48"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                        {item.heading}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.para}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Results Section */}
            <section className="py-12 px-4 md:px-16" aria-label="Program Results">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <h2 className="font-bold text-3xl md:text-4xl text-gray-800 dark:text-white">
                    Our Results
                  </h2>
                  <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
                    Our high school students achieve exceptional results in math competitions,
                    standardized tests, and college admissions. They develop the skills and
                    confidence needed for success in college and beyond.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-lg text-center ${theme === 'light' ? 'bg-[#007698] text-white' : 'bg-gray-800 text-white'
                        }`}
                    >
                      <div className="text-5xl md:text-6xl font-bold mb-4">
                        {result.heading}
                      </div>
                      <p className="text-lg mb-4">{result.para}</p>
                      <div className="text-sm opacity-80">{result.metric}</div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Link
                    to="/blog"
                    className="inline-block px-8 py-3 bg-[#007698] dark:bg-[#8bc540] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                    aria-label="View all program results"
                  >
                    View All Results
                  </Link>
                </div>
              </div>
            </section>

            {/* Student Testimonial Section */}
            <section className="py-12 px-4 md:px-16 bg-gray-50 dark:bg-gray-800" aria-label="Student Testimonial">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <blockquote className="text-2xl italic text-gray-700 dark:text-gray-300 mb-6">
                      <span className="text-4xl text-[#007698] dark:text-[#8bc540] font-bold mr-2">"</span>
                      Ms. Kozlova, We are four of your former students and we wanted to let you know that we were all accepted to MIT.
                      We're thrilled to join the class of 2020 this fall! Reaching this milestone would not have been possible without
                      your dedication to our classes.
                      <span className="text-4xl text-[#007698] dark:text-[#8bc540] font-bold ml-2">"</span>
                    </blockquote>
                    <div>
                      <cite className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                        — 4 OWE Students
                      </cite>
                      <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">12th grade</p>
                    </div>
                  </div>
                  <div>
                    <img
                      src={ElementaryTestimonial}
                      alt="High school student testimonial"
                      className="w-full rounded-lg shadow-lg"
                      loading="lazy"
                      width="600"
                      height="400"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section with Schema Markup */}
            <section
              className="py-12 px-4 md:px-16"
              aria-label="Frequently Asked Questions"
              itemScope
              itemType="https://schema.org/FAQPage"
            >
              <div className="max-w-4xl mx-auto">
                <h2 className="font-bold text-3xl md:text-4xl text-gray-800 dark:text-white mb-12">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                  {FAQ.map((item) => (
                    <article
                      key={item.id}
                      className={`border-b ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} py-6`}
                      itemScope
                      itemProp="mainEntity"
                      itemType="https://schema.org/Question"
                    >
                      <button
                        onClick={() => handleOpen(item.id)}
                        className="flex items-center justify-between w-full text-left"
                        aria-expanded={open === item.id}
                        aria-controls={`faq-answer-${item.id}`}
                      >
                        <h3
                          className="font-bold text-xl md:text-2xl text-gray-800 dark:text-gray-200 flex-1"
                          itemProp="name"
                        >
                          {item.heading}
                        </h3>
                        <span className={`ml-4 ${theme === 'light' ? 'text-[#007698]' : 'text-[#8bc540]'}`}>
                          {open === item.id ?
                            <FaChevronUp size={24} aria-label="Collapse answer" /> :
                            <FaChevronDown size={24} aria-label="Expand answer" />
                          }
                        </span>
                      </button>

                      <div
                        id={`faq-answer-${item.id}`}
                        className={`mt-4 ${open === item.id ? 'block' : 'hidden'}`}
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                      >
                        <p
                          className="text-gray-600 dark:text-gray-300 text-lg"
                          itemProp="text"
                        >
                          {item.para}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-12 px-4 md:px-16" aria-label="Get Started">
              <div className="max-w-7xl mx-auto">
                <div className={`rounded-2xl p-8 md:p-12 ${theme === 'light' ? 'bg-[#8bc540]' : 'bg-[#007698]'
                  } text-white`}>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <h2 className="text-3xl md:text-4xl font-bold">
                      Find out if our program is right for your child.
                    </h2>
                    <div className="text-right">
                      <Link
                        to="/contacts"
                        className="inline-block px-8 py-3 bg-white text-[#007698] dark:text-[#8bc540] rounded-lg hover:opacity-90 transition-opacity font-medium text-lg"
                        aria-label="Schedule evaluation for high school program"
                      >
                        Schedule an Evaluation
                      </Link>
                    </div>
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

export default HighSchool;