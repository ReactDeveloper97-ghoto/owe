import React from 'react'
import Navbar from './../../components/Navbar';
import Hero from './../../components/Hero';
import { useThemeStore } from '../../store/themeStore';
import img1 from './../../assets/test1.jpeg';
import img2 from './../../assets/schedule-eval-image.jpeg'
import img3 from './../../assets/middleschoolpreview.jpeg'
import img4 from './../../assets/highschoolpreview.jpeg'
import img5 from './../../assets/competitions-thumb.jpeg'
import imgHump from './../../assets/curvegreen.svg'
import { Link } from 'react-router'
import { useEffect, useState } from "react";
import { MoveRight } from 'lucide-react';
import QuoteCarousel from '../../components/Carousel';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';

const Home = () => {
  const { theme } = useThemeStore()
  const [activeQuote, setActiveQuote] = useState(0);
  const programs = [{
    heading: 'Elementary (K-2)',
    id: 1,
    bgImg: img1,
  },
  {
    heading: 'Elementary (3-5)',
    id: 2,
    bgImg: img2,
  },
  {
    heading: 'Middle School',
    id: 3,
    bgImg: img3,
  },
  {
    heading: 'High School',
    id: 4,
    bgImg: img4,
  },
  {
    heading: 'Competition',
    id: 5,
    bgImg: img5,
  },
  ];

  const quotes = [
    {
      qoute: "Education is the most powerful weapon which you can use to change the world.",
      para: "OWE's here and now",
    },
    {
      qoute: "The beautiful thing about learning is that no one can take it away from you.",
      para: "The Atlantic",

    },
    {
      qoute: "An investment in knowledge pays the best interest.",
      para: "the Boston Globe",
    },
    {
      qoute: "Learning never exhausts the mind, it only empowers it.",
      para: "John's hookin center",
    },
  ];
  const results = [{
    heading: 'A+',
    para: 'Our students experience soaring confidence and grades'

  },
  {
    heading: '6th',
    para: 'Team RSM places 6th out of 150 on the Harvard-MIT Math Tournament'

  },
  {
    heading: '4th',
    para: 'Every 4th RSM student who participated scored in the top 5% on the AMC8!'

  },
  {
    heading: '250k+',
    para: 'RSM alumni go on to attend the best universities in the world'

  },]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length);
    }, 4000); // change every 3 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <>
       <SEO 
        title="Our World of Education - Best Online Learning Platform"
        description="Transform learning with expert tutors, interactive classes, and personalized programs for all grades in Pakistan."
        keywords="online education Pakistan, home tuition, virtual classes, school courses"
      />
      <div className={`${theme == 'light' ? 'bg-white' : 'bg-gray-800'}`}>
        <Navbar />
        <Hero />
        {/* ------------------------------------ our programs------------- */}

        <section id="scrollTo" className="our-programs w-full md:px-0 my-8 px-2">
          <div className="py-8 our-programs-preHeading flex items-center justify-center w-full">
            <h1 className={`font-bold px-2 md:py-8 md:text-3xl sm:text-2xl text-lg lg:text-4xl leading-6 md:leading-12 text-center w-full lg:max-w-3/4 md:w-3/4 ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}>We use the rigorous study of mathematics
              as a vehicle to develop our students’ math fluency, intellect,
              and character, empowering them for life.
            </h1>
          </div>
          <div className="py-8 our-programs-container w-full px-0  lg:px-16 md:px-12 sm:px-8">
            <div className={`containter rounded-lg  p-4  lg:p-16 md:p-12 sm:p-8 w-full  ${theme == 'light' ? 'bg-[#f0f0f069]' : 'bg-gray-700'}`}>
              <div className="uper-portion flex flex-col md:flex-row items-center justify-between">
                <h1 className={`font-bold p-2 md:text-3xl sm:text-2xl text-lg lg:text-4xl leading-6 md:leading-12 w-fit ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}>Our Programs    </h1>
                <p className={`leading-5 md:leading-8 text-sm md:text-md lg:text-xl w-full lg:max-w-2xl font-normal ${theme == 'light' ? 'text-[#007698]' : 'text-gray-200'} text-start `}>
                  With multiple levels for every grade as well as a selective competitions program, we are able to best serve each child’s development based on his or her knowledge and ability.</p>
              </div>
              <div className="lower-portion w-full">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-2">

                  {programs.map((item, index) => (
                    <div key={item.id} to='/programs' className="card group cursor-pointer flex flex-col items-center justify-center py-2 px-1">
                      <h3 className={`font-semibold text-lg sm:text-nowrap sm:text-[12px] lg:text-lg py-4 ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}>
                        {item.heading}
                      </h3>
                      <Link to={'/programs'}>
                        <div className="img-card flex relative justify-center items-center gap-2 flex-col">

                          <figure className='w-full transition-transform duration-300 group-hover:scale-105 rounded-sm overflow-hidden'>
                            <img
                              src={item.bgImg} alt={item.heading}
                              className={`${item.id == 2 ? 'md:h-[47vh] md:w-[29.2vw]' : ' md:h-full md:w-full'} object-cover object-bottom h-[70vh] rounded-sm w-[80vw]`} />
                          </figure>

                          {/* BOT IMAGE - HIDDEN BY DEFAULT */}
                          <div className="bot-img absolute -bottom-4 md:w-54 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                            <figure >
                              <img src={imgHump} className='w-full h-full' alt="" />

                            </figure>
                            <span className={`w-6 absolute bottom-6  ${theme == 'light' ? 'text-[#007698]' : 'text-white'} right-[44%] h-8`}><MoveRight className='w-full h-full' /></span>
                          </div>

                        </div>
                      </Link>
                    </div>

                  ))}

                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ------------------------------------ testimonials + video ------------- */}
        <section className="testimonial w-full md:px-0 my-9 px-2">
          <div className="py-8 testimonial-container w-full px-0 lg:px-16 md:px-12 sm:px-8">
            <div className={`containter rounded-sm border-s-10 p-4 lg:p-16 md:p-12 sm:p-8 w-full  
      ${theme == 'light' ? 'bg-[#f0f0f069] border-s-[#007698]' : 'bg-gray-700 border-s-[#8bc540]'}`}>

              <div className="main-row flex md:flex-row gap-8 items-center justify-between flex-col-reverse">
                {/* LEFT SIDE - AUTO SLIDING QUOTES */}
                <div className="text-col md:w-1/2 w-full">
                  <div className="relative min-h-28 ">
                    {quotes.map((quote, index) => (
                      <div key={index} className={` absolute left-0 top-0 w-full transition-all duration-700 ease-in-out   ${index === activeQuote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <h1

                          className={`text-lg lg:text-3xl font-semibold italic leading-relaxed ${theme == 'dark' ? 'text-white!' : 'text-[#007698]!'}`}>
                          <span className={`text-3xl md:text-6xl ${theme == 'light' ? 'text-[#8bc540]' : 'text-[#007698]'} font-bold mr-2`}>“</span>
                          {quote.qoute}
                        </h1>
                        <p className={`py-2 font-semibold text-md md:text-2xl ${theme == 'light' ? 'text-[#787878] ' : 'text-[#4f8696]!'}`}>{quote.para}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT SIDE - YOUTUBE VIDEO */}
                <div className="video-col md:w-1/2 w-full">
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
        {/* ------------------------------------ our results ------------- */}
        <section className="our-programs w-full md:px-0 my-8 px-2">
          <div className="py-8 our-programs-container w-full px-0  lg:px-16 md:px-12 sm:px-8">
            <div className={`containter rounded-lg p-2 md:p-0 w-full`}>
              <div className="uper-portion flex flex-col md:flex-row items-center justify-between">
                <h1 className={`font-bold p-2 text-3xl lg:text-4xl leading-6 md:leading-12  w-fit ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}>Our Results  </h1>
                <p className={`leading-5 md:leading-8 text-lg lg:text-xl w-full lg:max-w-3/4 md:px-40 py-4  font-normal ${theme == 'light' ? 'text-[#007698]' : 'text-gray-200'} text-center md:text-start `}>
                  Our students post remarkable scores on math competitions,
                  see higher grades in school, and build a lasting confidence
                  in their math and learning abilities overall.</p>
              </div>
              <div className="lower-portion w-full">
                <div className="flex md:py-10 flex-col md:flex-row items-strech md:items-stech justify-between w-full gap-4">
                  {results.map((item, index) => (
                    <div
                      key={index}
                      className="card relative group rounded-lg border-b-10  min-h-[50vh] border-b-[#66bfd1] bg-[#007698] flex flex-col items-stretch justify-center w-full md:py-4 px-1 md:px-4 transition-all duration-500 ">
                      <h3 className={`font-bold leading-16 md:mb-4 text-center transition-all ease-in-out duration-500 sm:text-nowrap lg:text-7xl text-5xl md:py-4 ${theme == 'light' ? 'text-white opacity-70 group-hover:opacity-100' : 'text-black  opacity-70 group-hover:opacity-100'}`}>
                        {item.heading}
                      </h3>
                      <div className="img-card  w-full leading-8 text-lg md:text-xl mb-4 md:mb-12 lg:text-2xl flex justify-center items-center">
                        <p className={`transition-all text-center w-2/3 md:w-full ease-in-out duration-500 ${theme == 'light' ? 'text-white! opacity-70 group-hover:opacity-100' : 'text-black!  opacity-70 group-hover:opacity-100'}`}>
                          {item.para}
                        </p>
                        {results.length - 1 == index && <Link to={'/blog'}><span className={`absolute bottom-5 btn-small ${theme == 'light' ? ' btn-small-light ' : ' btn-small-dark '} right-1/10`}>read more</span></Link>}
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
          <QuoteCarousel />
        </section>

        {/* ------------------------------------ banner learn more about our programs ------------- */}

        <div className="w-full flex items-center p-4 md:p-12 justify-center">
          <div className={`container w-full md:mx-4 p-2 ${theme == 'light' ? 'bg-[#8bc540]' : 'bg-[#007698]'} rounded-xl py-12`}>
            <div className="row flex flex-col md:flex-row gap-4 items-center justify-center">
              <p className='w-full text-2xl lg:text-4xl font-semibold text-center text-white!'>Learn more about our programs </p>
              <div className='w-11/12 items-center justify-center'>
                <a className={` ${theme == 'light' ? 'btn-large text-white! hover:text-[#007698]! btn-large-dark' : 'btn-large  btn-large-light'} md:max-w-2/3 text-sm! px-12`}>schedule an evaluation</a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Home
