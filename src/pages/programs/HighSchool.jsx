import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { useThemeStore } from '../../store/themeStore';
import streitigy from './../../assets/streitigy-high-bg-remove.png'
import Logo from './../../components/Logo'
import icon1 from './../../assets/icon1.png'
import icon2 from './../../assets/icon2.png'
import icon3 from './../../assets/icon3.png'
import icon4 from './../../assets/icon4.png'
import { Link } from 'react-router'
import ElementaryTestimonial from './../../assets/high-school-testimonial.png'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Footer from '../../components/Footer';

const HighSchool = () => {

  const whatExpect = [{
    id: '1',
    heading: '2 hours per week',
    para: 'Our classes meet for 1.5 hrs - 2 hrs a week, depending on age.',
    icon: icon1,
  },
  {
    id: '2',
    heading: 'The Classroom',
    para: 'A classroom environment is key to our methodology. Classes consist of up to 12 students and an expert teacher leading an interactive lesson.',
    icon: icon2,
  },
  {
    id: '3',
    heading: 'Homework',
    para: 'Homework is assigned each week to reinforce the math concepts taught in class that week.',
    icon: icon3,
  },
  {
    id: '4',
    heading: 'A Unique Curriculum',
    para: 'Perfected over two decades by our team of gifted academics, our curriculum is inspired by elite mathematical schools in the former Soviet Union and adapted for the U.S. educational environment.',
    icon: icon4,
  },
  ];
  const results = [{
    heading: '6th',
    para: 'Team OWE places 6th out of 150 on the Harvard-MIT Math Tournament'

  },
  {
    heading: '774',
    para: 'Average 11th Grade Math SAT score'

  },
  {
    heading: '75%',
    para: 'of our competition program high-school students qualified for AIME'

  },
  {
    heading: '250k+',
    para: 'OWE alumni go on to attend the best universities in the world'

  },]
  const streitigies = [{
    id: '1',
    heading: 'Abstract thinking',
    para: "Our students are exposed to math problems that require manipulating and integrating multiple abstract ideas - those that are new and already mastered. This way students master new concepts  on a deeper and connected level. ",
    HtxtLight: '#8bc540',
    HtxtDark: '#bbeb7d',

  },
  {
    id: '2',
    heading: ' Mental flexibility',
    para: "We focus on perfecting our students' ability to leverage their deep math foundation, logic, and reasoning skills in order to solve highly complex problems.",
    HtxtDark: '#90def3',
    HtxtLight: '#007698',
  },
  {
    id: '3',
    heading: ' Challenge',
    para: "Our rigorous instruction encourages students to perform to their full potential. Students are also familiarized with working under pressure, particularly as it relates to the examinations and competitions that may await them.",
    HtxtDark: '#fdf3b3',
    HtxtLight: '#ebd85e',
  },
  {
    id: '4',
    heading: ' Environment',
    para: "Students compete with one another and also collaborate to solve complex problems. They learn how to thrive in an environment of peers with competing ideas and intellect - preparing them for college and career. ",
    HtxtDark: '#f8deb3',
    HtxtLight: '#feb746',
  },]
  const FAQ = [{
    id: '1',
    heading: 'Is High School too late for my child to begin your program?',
    para: "Though we believe it is best to begin mathematical training early, high school is not too late to start our program. During your evaluation, the principal will discuss your goals with you and your child, and explain how our program can best help you meet them.",
  }, {
    id: '2',
    heading: 'Why are you called the "Our World of Education" ?',
    para: ' The “Russian” comes from our approach - which is based on elite math schools in the former Soviet Union, adapted to the U.S. environment. According to Russian tradition - the study of mathematics is the pre-eminent tool of mental development. We teach math in a way that not only builds mathematical excellence, but also develops intellect and character.',
  },
  {
    id: '3',
    heading: 'Where does your curriculum come from?',
    para: 'We offer one continuous curriculum, from K-12. Our curriculum and methodology, perfected over 20 years by our team of gifted academics, is inspired by elite mathematical schools in the former Soviet Union, adapted for the American educational environment.',
  },
  {
    id: '4',
    heading: 'How much homework should I expect?',
    para: 'The goal of homework is to reinforce what was taught in class. Our teachers assign just enough to strengthen the skills developed in class. Homework is an excellent tool for you to gauge your child’s learning. It should take approximately half the length of your child’s lesson to complete. If the homework takes an unreasonably long or short amount of time, that may be a red flag indicating that your child is not in an appropriate level.',
  },
  {
    id: '5',
    heading: 'How long are your classes?',
    para: 'In middle school our class length varies depending on whether a student is enrolled in algebra, geometry, or both. Algebra courses meet once a week for 2.5 hrs, Geometry for 1.5 hrs.'
  },
  {
    id: '6',
    heading: 'How big are your classes? What is the teacher to student ratio ?',
    para: "Our average class size is 12, and with three levels per grade we're able to ensure that each child is placed in a class that is appropriately challenging. Classrooms are an essential part of our methodology and curriculum as the environment enables students to verbalize and debate their ideas and exposes them to different ways of thinking.",
  },
  {
    id: '7',
    heading: 'Who are your teachers?',
    para: 'All of our teachers have a background in mathematics or a related field and have a passion for the subject. They also go through extensive training to teach according to our specific methodology and curriculum.',
  },
  {
    id: '8',
    heading: 'Will your program confuse my child in school?',
    para: 'The concepts that we cover are fundamental and we study them in depth. Children see concepts from a variety of different angles. This doesn’t lead to confusion but rather empowers students by deepening their understanding. Since our curriculum is generally ahead of public school, children will often first learn concepts at OWE. Once they master them, we find they can adapt to any school format.',
  },
  {
    id: '9',
    heading: 'What is your tuition?',
    para: 'For specific tuition details, please visit the "tuition" section of your RSM branch of choice.',
  },
  {
    id: '10',
    heading: 'Is your program right for my child?',
    para: "We have designed multiple levels for every grade specifically to be able to serve each child's development based on his or her knowledge and ability. We recommend scheduling a free evaluation, as these sessions enable us to get a sense of each child's needs and recommend a class that is best suited to him or her.",
  },]
  const { theme } = useThemeStore();
  const [open, setOpen] = useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <div className={`${theme == 'light' ? 'bg-white' : 'bg-gray-800'}`}>
      <Navbar darkColor="white" />
      <div className={`w-full h-full `}>
        {/*---------------------------------  programs hero ------------------------- */}
        <div className={`hero high-school-hero-img-container  min-h-[55vh] md:min-h-[76vh] pt-16 py-4 md:pt-18 px-16 ${theme == 'light' ? 'bg-[#ceb007a6]!' : 'bg-[#e6cf4f]!'} w-full`}>
          <div className=" w-full">

            {/* CONTENT */}
            <div className="hero-content hidden sm:block w-full ">
              <div className="content-text min-h-[40vh] flex flex-col items-start justify-center w-full">
                <h1 className={`font-extrabold md:px-2 md:py-4 md:text-4xl sm:text-2xl text-lg lg:text-5xl leading-6 md:leading-16 w-full text-[#007698]`}>
                  Positioned for Success
                </h1>
                <p className={`md:px-2 leading-5 md:leading-8 text-lg md:text-xl lg:text-2xl w-full lg:max-w-xl md:w-[45vw] font-normal text-gray-600 md:py-4`}>
                  Whether our high school students need to shine on rigorous high school courses or college resumes, our math program prepares them to succeed whatever their goal.
                </p>
                <button className={`btn-large m-0! px-4 ${theme == 'light' ? 'btn-large-light' : 'btn-large-dark hover:text-[#007698]!'}`}>shedule an evaluation </button>
              </div>
            </div>
          </div>
        </div>
        <div className={`hero-content pb-8 flex ${theme == 'light' ? 'bg-[#007698] text-white' : 'bg-gray-700 md:bg-white text-white '} items-center justify-center w-full sm:hidden w-full `}>
          <div className="content-text min-h-[40vh] flex flex-col items-center justify-start w-full">
            <button className={`btn-large m-0! rounded-b-md! rounded-t-none! h-13! px-4 ${theme == 'light' ? 'btn-large-light' : 'btn-large-dark text-white!'}`}>shedule an evaluation </button>

            <h1 className={`font-bold px-2 py-4 text-3xl leading-9 w-full text-white`}>
              Positioned for Success
            </h1>
            <p className={`px-2 leading-6 w-full font-normal text-gray-100!`}>
              Whether our high school students need to shine on rigorous high school courses or college resumes, our math program prepares them to succeed whatever their goal.
            </p>
          </div>

        </div>
        <div className="py-8 our-programs-preHeading flex items-center justify-center w-full">
          <h1 className={`font-extrabold px-2 md:py-8 md:text-4xl sm:text-3xl text-lg lg:text-5xl leading-7 sm:leading-12 lg:leading-14 text-center w-full lg:max-w-3/4 md:w-7/8 ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}>
            Our students develop a mastery of Algebra, Geometry, Trigonometry,
            Pre-Calculus, Calculus AB/BC, and Statistics. We also work to
            prepare them for the SAT, ACT, AP tests, and math competitions.
          </h1>
        </div>
      </div>
      {/* -------------------------streitigies----------------------- */}
      <section id="scrollTo" className="our-programs w-full md:px-0 my-4 px-2">
        <div className="py-8 our-programs-container w-full px-2 sm:px-0">
          <div className={`containter rounded-lg  p-4 lg:p-12  xl:p-16 md:p-12 sm:p-8 w-full  ${theme == 'light' ? 'bg-[#f0f0f069]' : 'bg-gray-700'}`}>
            <div className="uper-portion py-4 md:py-16 flex w-full flex-col md:flex-row items-start md:justify-start justify-center">
              <h1 className={`font-bold p-2 md:text-4xl sm:text-3xl text-2xl lg:text-5xl leading-6 md:leading-12 w-full lg:w-2/3 ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}>How it work   </h1>
              <p className={`leading-5 md:leading-8 text-lg md:text-xl lg:text-2xl w-full lg:max-w-4/5 font-normal ${theme == 'light' ? 'text-[#007698]' : 'text-gray-300!'} text-start `}>
                Our high school program builds on the foundation laid in years before
                to further deepen our students' knowledge of advanced algebraic and
                geometric concepts as well as calculus. We also ensure our students
                are well prepared for university entrance exams, APs, and math competitions.
              </p>
            </div>
            <div className="lower-portion w-full">
              <div className="flex flex-col md:gap-8 lg:flex-row items-center md:justify-start justify-center gap-2">
                <div className="img-col flex flex-col items-center justify-center p-4 md:p-2 w-10/12 md:w-5/12 lg:w-6/12">
                  <figure className='w-full'>
                    <img className='w-full h-full' src={streitigy} alt="" />
                  </figure>
                  <span className='w-fit flex items-center justify-center'><Logo width={150} height={60} /></span>
                </div>
                <div className="text-col w-full gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2">
                  {streitigies.map((item) => (
                    <div key={item.id} className="w-full ">
                      <h2 className={`font-bold p-2 md:text-2xl sm:text-xl text-lg lg:text-3xl leading-6 md:leading-12 w-full ${theme == 'light' ? `text-[${item.HtxtLight}]` : `text-[${item.HtxtDark}]`}`}>{item.heading}</h2>
                      <p className={`leading-5! md:leading-7! text-sm! sm:text-lg! lg:text-xl w-full font-normal ${theme == 'light' ? 'text-[#007698]' : 'text-gray-300!'} text-start `}>{item.para}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="pb-12 our-programs-preHeading flex items-center justify-center w-full">
          <h1 className={`font-extrabold px-2 md:px-0 text-center md:text-start md:py-8 md:text-4xl sm:text-3xl text-lg lg:text-5xl leading-7 sm:leading-12 lg:leading-14 w-full md:w-7/8 ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}>
            With multiple levels in each grade, from beginner to competition,
            we are able to ensure that each child is placed in an environment best suited to them.
          </h1>
        </div>
        <div className="flex pb-8 md:mb-4 flex-col px-2 md:px-14 md:flex-row gap-4 justify-center items-start">
          <div className="w-full ">
            <h2 className={`font-bold p-2 md:text-2xl sm:text-xl text-lg lg:text-3xl leading-6 md:leading-12 w-full ${theme == 'light' ? 'text-[#007698]' : 'text-[#bbeb7d]'}`}>I - Accelerated Level</h2>
            <p className={`leading-5! md:leading-7! text-sm! sm:text-lg! lg:text-xl w-full font-normal ${theme == 'light' ? 'text-[#007698]' : 'text-gray-300!'} text-start `}>Often the best fit for new students, this curriculum is designed to meet students where they are, build their math foundation, and bring them to the level of international standards.</p>
          </div>
          <div className="w-full ">
            <h2 className={`font-bold p-2 md:text-2xl sm:text-xl text-lg lg:text-3xl leading-6 md:leading-12 w-full ${theme == 'light' ? 'text-[#007698]' : 'text-[#bbeb7d]'}`}>II - Advanced Level</h2>
            <p className={`leading-5! md:leading-7! text-sm! sm:text-lg! lg:text-xl w-full font-normal ${theme == 'light' ? 'text-[#007698]' : 'text-gray-300!'} text-start `}>Most students continue to this level, where we offer a challenging mathematics curriculum that provides the deep understanding, reasoning skills, and confidence needed for success from elementary through honors high school and beyond.</p>
          </div>
          <div className="w-full ">
            <h2 className={`font-bold p-2 md:text-2xl sm:text-xl text-lg lg:text-3xl leading-6 md:leading-12 w-full ${theme == 'light' ? 'text-[#007698]' : 'text-[#bbeb7d]'}`}>III - Honors Level</h2>
            <p className={`leading-5! md:leading-7! text-sm! sm:text-lg! lg:text-xl w-full font-normal ${theme == 'light' ? 'text-[#007698]' : 'text-gray-300!'} text-start `}>This rigorous curriculum goes into great depth on the topics covered in the advanced level, and regularly employs competition-level problems that encourage students to push the boundaries of their abilities. Many students in Honors also choose to participate in math competitions.</p>
          </div>
        </div>
      </section>
      {/* -------------- bannaer blue---------------------- */}
      <div className="approach w-full my-2 lg:mb-12 flex items-center justify-center p-2 sm:py-8 sm:px-16">
        <div className={`banner py-8 lg:py-16 px-4 md:px-8 gap-4 md:px-12 lg:px-16 rounded-md flex flex-col lg:flex-row items-center justify-center w-full ${theme == 'light' ? 'text-[#e5f5fa] bg-[#007698]' : 'bg-[#8bc540] text-[#14363f]'}`}>
          <div className="w-full ">
            <h2 className={`font-bold py-4 sm:py-6 md:text-3xl text-2xl lg:text-4xl leading-8 md:leading-12 w-full ${theme == 'light' ? 'text-[#e5f5fa] bg-[#007698]' : 'bg-[#8bc540] text-[#14363f]'}`}>Math Competition Preparation</h2>
            <p className={`leading-6! md:leading-7! text-lg! lg:text-xl! w-full font-normal ${theme == 'dark' ? 'text-[#007698]!' : 'text-gray-300!'} text-start `}>
              Success with math competitions comes first with the deep
              and broad foundation best delivered in our core classes.
              For those interested in a more focused study of competition materials,
              we offer a selective competitions program that prepares novice
              and veteran competitors alike for the full array of national and international math competitions.
            </p>
          </div>
          <div className="w-full">
            <Link to={'/programs/competitions'}>
              <button className={`p-2 px-6 lg:p-6 text-sm! lg:px-12 lg:text-xl! ${theme == 'light' ? 'btn-large btn-large-light' : 'btn-large btn-large-dark text-white! hover:text-[#007698]!'}`}>Learn More</button>
            </Link>
          </div>
        </div>
      </div>
      {/* ------------------------------------ testimonials + video ------------- */}
      <section className="testimonial w-full md:px-0 my-9 px-2">
        <div className="py-4 testimonial-container w-full px-0 lg:px-16 md:px-8 sm:px-4">
          <div className={`containter rounded-sm border-s-10 p-4 w-full  
            ${theme == 'light' ? 'bg-[#f0f0f069] border-s-[#007698]' : 'bg-gray-700 border-s-[#8bc540]'}`}>

            <div className="main-row flex md:flex-row gap-8 items-center justify-between flex-col-reverse">
              {/* LEFT SIDE - AUTO SLIDING QUOTES */}
              <div className="text-col md:w-1/4 w-full">
                <div className="relative min-h-28 ">
                  <h1
                    className={`text-lg lg:text-3xl text-center font-semibold italic leading-relaxed ${theme == 'dark' ? 'text-white!' : 'text-[#007698]!'}`}>
                    <span className={`text-3xl md:text-6xl ${theme == 'light' ? 'text-[#8bc540]' : 'text-[#007698]'} font-bold mr-2`}>“</span>
                    Learn more about RSM’s program and hear from our students in this video.
                  </h1>
                </div>
              </div>

              {/* RIGHT SIDE - YOUTUBE VIDEO */}
              <div className="video-col md:w-3/4 w-full">
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    className="w-full h-full"

                    src=" https://www.youtube.com/embed/lhv72TsRvHU"
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                  </iframe>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* --------------what to expect-------------------------- */}
      <section id="scrollTo" className="our-programs w-full md:px-0 my-4 px-2">
        <div className="py-8 our-programs-container w-full px-2 sm:px-0">
          <div className={`containter rounded-lg  p-4 lg:p-12  xl:p-16 md:p-12 sm:p-8 w-full  ${theme == 'light' ? 'bg-[#f0f0f069]' : 'bg-gray-700'}`}>
            <div className="uper-portion py-4 md:py-16 flex w-full flex-col md:flex-row items-start md:justify-start justify-center">
              <h1 className={`font-bold p-2 md:text-4xl sm:text-3xl text-2xl lg:text-5xl leading-6 md:leading-12 w-full lg:w-2/3 ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}>What to Expect   </h1>
            </div>
            <div className="lower-portion py-0 md:py-16 w-full">
              <div className="flex flex-col md:gap-8 lg:flex-row items-center md:justify-start justify-center gap-2">
                <div className="text-col w-full gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 md:grid-rows-2">
                  {whatExpect.map((item) => (
                    <div key={item.id} className="w-full flex items-start gap-4 sm:gap-6 justify-start flex-col ">
                      <div className={`icon h-20 md:h-40 w-20 md:w-40 flex items-center justify-center ${theme == 'light' ? 'bg-gray-200' : 'bg-gray-600'}  rounded-full`}>
                        <p className='w-full flex items-center justify-center'><img className='w-8 md:w-16 h-8 md:h-16' src={item.icon} alt="" /></p>
                      </div>
                      <h2 className={`font-bold md:text-2xl sm:text-xl text-lg lg:text-3xl leading-6 md:leading-12 w-full ${theme == 'light' ? 'text-[#007698]' : 'text-[#49d4fa]'}`}>{item.heading}</h2>
                      <p className={`leading-5! md:leading-7! text-sm! sm:text-lg! lg:text-xl w-full font-normal ${theme == 'light' ? 'text-[#007698]' : 'text-gray-300!'} text-start `}>
                        {item.para}                                            </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ------------------------------------ our results ------------- */}
      <section className="our-programs w-full md:px-0 my-8 px-2">
        <div className="py-8 our-programs-container w-full px-0  lg:px-16 md:px-12 sm:px-8">
          <div className={`containter rounded-lg p-2 md:p-0 w-full`}>
            <div className="uper-portion flex flex-col md:flex-row items-center justify-between">
              <h1 className={`font-bold p-2 text-3xl lg:text-4xl leading-6 md:leading-12  w-fit ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}>Our Results  </h1>
              <p className={`leading-5 md:leading-8 text-lg lg:text-xl w-full lg:max-w-3/4 md:px-40 py-4  font-normal ${theme == 'light' ? 'text-[#007698]' : 'text-gray-200'} text-center md:text-start `}>
                In middle school, many of our students choose to participate in math
                competitions and post top scores. Our students also see soaring confidence,
                higher grades, and are prepared to succeed in their high school courses.
              </p>
            </div>
            <div className="lower-portion w-full">
              <div className="flex md:py-10 flex-col md:flex-row items-strech md:items-stech justify-between w-full gap-4">
                {results.map((item, index) => (
                  <div
                    key={index}
                    className="card relative group rounded-lg border-b-10  min-h-[50vh] border-b-[#66bfd1] bg-[#007698] flex flex-col items-stretch justify-center w-full md:py-4 px-1 md:px-4 transition-all duration-500 ">
                    <h3 className={`font-extrabold leading-16 md:mb-4 text-center transition-all ease-in-out duration-500 sm:text-nowrap lg:text-7xl text-5xl md:py-4 ${theme == 'light' ? 'text-white opacity-70 group-hover:opacity-100' : 'text-black  opacity-70 group-hover:opacity-100'}`}>
                      {item.heading}
                    </h3>
                    <div className="img-card  w-full leading-8 text-lg md:text-xl mb-4 md:mb-12 lg:text-2xl flex justify-center items-center">
                      <p className={`transition-all text-center w-2/3 md:w-full ease-in-out duration-500 ${theme == 'light' ? 'text-white! opacity-70 group-hover:opacity-100' : 'text-black!  opacity-70 group-hover:opacity-100'}`}>
                        {item.para}
                      </p>
                      {results.length - 1 == index && <Link to={'/blog'}><span className={`absolute  text-sm! btn-small bottom-5 ${theme == 'light' ? ' btn-small-light ' : ' btn-small-dark '} right-1/10`}>read more</span></Link>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="view-all">
          <div className="w-11/12 flex items-center justify-center">
            <Link to={'/blog'}> <span className={`${theme == 'light' ? 'btn-large btn-large-light' : 'btn-large btn-large-dark'}`} >view all results</span> </Link>
          </div>
        </div>
      </section>
      {/* ------------------------------------ our children reviews ------------- */}
      <section className="our-programs w-full md:px-0 my-8 px-2">
        <div className="w-full flex px-4 md:px-16 items-center justify-center py-10">
          <div className="container grid md:grid-cols-2 gap-8 px-2 md:px-16 items-center">
            {/* LEFT COLUMN - QUOTE */}
            <div className="flex flex-col items-start justify-center">
              <p className={`lg:text-3xl! lg:leading-10! font-semibold italic leading-relaxed ${theme == 'dark' ? 'text-white!' : 'text-[#007698]!'}`}>
                <span className={`text-3xl md:text-8xl ${theme == 'light' ? 'text-[#8bc540]' : 'text-[#007698]'} font-bold mr-2`}>“</span>
                Ms. Kozlova, We are four of your former students and we wanted to let you know that we were all accepted to MIT. We're thrilled to join the class of 2020 this fall! Reaching this milestone would not have been possible without your dedication to our classes.
              </p>
              <span className="mt-4 text-lg sm:text-xl font-bold text-gray-500">
                4  OWE Students
              </span>
              <p className='text-xl! font-semibold'>12th grade</p>
            </div>
            {/* RIGHT COLUMN - IMAGE */}
            <div className="relative w-full h-80 md:h-100 overflow-hidden rounded-2xl">
              <img
                src={ElementaryTestimonial}
                alt="Elementary Testimonial"
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              />
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
                <div className='w-full cursor-pointer flex cursor-pointer items-center flex-nowrap justify-between gap-8' onClick={() => handleOpen(item.id)}>
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
      </section>
      {/* ------------------------------------ banner learn more about our programs ------------- */}
      <div className="w-full flex items-center mb-12 md:mb-16 p-4 md:p-12 justify-center">
        <div className={`container w-full md:mx-4 md:p-10 p-6 md:py-16 ${theme == 'light' ? 'bg-[#8bc540]' : 'bg-[#007698]'} rounded-xl py-12`}>
          <div className="row flex flex-col md:flex-row gap-4 items-center justify-center">
            <p className='w-full md:px-8 text-2xl lg:text-4xl font-semibold text-start text-white!'>Find out if our program is right for your child. </p>
            <div className='w-full items-center justify-center'>
              <Link to={'/contacts'} className={` ${theme == 'light' ? 'btn-large text-white! hover:text-[#007698]! btn-large-dark' : 'btn-large  btn-large-light'} w-full md:max-w-2/3 text-sm! px-12`}>schedule an evaluation</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HighSchool
