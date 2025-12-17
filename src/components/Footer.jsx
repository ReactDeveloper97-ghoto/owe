import { Facebook, Instagram, Minus, Plus, Youtube } from "lucide-react"
import { useThemeStore } from "../store/themeStore";
import { Link } from 'react-router'
import { useState } from "react";


const Footer = () => {
    const { theme } = useThemeStore();
    const [open, setOpen] = useState(null)
    const ftrArr1 = [{
        heading: 'All Programs',
        to: '/programs'
    },
    {
        heading: 'Elementary (K-2)',
        to: '/programs/elementary'
    },
    {
        heading: 'Elementary (3-5)',
        to: '/programs/late-elementary'
    },
    {
        heading: 'Middle School',
        to: '/programs/middle-school'
    },
    {
        heading: 'High School',
        to: '/programs/high-school'
    },
    {
        heading: 'Competitions',
        to: '/programs/competitions'
    },
    {
        heading: 'Summar School',
        to: '/programs/summar-school'
    },
    {
        heading: 'Tutoring',
        to: '/programs/tutoring'
    },
    {
        heading: 'OWE Online',
        to: '/programs/online'
    },


    ];
    const ftrArr2 = [{
        heading: 'About OWE',
        to: '/about'
    },
    {
        heading: 'Approach',
        to: '/about'
    },
    {
        heading: 'Blog',
        to: '/blog'
    },
    {
        heading: 'Careers',
        to: '/about'
    },
    {
        heading: 'Contact us',
        to: '/contacts'
    },
    {
        heading: 'Site Map',
        to: '/about'
    }





    ];

    const toggle = (index) => {
        setOpen(open === index ? null : index)
    }
    return (
        <div className={`${theme=='light'?'bg-white':'bg-gray-800'}`}>
            <hr className={` ${theme == 'light' ? "text-gray-300" : "text-gray-900"} opacity-45 transition-all duration-500`} />
            <div className='flex items-center justify-center w-full md:px-8 pt-8'>
                <div className="container p-4 flex items-start justify-center gap-12 md:gap-2 flex-col md:flex-row">
                    <div className={`col-left gap-4 w-full flex flex-col md:flex-row justify-between items-start ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}>
                        <div className="inner-col-left w-full ">
                            <h2 onClick={() => toggle(1)} className="w-full flex items-center justify-between leading-4 text-xl font-bold"><span>Our Programs</span><span className="md:hidden"> {open === 1 ? <Minus /> : <Plus />}</span></h2>
                            <nav className={`${open == 1 ? 'block' : 'hidden md:block'}`}>
                                <ul className="py-4 font-semibold text-sm leading-7">
                                    {ftrArr1.map((item, index) => (
                                        <Link key={index} to={`${item.to}`}><li className={`${theme == 'light' ? 'hover:text-gray-400' : 'hover:text-[#8bc540]'} w-fit`}>{item.heading}</li></Link>
                                    ))}</ul>
                            </nav>
                        </div>
                        <div className="inner-col-left w-full ">
                            <h2 onClick={() => toggle(2)} className="w-full flex items-center justify-between leading-4 text-xl font-bold"><span>Company</span><span className="md:hidden"> {open === 2 ? <Minus /> : <Plus />}</span></h2>
                            <nav className={`${open == 2 ? 'block' : 'hidden md:block'}`}>
                                <ul className="py-4 font-semibold text-sm leading-7">
                                    {ftrArr2.map((item, index) => (
                                        <Link key={index} to={`${item.to}`}><li className={`${theme == 'light' ? 'hover:text-gray-400' : 'hover:text-[#8bc540]'} w-fit`}>{item.heading}</li></Link>
                                    ))}</ul>
                            </nav>
                        </div>
                    </div>
                    <div className={`col-right w-full flex-col flex justify-center items-start ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}>
                        <h2 className="w-full flex items-center justify-between leading-4 text-xl font-bold mb-4 md:mb-4">Your OWE Academy</h2>
                        <form className="w-full">
                            <div className="row mb-2 md:mb-3 flex-col md:flex-row flex gap-2.5 items-start justify-center w-full">
                                <div className="col justify-center w-full flex gap-3">

                                    <input placeholder="Full name" className={`outline-none w-full p-1.5 border ${theme == 'light' ? 'border-[#007698]' : 'border-gray-300'}  rounded-lg`} type="text" name="fulName" id="fulName" />
                                </div>
                                <div className="col flex justify-center w-full gap-3">

                                    <input placeholder="Your Email" className={`outline-none w-full p-1.5 border ${theme == 'light' ? 'border-[#007698]' : 'border-gray-300'}  rounded-lg`} type="email" name="email" id="email" />
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 w-full">
                                <textarea className={`outline-none w-full px-1 border ${theme == 'light' ? 'border-[#007698]' : 'border-gray-300'}  rounded-lg`} placeholder="Your message" name="message" id="message"></textarea>
                                <button className={`${theme == 'light' ? 'border-[#007698] hover:bg-[#007698] hover:text-white' : 'border-gray-300 hover:bg-white hover:text-[#007698] hover:border-[#007698] hover:border-2'} border-2 font-semibold p-2 rounded-lg`}>Submit</button>
                            </div>

                        </form>
                        <div className="flex justify-start w-full mt-4 flex-row">
                            <h2 className="w-full flex text-nowrap items-center justify-between leading-4 text-xl font-bold mb-4 md:mb-4">Stay Connected</h2>
                            <div className="flex w-full items-center justify-end">
                                <a className={`w-full ${theme == 'light' ? 'hover:text-gray-400' : 'hover:text-[#8bc540]'} cursor-pointer flex items-center justify-end`}><Facebook className="w-6 h-6 " /></a>
                                <a className={`w-full ${theme == 'light' ? 'hover:text-gray-400' : 'hover:text-[#8bc540]'} cursor-pointer flex items-center justify-center`}><Instagram className="w-6 h-6" /></a>
                                <a className={`w-full ${theme == 'light' ? 'hover:text-gray-400' : 'hover:text-[#8bc540]'} cursor-pointer flex items-center justify-start`}><Youtube className="w-8 h-8  " /></a>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer
