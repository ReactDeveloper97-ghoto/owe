import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom' // Fixed import
import { useThemeStore } from '../store/themeStore'
import Logo from './Logo'

const Navbar = ({ darkColor }) => {
    const [showmenu, setShowmenu] = useState(false)
    const [showNavbar, setShowNavbar] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const { toggleTheme, theme } = useThemeStore()
    const location = useLocation() // Added for SEO

    if (darkColor == 'white') {
        darkColor = darkColor;
    } else if (darkColor == 'black') {
        darkColor = 'white';
    }
    else {
        darkColor = ' '
    };

    // SEO: Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0)
        setShowmenu(false) // Close mobile menu on navigation
    }, [location.pathname])

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                // Scrolling down → hide
                setShowNavbar(false)
            } else {
                // Scrolling up → show
                setShowNavbar(true)
            }
            setLastScrollY(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    return (
        <header className={`fixed top-0 w-full z-50 transition-transform duration-300 ${showNavbar ? `translate-y-0 ${theme === 'light' ? ' bg-white' : 'bg-gray-900'}` : `-translate-y-full ${theme === 'light' ? ' bg-white' : 'bg-gray-900'}`} flex items-center justify-center `}>
            <div className={`p-0 container w-[90vw] border-b border-b-[#dcdcdc] flex flex-col md:flex-row items-center ${showNavbar ? 'bg-transparent' : `${theme === 'light' ? ' bg-white' : 'bg-gray-900'}`} gap-0 md:gap-12 justify-start ${theme === 'light' ? '' : 'bg-gray-900'}`}>
                <div className="flex items-center justify-between md:w-40 w-full">
                    <div className="brand-logo cursor-pointer w-40">
                        {/* SEO: Home link with aria-label */}
                        <Link to={'/'} aria-label="Our World of Education Homepage">
                            <Logo darkColor={`${darkColor}`} />
                        </Link>
                    </div>
                    <div
                        onClick={() => setShowmenu(!showmenu)}
                        className="croxx block md:hidden"
                        aria-label={showmenu ? "Close menu" : "Open menu"}
                        role="button"
                        tabIndex={0}
                    >
                        {!showmenu ? <Menu className={`${theme === 'light' ? 'text-[#007698]' : 'text-white'}`} /> : <X className={`${theme === 'light' ? 'text-[#007698]' : 'text-white'}`} />}
                    </div>
                </div>
                <div className={`${showmenu ? 'flex' : 'hidden'} md:flex flex-col md:flex-row pb-8 sm:pb-0 gap-4 items-center justify-between w-full`}>
                    <nav aria-label="Main navigation">
                        <ul className='flex flex-col md:flex-row gap-4 items-center justify-center'>
                            {/* SEO: Home link with proper attributes */}
                            <Link to='/' aria-label="Home page">
                                <li className={`cursor-pointer uppercase text-md ${theme == 'light' ? 'text-[#007698] hover:text-gray-400' : ` ${darkColor == 'black' ? 'text-black' : 'text-white'} hover:text-[#007698]`} font-bold font-sans leading-tight text-sm`}>
                                    home
                                </li>
                            </Link>

                            {/* SEO: Programs dropdown with semantic structure */}
                            <div className="relative group">
                                <Link
                                    to='/programs'
                                    aria-label="Educational Programs"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <li className={`cursor-pointer flex items-center uppercase text-md ${theme == 'light' ? 'text-[#007698] hover:text-gray-400' : ` ${darkColor == 'black' ? 'text-black' : 'text-white'} hover:text-[#007698]`} font-bold font-sans leading-tight text-sm`}>
                                        programs
                                        <span className="text-xs w-5" aria-hidden="true"> <ChevronDown className='w-full' /> </span>
                                    </li>
                                </Link>
                                {/* Dropdown menu for SEO */}
                                <ul
                                    className={`absolute leading-tight left-0 top-full rounded-b-lg pt-2 mt-1 w-40 ${theme == 'light' ? 'bg-white' : 'bg-[#101828]'} rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}
                                    role="menu"
                                    aria-label="Program submenu"
                                >
                                    {/* SEO: All programs link */}
                                    <Link to={'/programs'} aria-label="View all educational programs">
                                        <li className={`cursor-pointer hover:bg-[#8bc540] px-3 py-2 flex items-center ${theme == 'light' ? 'text-[#007698] hover:text-gray-200' : 'text-white hover:text-[#007698]'} font-normal leading-tight text-sm `} role="menuitem">
                                            All Programs
                                        </li>
                                    </Link>
                                    {/* SEO: Elementary program */}
                                    <Link to={'/programs/elementary'} aria-label="Elementary math program for grades K-2">
                                        <li className={`cursor-pointer hover:bg-[#8bc540] px-3 py-2 flex items-center ${theme == 'light' ? 'text-[#007698] hover:text-gray-200' : 'text-white hover:text-[#007698]'} font-normal leading-tight text-sm `} role="menuitem">
                                            Elementary (K-2)
                                        </li>
                                    </Link>
                                    {/* SEO: Late Elementary program */}
                                    <Link to={'/programs/late-elementary'} aria-label="Late elementary math program for grades 3-5">
                                        <li className={`cursor-pointer hover:bg-[#8bc540] px-3 py-2 flex items-center ${theme == 'light' ? 'text-[#007698] hover:text-gray-200' : 'text-white hover:text-[#007698]'} font-normal leading-tight text-sm `} role="menuitem">
                                            Elementary (3-5)
                                        </li>
                                    </Link>
                                    {/* SEO: Middle School program */}
                                    <Link to={'/programs/middle-school'} aria-label="Middle school mathematics program">
                                        <li className={`cursor-pointer hover:bg-[#8bc540] px-3 py-2 flex items-center ${theme == 'light' ? 'text-[#007698] hover:text-gray-200' : 'text-white hover:text-[#007698]'} font-normal leading-tight text-sm `} role="menuitem">
                                            Middle School
                                        </li>
                                    </Link>
                                    {/* SEO: High School program */}
                                    <Link to={'/programs/high-school'} aria-label="High school math and college preparation">
                                        <li className={`cursor-pointer hover:bg-[#8bc540] px-3 py-2 flex items-center ${theme == 'light' ? 'text-[#007698] hover:text-gray-200' : 'text-white hover:text-[#007698]'} font-normal leading-tight text-sm `} role="menuitem">
                                            High School
                                        </li>
                                    </Link>
                                    {/* SEO: Competition program */}
                                    <Link to={'/programs/competitions'} aria-label="Math competition preparation">
                                        <li className={`cursor-pointer rounded-b-lg hover:bg-[#8bc540] px-3 py-2 pb-4 flex items-center ${theme == 'light' ? 'text-[#007698] hover:text-gray-200' : 'text-white hover:text-[#007698]'} font-normal leading-tight text-sm `} role="menuitem">
                                            Competition
                                        </li>
                                    </Link>
                                    {/* SEO: Online classes */}
                                    <Link to={'/programs/online'} aria-label="Online math classes">
                                        <li className={`cursor-pointer rounded-b-lg hover:bg-[#8bc540] px-3 py-2 pb-4 flex items-center ${theme == 'light' ? 'text-[#007698] hover:text-gray-200' : 'text-white hover:text-[#007698]'} font-normal leading-tight text-sm `} role="menuitem">
                                            Online Classes
                                        </li>
                                    </Link>
                                    {/* SEO: Summer school */}
                                    <Link to={'/programs/summer-school'} aria-label="Summer math school programs">
                                        <li className={`cursor-pointer rounded-b-lg hover:bg-[#8bc540] px-3 py-2 pb-4 flex items-center ${theme == 'light' ? 'text-[#007698] hover:text-gray-200' : 'text-white hover:text-[#007698]'} font-normal leading-tight text-sm `} role="menuitem">
                                            Summer School
                                        </li>
                                    </Link>
                                    {/* SEO: Tutoring services */}
                                    <Link to={'/programs/tutoring'} aria-label="One-on-one math tutoring">
                                        <li className={`cursor-pointer rounded-b-lg hover:bg-[#8bc540] px-3 py-2 pb-4 flex items-center ${theme == 'light' ? 'text-[#007698] hover:text-gray-200' : 'text-white hover:text-[#007698]'} font-normal leading-tight text-sm `} role="menuitem">
                                            Tutoring
                                        </li>
                                    </Link>
                                </ul>
                            </div>

                            {/* SEO: About page */}
                            <Link to='/about' aria-label="About Our World of Education">
                                <li className={`cursor-pointer uppercase text-md ${theme == 'light' ? 'text-[#007698] hover:text-gray-400' : ` ${darkColor == 'black' ? 'text-black' : 'text-white'} hover:text-[#007698]`} font-bold font-sans leading-tight text-sm`}>
                                    about us
                                </li>
                            </Link>

                            {/* SEO: Blog page */}
                            <Link to='/blog' aria-label="Mathematics education blog">
                                <li className={`cursor-pointer uppercase text-md ${theme == 'light' ? 'text-[#007698] hover:text-gray-400' : ` ${darkColor == 'black' ? 'text-black' : 'text-white'} hover:text-[#007698]`} font-bold font-sans leading-tight text-sm`}>
                                    blogs
                                </li>
                            </Link>

                            {/* SEO: Added missing important pages */}
                            <Link to='/contacts' aria-label="Contact Our World of Education">
                                <li className={`cursor-pointer uppercase text-md ${theme == 'light' ? 'text-[#007698] hover:text-gray-400' : ` ${darkColor == 'black' ? 'text-black' : 'text-white'} hover:text-[#007698]`} font-bold font-sans leading-tight text-sm`}>
                                    contact
                                </li>
                            </Link>

                            <Link to='/admin-login' aria-label="Admin login portal">
                                <li className={`cursor-pointer bg-gray-200 p-1 px-2 rounded-3xl text-md ${theme == 'light' ? 'text-[#007698] hover:text-gray-400' : 'text-black hover:text-[#007698]'} font-semibold font-sans leading-tight text-sm`}>
                                    Admin
                                </li>
                            </Link>
                        </ul>
                    </nav>
                    <nav aria-label="User actions">
                        <ul className='flex items-center justify-center gap-4 bg-[#8bc540] shadow-[0_1px_10px_hsla(0,0%,46.7%,.5)] h-12 leading-tight w-32 rounded-md'>
                            {/* SEO: Theme toggle with proper label */}
                            <li
                                className={`cursor-pointer font-bold leading-3 text-sm border-e ${theme === 'light' ? 'border-e-[#dcdcdc]' : 'border-e-white'} w-5/6 flex items-center justify-center`}
                                onClick={toggleTheme}
                                role="button"
                                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                                tabIndex={0}
                            >
                                {theme === 'light' ? <Moon className='text-[#007698] font-bold leading-3 text-sm' /> : <Sun />}
                            </li>
                            {/* SEO: Login link */}
                            <Link className='w-full' to='/login' aria-label="Parent portal login">
                                <li className={`cursor-pointer text-md ${theme === 'light' ? 'text-[#007698] hover:text-gray-400' : 'text-white hover:text-[#007698]'} font-bold leading-tight text-sm`}>
                                    Parent Login
                                </li>
                            </Link>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar