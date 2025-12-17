// components/dashboard/StudentOverview.jsx
import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { 
    TrendingUp, 
    Award, 
    Clock, 
    CheckCircle, 
    BookOpen,
    Users,
    Calendar,
    BarChart
} from 'lucide-react';

const StudentOverview = ({ userData }) => {
    const { theme } = useThemeStore();

    const stats = [
        { label: 'Overall Progress', value: '88%', icon: <TrendingUp className="w-5 h-5" />, color: 'text-green-600' },
        { label: 'Classes Attended', value: '24/26', icon: <CheckCircle className="w-5 h-5" />, color: 'text-blue-600' },
        { label: 'Avg. Score', value: '92%', icon: <Award className="w-5 h-5" />, color: 'text-yellow-600' },
        { label: 'Hours Completed', value: '48 hrs', icon: <Clock className="w-5 h-5" />, color: 'text-purple-600' },
    ];

    return (
        <div>
            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Welcome back, {userData?.name?.split(' ')[0]}!
                </h1>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Here's your child's learning overview
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-xl ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'} border ${theme === 'light' ? 'border-gray-200' : 'border-gray-600'}`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-600'}`}>
                                <span className={stat.color}>{stat.icon}</span>
                            </div>
                            <span className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                {stat.value}
                            </span>
                        </div>
                        <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Students List */}
            <div className="mb-8">
                <h2 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Your Children
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userData?.children?.map((child) => (
                        <div
                            key={child.id}
                            className={`p-6 rounded-xl border ${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-gray-700 border-gray-600'}`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-blue-100' : 'bg-gray-600'}`}>
                                        <Users className={`w-6 h-6 ${theme === 'light' ? 'text-blue-600' : 'text-gray-300'}`} />
                                    </div>
                                    <div>
                                        <h3 className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                            {child.name}
                                        </h3>
                                        <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                                            {child.grade} • {child.program}
                                        </p>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${child.progress >= 80
                                        ? 'bg-green-100 text-green-800'
                                        : child.progress >= 60
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                    {child.progress}%
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Progress</span>
                                    <span className="font-medium">{child.progress}%</span>
                                </div>
                                <div className={`h-2 rounded-full ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-600'}`}>
                                    <div
                                        className={`h-full rounded-full ${child.progress >= 80
                                                ? 'bg-green-500'
                                                : child.progress >= 60
                                                    ? 'bg-yellow-500'
                                                    : 'bg-red-500'
                                            }`}
                                        style={{ width: `${child.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Next Class */}
                            <div className="flex items-center space-x-3">
                                <Calendar className={`w-4 h-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`} />
                                <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                    Next Class: {new Date(child.nextClass).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        Recent Activity
                    </h2>
                    <button className={`text-sm font-medium ${theme === 'light' ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'}`}>
                        View All
                    </button>
                </div>

                <div className={`rounded-lg border ${theme === 'light' ? 'border-gray-200' : 'border-gray-600'}`}>
                    <table className="min-w-full">
                        <thead className={`${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                            <tr>
                                <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider`}>
                                    Activity
                                </th>
                                <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider`}>
                                    Date
                                </th>
                                <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider`}>
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${theme === 'light' ? 'divide-gray-200' : 'divide-gray-600'}`}>
                            {userData?.recentActivity?.map((activity) => (
                                <tr key={activity.id} className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} hover:${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className={`p-2 rounded-lg mr-3 ${theme === 'light' ? 'bg-blue-50' : 'bg-gray-600'}`}>
                                                {activity.type === 'payment' && <CreditCard className="w-4 h-4 text-blue-500" />}
                                                {activity.type === 'class' && <BookOpen className="w-4 h-4 text-green-500" />}
                                                {activity.type === 'assignment' && <FileText className="w-4 h-4 text-purple-500" />}
                                            </div>
                                            <div>
                                                <div className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                                    {activity.description}
                                                </div>
                                                {activity.amount && (
                                                    <div className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                                                        {activity.amount}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {activity.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${activity.status === 'completed' || activity.status === 'graded'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {activity.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentOverview;