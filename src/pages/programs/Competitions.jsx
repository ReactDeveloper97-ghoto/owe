import React, { useState, lazy, Suspense } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { FaChevronDown, FaChevronUp, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';

const Competitions = () => {
    const { theme } = useThemeStore();
    const [open, setOpen] = useState(1);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    // Structured Data for Competitions Page
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Math Competition Programs - Our World of Education",
        "description": "Elite math competition preparation programs for AMC, AIME, USA(J)MO, Math Kangaroo and international contests. K-12 competition tracks.",
        "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Why are you called 'Our World of Education'?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The 'Russian' comes from our approach - which is based on elite math schools in the former Soviet Union, adapted to the U.S. environment. According to Russian tradition - the study of mathematics is the pre-eminent tool of mental development."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Where does your curriculum come from?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We offer one continuous curriculum, from K-12. Our curriculum and methodology, perfected over 20 years by our team of gifted academics, is inspired by elite mathematical schools in the former Soviet Union, adapted for the American educational environment."
                    }
                }
            ]
        }
    };

    const CompetPrograms = [
        {
            id: '1',
            heading: "OWE Core Program",
            para: "We believe that success with math competitions comes first with a deep and broad foundation in mathematics that is best delivered in our core classes. Our multi-level curricula ensure that all students are appropriately challenged.",
            italicPara: " ",
            note: "Open to all students in grades K-12.",
            borderColor1: '#66bfd1',
            borderColor2: '#427b87',
            starCount: 1
        },
        {
            id: '2',
            heading: "Math Competition Preparation (MCP)",
            para: "The goal of this program is to prepare students for regional and national math competitions. MCP curriculum and competition problem solving strategies are designed by experienced specialists in competition preparation.",
            italicPara: "Competition focus includes: AMC 8, ARML, MOEMS, Russian Math Olympiad, Purple Comet! Math Meet (middle school).",
            note: "Interested students must submit application for review by competition faculty.",
            borderColor1: '#007698',
            borderColor2: '#013645',
            starCount: 2
        },
        {
            id: '3',
            heading: "National Math Competition Preparation (NMCP)",
            para: "This is a highly selective program that prepares students for elite national and international mathematical competitions requiring intellectual agility, mathematical depth, rigor, and creativity.",
            italicPara: "Competition focus includes: AMC 8, AMC 10, AMC 12, AIME, USA(J)MO",
            note: "A maximum of 200 students are selected each year based on applications reviewed by competition faculty.",
            borderColor1: '#ebd85e',
            borderColor2: '#94883a',
            starCount: 3
        },
    ];

    const FAQ = [
        {
            id: '1',
            heading: 'Why are you called "Our World of Education"?',
            para: 'The "Russian" comes from our approach - which is based on elite math schools in the former Soviet Union, adapted to the U.S. environment. According to Russian tradition - the study of mathematics is the pre-eminent tool of mental development. We teach math in a way that not only builds mathematical excellence, but also develops intellect and character.',
        },
        {
            id: '2',
            heading: 'Where does your curriculum come from?',
            para: 'We offer one continuous curriculum, from K-12. Our curriculum and methodology, perfected over 20 years by our team of gifted academics, is inspired by elite mathematical schools in the former Soviet Union, adapted for the American educational environment.',
        },
        {
            id: '3',
            heading: 'What is the International Math Contest (IMC)?',
            para: "Developed by experienced math professionals, the IMC emphasizes problem-solving and logical reasoning. The competition features thought-provoking problems based on leading math curricula from around the world, allowing contestants to benchmark their knowledge against international standards.",
        },
        {
            id: '4',
            heading: 'Who are your teachers?',
            para: 'All of our teachers have a background in mathematics or a related field and have a passion for the subject. They also go through extensive training to teach according to our specific methodology and curriculum.',
        },
        {
            id: '5',
            heading: 'What is the highest score on Math Kangaroo?',
            para: 'The highest score is 96! However, achieving a perfect score is quite rare and difficult, so any score above 80 is considered exceptional. Keep practicing and one day, you might just achieve a top score too!',
        },
        {
            id: '6',
            heading: 'Are math competitions good for college?',
            para: "College applications ask for details regarding extracurricular activities. Students can use their math competition experiences in the essay portion of their applications. Essay questions may ask students to share a story about themselves that is central to their identity or to discuss an accomplishment that marked their transition from childhood to adulthood.",
        },
    ];

    return (
        <>
            <SEO
                title="Math Competition Programs | AMC, AIME, Math Kangaroo Prep - Our World of Education"
                description="Elite math competition preparation for AMC, AIME, USA(J)MO, Math Kangaroo. Three-tier program from beginner to national level. Expert coaching for K-12 students."
                keywords="math competitions, AMC preparation, AIME training, Math Kangaroo, competition math, math olympiad, USAJMO, mathematics contests"
                url="https://our-we.netlify.app/programs/competitions"
                structuredData={structuredData}
            />

            <Suspense fallback={<LoadingSpinner />}>
                <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>

                    <main>
                        {/* Hero Section */}
                        <section
                            className={`min-h-[50vh] md:min-h-[66vh] pt-16 py-4 md:pt-20 px-4 md:px-16 ${theme === 'light' ? 'bg-[#e6e5de7d]' : 'bg-gray-800'
                                }`}
                            aria-label="Competitions Hero"
                        >
                            <div className="max-w-7xl mx-auto">
                                <div className="hidden sm:block">
                                    <div className="min-h-[40vh] flex flex-col items-start justify-center">
                                        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#007698] mb-4 lg:max-w-2xl">
                                            Start Early. Learn Deeply.
                                        </h1>
                                        <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-8 lg:max-w-2xl">
                                            Spark an early interest in mathematics and lay the groundwork for higher level reasoning.
                                        </p>
                                        <Link
                                            to="/programs"
                                            className="inline-block px-8 py-3 bg-[#007698] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                                            aria-label="View class schedules for competition programs"
                                        >
                                            See Classes Schedule
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Mobile Hero Section */}
                        <section
                            className={`sm:hidden ${theme === 'light' ? 'bg-[#007698]' : 'bg-gray-700'} text-white`}
                            aria-label="Mobile Competitions Overview"
                        >
                            <div className="p-4 flex flex-col items-center">
                                <Link
                                    to="/contacts"
                                    className="w-full py-3 bg-white dark:bg-gray-800 text-[#007698] dark:text-white text-center rounded-b-md font-medium"
                                    aria-label="Schedule evaluation for competitions"
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

                        {/* Competition Programs Section */}
                        <section className="py-12 px-4 md:px-16" aria-label="Competition Programs">
                            <div className="max-w-7xl mx-auto">
                                <div className="mb-12">
                                    <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-800 dark:text-white mb-6">
                                        Competition Programs
                                    </h2>
                                    <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-4xl">
                                        In addition to our core program, the competition track is designed
                                        for students interested in advanced mathematical topics
                                        as well as participating in elite math competitions.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                                    {CompetPrograms.map((item) => {
                                        const borderColor = theme === 'light' ? item.borderColor1 : item.borderColor2;

                                        return (
                                            <article
                                                key={item.id}
                                                className={`relative rounded-lg p-6 pt-20 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                                                    } border-t-4`}
                                                style={{ borderTopColor: borderColor }}
                                                itemScope
                                                itemType="https://schema.org/Course"
                                            >
                                                {/* Star Rating Badge */}
                                                <div
                                                    className={`absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-gray-900'
                                                        } border-4`}
                                                    style={{ borderColor: borderColor }}
                                                    aria-label={`${item.starCount} star program`}
                                                >
                                                    <div className="flex">
                                                        {[...Array(item.starCount)].map((_, i) => (
                                                            <FaStar
                                                                key={i}
                                                                className="mx-0.5"
                                                                style={{ color: borderColor }}
                                                                size={20}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                <h3
                                                    className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4"
                                                    itemProp="name"
                                                >
                                                    {item.heading}
                                                </h3>

                                                <p
                                                    className="text-gray-600 dark:text-gray-300 mb-4"
                                                    itemProp="description"
                                                >
                                                    {item.para}
                                                </p>

                                                {item.italicPara && (
                                                    <p className="italic text-gray-500 dark:text-gray-400 mb-4">
                                                        {item.italicPara}
                                                    </p>
                                                )}

                                                <p className="font-bold text-[#007698] dark:text-[#66bfd1]">
                                                    {item.note}
                                                </p>

                                                {item.id === '1' && (
                                                    <div className="mt-6">
                                                        <Link
                                                            to="/programs"
                                                            className={`inline-block px-6 py-3 rounded-lg font-medium transition-colors ${theme === 'light'
                                                                    ? 'bg-[#8bc540] text-white hover:bg-transparent hover:text-[#8bc540] border border-[#8bc540]'
                                                                    : 'bg-[#083e4d] text-white hover:bg-transparent hover:text-[#083e4d] border border-[#083e4d]'
                                                                }`}
                                                            aria-label="Learn more about core competition program"
                                                            itemProp="url"
                                                        >
                                                            Learn More
                                                        </Link>
                                                    </div>
                                                )}
                                            </article>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>

                        {/* FAQ Section with Schema Markup */}
                        <section
                            className="py-12 px-4 md:px-16 bg-gray-50 dark:bg-gray-800"
                            aria-label="Frequently Asked Questions"
                            itemScope
                            itemType="https://schema.org/FAQPage"
                        >
                            <div className="max-w-4xl mx-auto">
                                <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-gray-800 dark:text-white mb-8">
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

                        {/* CTA Section */}
                        <section className="py-12 px-4 md:px-16" aria-label="Get Started with Competitions">
                            <div className="max-w-4xl mx-auto text-center">
                                <div className={`rounded-xl p-8 ${theme === 'light' ? 'bg-[#007698]' : 'bg-gray-800'} text-white`}>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                        Ready to Excel in Math Competitions?
                                    </h2>
                                    <p className="text-xl mb-8 opacity-90">
                                        Join our elite competition programs and prepare for national and international math contests with expert guidance.
                                    </p>
                                    <Link
                                        to="/contact"
                                        className="inline-block px-8 py-3 bg-white text-[#007698] rounded-lg hover:opacity-90 transition-opacity font-medium text-lg"
                                        aria-label="Contact us for competition program details"
                                    >
                                        Contact Us for Details
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

export default Competitions;