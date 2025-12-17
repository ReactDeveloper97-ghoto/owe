import React, { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useThemeStore } from "../store/themeStore";

const slides = [
    {
        id: 1,
        quote: "Education is the most powerful weapon which you can use to change the world.",
        author: "Nelson Mandela",
        image: "https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg",
        imageAlt: "Diverse group of students collaborating on educational project",
        citation: "Nelson Mandela, Former President of South Africa",
        keywords: "education, learning, transformation"
    },
    {
        id: 2,
        quote: "The beautiful thing about learning is that no one can take it away from you.",
        author: "B.B. King",
        image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg",
        imageAlt: "Students engaged in creative learning activity in classroom",
        citation: "B.B. King, American musician",
        keywords: "knowledge, lifelong learning, personal growth"
    },
    {
        id: 3,
        quote: "An investment in knowledge pays the best interest.",
        author: "Benjamin Franklin",
        image: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg",
        imageAlt: "Teacher guiding students through mathematics lesson",
        citation: "Benjamin Franklin, Founding Father of the United States",
        keywords: "investment, education, future success"
    }
]

const QuoteCarousel = () => {
    const [current, setCurrent] = useState(0);
    const [preloadedImages, setPreloadedImages] = useState(false);
    const { theme } = useThemeStore();

    // Preload images for better performance
    useEffect(() => {
        const preloadImages = () => {
            slides.forEach(slide => {
                const img = new Image();
                img.src = slide.image;
            });
            setPreloadedImages(true);
        }
        preloadImages();
    }, []);

    // Auto Slide with accessibility pause on hover
    useEffect(() => {
        let interval;
        const startInterval = () => {
            interval = setInterval(() => {
                setCurrent(prev =>
                    prev === slides.length - 1 ? 0 : prev + 1
                );
            }, 10000);
        };

        startInterval();

        // Pause on hover for better accessibility
        const carouselContainer = document.querySelector('.quote-carousel-container');
        const pauseOnHover = () => {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        };
        const resumeOnLeave = () => {
            if (!interval) {
                startInterval();
            }
        };

        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', pauseOnHover);
            carouselContainer.addEventListener('mouseleave', resumeOnLeave);
            carouselContainer.addEventListener('focusin', pauseOnHover);
            carouselContainer.addEventListener('focusout', resumeOnLeave);
        }

        return () => {
            if (interval) clearInterval(interval);
            if (carouselContainer) {
                carouselContainer.removeEventListener('mouseenter', pauseOnHover);
                carouselContainer.removeEventListener('mouseleave', resumeOnLeave);
                carouselContainer.removeEventListener('focusin', pauseOnHover);
                carouselContainer.removeEventListener('focusout', resumeOnLeave);
            }
        };
    }, []);

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
    }

    // Keyboard navigation handler
    const handleKeyDown = (e, action) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            action();
        }
    };

    // Announce slide change for screen readers
    useEffect(() => {
        const announcement = document.getElementById('quote-announcement');
        if (announcement) {
            announcement.textContent = `Quote ${current + 1} of ${slides.length}: ${slides[current].quote} by ${slides[current].author}`;
        }
    }, [current]);

    return (
        <section 
            className="w-full flex px-4 md:px-16 items-center justify-center py-10 quote-carousel-container"
            aria-label="Inspirational educational quotes"
            role="region"
            itemScope
            itemType="https://schema.org/WebPageElement"
        >
            {/* Screen reader announcement for quote changes */}
            <div 
                id="quote-announcement"
                className="sr-only"
                aria-live="polite"
                aria-atomic="true"
            />
            
            {/* Structured data for quote carousel */}
            <div itemScope itemType="https://schema.org/ItemList" className="sr-only">
                <meta itemProp="name" content="Educational Quotes Carousel" />
                <meta itemProp="description" content="Inspiring quotes about education, learning, and knowledge from famous figures" />
                {slides.map((slide, index) => (
                    <div key={slide.id} itemScope itemType="https://schema.org/Quotation" className="sr-only">
                        <meta itemProp="text" content={slide.quote} />
                        <meta itemProp="author" content={slide.author} />
                        <meta itemProp="position" content={index + 1} />
                    </div>
                ))}
            </div>

            <div className="container grid md:grid-cols-2 gap-8 items-center">
                {/* LEFT COLUMN - QUOTE */}
                <div className="flex flex-col justify-center">
                    <blockquote 
                        className={`text-2xl font-semibold italic leading-relaxed ${theme == 'dark' ? 'text-white!' : 'text-[#007698]!'}`}
                        itemScope
                        itemType="https://schema.org/Quotation"
                        cite={slides[current].citation}
                    >
                        <span className={`text-3xl md:text-6xl ${theme == 'light' ? 'text-[#8bc540]' : 'text-[#007698]'} font-bold mr-2`} aria-hidden="true">"</span>
                        <span itemProp="text">{slides[current].quote}</span>
                        {/* <span className={`text-3xl md:text-6xl ${theme == 'light' ? 'text-[#8bc540]' : 'text-[#007698]'} font-bold ml-2`} aria-hidden="true">"</span> */}
                    </blockquote>
                    <cite 
                        className="mt-4 text-lg font-bold text-gray-500 not-italic"
                        itemProp="author"
                    >
                        — {slides[current].author}
                    </cite>
                </div>

                {/* RIGHT COLUMN - IMAGE */}
                <figure className="relative w-full h-80 overflow-hidden rounded-2xl">
                    <img
                        src={slides[current].image}
                        alt={slides[current].imageAlt}
                        className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                        loading="lazy"
                        width="600"
                        height="320"
                        itemProp="image"
                    />
                    
                    <figcaption className="sr-only">
                        {slides[current].imageAlt}
                    </figcaption>

                    {/* Navigation buttons */}
                    <div className="absolute inset-0 flex items-center justify-between p-4">
                        {/* LEFT ARROW */}
                        <button
                            onClick={prevSlide}
                            onKeyDown={(e) => handleKeyDown(e, prevSlide)}
                            className={`cursor-pointer p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                theme == 'light' 
                                    ? 'bg-[#007698] hover:bg-gray-300 hover:border-[#007698] hover:border hover:text-[#007698] text-white border-white focus:ring-[#007698]' 
                                    : 'hover:text-white hover:border-white hover:border bg-gray-300 border-text-[#007698] text-[#007698] hover:bg-[#007698] focus:ring-white'
                            }`}
                            aria-label="Previous inspirational quote"
                        >
                            <ChevronLeft size={24} aria-hidden="true" />
                        </button>

                        {/* RIGHT ARROW */}
                        <button
                            onClick={nextSlide}
                            onKeyDown={(e) => handleKeyDown(e, nextSlide)}
                            className={`cursor-pointer p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                theme == 'light' 
                                    ? 'bg-[#007698] hover:bg-gray-300 hover:border-[#007698] hover:border hover:text-[#007698] text-white border-white focus:ring-[#007698]' 
                                    : 'hover:text-white hover:border-white hover:border bg-gray-300 border-text-[#007698] text-[#007698] hover:bg-[#007698] focus:ring-white'
                            }`}
                            aria-label="Next inspirational quote"
                        >
                            <ChevronRight size={24} aria-hidden="true" />
                        </button>
                    </div>

                    {/* Progress indicators */}
                    <div 
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
                        role="tablist"
                        aria-label="Quote navigation dots"
                    >
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                onKeyDown={(e) => handleKeyDown(e, () => setCurrent(index))}
                                className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                    index === current 
                                        ? theme == 'light' ? 'bg-[#007698]' : 'bg-white' 
                                        : theme == 'light' ? 'bg-gray-400' : 'bg-gray-600'
                                } ${theme == 'light' ? 'focus:ring-[#007698]' : 'focus:ring-white'}`}
                                role="tab"
                                aria-selected={index === current}
                                aria-label={`Go to quote ${index + 1}: ${slides[index].author}`}
                                tabIndex={0}
                            />
                        ))}
                    </div>
                </figure>
            </div>
        </section>
    )
}

export default QuoteCarousel;