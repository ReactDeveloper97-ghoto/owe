import React, { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useThemeStore } from "../store/themeStore";

const slides = [
    {
        quote: "Education is the most powerful weapon which you can use to change the world.",
        author: "Nelson Mandela",
        image: "https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg"
    },
    {
        quote: "The beautiful thing about learning is that no one can take it away from you.",
        author: "B.B. King",
        image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg"
    },
    {
        quote: "An investment in knowledge pays the best interest.",
        author: "Benjamin Franklin",
        image: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg"
    }
]

const QuoteCarousel = () => {
    const [current, setCurrent] = useState(0);
    const { theme } = useThemeStore()


    // Auto Slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev =>
                prev === slides.length - 1 ? 0 : prev + 1
            )
        }, 10000)
        return () => clearInterval(interval)
    }, [])

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1)
    }

    return (
        <div className="w-full flex px-4 md:px-16 items-center justify-center py-10">
            <div className="container grid md:grid-cols-2 gap-8 items-center">

                {/* LEFT COLUMN - QUOTE */}
                <div className="flex flex-col justify-center">
                    <p className={`text-2xl font-semibold italic leading-relaxed ${theme == 'dark' ? 'text-white!' : 'text-[#007698]!'}`}>
                        <span className={`text-3xl md:text-6xl ${theme == 'light' ? 'text-[#8bc540]' : 'text-[#007698]'} font-bold mr-2`}>“</span>
                        {slides[current].quote}”
                    </p>
                    <span className="mt-4 text-lg font-bold text-gray-500">
                        — {slides[current].author}
                    </span>
                </div>

                {/* RIGHT COLUMN - IMAGE */}
                <div className="relative w-full h-80 overflow-hidden rounded-2xl">
                    <img
                        src={slides[current].image}
                        alt="slide"
                        className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                    />

                    {/* LEFT ARROW */}
                    <button
                        onClick={prevSlide}
                        className={`absolute left-4 top-1/2 cursor-pointer -translate-y-1/2 p-2 rounded-full shadow-lg  ${theme == 'light' ? 'bg-[#007698] hover:bg-gray-300 hover:border-[#007698] hover:border hover:text-[#007698] text-white border-white' : 'hover:text-white hover:border-white hover:border bg-gray-300 border-text-[#007698] text-[#007698] hover:bg-[#007698]'}`}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* RIGHT ARROW (IMAGE KE UPAR) */}
                    <button
                        onClick={nextSlide}
                        className={`absolute right-4 top-1/2 cursor-pointer -translate-y-1/2  p-2 rounded-full shadow-lg  ${theme == 'light' ? 'bg-[#007698] hover:bg-gray-300 hover:border-[#007698] hover:border hover:text-[#007698] text-white border-white' : 'hover:text-white hover:border-white hover:border bg-gray-300 border-text-[#007698] text-[#007698] hover:bg-[#007698]'}`}
                    >
                        <ChevronRight size={24} />
                    </button>

                </div>
            </div>
        </div>
    )
}

export default QuoteCarousel
