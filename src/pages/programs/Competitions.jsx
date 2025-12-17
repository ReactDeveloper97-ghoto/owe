import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { useThemeStore } from '../../store/themeStore';
import { FaChevronDown, FaChevronUp, FaStar } from 'react-icons/fa';
import { Link } from 'react-router';
import Footer from '../../components/Footer';


const Competitions = () => {
    const { theme } = useThemeStore();
 const [open, setOpen] = useState(1);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    const CompetPrograms = [{
        id: '1',
        heading: "OWE Core Program",
        para: "We believe that success with math competitions comes first with a deep and broad foundation in mathematics that is best delivered in our core classes. Our multi-level curricula ensure that all students are appropriately challenged and moving between levels is always a possibility. In our advanced levels, students will regularly meet with competition-like problems that encourage them to push to the boundaries of their ability.",
        italicPara: " ",
        note: "Open to all students in grades K-12.",
        borderColor1: '#66bfd1',
        borderColor2: '#427b87',
    },
    {
        id: '2',
        heading: "Math Competition Preparation (MCP)",
        para: "The goal of this program is to prepare students for regional and national math competitions. MCP curriculum and competition problem solving strategies are designed by experienced specialists in competition preparation. MCP also serves as a gateway for NMCP - our most advanced competitions preparation program.",
        italicPara: "Competition focus includes: AMC 8, ARML, MOEMS, Russian Math Olympiad, Purple Comet! Math Meet (middle school). ",
        note: "Interested students must submit application for review by competition faculty. Call us at 617-362-3555 or email us at online.competition@owe.com.",
        borderColor1: '#007698',
        borderColor2: '#013645',
    },
    {
        id: '3',
        heading: "National Math Competition Preparation (NMCP)",
        para: "This is a highly selective program that works to prepare students for the full circuit of elite national and international mathematical competitions — those that require intellectual agility as well as more traditional math olympiads that necessitate mathematical depth, rigor, and creativity.",
        italicPara: "Competition focus includes: AMC 8, AMC 10, AMC 12, AIME, USA(J)MO",
        note: "A maximum of 200 students are selected each year based on applications reviewed by competition faculty. ",
        borderColor1: '#ebd85e',
        borderColor2: '#94883a',
    },]
   const FAQ = [{
        id: '1',
        heading: 'Why are you called the "Our World of Education" ?',
        para: ' The “Russian” comes from our approach - which is based on elite math schools in the former Soviet Union, adapted to the U.S. environment. According to Russian tradition - the study of mathematics is the pre-eminent tool of mental development. We teach math in a way that not only builds mathematical excellence, but also develops intellect and character.',
    },
    {
        id: '2',
        heading: 'Where does your curriculum come from?',
        para: 'We offer one continuous curriculum, from K-12. Our curriculum and methodology, perfected over 20 years by our team of gifted academics, is inspired by elite mathematical schools in the former Soviet Union, adapted for the American educational environment.',
    },
 
    {
        id: '3',
        heading: 'What is the International Math Contest (IMC)?',
        para:"Developed by experienced math professionals from RSM, the IMC emphasizes problem-solving and logical reasoning. The competition features thought-provoking problems based on leading math curricula from around the world, allowing contestants to benchmark their knowledge against international standards. The IMC is open to students in grades 1-8 and is held at RSM branches. A virtual option is also available for students in grades 3-8.",
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
        para: "College applications ask for details regarding extracurricular activities. Students can use their math competition experiences here or in the essay portion of their applications. Essay questions may ask students to share a story about themselves that is central to their identity, to describe a place or environment where they are perfectly content, or to discuss an accomplishment or event that marked their transition from childhood to adulthood. If students believe that their math victories apply, they can use the essay prompts to illustrate their abilities for the Admissions boards.",
      },
  ]
    return (
        <div className={`${theme == 'light' ? 'bg-white' : 'bg-gray-800'}`}>
            <Navbar darkColor="black" lightColor="white" />
            {/*---------------------------------  programs hero ------------------------- */}
            <div className={`w-full h-full`}>
                <div className={`hero competition-hero-img-container min-h-[50vh] md:min-h-[66vh] pt-16 py-4 md:pt-18 px-16 ${theme == 'light' ? 'bg-[#e6e5de7d]' : 'bg-[#f3f3f3]'} w-full`}>
                    <div className="w-full">
                        {/* CONTENT */}
                        <div className="hero-content hidden sm:block w-full">
                            <div className="content-text min-h-[40vh] flex flex-col items-start justify-center w-full">
                                <h1 className={`font-bold md:px-2 md:py-4 md:text-4xl sm:text-2xl text-lg lg:text-5xl leading-6 md:leading-12 w-full lg:max-w-xl md:w-[45vw] text-[#007698]`}>
                                    Start Early. Learn Deeply.
                                </h1>
                                <p className={`md:px-2 leading-5 md:leading-8 text-lg md:text-xl lg:text-2xl w-full lg:max-w-xl md:w-[45vw] font-normal md:py-4`}>
                                    Spark an early interest in mathematics and lay the groundwork for higher level reasoning.
                                </p>
                                <button className={`btn-large m-0 px-4 ${theme == 'light' ? 'btn-large-light' : 'btn-large-dark hover:text-[#007698]'}`}>
                                    see classes schedule
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`hero-content pb-8 flex ${theme == 'light' ? 'bg-[#007698] text-white' : 'bg-gray-700 md:bg-white text-white'} items-center justify-center w-full sm:hidden`}>
                    <div className="content-text min-h-[40vh] flex flex-col items-center justify-start w-full">
                        <button className={`btn-large m-0 rounded-b-md rounded-t-none h-13 px-4 ${theme == 'light' ? 'btn-large-light' : 'btn-large-dark text-white'}`}>
                            schedule an evaluation
                        </button>
                        <h1 className={`font-bold px-2 py-4 text-3xl leading-9 w-full text-white`}>
                            From <br /> Kindergarten To Calculus
                        </h1>
                        <p className={`px-2 leading-6 w-full font-normal text-gray-100`}>
                            Designed as a long-term program with multiple levels for every grade, our approach develops each student to their utmost ability.
                        </p>
                    </div>
                </div>
            </div>

            {/* --------------------- Competition Programs -------------------- */}
            <section>
                <div className="w-full flex flex-col justify-center items-start gap-8">
                    <div className="uper-portion p-8 flex flex-col md:flex-row items-center justify-between">
                        <h1 className={`font-extrabold p-4 text-3xl sm:text-4xl lg:text-5xl sm:leading-10 leading-8 md:leading-12 ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}>
                            Competition Programs
                        </h1>
                        <p className={`leading-5 md:leading-8 text-lg lg:text-xl w-full xl:max-w-3/4 lg:px-40 py-4 font-normal ${theme == 'light' ? 'text-[#007698]' : 'text-gray-200'} text-center md:text-start`}>
                            In addition to our core program, the competition track is designed
                            for students interested in advanced mathematical topics
                            as well as participating in elite math competitions.
                        </p>
                    </div>
                    <div className="w-full flex items-center justify-center flex-col">
                        <div className="grid p-2 sm:p-16 lg:-top-4 justify-center items-stretch content-center gap-4 sm:gap-8 lg:gap-3 w-full sm:w-[90vw] grid-cols-1 sm:grid-cols-1 lg:grid-cols-3">
                            {CompetPrograms.map((item) => {
                                const borderColor = theme === 'light' ? item.borderColor1 : item.borderColor2;
                                const starColor = theme === 'light' ? item.borderColor1 : item.borderColor2;
                                return (
                                    <div key={item.id}
                                        className={`${theme == 'light' ? 'bg-[#fafafa]' : 'bg-[#18212d]'} relative border-t-8 sm:border-t-0 sm:border-s-8 lg:border-s-0 lg:border-t-8 rounded-md relative sm:px-5 sm:pl-22 lg:pl-0 pt-22 pb-8`}
                                        style={{
                                            borderTopColor: borderColor,
                                            borderLeftColor: borderColor
                                        }}>
                                        <div className={`tracklevel1 text-xl ${theme == 'light' ? 'bg-white' : 'bg-gray-800'} border-8 rounded-full flex gap-1 items-center justify-center w-20 h-20 sm:w-28 sm:h-28 absolute -top-10 sm:top-1/2 lg:-top-15 left-2/5 sm:-left-15 lg:left-1/3`}
                                            style={{ borderColor: borderColor }}>
                                            {item.id === '1' ? <FaStar style={{ color: starColor }} /> :
                                                item.id === '2' ? <><FaStar style={{ color: starColor }} /><FaStar style={{ color: starColor }} /></> :
                                                    <><FaStar style={{ color: starColor }} /><FaStar style={{ color: starColor }} /><FaStar style={{ color: starColor }} /></>
                                            }
                                        </div>
                                        <div className="trackcontent p-4">
                                            <h1 className={`font-bold p-2 md:text-3xl sm:text-2xl text-lg lg:text-4xl leading-6 md:leading-12 w-fit ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}>
                                                {item.heading}
                                            </h1>
                                            <p className={`leading-5 py-2 md:leading-8 text-sm md:text-md lg:text-xl w-full lg:max-w-2xl font-normal ${theme == 'light' ? 'text-gray-500!' : 'text-gray-400!'} text-start`}>
                                                {item.para}
                                            </p>
                                            <p className={`leading-5 py-2 italic md:leading-8 text-sm md:text-md lg:text-xl w-full lg:max-w-2xl font-normal ${theme == 'light' ? 'text-gray-500!' : 'text-gray-400!'} text-start`}>
                                                {item.italicPara}
                                            </p>
                                            <p className={`leading-5 py-2 md:leading-8 text-sm md:text-md lg:text-xl w-full lg:max-w-2xl font-bold ${theme == 'light' ? 'text-[#007698]!' : 'text-[#014c61]!'} text-start`}>
                                                {item.note}
                                            </p>
                                            <div className="absolute bottom-4 right-4 lg:bottom-10">
                                                {item.id == 1 && <Link to={'/programs'} className={`btn-small py-4 ${theme == 'light' ? 'bg-[#8bc540] hover:bg-white hover:text-[#8bc540] hover:border-[#8bc540] hover:border text-white' : 'bg-[#083e4d] hover:bg-white hover:text-[#083e4d] hover:border-[#083e4d] hover:border text-white'}`}>learn more</Link>}

                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
              {/* --------------------FAQ acordian--------------- */}
            <section>
                <div className="py-8 our-programs-container w-full px-2 sm:px-0">
                    <div className={`containter rounded-lg  p-4 lg:p-12  xl:p-16 md:p-12 sm:p-8 w-full `}>
                        <div className="uper-portion py-4 md:py-8 flex w-full flex-col md:flex-row items-start md:justify-start justify-center">
                            <h1 className={`font-bold p-2 md:text-4xl sm:text-3xl text-2xl lg:text-5xl leading-6 md:leading-12 w-full ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}>Frequently asked questions   </h1>
                        </div>
                        {FAQ.map((item) => (
                            <div className={`w-full border-b py-4  ${theme == 'light' ? 'border-b-gray-300' : 'border-b-gray-500'}  md:w-4/5`}>
                                <div className='w-full cursor-pointer flex items-center flex-nowrap justify-between gap-8' onClick={() => handleOpen(item.id)}>
                                    <h1 className={`font-bold py-4 md:text-2xl sm:text-xl text-lg lg:text-3xl leading-5 md:leading-10 w-full ${theme == 'dark' ? 'text-[#007698]' : 'text-[#8bc540]'}`}>{item.heading}</h1>
                                    <span className={` ${theme == 'light' ? 'text-[#007698]' : 'text-[#8bc540]'}`}>{open === item.id ? <FaChevronUp className='w-7 h-7 font-semibold' /> : <FaChevronDown className='w-7 h-7 font-semibold' />}</span>
                                </div>
                                <div className={`faqItemBody  ${open === item.id ? 'flex' : 'hidden'} text-pink-400 w-full flex items-center flex-nowrap justify-start gap-8`}>
                                    <p className='py-4 w-full md:w-3/4 text-xl! leading-8!'>
                                        {item.para}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                {/*              
                <div >
                    <div onClick={() => handleOpen(2)}>
                        How to use Material Tailwind?
                    </div>
                    <div className={`${open === 2 ? 'flex' : 'hidden'} text-blue-400`}>
                        We&apos;re not always in the position that we want to be at. We&apos;re constantly
                        growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                        ourselves and actualize our dreams.
                    </div>
                </div>
                <div>
                    <div onClick={() => handleOpen(3)}>
                        What can I do with Material Tailwind?
                    </div>
                    <div className={`${open === 3 ? 'flex' : 'hidden'} text-red-400`}>
                        We&apos;re not always in the position that we want to be at. We&apos;re constantly
                        growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                        ourselves and actualize our dreams.
                    </div>
                </div> */}
            </section>
               <Footer />
        </div>
    )
}

export default Competitions