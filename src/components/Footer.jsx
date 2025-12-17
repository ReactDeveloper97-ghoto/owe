import { Facebook, Instagram, Minus, Plus, Youtube } from "lucide-react"
import { useThemeStore } from "../store/themeStore";
import { Link } from 'react-router-dom'
import { useState } from "react";

const Footer = () => {
    const { theme } = useThemeStore();
    const [open, setOpen] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: ''
    });

    const ftrArr1 = [
        {
            heading: 'All Programs',
            to: '/programs',
            ariaLabel: 'View all mathematics programs'
        },
        {
            heading: 'Elementary (K-2)',
            to: '/programs/elementary',
            ariaLabel: 'Elementary mathematics program for grades K-2'
        },
        {
            heading: 'Elementary (3-5)',
            to: '/programs/late-elementary',
            ariaLabel: 'Late elementary mathematics program for grades 3-5'
        },
        {
            heading: 'Middle School',
            to: '/programs/middle-school',
            ariaLabel: 'Middle school mathematics program for grades 6-8'
        },
        {
            heading: 'High School',
            to: '/programs/high-school',
            ariaLabel: 'High school mathematics program for grades 9-12'
        },
        {
            heading: 'Competitions',
            to: '/programs/competitions',
            ariaLabel: 'Mathematics competition preparation program'
        },
        {
            heading: 'Summer School',
            to: '/programs/summer-school',
            ariaLabel: 'Summer mathematics program and camps'
        },
        {
            heading: 'Tutoring',
            to: '/programs/tutoring',
            ariaLabel: 'One-on-one mathematics tutoring'
        },
        {
            heading: 'OWE Online',
            to: '/programs/online',
            ariaLabel: 'Online mathematics learning platform'
        },
    ];

    const ftrArr2 = [
        {
            heading: 'About OWE',
            to: '/about',
            ariaLabel: 'Learn about Our World of Education'
        },
        {
            heading: 'Approach',
            to: '/about#approach',
            ariaLabel: 'Our educational approach and methodology'
        },
        {
            heading: 'Blog',
            to: '/blog',
            ariaLabel: 'Educational blog and resources'
        },
        {
            heading: 'Careers',
            to: '/careers',
            ariaLabel: 'Career opportunities at OWE'
        },
        {
            heading: 'Contact us',
            to: '/contacts',
            ariaLabel: 'Contact Our World of Education'
        },
        {
            heading: 'Site Map',
            to: '/sitemap',
            ariaLabel: 'Website sitemap and navigation'
        }
    ];

    const toggle = (index) => {
        setOpen(open === index ? null : index);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic here
        console.log('Form submitted:', formData);
        // Reset form
        setFormData({
            fullName: '',
            email: '',
            message: ''
        });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer 
            className={`${theme == 'light' ? 'bg-white' : 'bg-gray-800'}`}
            role="contentinfo"
            aria-label="Website footer"
            itemScope
            itemType="https://schema.org/WPFooter"
        >
            {/* Structured Data for Footer */}
            <div itemScope itemType="https://schema.org/EducationalOrganization" className="sr-only">
                <meta itemProp="name" content="Our World of Education" />
                <meta itemProp="description" content="K-12 mathematics education program offering comprehensive curriculum and competition preparation." />
                <meta itemProp="url" content="https://our-we.netlify.app" />
                <meta itemProp="email" content="info@ourwe.com" />
                <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                    <meta itemProp="addressLocality" content="Your City" />
                    <meta itemProp="addressRegion" content="Your State" />
                    <meta itemProp="addressCountry" content="US" />
                </div>
                <meta itemProp="telephone" content="+1-XXX-XXX-XXXX" />
            </div>

            <hr className={`${theme == 'light' ? "text-gray-300" : "text-gray-900"} opacity-45 transition-all duration-500`} />
            
            <div className='flex items-center justify-center w-full md:px-8 pt-8'>
                <div className="container p-4 flex items-start justify-center gap-12 md:gap-2 flex-col md:flex-row">
                    
                    {/* Left Column - Navigation Links */}
                    <div className={`col-left gap-4 w-full flex flex-col md:flex-row justify-between items-start ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}>
                        
                        {/* Programs Section */}
                        <div className="inner-col-left w-full">
                            <h2 
                                onClick={() => toggle(1)} 
                                className="w-full flex items-center justify-between leading-4 text-xl font-bold cursor-pointer"
                                aria-expanded={open === 1}
                                aria-controls="programs-nav"
                            >
                                <span>Our Programs</span>
                                <span className="md:hidden" aria-hidden="true">
                                    {open === 1 ? <Minus /> : <Plus />}
                                </span>
                            </h2>
                            <nav 
                                id="programs-nav"
                                className={`${open == 1 ? 'block' : 'hidden md:block'}`}
                                aria-label="Programs navigation"
                            >
                                <ul className="py-4 font-semibold text-sm leading-7">
                                    {ftrArr1.map((item, index) => (
                                        <li key={index} className="mb-1">
                                            <Link 
                                                to={item.to}
                                                className={`${theme == 'light' ? 'hover:text-gray-400' : 'hover:text-[#8bc540]'} w-fit block transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme == 'light' ? 'focus:ring-[#007698]' : 'focus:ring-[#8bc540]'}`}
                                                aria-label={item.ariaLabel}
                                            >
                                                {item.heading}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                        
                        {/* Company Section */}
                        <div className="inner-col-left w-full">
                            <h2 
                                onClick={() => toggle(2)} 
                                className="w-full flex items-center justify-between leading-4 text-xl font-bold cursor-pointer"
                                aria-expanded={open === 2}
                                aria-controls="company-nav"
                            >
                                <span>Company</span>
                                <span className="md:hidden" aria-hidden="true">
                                    {open === 2 ? <Minus /> : <Plus />}
                                </span>
                            </h2>
                            <nav 
                                id="company-nav"
                                className={`${open == 2 ? 'block' : 'hidden md:block'}`}
                                aria-label="Company navigation"
                            >
                                <ul className="py-4 font-semibold text-sm leading-7">
                                    {ftrArr2.map((item, index) => (
                                        <li key={index} className="mb-1">
                                            <Link 
                                                to={item.to}
                                                className={`${theme == 'light' ? 'hover:text-gray-400' : 'hover:text-[#8bc540]'} w-fit block transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme == 'light' ? 'focus:ring-[#007698]' : 'focus:ring-[#8bc540]'}`}
                                                aria-label={item.ariaLabel}
                                            >
                                                {item.heading}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                    
                    {/* Right Column - Contact Form & Social */}
                    <div className={`col-right w-full flex-col flex justify-center items-start ${theme == 'light' ? 'text-[#007698]' : 'text-white'}`}>
                        <h2 className="w-full flex items-center justify-between leading-4 text-xl font-bold mb-4 md:mb-4">
                            Your OWE Academy
                        </h2>
                        
                        {/* Contact Form */}
                        <form 
                            className="w-full" 
                            onSubmit={handleSubmit}
                            aria-label="Contact form"
                            itemScope
                            itemType="https://schema.org/ContactPage"
                        >
                            <div className="row mb-2 md:mb-3 flex-col md:flex-row flex gap-2.5 items-start justify-center w-full">
                                <div className="col justify-center w-full flex gap-3">
                                    <input 
                                        placeholder="Full name" 
                                        className={`outline-none w-full p-1.5 border ${theme == 'light' ? 'border-[#007698]' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-offset-2 ${theme == 'light' ? 'focus:ring-[#007698]' : 'focus:ring-[#8bc540]'}`} 
                                        type="text" 
                                        name="fullName" 
                                        id="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        aria-label="Your full name"
                                        required
                                    />
                                </div>
                                <div className="col flex justify-center w-full gap-3">
                                    <input 
                                        placeholder="Your Email" 
                                        className={`outline-none w-full p-1.5 border ${theme == 'light' ? 'border-[#007698]' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-offset-2 ${theme == 'light' ? 'focus:ring-[#007698]' : 'focus:ring-[#8bc540]'}`} 
                                        type="email" 
                                        name="email" 
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        aria-label="Your email address"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 w-full">
                                <textarea 
                                    className={`outline-none w-full px-1 border ${theme == 'light' ? 'border-[#007698]' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-offset-2 ${theme == 'light' ? 'focus:ring-[#007698]' : 'focus:ring-[#8bc540]'}`} 
                                    placeholder="Your message" 
                                    name="message" 
                                    id="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    aria-label="Your message"
                                    rows="3"
                                    required
                                ></textarea>
                                <button 
                                    type="submit"
                                    className={`${theme == 'light' ? 'border-[#007698] hover:bg-[#007698] hover:text-white' : 'border-gray-300 hover:bg-white hover:text-[#007698] hover:border-[#007698] hover:border-2'} border-2 font-semibold p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme == 'light' ? 'focus:ring-[#007698]' : 'focus:ring-[#8bc540]'}`}
                                    aria-label="Submit contact form"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        
                        {/* Social Media Links */}
                        <div className="flex justify-start w-full mt-4 flex-row">
                            <h2 className="w-full flex text-nowrap items-center justify-between leading-4 text-xl font-bold mb-4 md:mb-4">
                                Stay Connected
                            </h2>
                            <div className="flex w-full items-center justify-end">
                                <a 
                                    href="https://facebook.com/ourwe" 
                                    className={`w-full ${theme == 'light' ? 'hover:text-gray-400' : 'hover:text-[#8bc540]'} cursor-pointer flex items-center justify-end transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full p-1 ${theme == 'light' ? 'focus:ring-[#007698]' : 'focus:ring-[#8bc540]'}`}
                                    aria-label="Follow us on Facebook"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Facebook className="w-6 h-6" aria-hidden="true" />
                                </a>
                                <a 
                                    href="https://instagram.com/ourwe" 
                                    className={`w-full ${theme == 'light' ? 'hover:text-gray-400' : 'hover:text-[#8bc540]'} cursor-pointer flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full p-1 ${theme == 'light' ? 'focus:ring-[#007698]' : 'focus:ring-[#8bc540]'}`}
                                    aria-label="Follow us on Instagram"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Instagram className="w-6 h-6" aria-hidden="true" />
                                </a>
                                <a 
                                    href="https://youtube.com/ourwe" 
                                    className={`w-full ${theme == 'light' ? 'hover:text-gray-400' : 'hover:text-[#8bc540]'} cursor-pointer flex items-center justify-start transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full p-1 ${theme == 'light' ? 'focus:ring-[#007698]' : 'focus:ring-[#8bc540]'}`}
                                    aria-label="Subscribe to our YouTube channel"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Youtube className="w-8 h-8" aria-hidden="true" />
                                </a>
                            </div>
                        </div>
                        
                        {/* Copyright and Additional Info */}
                        <div className="w-full mt-6 pt-4 border-t border-gray-300 dark:border-gray-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                <p className="mb-2">
                                    &copy; {currentYear} Our World of Education. All rights reserved.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link 
                                        to="/privacy-policy" 
                                        className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
                                        aria-label="Privacy Policy"
                                    >
                                        Privacy Policy
                                    </Link>
                                    <Link 
                                        to="/terms-of-service" 
                                        className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
                                        aria-label="Terms of Service"
                                    >
                                        Terms of Service
                                    </Link>
                                    <Link 
                                        to="/accessibility" 
                                        className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
                                        aria-label="Accessibility Statement"
                                    >
                                        Accessibility
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;