import { useNavigate } from 'react-router-dom';
import { Moon, Sun, LogOut, ChevronDown, Bell, User } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../auth/authStore';
import { useParentStore } from '../../store/parentStore';
import { useState, useEffect } from 'react';

const Topbar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const { theme, toggleTheme } = useThemeStore();
  const { students, selectedStudentId, setSelectedStudent, getSelectedStudent } = useParentStore();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedStudent = getSelectedStudent();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header
      className={`h-16 px-6 flex items-center justify-between shadow fixed top-0 left-0 right-0 z-50
        ${theme === 'light' ? 'bg-white border-b' : 'bg-gray-900 border-gray-800'}`}
    >
      {/* Left side - Logo */}
      <div className="flex items-center">
        <div className={`text-xl font-bold ${theme === 'light' ? 'text-blue-600' : 'text-white'}`}>
          Parent Portal
        </div>
      </div>

      {/* Center - Student Selector */}
      <div className="flex-1 max-w-2xl mx-4">
        {students.length > 0 && selectedStudent ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center justify-between w-full max-w-sm px-4 py-2 rounded-lg border transition-colors ${
                theme === 'light'
                  ? 'border-gray-300 bg-white hover:bg-gray-50 text-gray-800'
                  : 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <User size={18} />
                <div className="text-left">
                  <div className="font-semibold">{selectedStudent.name}</div>
                  <div className="text-xs opacity-75">
                    Class {selectedStudent.class_name} {selectedStudent.section}
                  </div>
                </div>
              </div>
              <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className={`absolute top-full mt-2 w-full max-w-sm rounded-lg shadow-lg border z-20 ${
                theme === 'light'
                  ? 'bg-white border-gray-200'
                  : 'bg-gray-900 border-gray-700'
              }`}>
                <div className="py-2 max-h-60 overflow-y-auto">
                  {students.map((student) => (
                    <button
                      key={student.id}
                      onClick={() => {
                        setSelectedStudent(student.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                        selectedStudentId === student.id
                          ? theme === 'light'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-blue-900 text-blue-200'
                          : theme === 'light'
                          ? 'hover:bg-gray-50 text-gray-700'
                          : 'hover:bg-gray-800 text-gray-300'
                      }`}
                    >
                      <User size={16} />
                      <div className="flex-1">
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm opacity-75">
                          Class {student.class_name} {student.section}
                        </div>
                      </div>
                      {selectedStudentId === student.id && (
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={`px-4 py-2 rounded-lg border ${theme === 'light' ? 'border-gray-300 bg-gray-50' : 'border-gray-700 bg-gray-800'}`}>
            <div className="animate-pulse flex items-center gap-3">
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="space-y-1">
                <div className="h-3 w-24 bg-gray-300 rounded"></div>
                <div className="h-2 w-16 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-3">
        <button
          className={`p-2 rounded-lg ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'}`}
        >
          <Bell size={20} className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'} />
        </button>

        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'}`}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon size={20} className="text-gray-600" />
          ) : (
            <Sun size={20} className="text-yellow-400" />
          )}
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;