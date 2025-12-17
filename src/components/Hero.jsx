import React, { useState, useEffect } from 'react'
import { useThemeStore } from '../store/themeStore'
import heroImg from './../assets/home2-hero-img.png'
import heroImg2 from './../assets/hero-img-boy.png'
import heroImg3 from './../assets/hero-img-two-girls-2.png'
import { ArrowDown } from 'lucide-react'

const slides = [
  {
    title: "Building Powerful Minds Through Mathematics",
    desc: "Our award winning K-12 after-school math program has empowered students to achieve excellence for over twenty years.",
    img: heroImg
  },
  {
    title: "Empowering Students for Future Success",
    desc: "We nurture critical thinking and problem-solving skills through innovative learning techniques.",
    img: heroImg2
  },
  {
    title: "Excellence in Education Starts Here",
    desc: "Join a community that transforms potential into outstanding academic achievement.",
    img: heroImg3
  }
]

const Hero = () => {
  const { theme } = useThemeStore()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`hero relative pt-10 py-4 md:pt-12 px-16 ${theme == 'light' ? 'bg-[#f0f0f0]' : 'bg-gray-700'} w-full overflow-hidden`}>

      {/* SLIDES */}
      <div className="relative w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`transition-all duration-700 ease-in-out ${index === current ? 'block opacity-100' : 'hidden opacity-0'
              }`}
          >
            <div className="hero-img-container w-full flex flex-col-reverse md:flex-row justify-between m-auto items-start">

              {/* CONTENT */}
              <div className="hero-content w-full">
                <div className="content-text min-h-[37vh] w-full">
                  <h1 className={`font-bold md:px-2 md:py-8 md:text-4xl sm:text-2xl text-lg lg:text-5xl leading-6 md:leading-12 w-full lg:max-w-xl md:w-[45vw] ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}>
                    {slide.title}
                  </h1>

                  <p className={`md:px-2 leading-5 md:leading-8 text-sm md:text-md lg:text-xl w-full lg:max-w-xl md:w-[45vw] font-normal ${theme == 'light' ? 'text-[#007698]' : 'text-gray-200'} md:py-8`}>
                    {slide.desc}
                  </p>
                </div>
              </div>

              {/* IMAGE (SIZE CONTROL LOGIC) */}
              <div className="hero-img flex w-full items-center justify-center">
                <figure
                  className={
                    index === 0
                      ? 'max-w-[22vw]' // ✅ Slide 1 original size
                      : 'w-full max-w-[420px] md:max-w-[480px] lg:max-w-[520px]' // ✅ Slide 2 & 3 bigger
                  }
                >
                  <img
                    src={slide.img}
                    alt="hero"
                    className={`w-full h-auto ${index === 0 ? '' : 'object-contain'}`}
                  />
                </figure>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* DOTS NAVIGATION */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${i === current ? 'bg-[#007698]' : 'bg-gray-400'
              }`}
          ></span>
        ))}
      </div>

      {/* SCROLL ACTION */}
      <div className="hero-scroll-action left-[58%] md:left-1/2 flex items-center justify-center mt-4">
        <a
          onClick={() => {
            document.getElementById('scrollTo')?.scrollIntoView({
            })
          }
          }
          className={`${theme == 'light' ? 'bg-[#8bc540] ' : 'bg-gray-800'} scroll-m-2 duration-500 cursor-pointer rounded-full shadow-[0_1px_10px_rgba(0,0,0,0.4)] transform translate-y-1.5 hover:animate-bounce h-14 w-14 flex items-center justify-center`}
        >
          <ArrowDown />
        </a>
      </div>

    </div>
  )
}

export default Hero
