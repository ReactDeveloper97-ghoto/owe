// components/dashboard/DashboardSidebar.jsx
import React from 'react';
import { useThemeStore } from './../../store/themeStore';
import { 
    Home, 
    Calendar, 
    BarChart3, 
    Users, 
    CreditCard, 
    Mail, 
    FileText, 
    Settings,
    LogOut,
    BookOpen,
    Clock,
    Award,
    Download
} from 'lucide-react';

const DashboardSidebar = ({ activeTab, setActiveTab, userData }) => {
    const { theme } = useThemeStore();

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: <Home className="w-5 h-5" /> },
        { id: 'attendance', label: 'Attendance', icon: <Calendar className="w-5 h-5" /> },
        { id: 'progress', label: 'Progress Reports', icon: <BarChart3 className="w-5 h-5" /> },
        { id: 'classes', label: 'Upcoming Classes', icon: <Clock className="w-5 h-5" /> },
        { id: 'payments', label: 'Payments', icon: <CreditCard className="w-5 h-5" /> },
        { id: 'messages', label: 'Messages', icon: <Mail className="w-5 h-5" /> },
        { id: 'resources', label: 'Resources', icon: <FileText className="w-5 h-5" /> },
    ];

    return (
        <aside className={`w-64 min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} border-r ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} hidden md:block`}>
            {/* User Profile */}
            <div className={`p-6 border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
                <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-blue-100' : 'bg-gray-700'}`}>
                        <Users className={`w-6 h-6 ${theme === 'light' ? 'text-blue-600' : 'text-gray-300'}`} />
                    </div>
                    <div>
                        <h3 className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                            {userData?.name || 'Parent'}
                        </h3>
                        <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                            Parent Account
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                                        ? theme === 'light'
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'bg-gray-700 text-blue-400'
                                        : theme === 'light'
                                            ? 'text-gray-700 hover:bg-gray-100'
                                            : 'text-gray-300 hover:bg-gray-700'
                                    }`}
                            >
                                {item.icon}
                                <span className="font-medium">{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Divider */}
                <div className={`my-6 border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}></div>

                {/* Quick Actions */}
                <div className="px-4 mb-6">
                    <h4 className={`text-sm font-semibold mb-3 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        Quick Actions
                    </h4>
                    <div className="space-y-2">
                        <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${theme === 'light'
                                ? 'text-gray-700 hover:bg-gray-100'
                                : 'text-gray-300 hover:bg-gray-700'
                            }`}>
                            <Download className="w-5 h-5" />
                            <span>Download Report</span>
                        </button>
                        <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${theme === 'light'
                                ? 'text-gray-700 hover:bg-gray-100'
                                : 'text-gray-300 hover:bg-gray-700'
                            }`}>
                            <BookOpen className="w-5 h-5" />
                            <span>View Curriculum</span>
                        </button>
                    </div>
                </div>

                {/* Settings & Logout */}
                <div className="px-4 space-y-2">
                    <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${theme === 'light'
                            ? 'text-gray-700 hover:bg-gray-100'
                            : 'text-gray-300 hover:bg-gray-700'
                        }`}>
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </button>
                    <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${theme === 'light'
                            ? 'text-red-600 hover:bg-red-50'
                            : 'text-red-400 hover:bg-gray-700'
                        }`}>
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </nav>
        </aside>
    );
};

export default DashboardSidebar;