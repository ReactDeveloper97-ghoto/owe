import React, { lazy, Suspense, useState } from 'react';
import { useThemeStore } from '../../store/themeStore';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';

const ContactUs = () => {
  const { theme } = useThemeStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    studentGrade: '',
    programInterest: '',
    message: '',
    preferredContact: 'email'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Structured Data for Contact Page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Our World of Education | Math Programs & Evaluations",
    "description": "Contact us for math program evaluations, enrollment inquiries, and educational consultations. Serving K-12 students with expert mathematics education.",
    "url": "https://our-we.netlify.app/contact",
    "mainEntity": {
      "@type": "EducationalOrganization",
      "name": "Our World of Education",
      "description": "Expert mathematics education for K-12 students",
      "email": "contact@our-we.edu",
      "telephone": "+1-555-123-4567",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Education Avenue",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "postalCode": "10001",
        "addressCountry": "US"
      },
      "openingHours": "Mo-Fr 09:00-18:00, Sa 09:00-14:00",
      "areaServed": "United States"
    }
  };

  // Contact information
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Number",
      details: "(555) 123-4567",
      description: "Call us for immediate assistance",
      action: "tel:+15551234567",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Address",
      details: "contact@our-we.edu",
      description: "Send us an email anytime",
      action: "mailto:contact@our-we.edu",
      color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Main Office",
      details: "123 Education Ave, NY 10001",
      description: "Visit our headquarters",
      action: "https://maps.google.com/?q=123+Education+Avenue+New+York+NY",
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: "Mon-Fri: 9am-6pm",
      description: "Saturday: 9am-2pm",
      color: "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300"
    }
  ];

  // Program interests
  const programInterests = [
    "Elementary Math (K-5)",
    "Middle School Math (6-8)",
    "High School Math (9-12)",
    "Math Competition Prep",
    "Summer Math Camp",
    "Online Math Classes",
    "Private Tutoring",
    "General Inquiry"
  ];

  // Grade levels
  const gradeLevels = [
    "Pre-K/K",
    "1st Grade",
    "2nd Grade",
    "3rd Grade",
    "4th Grade",
    "5th Grade",
    "6th Grade",
    "7th Grade",
    "8th Grade",
    "9th Grade",
    "10th Grade",
    "11th Grade",
    "12th Grade"
  ];

  // Locations
  const locations = [
    {
      city: "New York",
      address: "123 Education Avenue, New York, NY 10001",
      phone: "(555) 123-4567",
      email: "ny@our-we.edu"
    },
    {
      city: "Los Angeles",
      address: "456 Learning Blvd, Los Angeles, CA 90001",
      phone: "(555) 123-4568",
      email: "la@our-we.edu"
    },
    {
      city: "Chicago",
      address: "789 Knowledge Street, Chicago, IL 60007",
      phone: "(555) 123-4569",
      email: "chicago@our-we.edu"
    }
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
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
    if (!formData.studentGrade) newErrors.studentGrade = 'Please select grade level';
    if (!formData.programInterest) newErrors.programInterest = 'Please select program interest';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

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

    // Simulate API call
    try {
      // In production, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Log submission (in production, send to your backend)
      console.log('Form submitted:', formData);

      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        studentGrade: '',
        programInterest: '',
        message: '',
        preferredContact: 'email'
      });
      setErrors({});
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us | Math Program Evaluations & Enrollment | Our World of Education"
        description="Schedule a free math evaluation, inquire about programs, or get educational support. Contact Our World of Education for K-12 mathematics education."
        keywords="contact math program, schedule evaluation, enrollment inquiry, math tutoring contact, educational consultation, K-12 math programs"
        url="https://our-we.netlify.app/contact"
        structuredData={structuredData}
      />

      <Suspense fallback={<LoadingSpinner />}>
        <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
          <main className="pt-16">
            {/* Hero Section */}
            <section
              className={`py-16 px-4 md:px-8 lg:px-16 ${theme === 'light'
                ? 'bg-linear-to-r from-blue-50 to-cyan-50'
                : 'bg-linear-to-r from-blue-900/20 to-cyan-900/20'
                }`}
              aria-label="Contact Introduction"
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                      Contact <span className="text-blue-600 dark:text-blue-400">Our Team</span>
                    </h1>
                    <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                      Ready to transform your child's math journey? Schedule a free
                      evaluation or ask us anything about our programs.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6">
                      <a
                        href="tel:+15551234567"
                        className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl"
                        aria-label="Call us now"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        Call Now: (555) 123-4567
                      </a>

                      <a
                        href="mailto:contact@our-we.edu"
                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 font-semibold rounded-xl transition-colors duration-300"
                        aria-label="Email us"
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        Email Us
                      </a>
                    </div>
                  </div>

                  <div className="relative">
                    <div className={`rounded-3xl overflow-hidden shadow-2xl ${theme === 'light' ? 'shadow-blue-200' : 'shadow-blue-900/30'
                      }`}>
                      {/* Contact visualization */}
                      <div className={`aspect-4/3 flex items-center justify-center ${theme === 'light'
                        ? 'bg-linear-to-br from-blue-500 to-cyan-400'
                        : 'bg-linear-to-br from-blue-800 to-cyan-800'
                        }`}>
                        <div className="text-center p-8">
                          <div className="text-6xl mb-6">📞</div>
                          <h3 className="text-3xl font-bold text-white mb-4">We're Here to Help</h3>
                          <p className="text-blue-100">Schedule your free evaluation today</p>
                        </div>
                      </div>
                    </div>

                    {/* Quick stats */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className={`grid grid-cols-3 gap-4 p-6 rounded-2xl ${theme === 'light'
                        ? 'bg-white/90 backdrop-blur-sm border border-blue-100 shadow-xl'
                        : 'bg-gray-800/90 backdrop-blur-sm border border-blue-900/30 shadow-xl'
                        }`}>
                        {[
                          { value: "24h", label: "Response Time", icon: <Clock className="w-4 h-4" /> },
                          { value: "Free", label: "Evaluation", icon: <CheckCircle className="w-4 h-4" /> },
                          { value: "100%", label: "Satisfaction", icon: <User className="w-4 h-4" /> }
                        ].map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-2 mx-auto ${theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/30'
                              }`}>
                              <span className={theme === 'light' ? 'text-blue-600' : 'text-blue-400'}>
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

            {/* Contact Form */}
            <section className="py-16 px-4 md:px-8 lg:px-16" aria-label="Contact Form">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-12">
                  {/* Form Section */}
                  <div className="lg:col-span-2">
                    <div className={`rounded-3xl p-8 ${theme === 'light'
                      ? 'bg-white border border-gray-100 shadow-xl'
                      : 'bg-gray-800 border border-gray-700 shadow-xl'
                      }`}>
                      <div className="flex items-center mb-8">
                        <Send className={`w-8 h-8 mr-3 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                          }`} />
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                          Send Us a Message
                        </h2>
                      </div>

                      {isSubmitted ? (
                        <div className={`p-8 rounded-2xl text-center ${theme === 'light'
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-green-900/20 border border-green-800'
                          }`}>
                          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Thank You for Your Message!
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-6">
                            We've received your inquiry and our team will contact you within
                            24 hours. In the meantime, feel free to explore our programs.
                          </p>
                          <button
                            onClick={() => setIsSubmitted(false)}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-300"
                          >
                            Send Another Message
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                          {/* Name Row */}
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
                                className={`w-full px-4 py-3 rounded-lg border ${errors.firstName
                                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                  : theme === 'light'
                                    ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                    : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                  } focus:outline-none transition-colors`}
                                placeholder="John"
                              />
                              {errors.firstName && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                                  <AlertCircle className="w-4 h-4 mr-1" />
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
                                className={`w-full px-4 py-3 rounded-lg border ${errors.lastName
                                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                  : theme === 'light'
                                    ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                    : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                  } focus:outline-none transition-colors`}
                                placeholder="Doe"
                              />
                              {errors.lastName && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  {errors.lastName}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Contact Row */}
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
                                className={`w-full px-4 py-3 rounded-lg border ${errors.email
                                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                  : theme === 'light'
                                    ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                    : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                  } focus:outline-none transition-colors`}
                                placeholder="john@example.com"
                              />
                              {errors.email && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  {errors.email}
                                </p>
                              )}
                            </div>

                            <div>
                              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 rounded-lg border ${theme === 'light'
                                  ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                  : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                  } focus:outline-none transition-colors`}
                                placeholder="(555) 123-4567"
                              />
                            </div>
                          </div>

                          {/* Student Info */}
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="studentGrade" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Student Grade Level *
                              </label>
                              <select
                                id="studentGrade"
                                name="studentGrade"
                                value={formData.studentGrade}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.studentGrade
                                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                  : theme === 'light'
                                    ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                    : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                  } focus:outline-none transition-colors`}
                              >
                                <option value="">Select Grade Level</option>
                                {gradeLevels.map((grade) => (
                                  <option key={grade} value={grade} className="text-gray-900">
                                    {grade}
                                  </option>
                                ))}
                              </select>
                              {errors.studentGrade && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  {errors.studentGrade}
                                </p>
                              )}
                            </div>

                            <div>
                              <label htmlFor="programInterest" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Program Interest *
                              </label>
                              <select
                                id="programInterest"
                                name="programInterest"
                                value={formData.programInterest}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.programInterest
                                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                  : theme === 'light'
                                    ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                    : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                  } focus:outline-none transition-colors`}
                              >
                                <option value="">Select Program Interest</option>
                                {programInterests.map((program) => (
                                  <option key={program} value={program} className="text-gray-900">
                                    {program}
                                  </option>
                                ))}
                              </select>
                              {errors.programInterest && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  {errors.programInterest}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Message */}
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Your Message *
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              rows={6}
                              className={`w-full px-4 py-3 rounded-lg border ${errors.message
                                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                : theme === 'light'
                                  ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                  : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                } focus:outline-none transition-colors`}
                              placeholder="Tell us about your child's math journey and how we can help..."
                            />
                            {errors.message && (
                              <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.message}
                              </p>
                            )}
                          </div>

                          {/* Preferred Contact */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                              Preferred Contact Method
                            </label>
                            <div className="flex flex-wrap gap-4">
                              {[
                                { value: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
                                { value: 'phone', label: 'Phone', icon: <Phone className="w-4 h-4" /> },
                                { value: 'either', label: 'Either', icon: <MessageSquare className="w-4 h-4" /> }
                              ].map((method) => (
                                <label
                                  key={method.value}
                                  className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-colors ${formData.preferredContact === method.value
                                    ? theme === 'light'
                                      ? 'bg-blue-100 text-blue-600 border-2 border-blue-200'
                                      : 'bg-blue-900/30 text-blue-400 border-2 border-blue-700'
                                    : theme === 'light'
                                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-2 border-transparent'
                                    }`}
                                >
                                  <input
                                    type="radio"
                                    name="preferredContact"
                                    value={method.value}
                                    checked={formData.preferredContact === method.value}
                                    onChange={handleInputChange}
                                    className="sr-only"
                                  />
                                  <span className="mr-2">{method.icon}</span>
                                  <span className="font-medium">{method.label}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Submit Button */}
                          <div className="pt-6">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center ${isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : theme === 'light'
                                  ? 'bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl'
                                  : 'bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl'
                                }`}
                            >
                              {isSubmitting ? (
                                <>
                                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                  Sending...
                                </>
                              ) : (
                                <>
                                  <Send className="w-5 h-5 mr-2" />
                                  Send Message
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
                            We respect your privacy and will never share your information.
                          </p>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* Contact Info Sidebar */}
                  <div className="space-y-8">
                    {/* Contact Cards */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Contact Information
                      </h3>
                      <div className="space-y-4">
                        {contactInfo.map((info, index) => (
                          <div
                            key={index}
                            className={`p-6 rounded-xl transition-all duration-300 hover:transform hover:-translate-y-1 ${theme === 'light'
                              ? 'bg-gray-50 hover:bg-gray-100'
                              : 'bg-gray-800 hover:bg-gray-700'
                              }`}
                          >
                            <div className="flex items-start">
                              <div className={`shrink-0 w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${info.color}`}>
                                {info.icon}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                                  {info.title}
                                </h4>
                                {info.action ? (
                                  <a
                                    href={info.action}
                                    className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                                  >
                                    {info.details}
                                  </a>
                                ) : (
                                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {info.details}
                                  </p>
                                )}
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  {info.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Schedule CTA */}
                    <div className={`p-6 rounded-xl ${theme === 'light'
                      ? 'bg-linear-to-r from-blue-50 to-cyan-50 border border-blue-100'
                      : 'bg-linear-to-r from-blue-900/20 to-cyan-900/20 border border-blue-800/30'
                      }`}>
                      <Calendar className={`w-12 h-12 mb-4 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                        }`} />
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        Schedule a Free Evaluation
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Book a complimentary math assessment for your child with one of our expert educators.
                      </p>
                      <a
                        href="/contacts"
                        className={`inline-flex items-center justify-center w-full py-3 rounded-lg font-semibold transition-colors ${theme === 'light'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                          }`}
                      >
                        Schedule Now
                      </a>
                    </div>

                    {/* FAQ Link */}
                    <div className={`p-6 rounded-xl ${theme === 'light'
                      ? 'bg-gray-50 border border-gray-100'
                      : 'bg-gray-800 border border-gray-700'
                      }`}>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        Frequently Asked Questions
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Find quick answers to common questions about our programs and enrollment process.
                      </p>
                      <a
                        href="/faq"
                        className={`font-semibold ${theme === 'light'
                          ? 'text-blue-600 hover:text-blue-700'
                          : 'text-blue-400 hover:text-blue-300'
                          }`}
                      >
                        Visit FAQ Page →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Locations Section */}
            <section
              className={`py-16 px-4 md:px-8 lg:px-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                }`}
              aria-label="Our Locations"
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    Our <span className="text-blue-600 dark:text-blue-400">Locations</span>
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Visit us at one of our educational centers across the country.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {locations.map((location, index) => (
                    <div
                      key={index}
                      className={`p-8 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-2 ${theme === 'light'
                        ? 'bg-white shadow-lg hover:shadow-xl border border-gray-100'
                        : 'bg-gray-700 shadow-xl hover:shadow-2xl border border-gray-600'
                        }`}
                    >
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${theme === 'light'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-blue-900/30 text-blue-400'
                        }`}>
                        <MapPin className="w-6 h-6" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {location.city}
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                          <p className="text-gray-600 dark:text-gray-300">
                            {location.address}
                          </p>
                        </div>

                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-gray-400 mr-3" />
                          <a
                            href={`tel:${location.phone.replace(/\D/g, '')}`}
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            {location.phone}
                          </a>
                        </div>

                        <div className="flex items-center">
                          <Mail className="w-5 h-5 text-gray-400 mr-3" />
                          <a
                            href={`mailto:${location.email}`}
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            {location.email}
                          </a>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center w-full py-3 rounded-lg font-semibold transition-colors ${theme === 'light'
                            ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            : 'bg-gray-600 hover:bg-gray-500 text-white'
                            }`}
                        >
                          Get Directions
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <p className="text-gray-600 dark:text-gray-400">
                    Don't see your city?{' '}
                    <button
                      className={`font-semibold underline ${theme === 'light'
                        ? 'text-blue-600 hover:text-blue-700'
                        : 'text-blue-400 hover:text-blue-300'
                        }`}
                      onClick={() => console.log('Request location clicked')}
                    >
                      Request a location near you
                    </button>
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Contact Banner */}
            <section className="py-16 px-4 md:px-8 lg:px-16" aria-label="Quick Contact">
              <div className="max-w-7xl mx-auto">
                <div className={`rounded-3xl p-8 md:p-12 text-center ${theme === 'light'
                  ? 'bg-linear-to-r from-blue-600 to-cyan-600 text-white'
                  : 'bg-linear-to-r from-blue-800 to-cyan-800 text-white'
                  }`}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Need Immediate Assistance?
                  </h2>

                  <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                    Our support team is ready to help you with any questions about
                    programs, enrollment, or evaluations.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <a
                      href="tel:+15551234567"
                      className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl"
                      aria-label="Call support hotline"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now: (555) 123-4567
                    </a>

                    <a
                      href="mailto:support@our-we.edu"
                      className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white/10 font-bold text-lg rounded-xl transition-colors duration-300"
                      aria-label="Email support team"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Email Support
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

export default ContactUs;