import { NavLink } from 'react-router-dom';
import { useThemeStore } from '../../store/themeStore';
import { 
  Home, 
  Calendar, 
  DollarSign, 
  BookOpen, 
  MessageSquare,
  User
} from 'lucide-react';

const Sidebar = () => {
  const { theme } = useThemeStore();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
     ${
       isActive
         ? 'bg-blue-600 text-white shadow'
         : theme === 'light'
         ? 'hover:bg-gray-100 text-gray-700'
         : 'hover:bg-gray-800 text-gray-300'
     }`;

  return (
    <aside
      className={`w-64 h-[calc(100vh-4rem)] fixed left-0 top-16 shadow-lg border-r ${
        theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-900 border-gray-800'
      }`}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-100 rounded-lg">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              Parent Portal
            </h3>
            <p className="text-sm text-gray-500">Dashboard Navigation</p>
          </div>
        </div>

        <nav className="space-y-2">
          <NavLink to="/parent" end className={linkClass}>
            <Home size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/parent/attendance" className={linkClass}>
            <Calendar size={18} />
            <span>Attendance</span>
          </NavLink>
          <NavLink to="/parent/fees" className={linkClass}>
            <DollarSign size={18} />
            <span>Fees</span>
          </NavLink>
          <NavLink to="/parent/assignments" className={linkClass}>
            <BookOpen size={18} />
            <span>Assignments</span>
          </NavLink>
          <NavLink to="/parent/remarks" className={linkClass}>
            <MessageSquare size={18} />
            <span>Remarks</span>
          </NavLink>
        </nav>

        {/* Quick Stats */}
        <div className={`mt-8 p-4 rounded-lg ${theme === 'light' ? 'bg-blue-50' : 'bg-gray-800'}`}>
          <p className="text-sm font-medium text-gray-600 mb-1">Quick Access</p>
          <p className="text-xs text-gray-500">
            All your student's information in one place
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;