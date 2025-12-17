import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../../store/themeStore';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';

// Import images with lazy loading support
import elementaryImg from './../../assets/programs-landing-early-elementary.jpeg';
import LtElementaryImg from './../../assets/programs-landing-elementary.jpeg';
import middleSchlImg from './../../assets/programs-landing-middle-school.jpeg';
import highSchlImg from './../../assets/programs-landing-high-school.jpeg';
import competitionImg from './../../assets/programs-landing-competition.jpeg';
import apprchImg1 from './../../assets/programs-landing-test-prep.jpeg';
import apprchImg2 from './../../assets/programs-landing-tutoring.jpeg';
import apprchImg3 from './../../assets/schedule-eval-image.jpeg';

const Programs = () => {
  const { theme } = useThemeStore();

  // Structured Data for Programs Page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Educational Programs - Our World of Education",
    "description": "Comprehensive education programs from Kindergarten to Calculus",
    "itemListElement": [
      {
        "@type": "Course",
        "position": 1,
        "name": "Elementary (K-2) Program",
        "description": "Spark an early interest in mathematics and lay the groundwork for advanced reasoning",
        "url": "https://our-we.netlify.app/programs/elementary"
      },
      {
        "@type": "Course",
        "position": 2,
        "name": "Elementary (3-5) Program",
        "description": "Build powerful thinking skills and an appetite for challenge with strong mathematical foundation",
        "url": "https://our-we.netlify.app/programs/late-elementary"
      },
      {
        "@type": "Course",
        "position": 3,
        "name": "Middle School Program",
        "description": "Advanced algebra and geometry instruction preparing students for high school success",
        "url": "https://our-we.netlify.app/programs/middle-school"
      },
      {
        "@type": "Course",
        "position": 4,
        "name": "High School Program",
        "description": "Comprehensive preparation for rigorous high school courses and college applications",
        "url": "https://our-we.netlify.app/programs/high-school"
      },
      {
        "@type": "Course",
        "position": 5,
        "name": "Competitions Program",
        "description": "Preparation for national and international math competitions with tiered selective programs",
        "url": "https://our-we.netlify.app/programs/competitions"
      }
    ]
  };

  const programs = [
    {
      id: 1,
      heading: 'Elementary (K-2)',
      imag: elementaryImg,
      para: 'Spark an early interest in mathematics and lay the groundwork for advanced reasoning.',
      to: '/programs/elementary',
      borderColor: theme === 'light' ? '#007698' : '#8bc540'
    },
    {
      id: 2,
      heading: 'Elementary (3-5)',
      imag: LtElementaryImg,
      para: 'Build powerful thinking skills and an appetite for challenge while laying a strong mathematical foundation.',
      to: '/programs/late-elementary',
      borderColor: theme === 'dark' ? '#eb48eb' : '#c8e910'
    },
    {
      id: 3,
      heading: 'Middle School',
      imag: middleSchlImg,
      para: 'Advanced algebra and geometry instruction that prepares students to succeed.',
      to: '/programs/middle-school',
      borderColor: theme === 'light' ? '#ec4b89' : '#fd0000'
    },
    {
      id: 4,
      heading: 'High School',
      imag: highSchlImg,
      para: 'Whether they need to shine on rigorous high school courses or college resumes, our students are prepared to tackle their goals.',
      to: '/programs/high-school',
      borderColor: theme === 'light' ? '#985100' : '#00fde8'
    },
    {
      id: 5,
      heading: 'Competitions',
      imag: competitionImg,
      para: 'Our tiered and selective competitions program prepares students for the full array of national and international math competitions.',
      to: '/programs/competitions',
      borderColor: theme === 'light' ? '#009890' : '#c5bc40'
    },
    {
      id: 6,
      heading: 'Fall Math Classes Now Enrolling!',
      para: 'Enroll in after-school math classes and explore our continuous K-12 curriculum, taught by expert teachers, in an interactive classroom environment of peers.',
      to: '/contacts',
      isCta: true
    },
  ];

  const approachArr = [
    {
      id: '1',
      heading: 'Test Preparation',
      para: 'Our long-term students are prepared for standardized tests as a byproduct of our program. Our students can also elect to participate in boot camps to further refine their test-taking skills.',
      imag: apprchImg1,
    },
    {
      id: '2',
      heading: 'Tutoring',
      para: 'We believe a classroom environment is key to the learning experience. A great tutor can prepare a child for a test or help them with a specific topic, but they cannot instill a lasting mathematical foundation. We offer tutoring only as a short-term solution to prepare our students to join their peers in the classroom.',
      imag: apprchImg2,
    },
    {
      id: '3',
      heading: 'Summer Math Classes',
      para: 'Our summer program runs for 6 weeks with 2 classes per week. Class duration varies by grade. Learn more about the specific class offerings and view the summer schedule.',
      imag: apprchImg3,
    },
  ];

  return (
    <>
      <SEO
        title="Our Education Programs | K-12 Learning Pathways - Our World of Education"
        description="Explore comprehensive K-12 education programs: Elementary, Middle School, High School, Competition Prep, Test Preparation & Tutoring. Quality learning pathways for every student."
        keywords="K-12 programs, elementary education, middle school curriculum, high school preparation, math competitions, test prep, online tutoring, Pakistan education"
        url="https://our-we.netlify.app/programs"
        structuredData={structuredData}
      />

      <Suspense fallback={<LoadingSpinner />}>
        <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
          {/* Main Content - Semantic HTML Structure */}
          <main>
            {/* Hero Section */}
            <section
              className={`programs-hero min-h-[50vh] md:min-h-[66vh] bg-cover bg-right pt-16 pb-4 md:pt-20 px-4 md:px-16 ${theme === 'light' ? 'bg-[#f0f0f0]' : 'bg-gray-800'
                }`}
              aria-label="Programs Overview"
            >
              <div className="max-w-7xl mx-auto">
                <div className="hidden sm:block">
                  <div className="content-text min-h-[40vh] flex flex-col items-start justify-center">
                    <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#007698] dark:text-white mb-4 lg:max-w-2xl">
                      From Kindergarten To Calculus
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 lg:max-w-2xl">
                      Designed as a long-term program with multiple levels for every grade, our approach develops each student to their utmost ability.
                    </p>
                    <Link
                      to="/contacts"
                      className="inline-block px-8 py-3 bg-[#007698] dark:bg-[#8bc540] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                      aria-label="Schedule an educational evaluation"
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
              aria-label="Mobile Programs Overview"
            >
              <div className="content-text p-4 flex flex-col items-center">
                <Link
                  to="/contacts"
                  className="w-full py-3 bg-white dark:bg-gray-800 text-[#007698] dark:text-white text-center rounded-b-md font-medium"
                  aria-label="Schedule evaluation mobile"
                >
                  Schedule an Evaluation
                </Link>
                <h2 className="text-2xl font-bold mt-6 mb-4 text-center">
                  From <br /> Kindergarten To Calculus
                </h2>
                <p className="text-gray-100 text-center">
                  Designed as a long-term program with multiple levels for every grade, our approach develops each student to their utmost ability.
                </p>
              </div>
            </section>

            {/* Programs Grid Section */}
            <section className="py-12 px-4 md:px-16 bg-white dark:bg-gray-900" aria-label="Available Programs">
              <div className="max-w-7xl mx-auto">
                <h2 className="sr-only">Our Educational Programs</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {programs.map((program) => (
                    <article
                      key={program.id}
                      className={`rounded-lg p-6 ${theme === 'light' ? 'bg-gray-50 text-gray-800' : 'bg-gray-800 text-white'
                        } ${!program.isCta ? 'border-b-8' : ''}`}
                      style={!program.isCta ? { borderBottomColor: program.borderColor } : {}}
                      itemScope
                      itemType="https://schema.org/Course"
                    >
                      {!program.isCta && (
                        <figure className="mb-6">
                          <img
                            src={program.imag}
                            alt={`${program.heading} program illustration`}
                            className="w-full h-48 md:h-56 object-cover rounded-lg"
                            loading="lazy"
                            width="400"
                            height="225"
                          />
                        </figure>
                      )}

                      <h3
                        className={`text-2xl md:text-3xl font-bold mb-4 ${program.isCta ? 'text-center text-3xl md:text-4xl' : ''
                          }`}
                        itemProp="name"
                      >
                        {program.heading}
                      </h3>

                      <p
                        className={`mb-6 ${program.isCta ? 'text-center text-xl' : ''}`}
                        itemProp="description"
                      >
                        {program.para}
                      </p>

                      <div className={program.isCta ? 'text-center' : ''}>
                        <Link
                          to={program.to}
                          className={`inline-block px-6 py-3 rounded-lg font-medium transition-colors ${theme === 'dark'
                              ? 'bg-[#8bc540] text-white hover:bg-transparent hover:text-[#8bc540] border border-[#8bc540]'
                              : 'bg-[#007698] text-white hover:bg-transparent hover:text-[#007698] border border-[#007698]'
                            }`}
                          aria-label={`Learn more about ${program.heading}`}
                          itemProp="url"
                        >
                          {program.isCta ? 'View the Fall Schedule' : 'Learn More'}
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Philosophy Banner */}
            <section className="py-12 px-4 md:px-16" aria-label="Educational Philosophy">
              <div className="max-w-7xl mx-auto">
                <div className={`rounded-lg p-8 text-center ${theme === 'light' ? 'bg-[#007698] text-white' : 'bg-[#8bc540] text-gray-900'
                  }`}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Our approach is built on the classical tradition of using mathematics as a tool to develop the mind.
                  </h2>
                  <Link
                    to="/about"
                    className="inline-block px-8 py-3 bg-white dark:bg-gray-800 text-[#007698] dark:text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                    aria-label="Learn about our educational approach"
                  >
                    Our Approach
                  </Link>
                </div>
              </div>
            </section>

            {/* Methodology Section */}
            <section className="py-12 px-4 md:px-16 bg-white dark:bg-gray-900" aria-label="Teaching Methodology">
              <div className="max-w-7xl mx-auto">
                <h2 className="sr-only">Our Teaching Methodologies</h2>
                {approachArr.map((approach, index) => (
                  <article
                    key={approach.id}
                    className={`flex flex-col md:flex-row items-center gap-8 mb-8 last:mb-0 rounded-lg p-6 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                      } ${index === 1 ? 'md:flex-row-reverse' : ''}`}
                  >
                    <figure className="md:w-1/2">
                      <img
                        src={approach.imag}
                        alt={`${approach.heading} methodology illustration`}
                        className="w-full h-64 md:h-80 object-cover rounded-lg"
                        loading="lazy"
                        width="600"
                        height="400"
                      />
                    </figure>
                    <div className="md:w-1/2">
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                        {approach.heading}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {approach.para}
                      </p>
                      <button
                        className={`px-6 py-3 rounded-lg font-medium transition-colors ${theme === 'dark'
                            ? 'bg-[#8bc540] text-white hover:bg-transparent hover:text-[#8bc540] border border-[#8bc540]'
                            : 'bg-[#007698] text-white hover:bg-transparent hover:text-[#007698] border border-[#007698]'
                          }`}
                        aria-label={`Learn more about ${approach.heading}`}
                      >
                        Learn More
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 px-4 md:px-16" aria-label="Get Started">
              <div className="max-w-7xl mx-auto">
                <div className={`rounded-lg p-8 flex flex-col md:flex-row items-center justify-between ${theme === 'dark' ? 'bg-[#007698] text-white' : 'bg-[#8bc540] text-gray-900'
                  }`}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-0 md:mr-8 text-center md:text-left">
                    Get a closer look at our programs.
                  </h2>
                  <Link
                    to="/contact"
                    className="inline-block px-8 py-3 bg-white dark:bg-gray-800 text-[#007698] dark:text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-lg"
                    aria-label="Schedule an evaluation to learn more about our programs"
                  >
                    Schedule an Evaluation
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

export default Programs;