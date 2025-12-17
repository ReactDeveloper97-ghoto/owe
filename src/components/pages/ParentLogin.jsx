// pages/ParentLogin.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import SEO from './../SEO';
import { useThemeStore } from './../../store/themeStore';

const ParentLogin = () => {
    const { theme } = useThemeStore();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            // Demo login - in production, validate with backend
            if (formData.email && formData.password) {
                navigate('/parents/dashboard');
            } else {
                setErrors({ general: 'Please fill all fields' });
            }
            setIsLoading(false);
        }, 1500);
    };

    return (
        <>
            <SEO
                title="Parent Login | Our World of Education"
                description="Login to parent portal to access student progress, attendance, and payment information."
                keywords="parent login, parent portal, student portal, education login"
                url="https://our-we.netlify.app/parents/login"
            />

            <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
                <div className={`w-full max-w-md rounded-2xl shadow-xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-8`}>
                    {/* Logo/Header */}
                    <div className="text-center mb-8">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-4 ${theme === 'light' ? 'bg-blue-50' : 'bg-gray-700'}`}>
                            <LogIn className={`w-8 h-8 ${theme === 'light' ? 'text-blue-600' : 'text-gray-300'}`} />
                        </div>
                        <h1 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                            Parent Login
                        </h1>
                        <p className={`mt-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                            Access your child's learning journey
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme === 'light'
                                            ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                            : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                        } focus:outline-none transition-colors`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                Password
                            </label>
                            <div className="relative">
                                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className={`w-full pl-10 pr-12 py-3 rounded-lg border ${theme === 'light'
                                            ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                            : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                        } focus:outline-none transition-colors`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${theme === 'light' ? 'text-gray-400 hover:text-gray-600' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className={`w-4 h-4 rounded ${theme === 'light'
                                            ? 'text-blue-600 border-gray-300 focus:ring-blue-200'
                                            : 'text-blue-400 border-gray-600 bg-gray-700 focus:ring-blue-900'
                                        }`}
                                />
                                <span className={`ml-2 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                    Remember me
                                </span>
                            </label>
                            <a href="/parents/forgot-password" className={`text-sm font-medium ${theme === 'light' ? 'text-blue-600 hover:text-blue-500' : 'text-blue-400 hover:text-blue-300'}`}>
                                Forgot password?
                            </a>
                        </div>

                        {errors.general && (
                            <div className={`p-3 rounded-lg ${theme === 'light' ? 'bg-red-50 text-red-800' : 'bg-red-900/20 text-red-400'}`}>
                                {errors.general}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center ${isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : theme === 'light'
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5 mr-2" />
                                    Login to Dashboard
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className={`flex-1 border-t ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'}`}></div>
                        <span className={`px-3 text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>or</span>
                        <div className={`flex-1 border-t ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'}`}></div>
                    </div>

                    {/* Register Link */}
                    <div className="text-center">
                        <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                            Don't have an account?{' '}
                            <Link to="/parents/register" className={`font-semibold ${theme === 'light' ? 'text-blue-600 hover:text-blue-500' : 'text-blue-400 hover:text-blue-300'}`}>
                                Register here
                            </Link>
                        </p>
                        <p className={`mt-4 text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
                            <Link to="/" className={`hover:underline ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                ← Back to home
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ParentLogin;