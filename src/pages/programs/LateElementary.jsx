import React, { useState, lazy, Suspense } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';

// Lazy load components for better performance
const Logo = lazy(() => import('../../components/Logo'));

// Import images with lazy loading
import streitigy from './../../assets/streitigy-removebg-preview.png';
import icon1 from './../../assets/icon1.png';
import icon2 from './../../assets/icon2.png';
import icon3 from './../../assets/icon3.png';
import icon4 from './../../assets/icon4.png';
import ElementaryTestimonial from './../../assets/elementary-testimonial-2.png';

const LateElementary = () => {
  const { theme } = useThemeStore();
  const [open, setOpen] = useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  // Structured Data for Late Elementary Program
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Late Elementary Program (Grades 3-5) - Our World of Education",
    "description": "Advanced elementary math education focusing on mathematical reasoning, logic, and problem-solving skills. Three learning levels for grades 3-5 students.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Our World of Education",
      "url": "https://our-we.netlify.app"
    },
    "educationalLevel": "Elementary School",
    "timeToComplete": "P9M",
    "typicalAgeRange": "8-11",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": ["classroom", "online"],
      "courseWorkload": "PT2H",
      "educationalAlignment": {
        "@type": "AlignmentObject",
        "alignmentType": "educationalLevel",
        "educationalFramework": "Common Core",
        "targetName": "Grades 3-5 Mathematics"
      }
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
      heading: 'A+',
      para: 'Our students experience soaring confidence and grades',
      metric: 'Grade Improvement'
    },
    {
      heading: '21K',
      para: '21,000 Math Kangaroo winners across the nation!',
      metric: 'Competition Winners'
    },
    {
      heading: '4th',
      para: 'Every 4th OWE student who participated scored in the top 5% on the AMC8!',
      metric: 'AMC8 Top Performers'
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
      heading: 'Why are you called "Our World of Education"?',
      para: 'The "Our World" comes from our approach - which is based on elite math schools, adapted to the U.S. environment. According to tradition - the study of mathematics is the pre-eminent tool of mental development. We teach math to build mathematical excellence, intellect and character.',
    },
    {
      id: '2',
      heading: 'Where does your curriculum come from?',
      para: 'We offer one continuous curriculum, from K-12. Our curriculum and methodology, perfected over 20 years by our team of gifted academics, is inspired by elite mathematical schools and adapted for the American educational environment.',
    },
    {
      id: '3',
      heading: 'How much homework should I expect?',
      para: 'The goal of homework is to reinforce what was taught in class. Our teachers assign just enough to strengthen skills developed in class. Homework should take approximately half the length of your child\'s lesson to complete.',
    },
    {
      id: '4',
      heading: 'How long are your classes? Can an elementary school child sit that long?',
      para: 'Our class-times vary depending on a child\'s age. Starting from 1.5 hours for kindergarteners to 2-4 hours in high school. In younger grades, we regularly mix activities to keep students engaged.',
    },
    {
      id: '5',
      heading: 'How big are your classes? What is the teacher to student ratio?',
      para: 'Our average class size is 12, with three levels per grade to ensure each child is placed appropriately. Classrooms enable students to verbalize and debate ideas and exposes them to different ways of thinking.',
    },
    {
      id: '6',
      heading: 'Who are your teachers?',
      para: 'All our teachers have a background in mathematics or related field and passion for the subject. They undergo extensive training to teach according to our specific methodology and curriculum.',
    },
    {
      id: '7',
      heading: 'Will your program confuse my child in school?',
      para: 'The concepts we cover are fundamental and studied in depth from multiple angles. This empowers students by deepening their understanding. Children master concepts that help them adapt to any school format.',
    },
    {
      id: '8',
      heading: 'What is your tuition?',
      para: 'For specific tuition details, please visit the "tuition" section of your OWE branch of choice.',
    },
    {
      id: '9',
      heading: 'What is the best age to join?',
      para: 'With mathematics, as with a language or sport, the earlier a child starts the better. Our students begin to reason with abstract concepts in elementary school, and by middle school they can easily apply algebra in problem solving.',
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
      heading: 'Early abstract thinking',
      para: 'Our students use logic and reasoning skills for complex problem solving. They are guided to discover algebra and develop their ability to apply it to higher level problems.',
      colorLight: '#8bc540',
      colorDark: '#bbeb7d',
    },
    {
      id: '2',
      heading: 'Mental flexibility',
      para: 'Students see mathematics as an interconnected world, deriving new knowledge from what they already know. This forms a deep understanding of concepts as well as agility in application.',
      colorDark: '#90def3',
      colorLight: '#007698',
    },
    {
      id: '3',
      heading: 'Challenge',
      para: "We nudge students out of their comfort zones, exposing them to problems they're unable to immediately solve. This acquaints them with the thrill of accomplishment that comes with persistence.",
      colorDark: '#fdf3b3',
      colorLight: '#ebd85e',
    },
    {
      id: '4',
      heading: 'Environment',
      para: "In our classrooms, students compete in a healthy, fun, and supported way. They are encouraged to debate and discuss ideas, and verbalize their thinking to peers and teachers.",
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
        title="Late Elementary Math Program (Grades 3-5) | Advanced Reasoning Skills"
        description="Advanced elementary math program for grades 3-5 focusing on mathematical reasoning, logic, and complex problem-solving. Three learning levels with competition preparation."
        keywords="grades 3-5 math, late elementary program, math reasoning skills, advanced elementary math, problem solving, competition math preparation"
        url="https://our-we.netlify.app/programs/late-elementary"
        structuredData={structuredData}
      />

      <Suspense fallback={<LoadingSpinner />}>
        <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
          <main>
            {/* Hero Section */}
            <section
              className={`min-h-[50vh] md:min-h-[66vh] pt-16 py-4 md:pt-20 px-4 md:px-16 ${theme === 'light' ? 'bg-[#f0f0f0]' : 'bg-gray-800'
                }`}
              aria-label="Late Elementary Program Overview"
            >
              <div className="max-w-7xl mx-auto">
                <div className="hidden sm:block">
                  <div className="min-h-[40vh] flex flex-col items-start justify-center">
                    <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#007698] dark:text-white mb-4 lg:max-w-2xl">
                      Excellence Through Mathematical Reasoning
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 lg:max-w-2xl">
                      We build understanding by challenging our students to reason through difficult and unfamiliar problems.
                    </p>
                    <Link
                      to="/contacts"
                      className="inline-block px-8 py-3 bg-[#007698] dark:bg-[#8bc540] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                      aria-label="Schedule an evaluation for late elementary program"
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
              aria-label="Mobile Late Elementary Overview"
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
                  Excellence Through Mathematical Reasoning
                </h2>
                <p className="text-gray-100 text-center">
                  We build understanding by challenging our students to reason through difficult and unfamiliar problems.
                </p>
              </div>
            </section>

            {/* Program Philosophy Section */}
            <section className="py-12 px-4 md:px-16" aria-label="Program Philosophy">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-extrabold text-3xl md:text-4xl lg:text-5xl text-gray-800 dark:text-white mb-8">
                  We engage our students' minds - guiding them to employ logic,
                  analyze, and derive. This builds a deep and enduring mathematical fluency.
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
                      We regularly challenge our students to use their minds.
                      Rather than memorize new information, they are guided to derive new knowledge
                      by calling on what they know, thereby continually reinforcing what they've learned.
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
                        alt="Educational strategy for late elementary students"
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
                        to="/contacts"
                        className="inline-block px-8 py-3 bg-white text-[#007698] rounded-lg hover:opacity-90 transition-opacity font-medium text-lg"
                        aria-label="Schedule evaluation for competition preparation"
                      >
                        Schedule an Evaluation
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
                        title="Our World of Education Late Elementary Program Video"
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
                    Our students see soaring confidence and performance in mathematics overall,
                    with many participating in a variety of math competitions.
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

            {/* Parent Testimonial Section */}
            <section className="py-12 px-4 md:px-16 bg-gray-50 dark:bg-gray-800" aria-label="Parent Testimonial">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <blockquote className="text-2xl italic text-gray-700 dark:text-gray-300 mb-6">
                      <span className="text-4xl text-[#007698] dark:text-[#8bc540] font-bold mr-2">"</span>
                      Dear Tatyana, we cannot thank you enough for being such a wonderful teacher to our son for 5 years!
                      He will miss you very much next year. Thank you so much for all you do and hope to keep in touch.
                      <span className="text-4xl text-[#007698] dark:text-[#8bc540] font-bold ml-2">"</span>
                    </blockquote>
                    <cite className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                      — OWE Parent
                    </cite>
                  </div>
                  <div>
                    <img
                      src={ElementaryTestimonial}
                      alt="Late elementary student testimonial"
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
                      Get an in-depth look at our program
                    </h2>
                    <div className="text-right">
                      <Link
                        to="/contacts"
                        className="inline-block px-8 py-3 bg-white text-[#007698] dark:text-[#8bc540] rounded-lg hover:opacity-90 transition-opacity font-medium text-lg"
                        aria-label="Schedule evaluation for late elementary program"
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

export default LateElementary;