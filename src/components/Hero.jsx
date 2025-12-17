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
    img: heroImg,
    imgAlt: "Students engaged in interactive mathematics learning at Our World of Education",
    schemaTitle: "K-12 Mathematics Program | Building Critical Thinking Skills"
  },
  {
    title: "Empowering Students for Future Success",
    desc: "We nurture critical thinking and problem-solving skills through innovative learning techniques.",
    img: heroImg2,
    imgAlt: "Student solving mathematics problem with guidance from teacher",
    schemaTitle: "STEM Education & College Preparation Program"
  },
  {
    title: "Excellence in Education Starts Here",
    desc: "Join a community that transforms potential into outstanding academic achievement.",
    img: heroImg3,
    imgAlt: "High school students collaborating on mathematics project",
    schemaTitle: "Academic Excellence Program | Math Competition Preparation"
  }
]

const Hero = () => {
  const { theme } = useThemeStore()
  const [current, setCurrent] = useState(0)
  const [preloadedImages, setPreloadedImages] = useState(false)

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = () => {
      slides.forEach(slide => {
        const img = new Image()
        img.src = slide.img
      })
      setPreloadedImages(true)
    }
    preloadImages()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Announce slide changes for screen readers
  useEffect(() => {
    const announcement = document.getElementById('slide-announcement')
    if (announcement) {
      announcement.textContent = `Slide ${current + 1} of ${slides.length}: ${slides[current].title}`
    }
  }, [current])

  const handleDotClick = (index) => {
    setCurrent(index)
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setCurrent(index)
    }
  }

  const scrollToContent = () => {
    const target = document.getElementById('scrollTo')
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section 
      className={`hero relative pt-10 py-4 md:pt-12 px-16 ${theme == 'light' ? 'bg-[#f0f0f0]' : 'bg-gray-700'} w-full overflow-hidden`}
      aria-label="Hero carousel - Our World of Education mathematics program"
      role="region"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      {/* Screen reader announcement for slide changes */}
      <div 
        id="slide-announcement"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />
      
      {/* Structured data for hero section */}
      <div itemScope itemType="https://schema.org/CreativeWork" className="sr-only">
        <meta itemProp="name" content="Our World of Education Hero Section" />
        <meta itemProp="description" content="K-12 mathematics education program featuring interactive learning, critical thinking development, and academic excellence." />
        <meta itemProp="keywords" content="mathematics program, K-12 education, math tutoring, critical thinking, problem solving" />
      </div>

      {/* SLIDES */}
      <div 
        className="relative w-full"
        role="group"
        aria-roledescription="carousel"
        aria-label="Program highlights carousel"
      >
        {slides.map((slide, index) => (
          <article
            key={index}
            className={`transition-all duration-700 ease-in-out ${index === current ? 'block opacity-100' : 'hidden opacity-0'}`}
            role="group"
            aria-roledescription="slide"
            aria-hidden={index !== current}
            aria-label={`Slide ${index + 1}: ${slide.schemaTitle}`}
            itemScope
            itemType="https://schema.org/CreativeWork"
          >
            <div className="hero-img-container w-full flex flex-col-reverse md:flex-row justify-between m-auto items-start">

              {/* CONTENT */}
              <div className="hero-content w-full">
                <div className="content-text min-h-[37vh] w-full">
                  <h1 
                    className={`font-bold md:px-2 md:py-8 md:text-4xl sm:text-2xl text-lg lg:text-5xl leading-6 md:leading-12 w-full lg:max-w-xl md:w-[45vw] ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}
                    itemProp="headline"
                  >
                    {slide.title}
                  </h1>

                  <p 
                    className={`md:px-2 leading-5 md:leading-8 text-sm md:text-md lg:text-xl w-full lg:max-w-xl md:w-[45vw] font-normal ${theme == 'light' ? 'text-[#007698]' : 'text-gray-200'} md:py-8`}
                    itemProp="description"
                  >
                    {slide.desc}
                  </p>
                </div>
              </div>

              {/* IMAGE (SIZE CONTROL LOGIC) */}
              <div className="hero-img flex w-full items-center justify-center">
                <figure
                  className={
                    index === 0
                      ? 'max-w-[22vw]'
                      : 'w-full max-w-[420px] md:max-w-[480px] lg:max-w-[520px]'
                  }
                  itemScope
                  itemType="https://schema.org/ImageObject"
                >
                  <img
                    src={slide.img}
                    alt={slide.imgAlt}
                    className={`w-full h-auto ${index === 0 ? '' : 'object-contain'}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    width={index === 0 ? "350" : "520"}
                    height={index === 0 ? "350" : "520"}
                    itemProp="contentUrl"
                  />
                  <figcaption className="sr-only" itemProp="caption">
                    {slide.imgAlt}
                  </figcaption>
                  <meta itemProp="name" content={slide.schemaTitle} />
                </figure>
              </div>

            </div>
          </article>
        ))}
      </div>

      {/* DOTS NAVIGATION */}
      <div 
        className="flex justify-center gap-2 mt-4"
        role="tablist"
        aria-label="Slide navigation"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${i === current ? 'bg-[#007698]' : 'bg-gray-400'} ${theme == 'light' ? 'focus:ring-[#007698]' : 'focus:ring-[#8bc540]'}`}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            tabIndex={0}
          />
        ))}
      </div>

      {/* SCROLL ACTION */}
      <div className="hero-scroll-action left-[58%] md:left-1/2 flex items-center justify-center mt-4">
        <button
          onClick={scrollToContent}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              scrollToContent()
            }
          }}
          className={`${theme == 'light' ? 'bg-[#8bc540] ' : 'bg-gray-800'} scroll-m-2 duration-500 cursor-pointer rounded-full shadow-[0_1px_10px_rgba(0,0,0,0.4)] transform translate-y-1.5 hover:animate-bounce h-14 w-14 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme == 'light' ? 'focus:ring-[#8bc540]' : 'focus:ring-[#007698]'}`}
          aria-label="Scroll to learn more about our programs"
        >
          <ArrowDown 
            className={`${theme == 'light' ? 'text-white' : 'text-white'}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* SCROLL TARGET */}
      <div id="scrollTo" className="h-0" tabIndex="-1" aria-hidden="true"></div>
    </section>
  )
}

export default Hero