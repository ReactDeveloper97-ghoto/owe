// components/dashboard/ParentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useThemeStore } from '../../store/themeStore';
import SEO from './../SEO';
import LoadingSpinner from '../../components/LoadingSpinner';
import { lazy, Suspense } from 'react';

// Lazy load components
const Navbar = lazy(() => import('../../components/Navbar'));
const Footer = lazy(() => import('../../components/Footer'));

// Dashboard Components
import DashboardSidebar from './../dashboard/DashboardSidebar';
import DashboardHeader from './../dashboard/DashboardHeader';
import StudentOverview from './../dashboard/StudentOverview';
import AttendanceTracker from './../dashboard/AttendanceTracker';
import ProgressReports from './../dashboard/ProgressReports';
import UpcomingClasses from './../dashboard/UpcomingClasses';
import PaymentHistory from './../dashboard/PaymentHistory';
import MessagesInbox from './../dashboard/MessagesInbox';
import ResourceLibrary from './../dashboard/ResourceLibrary';

const ParentDashboard = () => {
    const { theme } = useThemeStore();
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    // Simulate user data fetch
    useEffect(() => {
        const fetchUserData = async () => {
            // Simulate API call
            setTimeout(() => {
                setUserData({
                    name: "John Doe",
                    email: "parent@example.com",
                    phone: "+1 (555) 123-4567",
                    children: [
                        {
                            id: 1,
                            name: "Sarah Doe",
                            grade: "8th Grade",
                            program: "Middle School Math",
                            progress: 85,
                            nextClass: "2024-12-20 16:00"
                        },
                        {
                            id: 2,
                            name: "Michael Doe",
                            grade: "5th Grade",
                            program: "Elementary Math",
                            progress: 92,
                            nextClass: "2024-12-19 15:00"
                        }
                    ],
                    recentActivity: [
                        { id: 1, type: 'payment', description: 'Monthly Fee Paid', date: '2024-12-15', amount: '$299' },
                        { id: 2, type: 'class', description: 'Algebra Class Attended', date: '2024-12-14', status: 'completed' },
                        { id: 3, type: 'assignment', description: 'Homework Submitted', date: '2024-12-13', status: 'graded' }
                    ]
                });
                setLoading(false);
            }, 1000);
        };

        fetchUserData();
    }, []);

    // Structured Data for Dashboard
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Parent Dashboard - Our World of Education",
        "description": "Parent dashboard for monitoring student progress, attendance, payments, and communication with teachers.",
        "url": "https://our-we.netlify.app/parents/dashboard"
    };

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'overview':
                return <StudentOverview userData={userData} />;
            case 'attendance':
                return <AttendanceTracker userData={userData} />;
            case 'progress':
                return <ProgressReports userData={userData} />;
            case 'classes':
                return <UpcomingClasses userData={userData} />;
            case 'payments':
                return <PaymentHistory userData={userData} />;
            case 'messages':
                return <MessagesInbox userData={userData} />;
            case 'resources':
                return <ResourceLibrary userData={userData} />;
            default:
                return <StudentOverview userData={userData} />;
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <SEO
                title="Parent Dashboard | Student Progress & Management"
                description="Monitor your child's mathematics progress, attendance, payments, and communicate with teachers."
                keywords="parent portal, student progress tracking, attendance monitoring, payment history, parent dashboard"
                url="https://our-we.netlify.app/parents/dashboard"
                structuredData={structuredData}
            />

            <Suspense fallback={<LoadingSpinner />}>
                <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
                    <Navbar />

                    {/* Dashboard Container */}
                    <div className="pt-16 flex">
                        {/* Sidebar */}
                        <DashboardSidebar 
                            activeTab={activeTab} 
                            setActiveTab={setActiveTab} 
                            userData={userData}
                        />

                        {/* Main Content */}
                        <div className="flex-1 p-4 md:p-6 lg:p-8">
                            {/* Header */}
                            <DashboardHeader userData={userData} />

                            {/* Main Content Area */}
                            <main className="mt-6">
                                <div className={`rounded-2xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-lg p-6`}>
                                    {renderActiveTab()}
                                </div>
                            </main>
                        </div>
                    </div>

                    <Footer />
                </div>
            </Suspense>
        </>
    );
};

export default ParentDashboard;