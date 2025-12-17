import Navbar from './../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router'
import elementaryImg from './../../assets/programs-landing-early-elementary.jpeg'
import LtElementaryImg from './../../assets/programs-landing-elementary.jpeg'
import middleSchlImg from './../../assets/programs-landing-middle-school.jpeg'
import highSchlImg from './../../assets/programs-landing-high-school.jpeg'
import competitionImg from './../../assets/programs-landing-competition.jpeg'
import apprchImg1 from './../../assets/programs-landing-test-prep.jpeg'
import apprchImg2 from './../../assets/programs-landing-tutoring.jpeg'
import apprchImg3 from './../../assets/schedule-eval-image.jpeg'
import { useThemeStore } from '../../store/themeStore';
import SEO from '../../components/SEO';

const Programs = () => {
  const { theme } = useThemeStore();
  const programs = [
    {
      id: 1,
      heading: 'Elementary (K-2)',
      imag: elementaryImg,
      para: 'Spark an early interest in mathematics and lay the groundwork for advanced reasoning.',
      to: '/programs/elementary',
    },
    {
      id: 2,
      heading: 'Elementary (3-5)',
      imag: LtElementaryImg,
      para: 'Build powerful thinking skills and an appetite for challenge while laying a strong mathematical foundation.',
      to: '/programs/late-elementary'
    },
    {
      id: 3,
      heading: 'Middle School',
      imag: middleSchlImg,
      para: 'Advanced algebra and geometry instruction that prepares students to succeed.',
      to: '/programs/middle-school'
    },
    {
      id: 4,
      heading: 'High School',
      imag: highSchlImg,
      para: 'Whether they need to shine on rigorous high school courses or college resumes, our students are prepared to tackle their goals.',
      to: '/programs/high-school'
    },
    {
      id: 5,
      heading: 'Competitions',
      imag: competitionImg,
      para: 'Our tiered and selective competitions program prepares students for the full array of national and international math competitions.',
      to: '/programs/competitions'
    },
    {
      id: 6,
      heading: 'Fall Math Classes Now Enrolling!',
      para: 'Enroll in after-school math classes and explore our continuous K-12 curriculum, taught by expert teachers, in an interactive classroom environment of peers.',
      to: '/contacts'
    },
  ];
  const approachArr = [{
    id: '1',
    heading: 'Test Preparation ',
    para: 'Our long-term students are prepared for standardized tests as a byproduct of our program. Our students can also elect to participate in boot camps to further refine their test-taking skills.',
    imag: apprchImg1,

  },
  {
    id: '2',
    heading: 'Tutoring ',
    para: 'We believe a classroom environment is key to the learning experience. A great tutor can prepare a child for a test or help them with a specific topic, but they cannot instill a lasting mathematical foundation. We offer tutoring only as a short-term solution to prepare our students to join their peers in the classroom.',
    imag: apprchImg2,

  },
  {
    id: '3',
    heading: 'Summer Math Classes ',
    para: 'RSM’s summer program runs for 6 weeks with 2 classes per week. Class duration varies by grade. Learn more about the specific class offerings and view the summer schedule for your local branch.',
    imag: apprchImg3,

  },
  ]
  return (
    <>
      <SEO
        title="Our Programs - Quality Education Courses"
        description="Explore our comprehensive education programs for elementary, middle, high school, and competitive exams."
        keywords="education programs, school courses, tutoring, online classes"
      />
      <div className={`${theme == 'light' ? 'bg-white' : 'bg-gray-800'}`}>
        <Navbar darkColor={'black'} />
        <div className={`w-full h-full`}>
          {/*---------------------------------  programs hero ------------------------- */}
          <div className={`hero  programs-hero-img-container min-h-[50vh] md:min-h-[66vh] bg-cover! bg-right! pt-16 py-4 md:pt-18 px-16 ${theme == 'light' ? 'bg-[#f0f0f0]' : 'bg-gray-700'} w-full`}>
            <div className=" w-full">

              {/* CONTENT */}
              <div className="hero-content hidden sm:block w-full ">
                <div className="content-text min-h-[40vh] flex flex-col items-start justify-center w-full">
                  <h1 className={`font-bold md:px-2 md:py-4 md:text-4xl sm:text-2xl text-lg lg:text-5xl leading-6 md:leading-12 w-full lg:max-w-xl md:w-[45vw] ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}>
                    From Kindergarten To Calculus
                  </h1>
                  <p className={`md:px-2 leading-5 md:leading-8 text-sm md:text-md lg:text-xl w-full lg:max-w-xl md:w-[45vw] font-normal ${theme == 'light' ? 'text-[#007698]' : 'text-gray-200'} md:py-4`}>
                    Designed as a long-term program with multiple levels for every grade, our approach develops each student to their utmost ability.
                  </p>
                  <button className={`btn-large m-0! px-4 ${theme == 'light' ? 'btn-large-light' : 'btn-large-dark hover:text-[#007698]!'}`}>shedule an evaluation </button>
                </div>
              </div>
              {/* IMAGE (SIZE CONTROL LOGIC) */}
              {/* <div className="hero-img flex w-full items-center justify-center">
                <figure
                  className={'w-full max-w-[420px] md:max-w-[480px] lg:max-w-[520px]'}
                >
                  <img
                    src={heroImg}
                    alt="hero"
                    className={`w-full h-auto object-contain`}
                  />
                </figure>
              </div> */}
            </div>


          </div>
          <div className={`hero-content pb-8 flex ${theme == 'light' ? 'bg-[#007698] text-white' : 'bg-gray-700 md:bg-white text-white '} items-center justify-center w-full sm:hidden w-full `}>
            <div className="content-text min-h-[40vh] flex flex-col items-center justify-start w-full">
              <button className={`btn-large m-0! rounded-b-md! rounded-t-none! h-13! px-4 ${theme == 'light' ? 'btn-large-light' : 'btn-large-dark text-white!'}`}>shedule an evaluation </button>

              <h1 className={`font-bold px-2 py-4 text-3xl leading-9 w-full text-white`}>
                From <br /> Kindergarten To Calculus
              </h1>
              <p className={`px-2 leading-6 w-full font-normal text-gray-100!`}>
                Designed as a long-term program with multiple levels for every grade, our approach develops each student to their utmost ability.
              </p>
            </div>

          </div>
        </div>
        <div className={`w-full ${theme == 'light' ? 'bg-white' : 'bg-gray-800'}`}>
          <div className="grid w-full max-h-fit md:max-h-none  grid-cols-1 p-4 lg:px-16 sm:p-8 lg:p-8 grid-rows-6 lg:grid-cols-2 lg:grid-rows-3 gap-4 ">
            {programs.map((item) => (
              <div key={item.id} className={`  flex items-start justify-center flex-col
            ${item.id == 1 ? theme == 'light' ? 'border-b-[#007698]  border-b-8 ' : ' border-b-8 border-b-[#8bc540]' :
                  item.id == 2 ? theme == 'dark' ? 'border-b-[#eb48eb]  border-b-8 ' : ' border-b-8 border-b-[#c8e910]' :
                    item.id == 3 ? theme == 'light' ? 'border-b-[#ec4b89]  border-b-8 ' : ' border-b-8  border-b-[#fd0000]' :
                      item.id == 4 ? theme == 'light' ? 'border-b-[#985100]  border-b-8 ' : ' border-b-8  border-b-[#00fde8]' :
                        item.id == 5 ? theme == 'light' ? 'border-b-[#009890]  border-b-8 ' : ' border-b-8  border-b-[#c5bc40]' :
                          ' '}  
                ${theme == 'light' ? 'text-[#007698] bg-gray-50' : 'bg-gray-700 text-white '} rounded-md p-4 sm:mx-10 lg:m-0 sm:p-0 lg:p-6`}>
                {item.id != 6 &&
                  <div className="w-full">
                    <figure className='px-4'>
                      <img className='w-full rounded-md h-full' src={item.imag} alt={item.heading} />
                    </figure>
                  </div>
                }
                <h2 className={` ${item.id == 6 ? 'text-3xl md:text-4xl lg:text-5xl sm:text-5xl text-center' : 'text-2xl sm:text-3xl lg:text-2xl'}  font-bold p-4 sm:px-16 ${theme == 'light' ? 'text-[#007698]' : 'text-white '}`}>{item.heading}</h2>
                <p className={`px-4 py-0 sm:px-16 ${item.id == 6 ? 'text-xl text-center' : ''}`}>{item.para}</p>
                <div className={`w-full px-4 py-4 sm:px-16 ${item.id == 6 ? 'flex items-center justify-center' : ''}`}>
                  <Link to={`${item.to}`}>
                    <button className={`btn-small ${item.id == 6 ? 'w-60!  py-3!' : 'sm:w-38!  sm:py-2!'}  ${theme == 'dark' ? 'btn-small-light bg-[#8bc540]! hover:bg-transparent! hover:text-[#8bc540]!  text-white! hover:border-[#8bc540]! opacity-100!' : 'btn-small-dark bg-[#007698]! text-white! opacity-100! hover:border-[#007698]! hover:text-[#007698]! hover:bg-transparent!'}`}>{item.id == 6 ? 'view the fall schedule' : ' learn more'}</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* -------------- bannaer approach---------------------- */}
        <div className="approach w-full flex items-center justify-center p-2 sm:py-8 sm:px-16">
          <div className={`banner py-8 rounded-md flex flex-col items-center justify-center w-full ${theme == 'light' ? 'text-[#e5f5fa] bg-[#007698]' : 'bg-[#8bc540] text-[#14363f]'}`}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl sm:text-5xl text-center font-bold sm:max-w-11/12 p-4 sm:leading-14">Our approach is built on the classical tradition of using mathematics as a tool to develop the mind.</h1>
            <div className="w-full">
              <Link to={'/about'}>
                <button className={`${theme == 'light' ? 'btn-large btn-large-light' : 'btn-large btn-large-dark hover:text-[#007698]!'}`}>our approach</button>

              </Link>
            </div>
          </div>
        </div>
        {/* -------------- after bannaer approach---------------------- */}
        <div className="w-full mb-2 sm:mb-8 lg:mb-10">
          <div className="flex w-full flex-col p-4 sm:px-16 items-center justify-center gap-4 sm:gap-8">
            {approachArr.map((item) => (
              <div key={item.id} className={`flex w-full rounded-md ${theme == 'light' ? 'bg-gray-100' : 'bg-gray-700'} w-full flex-col ${item.id == 2 ? 'md:flex-row-reverse' : 'md:flex-row'} items-start justify-center gap-0 
            ${item.id == 1 ? theme == 'light' ? 'sm:border-e-[#007698] border-b-[#007698] border-b-8 sm:border-b-0 sm:border-e-8 ' : 'border-b-8 sm:border-b-0 sm:border-e-8 border-b-[#8bc540] sm:border-e-[#8bc540]' :
                  item.id == 2 ? theme == 'dark' ? 'border-b-[#eb48eb] sm:border-b-0 border-b-8 sm:border-s-[#eb48eb]  sm:border-s-8 ' : 'border-b-8 sm:border-b-0 border-b-[#c8e910] sm:border-s-8 sm:border-s-[#c8e910]' :
                    theme == 'light' ? 'border-b-[#985100]  border-b-8 sm:border-e-[#985100] sm:border-b-0 sm:border-e-8 ' : 'border-b-8  border-b-[#00fde8] sm:border-e-8 sm:border-b-0 sm:border-e-[#00fde8]'}
                  
            `}>
                <div className="img-col flex py-4 items-center justify-end  w-full rounded-md">
                  <figure className='w-11/12'>
                    <img className='rounded-md' src={item.imag} alt={item.heading} />
                  </figure>
                </div>
                <div className="text-col text-start px-4 sm:px-16 py-8 w-full">
                  <h1 className={`text-2xl sm:text-4xl lg:text-3xl font-bold ${theme == 'light' ? 'text-[#007698]' : 'text-white '}`}>{item.heading}</h1>
                  <p className={`md:px-2 leading-5 md:leading-8 text-sm md:text-md lg:text-xl w-full lg:max-w-xl md:w-[45vw] font-normal ${theme == 'light' ? 'text-[#007698]' : 'text-gray-400! opacity-100!'} md:py-4`}>{item.para}</p>
                  <p className='py-4'>
                    <button className={`btn-small ${item.id == 6 ? 'w-60!  py-3!' : 'sm:w-38!  sm:py-2!'}  ${theme == 'dark' ? 'btn-small-light bg-[#8bc540]! hover:bg-transparent! hover:text-[#8bc540]!  text-white! hover:border-[#8bc540]! opacity-100!' : 'btn-small-dark bg-[#007698]! text-white! opacity-100! hover:border-[#007698]! hover:text-[#007698]! hover:bg-transparent!'}`}>learn more</button>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* -------------- bannaer get a close look---------------------- */}
        <div className="approach w-full my-2 lg:mb-12 flex items-center justify-center p-2 sm:py-8 sm:px-16">
          <div className={`banner py-8 rounded-md flex flex-col sm:flex-row items-center justify-center w-full ${theme == 'dark' ? 'text-[#e5f5fa] bg-[#007698]' : 'bg-[#8bc540] text-[#14363f]'}`}>
            <h1 className="text-2xl lg:px-20 md:text-3xl lg:text-4xl sm:text-5xl text-center md:text-start font-bold sm:max-w-11/12 lg:w-full p-4 sm:leading-14">Get a closer look at our programs.</h1>
            <div className="w-full">
              <Link to={'/contact'}>
                <button className={`p-2 px-4 lg:p-6 lg:px-8 lg:text-xl! ${theme == 'dark' ? 'btn-large btn-large-light' : 'btn-large btn-large-dark text-white! hover:text-[#007698]!'}`}>schedule an evaluation</button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Programs
