import React, { useState, lazy, Suspense } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { Eye, EyeOff, LockKeyhole, Moon, Sun, User } from 'lucide-react';
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';

// Lazy load components for better performance
const Logo = lazy(() => import('../../components/Logo'));

const Login = () => {
  const { toggleTheme, theme } = useThemeStore();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic
      console.log('Login attempt:', formData.email);
    } else {
      // Handle registration logic
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      console.log('Registration attempt:', formData.email);
    }
  };

  // Structured Data for Login Page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Parent Portal Login | Our World of Education",
    "description": "Secure login portal for parents to access student progress, schedule evaluations, view assignments, and manage their OWE account.",
    "url": "https://our-we.netlify.app/login",
    "mainEntity": {
      "@type": "Service",
      "name": "Parent Portal Access",
      "serviceType": "Educational Management System",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Our World of Education",
        "url": "https://our-we.netlify.app"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Parent Portal Features",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Student Progress Tracking",
            "description": "Monitor your child's academic progress and performance"
          },
          {
            "@type": "Offer",
            "name": "Schedule Management",
            "description": "Schedule evaluations and manage class timings"
          },
          {
            "@type": "Offer",
            "name": "Assignment Access",
            "description": "View and download weekly assignments and materials"
          },
          {
            "@type": "Offer",
            "name": "Payment Portal",
            "description": "Secure tuition payment and invoice management"
          }
        ]
      }
    }
  };

  return (
    <>
      <SEO
        title={isLogin ? "Parent Portal Login | Our World of Education" : "Create Parent Account | Our World of Education"}
        description="Access your OWE Parent Portal to track student progress, schedule evaluations, view assignments, and manage your account securely."
        keywords="parent portal login, OWE login, student progress tracking, math program parent access, schedule evaluation, parent account"
        url="https://our-we.netlify.app/login"
        noindex={false} // Allow indexing but nofollow on form pages
        structuredData={structuredData}
      />

      <Suspense fallback={<LoadingSpinner />}>
        <div
          className={`w-full min-h-screen relative m-0 p-0 ${theme === 'light' ? 'bg-[#5D93B2]' : 'bg-gray-900'
            }`}
          role="main"
          aria-label="Parent portal login page"
        >

          <div className="container flex items-center justify-center flex-col w-full py-8 px-4">
            {/* Login Card */}
            <div
              className={`flex flex-col w-full lg:w-1/2 min-w-[300px] max-w-[600px] ${theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800'
                } rounded-lg items-center justify-start py-6 md:py-8 px-4 md:px-8`}
              role="region"
              aria-label="Login form container"
            >
              {/* Logo */}
              <div className="mb-4">
                <Logo width={180} height={60} />
              </div>

              {/* Page Heading */}
              <h1 className={`text-2xl md:text-3xl font-bold ${theme=='light'?"text-[#007698]":"text-white"} mb-2 text-center`}>
                {isLogin ? "OWE Parent Portal Login" : "Create Parent Portal Account"}
              </h1>

              <p className="text-lg opacity-80 font-semibold text-gray-600 dark:text-gray-300 mb-6 text-center">
                {isLogin ? "Access your student's progress and account" : "Register for parent portal access"}
              </p>

              {/* Toggle Text */}
              <p className={`px-2 text-center py-4 text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {isLogin ? (
                  <>
                    Don't have an OWE Parent Portal Account?{' '}
                    <button
                      onClick={() => setIsLogin(false)}
                      className={`underline cursor-pointer font-medium ${theme === 'dark' ? 'text-[#8bc540] hover:text-[#bbeb7d]' : 'text-[#007698] hover:text-[#005a75]'
                        } transition-colors rounded px-1`}
                      aria-label="Switch to account creation form"
                      type="button"
                    >
                      Create an Account
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => setIsLogin(true)}
                      className={`underline cursor-pointer font-medium ${theme === 'dark' ? 'text-[#8bc540] hover:text-[#bbeb7d]' : 'text-[#007698] hover:text-[#005a75]'
                        } transition-colors px-1`}
                      aria-label="Switch to login form"
                      type="button"
                    >
                      Return to Login
                    </button>
                  </>
                )}
              </p>

              {/* Form Container */}
              <div
                className={`form-container w-full px-4 md:px-8 py-6 my-4 rounded-lg ${theme === 'light' ? 'bg-[#F7F9FA]' : 'bg-gray-700'
                  }`}
                role="form"
                aria-label="Account login or registration form"
              >
                {!isLogin && (
                  <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-4">
                    Don't forget to verify your email address to get full access to the Parent Portal.
                  </p>
                )}

                <form onSubmit={handleSubmit} className="w-full">
                  {/* Email Input */}
                  <div className="mb-4">
                    <label htmlFor="email" className="sr-only">
                      Email Address
                    </label>
                    <div
                      className={`flex gap-3 p-3 border rounded-md transition-all ${theme === 'light'
                        ? 'border-[#00779867] focus-within:border-[#007698] focus-within:ring-2 focus-within:ring-[#007698] focus-within:ring-opacity-30'
                        : 'border-gray-500 focus-within:border-[#8bc540] focus-within:ring-2 focus-within:ring-[#8bc540] focus-within:ring-opacity-30'
                        }`}
                    >
                      <span
                        className="border-r border-gray-400 pr-2 flex items-center"
                        aria-hidden="true"
                      >
                        <User className="w-5 h-5 text-gray-400" />
                      </span>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`outline-none bg-transparent w-full ${theme === 'light' ? 'text-black placeholder:text-gray-500' : 'text-white placeholder:text-gray-400'
                          }`}
                        required
                        aria-required="true"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="mb-4">
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <div
                      className={`flex gap-3 p-3 border rounded-md transition-all ${theme === 'light'
                        ? 'border-[#00779867] focus-within:border-[#007698] focus-within:ring-2 focus-within:ring-[#007698] focus-within:ring-opacity-30'
                        : 'border-gray-500 focus-within:border-[#8bc540] focus-within:ring-2 focus-within:ring-[#8bc540] focus-within:ring-opacity-30'
                        }`}
                    >
                      <span
                        className="border-r border-gray-400 pr-2 flex items-center"
                        aria-hidden="true"
                      >
                        <LockKeyhole className="w-5 h-5 text-gray-400" />
                      </span>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`outline-none bg-transparent w-full ${theme === 'light' ? 'text-black placeholder:text-gray-500' : 'text-white placeholder:text-gray-400'
                          }`}
                        required
                        aria-required="true"
                        autoComplete={isLogin ? "current-password" : "new-password"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-current rounded px-1"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Input (for registration) */}
                  {!isLogin && (
                    <div className="mb-6">
                      <label htmlFor="confirmPassword" className="sr-only">
                        Confirm Password
                      </label>
                      <div
                        className={`flex gap-3 p-3 border rounded-md transition-all ${theme === 'light'
                          ? 'border-[#00779867] focus-within:border-[#007698] focus-within:ring-2 focus-within:ring-[#007698] focus-within:ring-opacity-30'
                          : 'border-gray-500 focus-within:border-[#8bc540] focus-within:ring-2 focus-within:ring-[#8bc540] focus-within:ring-opacity-30'
                          }`}
                      >
                        <span
                          className="border-r border-gray-400 pr-2 flex items-center"
                          aria-hidden="true"
                        >
                          <LockKeyhole className="w-5 h-5 text-gray-400" />
                        </span>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`outline-none bg-transparent w-full ${theme === 'light' ? 'text-black placeholder:text-gray-500' : 'text-white placeholder:text-gray-400'
                            }`}
                          required={!isLogin}
                          aria-required={!isLogin}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-current rounded px-1"
                          aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Forgot Password / Return Links */}
                  {/* <div className="flex w-full justify-end items-center mb-4">
                    <button
                      type="button"
                      onClick={isLogin ? () => console.log('Forgot password clicked') : () => setIsLogin(true)}
                      className={`text-sm font-medium transition-colors ${theme === 'dark'
                          ? 'text-[#8bc540] hover:text-[#bbeb7d] focus:text-[#bbeb7d]'
                          : 'text-[#007698] hover:text-[#005a75] focus:text-[#005a75]'
                        } underline focus:outline-none focus:ring-2 focus:ring-current rounded px-1`}
                      aria-label={isLogin ? "Reset your password" : "Return to login form"}
                    >
                      {isLogin ? "Forgot password?" : "Return to Login"}
                    </button>
                  </div> */}

                  {/* Password Requirements (for registration) */}
                  {!isLogin && (
                    <div className={`mb-6 p-4 rounded-md ${theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-gray-800 text-gray-300'
                      }`}>
                      <h3 className="font-semibold mb-2 text-sm">Password Requirements:</h3>
                      <ul className="space-y-1 text-xs list-disc pl-5">
                        <li>At least 8 characters</li>
                        <li>Contains at least one number</li>
                        <li>Contains at least one uppercase letter</li>
                        <li>Contains at least one lowercase letter</li>
                        <li>Passwords must match</li>
                      </ul>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex items-center justify-center w-full">
                    <button
                      type="submit"
                      className={`w-full cursor-pointer font-semibold p-3 uppercase rounded-lg transition-all duration-300 focus:outline-none ${theme === 'light'
                        ? 'bg-[#6FA728] text-white border-[#6FA728] hover:bg-white hover:text-[#6FA728] focus:ring-[#6FA728]'
                        : 'bg-white text-[#6FA728] border-white hover:bg-[#6FA728] hover:text-white hover:border-[#6FA728] focus:ring-white'
                        }`}
                      aria-label={isLogin ? "Login to your account" : "Create new account"}
                    >
                      {isLogin ? "Login" : "Create Account"}
                    </button>
                  </div>
                </form>

                {/* Divider */}
                <div className="flex items-center justify-center w-full my-6 text-gray-400">
                  <hr className={`grow w-full ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'}`} />
                  <span className="text-lg text-gray-600 dark:text-gray-400 w-fit font-medium mx-4">or</span>
                  <hr className={`grow w-full ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'}`} />
                </div>

                {/* Social Login Buttons */}
                <div className="flex flex-col md:flex-row w-full items-center justify-center gap-3">
                  {/* Google Login */}
                  <button
                    type="button"
                    className={`w-full cursor-pointer border-2 font-semibold p-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${theme === 'light'
                      ? 'bg-[#007698] text-white border-[#007698] hover:bg-white hover:text-[#007698] focus:ring-[#007698]'
                      : 'bg-white text-[#007698] border-white hover:bg-[#007698] hover:text-white hover:border-[#007698] focus:ring-white'
                      }`}
                    aria-label="Continue with Google"
                  >
                    <FaGoogle className="w-5 h-5" aria-hidden="true" />
                    <span>Continue with Google</span>
                  </button>

                  {/* Facebook Login */}
                  <button
                    type="button"
                    className={`w-full text-sm cursor-pointer border-2 font-semibold p-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${theme === 'light'
                      ? 'bg-[#007698] text-white border-[#007698] hover:bg-white hover:text-[#007698] focus:ring-[#007698]'
                      : 'bg-white text-[#007698] border-white hover:bg-[#007698] hover:text-white hover:border-[#007698] focus:ring-white'
                      }`}
                    aria-label="Continue with Facebook"
                  >
                    <FaFacebookSquare className="w-5 h-5" aria-hidden="true" />
                    <span>Continue with Facebook</span>
                  </button>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 text-center">
                <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  <span role="img" aria-label="lock">🔒</span> Your information is secured with 256-bit SSL encryption
                </p>
                <p className={`text-xs mt-1 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Need help? <a
                    href="/contacts"
                    className={`underline ${theme === 'dark' ? 'text-[#8bc540] hover:text-[#bbeb7d]' : 'text-[#007698] hover:text-[#005a75]'
                      }`}
                  >Contact Support</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Login;