import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useThemeStore } from '../store/themeStore'
import Logo from './Logo'

const Navbar = ({ darkColor }) => {
    const [showmenu, setShowmenu] = useState(false)
    const [showNavbar, setShowNavbar] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const { toggleTheme, theme } = useThemeStore()
    if (darkColor == 'white') {
        darkColor = darkColor;
    } else if (darkColor == 'black') {
        darkColor = darkColor;
    }
    else {
        darkColor = ' '
    };
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
        <header className={`fixed top-0 w-full z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0 bg-transparent' : `-translate-y-full ${theme === 'light' ? ' bg-white' : 'bg-gray-900'}`} flex items-center justify-center `}>
            <div className={`p-0 container w-[90vw] border-b border-b-[#dcdcdc] flex flex-col md:flex-row items-center ${showNavbar ? 'bg-transparent' : `${theme === 'light' ? ' bg-white' : 'bg-gray-900'}`} gap-0 md:gap-12 justify-start ${theme === 'light' ? '' : 'bg-gray-900'}`}>
                <div className="flex items-center justify-between md:w-40 w-full">
                    <div className="brand-logo cursor-pointer w-40"><Link to={'/'}><Logo darkColor={`${darkColor}`} /></Link></div>
                    <div onClick={() => setShowmenu(!showmenu)} className="croxx block md:hidden">{!showmenu ? <Menu className={`${theme === 'light' ? 'text-[#007698]' : 'text-white'}`} /> : <X className={`${theme === 'light' ? 'text-[#007698]' : 'text-white'}`} />}</div>
                </div>
                <div className={`${showmenu ? 'flex' : 'hidden'} md:flex flex-col md:flex-row pb-8 sm:pb-0 gap-4 items-center justify-between w-full`}>
                    <nav>
                        <ul className='flex flex-col md:flex-row gap-4 items-center justify-center'>

                            <Link to='/'>
                                <li className={`cursor-pointer uppercase text-md ${theme == 'light' ? 'text-[#007698] hover:text-gray-400' : ` ${darkColor=='black'?'text-black':'text-white'} hover:text-[#007698]`} font-bold font-sans leading-tight text-sm`}>
                                    home
                                </li>
                            </Link>
                            <div className="relative group">
                                <Link to='/programs'>
                                    <li  className={`cursor-pointer flex items-center uppercase text-md ${theme == 'light' ? 'text-[#007698] hover:text-gray-400' : ` ${darkColor=='black'?'text-black':'text-white'} hover:text-[#007698]`} font-bold font-sans leading-tight text-sm`}>
                                        programs
                                        <span className="text-xs w-5"> <ChevronDown className='w-full' /> </span>
                                    </li>
                                </Link>
                                {/* Dropdown menu */}
                                <ul className={`absolute leading-tight left-0 top-full rounded-b-lg pt-2 mt-1 w-40 ${theme == 'light' ? 'bg-white' : 'bg-[#101828]'} rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
                                    <Link to={'/programs'}>
                                        <li className={`cursor-pointer hover:bg-[#8bc540] px-3 py-2 flex items-center ${theme == 'light' ? 'text-[#007698] hover:text-gray-200' : 'text-white hover:text-[#007698]'} font-normal leading-tight text-sm `}>
                                            All Programs
                                        </li>
                                    </Link>
                                    <Link to={'/programs/elementary'}>
                                        <li className={`cursor-pointer hover:bg-[#8bc540] px-3 py-2 flex items-center ${theme == 'light' ? 'text-[#007698] hover:text-gray-200' : 'text-white hover:text-[#007698]'} font-normal leading-tight text-sm `}>
                                            Elementary (K-2)
                                        </li>
                                    </Link>
                                    <Link to={'/programs/late-elementary'}>
                                        <li className={`cursor-pointer hover:bg-[#8bc540] px-3 py-2 flex items-center ${theme == 'light' ? 'text-[#007698] hover:text-gray-200' : 'text-white hover:text-[#007698]'} font-normal leading-tight text-sm `}>
                                            Elementary (3-5)
                                        </li>
                                    </Link>
                                    <Link to={'/programs/middle-school'}>
                                        <li className={`cursor-pointer hover:bg-[#8bc540] px-3 py-2 flex items-center ${theme == 'light' ? 'text-[#007698] hover:text-gray-200' : 'text-white hover:text-[#007698]'} font-normal leading-tight text-sm `}>
                                            Middle School
                                        </li>
                                    </Link>
                                    <Link to={'/programs/high-school'}>
                                        <li className={`cursor-pointer hover:bg-[#8bc540] px-3 py-2 flex items-center ${theme == 'light' ? 'text-[#007698] hover:text-gray-200' : 'text-white hover:text-[#007698]'} font-normal leading-tight text-sm `}>
                                            High School
                                        </li>
                                    </Link>
                                    <Link to={'/programs/competitions'}>
                                        <li className={`cursor-pointer rounded-b-lg hover:bg-[#8bc540] px-3 py-2 pb-4 flex items-center ${theme == 'light' ? 'text-[#007698] hover:text-gray-200' : 'text-white hover:text-[#007698]'} font-normal leading-tight text-sm `}>
                                            Competition
                                        </li>
                                    </Link>
                                </ul>
                            </div>

                            <Link to='/about'>
                                <li  className={`cursor-pointer uppercase text-md ${theme == 'light' ? 'text-[#007698] hover:text-gray-400' : ` ${darkColor=='black'?'text-black':'text-white'} hover:text-[#007698]`} font-bold font-sans leading-tight text-sm`}>
                                    about us
                                </li>
                            </Link>

                            <Link to='/blog'>
                                <li  className={`cursor-pointer uppercase text-md ${theme == 'light' ? 'text-[#007698] hover:text-gray-400' : ` ${darkColor=='black'?'text-black':'text-white'} hover:text-[#007698]`} font-bold font-sans leading-tight text-sm`}>
                                    blogs
                                </li>
                            </Link>
                        </ul>
                    </nav>
                    <nav>
                        <ul className='flex items-center justify-center gap-4 bg-[#8bc540] shadow-[0_1px_10px_hsla(0,0%,46.7%,.5)] h-12 leading-tight w-32 rounded-md'>
                            <li className={`cursor-pointer font-bold leading-3 text-sm border-e ${theme === 'light' ? 'border-e-[#dcdcdc]' : 'border-e-white'} w-5/6 flex items-center justify-center`} onClick={toggleTheme}>
                                {theme === 'light' ? <Moon className='text-[#007698] font-bold leading-3 text-sm' /> : <Sun />}
                            </li>
                            <Link className='w-full' to='/login'>
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
