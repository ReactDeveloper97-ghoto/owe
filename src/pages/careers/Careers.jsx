import React, { lazy, Suspense, useState } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { Link } from 'react-router-dom';
import {
    Users,
    Award,
    BookOpen,
    GraduationCap,
    Clock,
    Heart,
    Target,
    Mail,
    Upload,
    FileText,
    Calendar,
    MapPin,
    DollarSign,
    CheckCircle,
    Star,
    Briefcase,
    UserPlus
} from 'lucide-react';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';

const Careers = () => {
    const { theme } = useThemeStore();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        education: '',
        coverLetter: '',
        resume: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    // Brand colors
    const primaryColor = '#007698';
    const accentColor = '#8bc540';
    const primaryLight = '#e6f4f9';
    const accentLight = '#f0f9e6';

    // Structured Data for Careers Page
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": "Mathematics Teacher Careers | Our World of Education",
        "description": "Join our team of expert mathematics educators. We're looking for passionate teachers to inspire the next generation of mathematicians.",
        "datePosted": new Date().toISOString().split('T')[0],
        "validThrough": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        "employmentType": ["FULL_TIME", "PART_TIME", "CONTRACTOR"],
        "hiringOrganization": {
            "@type": "EducationalOrganization",
            "name": "Our World of Education",
            "sameAs": "https://our-we.netlify.app"
        },
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Multiple Locations",
                "addressRegion": "Nationwide",
                "addressCountry": "US"
            }
        },
        "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": {
                "@type": "QuantitativeValue",
                "minValue": 50000,
                "maxValue": 100000,
                "unitText": "YEAR"
            }
        },
        "educationRequirements": "Bachelor's degree in Mathematics, Education, or related field",
        "experienceRequirements": "2+ years teaching experience preferred",
        "skills": "Mathematics instruction, curriculum development, student assessment"
    };

    // Current openings
    // const currentOpenings = [
    //     {
    //         id: 1,
    //         title: "Elementary Math Teacher",
    //         type: "Full-time",
    //         location: "New York, NY",
    //         experience: "2+ years",
    //         salary: "$55,000 - $75,000",
    //         description: "Teach mathematics to K-5 students using our proven methodology",
    //         requirements: ["Bachelor's in Education/Mathematics", "State Teaching Certification", "Experience with elementary curriculum"]
    //     },
    //     {
    //         id: 2,
    //         title: "Middle School Math Instructor",
    //         type: "Full-time/Part-time",
    //         location: "Los Angeles, CA",
    //         experience: "3+ years",
    //         salary: "$60,000 - $85,000",
    //         description: "Teach advanced mathematics to grades 6-8 students",
    //         requirements: ["Master's preferred", "Experience with competition math", "Strong algebra/geometry background"]
    //     },
    //     {
    //         id: 3,
    //         title: "High School Math Tutor",
    //         type: "Part-time/Contract",
    //         location: "Remote/In-person",
    //         experience: "1+ years",
    //         salary: "$40 - $80/hour",
    //         description: "Provide one-on-one tutoring for advanced mathematics",
    //         requirements: ["Advanced degree in Mathematics", "Tutoring experience", "AP Calculus knowledge"]
    //     },
    //     {
    //         id: 4,
    //         title: "Curriculum Developer",
    //         type: "Contract",
    //         location: "Remote",
    //         experience: "5+ years",
    //         salary: "$70,000 - $95,000",
    //         description: "Develop and enhance mathematics curriculum materials",
    //         requirements: ["Ph.D. in Mathematics Education", "Curriculum design experience", "Research background"]
    //     }
    // ];
    const currentOpenings = []
    // Benefits of working with us
    const benefits = [
        {
            icon: <DollarSign className="w-8 h-8" />,
            title: "Competitive Compensation",
            description: "Above-market salaries with performance bonuses"
        },
        {
            icon: <Calendar className="w-8 h-8" />,
            title: "Flexible Schedule",
            description: "Options for full-time, part-time, and remote work"
        },
        {
            icon: <GraduationCap className="w-8 h-8" />,
            title: "Professional Development",
            description: "Continuous training and growth opportunities"
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Health & Wellness",
            description: "Comprehensive benefits package for full-time staff"
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Career Advancement",
            description: "Clear pathways for growth and leadership roles"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Supportive Community",
            description: "Collaborative environment with expert educators"
        }
    ];

    // Why join us
    const whyJoin = [
        "Work with motivated students passionate about mathematics",
        "Access to proven curriculum and teaching resources",
        "Small class sizes for personalized instruction",
        "Opportunity to shape future mathematicians",
        "Competitive compensation with growth potential",
        "Flexible teaching schedules and locations"
    ];

    // Application process steps
    const processSteps = [
        { step: 1, title: "Submit Application", description: "Complete our online application form" },
        { step: 2, title: "Initial Screening", description: "Phone interview with HR team" },
        { step: 3, title: "Teaching Demo", description: "Conduct a sample lesson with students" },
        { step: 4, title: "Final Interview", description: "Meet with academic leadership" },
        { step: 5, title: "Offer & Onboarding", description: "Join our team and begin training" }
    ];

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Handle file upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setFormData(prev => ({
                ...prev,
                resume: file
            }));
        } else {
            alert('Please upload a PDF file');
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.position) newErrors.position = 'Please select position';
        if (!formData.experience) newErrors.experience = 'Please select experience level';
        if (!formData.education.trim()) newErrors.education = 'Education background is required';
        if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';
        if (!formData.resume) newErrors.resume = 'Resume is required';

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log('Application submitted:', formData);

            setIsSubmitted(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                position: '',
                experience: '',
                education: '',
                coverLetter: '',
                resume: null
            });
            setErrors({});
        } catch (error) {
            console.error('Submission error:', error);
            setErrors({ submit: 'Failed to submit application. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <SEO
                title="Mathematics Teacher Careers | Join Our Team | Our World of Education"
                description="Join our team of expert mathematics educators. We're hiring passionate teachers for K-12 programs. Competitive compensation, flexible schedules, and growth opportunities."
                keywords="math teacher jobs, teaching careers, education jobs, mathematics instructor positions, tutor hiring, education careers, teaching positions"
                url="https://our-we.netlify.app/careers"
                structuredData={structuredData}
            />

            <Suspense fallback={<LoadingSpinner />}>
                <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
                    <main className="pt-16">
                        {/* Hero Section */}
                        <section
                            className={`relative overflow-hidden py-20 px-4 md:px-8 lg:px-16 ${theme === 'light'
                                ? 'bg-linear-to-br from-blue-50 to-cyan-50'
                                : 'bg-linear-to-br from-gray-800 to-gray-900'
                                }`}
                            aria-label="Careers Introduction"
                        >
                            <div className="relative max-w-7xl mx-auto">
                                <div className="grid lg:grid-cols-2 gap-12 items-center">
                                    <div>
                                        <div className={`inline-flex items-center px-6 py-3 rounded-full ${theme === 'light' ? 'bg-[#e6f4f9]' : 'bg-gray-800'
                                            } ${theme === 'light' ? 'text-[#007698]' : 'text-gray-300'} text-lg font-semibold mb-8`}>
                                            <Heart className="w-5 h-5 mr-2" />
                                            Join Our Mission
                                        </div>

                                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                                            Shape the <span style={{ color: primaryColor }}>Future</span> of Math Education
                                            <span className="block text-3xl md:text-4xl lg:text-5xl text-gray-700 dark:text-gray-300 mt-4">
                                                Inspire. Teach. Transform.
                                            </span>
                                        </h1>

                                        <p className="text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                                            Join our team of passionate educators dedicated to revolutionizing
                                            mathematics education. Help us cultivate the next generation of
                                            mathematical thinkers and problem solvers.
                                        </p>

                                        <div className="flex flex-col sm:flex-row gap-6">
                                            <a
                                                href="#openings"
                                                className="group inline-flex items-center justify-center px-10 py-5 bg-[#007698] hover:bg-[#005a75] text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                                                aria-label="View current openings"
                                            >
                                                <BookOpen className="w-5 h-5 mr-2" />
                                                View Current Openings
                                                <span className="ml-3 transform group-hover:translate-x-1 transition-transform">→</span>
                                            </a>

                                            <a
                                                href="#apply"
                                                className="inline-flex items-center justify-center px-10 py-5 border-2 border-[#007698] text-[#007698] hover:bg-[#e6f4f9] dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-800 font-bold text-lg rounded-xl transition-colors duration-300"
                                                aria-label="Apply now"
                                            >
                                                <Mail className="w-5 h-5 mr-2" />
                                                Apply Now
                                            </a>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className={`rounded-3xl overflow-hidden shadow-2xl ${theme === 'light' ? 'shadow-blue-200' : 'shadow-gray-800'
                                            }`}>
                                            <div className={`aspect-4/3 flex items-center justify-center ${theme === 'light'
                                                ? 'bg-linear-to-br from-blue-500 to-cyan-400'
                                                : 'bg-linear-to-br from-gray-700 to-gray-800'
                                                }`}>
                                                <div className="text-center p-8">
                                                    <div className="text-6xl mb-6">👨‍🏫</div>
                                                    <h3 className="text-3xl font-bold text-white mb-4">Join Our Team</h3>
                                                    <p className="text-blue-100">Make a Difference in Math Education</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stats overlay */}
                                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                                            <div className={`grid grid-cols-3 gap-4 p-6 rounded-2xl ${theme === 'light'
                                                ? 'bg-white/90 backdrop-blur-sm border border-blue-100 shadow-xl'
                                                : 'bg-gray-800/90 backdrop-blur-sm border border-gray-700 shadow-xl'
                                                }`}>
                                                {[
                                                    { value: "50+", label: "Team Members", icon: <Users className="w-4 h-4" /> },
                                                    { value: "95%", label: "Satisfaction", icon: <Star className="w-4 h-4" /> },
                                                    { value: "15", label: "Locations", icon: <MapPin className="w-4 h-4" /> }
                                                ].map((stat, index) => (
                                                    <div key={index} className="text-center">
                                                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-2 mx-auto ${theme === 'light' ? 'bg-[#e6f4f9]' : 'bg-gray-700'
                                                            }`}>
                                                            <span className={theme === 'light' ? 'text-[#007698]' : 'text-gray-300'}>
                                                                {stat.icon}
                                                            </span>
                                                        </div>
                                                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                                                            {stat.value}
                                                        </div>
                                                        <div className="text-xs text-gray-600 dark:text-gray-400">
                                                            {stat.label}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Why Join Us Section */}
                        <section className="py-20 px-4 md:px-8 lg:px-16" aria-label="Why Join Our Team">
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-16">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                        Why <span style={{ color: primaryColor }}>Join</span> Our Team?
                                    </h2>
                                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                        We're building a community of educators who share our passion for
                                        mathematics and commitment to student success.
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {benefits.map((benefit, index) => (
                                        <div
                                            key={index}
                                            className={`p-8 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-2 ${theme === 'light'
                                                ? 'bg-white shadow-lg hover:shadow-2xl border border-gray-100'
                                                : 'bg-gray-800 shadow-xl hover:shadow-2xl border border-gray-700'
                                                }`}
                                        >
                                            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${theme === 'light'
                                                ? 'bg-[#007698] text-white'
                                                : 'bg-gray-700 text-gray-300'
                                                }`}>
                                                {benefit.icon}
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                                {benefit.title}
                                            </h3>

                                            <p className="text-gray-600 dark:text-gray-300">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Additional reasons */}
                                <div className={`mt-16 p-8 rounded-2xl ${theme === 'light'
                                    ? 'bg-linear-to-r from-blue-50 to-cyan-50 border border-blue-100'
                                    : 'bg-linear-to-r from-gray-800 to-gray-900 border border-gray-700'
                                    }`}>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                        Additional Perks
                                    </h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {whyJoin.map((perk, index) => (
                                            <div key={index} className="flex items-center">
                                                <CheckCircle className={`w-5 h-5 mr-3 ${theme === 'light' ? 'text-green-500' : 'text-green-400'
                                                    }`} />
                                                <span className="text-gray-700 dark:text-gray-300">{perk}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Current Openings */}
                        {/* Current Openings Section - ONLY THIS PART IS MODIFIED */}

                        <section
                            id="openings"
                            className={`py-20 px-4 md:px-8 lg:px-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                                }`}
                            aria-label="Current Job Openings"
                        >
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-16">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                        Current <span style={{ color: primaryColor }}>Openings</span>
                                    </h2>
                                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                        Explore our current opportunities and find the perfect role for your skills and passion.
                                    </p>
                                </div>

                                {/* Check if currentOpenings is empty */}
                                {currentOpenings.length === 0 ? (
                                    <div className="text-center">
                                        <div className={`max-w-2xl mx-auto p-8 rounded-2xl ${theme === 'light'
                                            ? 'bg-white border border-gray-200 shadow-lg'
                                            : 'bg-gray-700 border border-gray-600 shadow-xl'
                                            }`}>
                                            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mx-auto mb-6 ${theme === 'light'
                                                ? 'bg-blue-100'
                                                : 'bg-gray-600'
                                                }`}>
                                                <Briefcase className={`w-10 h-10 ${theme === 'light' ? 'text-blue-600' : 'text-gray-300'
                                                    }`} />
                                            </div>

                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                                No Current Vacancies
                                            </h3>

                                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                                Currently there are no open positions, but you can still send your application for future vacancies.
                                                We'll reach out to you if there's any vacancy related to your expertise.
                                            </p>

                                            <div className={`p-6 rounded-xl mb-6 ${theme === 'light'
                                                ? 'bg-blue-50'
                                                : 'bg-gray-600/30'
                                                }`}>
                                                <p className="text-gray-700 dark:text-gray-300">
                                                    We're always looking for talented mathematics educators. Submit your resume now
                                                    and be the first to know when new opportunities become available.
                                                </p>
                                            </div>

                                            <a
                                                href="#apply"
                                                className={`inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg ${theme === 'light'
                                                    ? 'bg-[#007698] hover:bg-[#005a75] text-white'
                                                    : 'bg-[#8bc540] hover:bg-[#7ab030] text-gray-900'
                                                    } transition-colors duration-300`}
                                                aria-label="Submit application for future consideration"
                                            >
                                                <UserPlus className="w-5 h-5 mr-2" />
                                                Submit Your Application for Future Consideration
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    /* Original openings display (when openings exist) */
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {currentOpenings.map((job) => (
                                            <div
                                                key={job.id}
                                                className={`p-8 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-2 ${theme === 'light'
                                                    ? 'bg-white shadow-lg hover:shadow-xl border border-gray-100'
                                                    : 'bg-gray-700 shadow-xl hover:shadow-2xl border border-gray-600'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-start mb-6">
                                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                        {job.title}
                                                    </h3>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${theme === 'light'
                                                        ? 'bg-[#e6f4f9] text-[#007698]'
                                                        : 'bg-gray-600 text-gray-300'
                                                        }`}>
                                                        {job.type}
                                                    </span>
                                                </div>

                                                <div className="space-y-4 mb-6">
                                                    <div className="flex items-center">
                                                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                                                        <span className="text-gray-600 dark:text-gray-300">{job.location}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                                                        <span className="text-gray-600 dark:text-gray-300">{job.experience} experience</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                                                        <span className="text-gray600 dark:text-gray-300">{job.salary}</span>
                                                    </div>
                                                </div>

                                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                                    {job.description}
                                                </p>

                                                <div className="mb-8">
                                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Requirements:</h4>
                                                    <ul className="space-y-2">
                                                        {job.requirements.map((req, idx) => (
                                                            <li key={idx} className="flex items-start">
                                                                <CheckCircle className={`w-4 h-4 mr-2 mt-1 ${theme === 'light' ? 'text-green-500' : 'text-green-400'
                                                                    }`} />
                                                                <span className="text-gray-600 dark:text-gray-300">{req}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <a
                                                    href="#apply"
                                                    className={`inline-flex items-center justify-center w-full py-3 rounded-lg font-semibold transition-colors ${theme === 'light'
                                                        ? 'bg-[#007698] hover:bg-[#005a75] text-white'
                                                        : 'bg-gray-600 hover:bg-gray-500 text-white'
                                                        }`}
                                                >
                                                    Apply for This Position
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* This part remains the same */}
                                <div className="text-center mt-12">
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {currentOpenings.length === 0
                                            ? "We're always looking for talented educators. Submit your application now for future opportunities."
                                            : "Don't see a perfect match? We're always looking for talented educators."}
                                    </p>
                                    <a
                                        href="#apply"
                                        className={`font-semibold underline ${theme === 'light'
                                            ? 'text-[#007698] hover:text-[#005a75]'
                                            : 'text-gray-400 hover:text-gray-300'
                                            }`}
                                    >
                                        Submit a General Application
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* Application Process */}
                        <section className="py-20 px-4 md:px-8 lg:px-16" aria-label="Application Process">
                            <div className="max-w-5xl mx-auto">
                                <div className="text-center mb-16">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                        Application <span style={{ color: primaryColor }}>Process</span>
                                    </h2>
                                </div>

                                <div className="relative">
                                    {/* Connection line */}
                                    <div className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${theme === 'light' ? 'bg-blue-200' : 'bg-gray-700'
                                        }`}></div>

                                    {/* Steps */}
                                    {processSteps.map((step, index) => (
                                        <div
                                            key={step.step}
                                            className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2 md:pl-8' : 'md:pl-1/2 md:pr-8 md:text-right'
                                                }`}
                                        >
                                            <div className={`p-8 rounded-2xl ${theme === 'light'
                                                ? 'bg-white shadow-lg border border-blue-100'
                                                : 'bg-gray-700 shadow-xl border border-gray-600'
                                                }`}>
                                                <div className="flex md:flex-col items-center md:items-start md:space-y-4">
                                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-6 md:mr-0 ${theme === 'light'
                                                        ? 'bg-[#007698] text-white'
                                                        : 'bg-gray-700 text-gray-300'
                                                        }`}>
                                                        <span className="text-2xl font-bold">{step.step}</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white inline md:block">
                                                            {step.title}
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                                                            {step.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Step dot */}
                                            <div className={`absolute w-6 h-6 rounded-full border-4 ${theme === 'light' ? 'border-white' : 'border-gray-700'
                                                } hidden md:block`} style={{
                                                    backgroundColor: primaryColor,
                                                    left: index % 2 === 0 ? 'calc(50% - 3px)' : 'calc(50% - 3px)',
                                                    top: '40px'
                                                }}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Application Form */}
                        <section
                            id="apply"
                            className={`py-20 px-4 md:px-8 lg:px-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                                }`}
                            aria-label="Job Application Form"
                        >
                            <div className="max-w-4xl mx-auto">
                                <div className={`rounded-3xl p-8 ${theme === 'light'
                                    ? 'bg-white border border-gray-100 shadow-xl'
                                    : 'bg-gray-800 border border-gray-700 shadow-xl'
                                    }`}>
                                    <div className="text-center mb-12">
                                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                            Apply <span style={{ color: primaryColor }}>Now</span>
                                        </h2>
                                        <p className="text-xl text-gray-600 dark:text-gray-300">
                                            Submit your application to join our team of mathematics educators.
                                        </p>
                                    </div>

                                    {isSubmitted ? (
                                        <div className={`p-8 rounded-2xl text-center ${theme === 'light'
                                            ? 'bg-green-50 border border-green-200'
                                            : 'bg-green-900/20 border border-green-800'
                                            }`}>
                                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                                Application Submitted Successfully!
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                                Thank you for your interest in joining Our World of Education.
                                                We'll review your application and contact you if there's a match
                                                with our current needs.
                                            </p>
                                            <button
                                                onClick={() => setIsSubmitted(false)}
                                                className="px-6 py-3 bg-[#007698] hover:bg-[#005a75] text-white rounded-lg font-medium transition-colors duration-300"
                                            >
                                                Submit Another Application
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {/* Personal Information */}
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        First Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="firstName"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        className={`w-full px-4 py-3 rounded-lg border ${theme === 'light'
                                                            ? 'border-gray-300 focus:border-[#007698] focus:ring-2 focus:ring-blue-200'
                                                            : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                                            } focus:outline-none transition-colors`}
                                                        placeholder="John"
                                                    />
                                                    {errors.firstName && (
                                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                            {errors.firstName}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Last Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="lastName"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        className={`w-full px-4 py-3 rounded-lg border ${theme === 'light'
                                                            ? 'border-gray-300 focus:border-[#007698] focus:ring-2 focus:ring-blue-200'
                                                            : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                                            } focus:outline-none transition-colors`}
                                                        placeholder="Doe"
                                                    />
                                                    {errors.lastName && (
                                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                            {errors.lastName}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Contact Information */}
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Email Address *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className={`w-full px-4 py-3 rounded-lg border ${theme === 'light'
                                                            ? 'border-gray-300 focus:border-[#007698] focus:ring-2 focus:ring-blue-200'
                                                            : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                                            } focus:outline-none transition-colors`}
                                                        placeholder="john@example.com"
                                                    />
                                                    {errors.email && (
                                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                            {errors.email}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Phone Number *
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        className={`w-full px-4 py-3 rounded-lg border ${theme === 'light'
                                                            ? 'border-gray-300 focus:border-[#007698] focus:ring-2 focus:ring-blue-200'
                                                            : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                                            } focus:outline-none transition-colors`}
                                                        placeholder="(555) 123-4567"
                                                    />
                                                    {errors.phone && (
                                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                            {errors.phone}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Position & Experience */}
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Position Interested In *
                                                    </label>
                                                    <select
                                                        id="position"
                                                        name="position"
                                                        value={formData.position}
                                                        onChange={handleInputChange}
                                                        className={`w-full px-4 py-3 rounded-lg border ${theme === 'light'
                                                            ? 'border-gray-300 focus:border-[#007698] focus:ring-2 focus:ring-blue-200'
                                                            : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                                            } focus:outline-none transition-colors`}
                                                    >
                                                        <option value="">Select Position</option>
                                                        <option value="elementary">Elementary Math Teacher</option>
                                                        <option value="middle">Middle School Instructor</option>
                                                        <option value="high">High School Tutor</option>
                                                        <option value="curriculum">Curriculum Developer</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                    {errors.position && (
                                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                            {errors.position}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Years of Experience *
                                                    </label>
                                                    <select
                                                        id="experience"
                                                        name="experience"
                                                        value={formData.experience}
                                                        onChange={handleInputChange}
                                                        className={`w-full px-4 py-3 rounded-lg border ${theme === 'light'
                                                            ? 'border-gray-300 focus:border-[#007698] focus:ring-2 focus:ring-blue-200'
                                                            : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                                            } focus:outline-none transition-colors`}
                                                    >
                                                        <option value="">Select Experience</option>
                                                        <option value="0-1">0-1 years</option>
                                                        <option value="1-3">1-3 years</option>
                                                        <option value="3-5">3-5 years</option>
                                                        <option value="5+">5+ years</option>
                                                    </select>
                                                    {errors.experience && (
                                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                            {errors.experience}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Education */}
                                            <div>
                                                <label htmlFor="education" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Education Background *
                                                </label>
                                                <textarea
                                                    id="education"
                                                    name="education"
                                                    value={formData.education}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className={`w-full px-4 py-3 rounded-lg border ${theme === 'light'
                                                        ? 'border-gray-300 focus:border-[#007698] focus:ring-2 focus:ring-blue-200'
                                                        : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                                        } focus:outline-none transition-colors`}
                                                    placeholder="Degrees, certifications, and relevant education..."
                                                />
                                                {errors.education && (
                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                        {errors.education}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Cover Letter */}
                                            <div>
                                                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Cover Letter *
                                                </label>
                                                <textarea
                                                    id="coverLetter"
                                                    name="coverLetter"
                                                    value={formData.coverLetter}
                                                    onChange={handleInputChange}
                                                    rows={6}
                                                    className={`w-full px-4 py-3 rounded-lg border ${theme === 'light'
                                                        ? 'border-gray-300 focus:border-[#007698] focus:ring-2 focus:ring-blue-200'
                                                        : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                                        } focus:outline-none transition-colors`}
                                                    placeholder="Tell us about your teaching philosophy and why you want to join our team..."
                                                />
                                                {errors.coverLetter && (
                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                        {errors.coverLetter}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Resume Upload */}
                                            <div>
                                                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Resume/CV (PDF only) *
                                                </label>
                                                <div className={`border-2 border-dashed rounded-lg p-8 text-center ${theme === 'light'
                                                    ? 'border-gray-300 hover:border-[#007698]'
                                                    : 'border-gray-600 hover:border-gray-500'
                                                    } transition-colors`}>
                                                    <Upload className={`w-12 h-12 mx-auto mb-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                                                        }`} />
                                                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                                                        {formData.resume ? formData.resume.name : 'Click to upload or drag and drop'}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                                                        PDF files only (Max 5MB)
                                                    </p>
                                                    <input
                                                        type="file"
                                                        id="resume"
                                                        name="resume"
                                                        onChange={handleFileChange}
                                                        accept=".pdf"
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor="resume"
                                                        className={`inline-block px-6 py-3 rounded-lg cursor-pointer ${theme === 'light'
                                                            ? 'bg-[#007698] hover:bg-[#005a75] text-white'
                                                            : 'bg-gray-700 hover:bg-gray-600 text-white'
                                                            } transition-colors`}
                                                    >
                                                        Choose File
                                                    </label>
                                                </div>
                                                {errors.resume && (
                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                        {errors.resume}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Submit Button */}
                                            <div className="pt-6">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center ${isSubmitting
                                                        ? 'bg-gray-400 cursor-not-allowed'
                                                        : theme === 'light'
                                                            ? 'bg-[#007698] hover:bg-[#005a75] text-white shadow-lg hover:shadow-xl'
                                                            : 'bg-gray-700 hover:bg-gray-600 text-white shadow-lg hover:shadow-xl'
                                                        }`}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                                            Submitting...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Mail className="w-5 h-5 mr-2" />
                                                            Submit Application
                                                        </>
                                                    )}
                                                </button>

                                                {errors.submit && (
                                                    <p className="mt-4 text-sm text-red-600 dark:text-red-400 text-center">
                                                        {errors.submit}
                                                    </p>
                                                )}
                                            </div>

                                            <p className={`text-sm text-center ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                                                We'll keep your application on file for future opportunities.
                                                You'll receive a confirmation email upon submission.
                                            </p>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Final CTA */}
                        <section className="py-20 px-4 md:px-8 lg:px-16" aria-label="Contact HR">
                            <div className="max-w-4xl mx-auto text-center">
                                <div className={`rounded-3xl p-8 md:p-12 ${theme === 'light'
                                    ? 'bg-linear-to-r from-[#007698] to-[#8bc540] text-white'
                                    : 'bg-linear-to-r from-gray-800 to-gray-900 text-white'
                                    }`}>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                        Questions About Careers?
                                    </h2>

                                    <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                                        Our HR team is here to help with any questions about
                                        positions, applications, or working at OWE.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                        <a
                                            href="mailto:careers@our-we.edu"
                                            className="inline-flex items-center justify-center px-10 py-5 bg-white text-[#007698] hover:bg-gray-100 font-bold text-lg rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl"
                                            aria-label="Email HR team"
                                        >
                                            <Mail className="w-5 h-5 mr-2" />
                                            Email HR Team
                                        </a>

                                        <a
                                            href="tel:+15551234567"
                                            className="inline-flex items-center justify-center px-10 py-5 border-2 border-white text-white hover:bg-white/10 font-bold text-lg rounded-xl transition-colors duration-300"
                                            aria-label="Call HR department"
                                        >
                                            <span className="mr-3">📞</span>
                                            Call: (555) 123-4567
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </Suspense>
        </>
    );
};

export default Careers;