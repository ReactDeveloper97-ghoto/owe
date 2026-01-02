import { useNavigate } from 'react-router-dom';
import { Moon, Sun, LogOut } from 'lucide-react';
import { useSessionStore } from '../../store/sessionStore';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../auth/authStore';

const Topbar = ({ adminName }) => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const clearSession = useSessionStore((s) => s.clearSession);
  const { theme, toggleTheme } = useThemeStore();

  const handleLogout = () => {
    clearSession();
    logout();
    navigate('/admin-login', { replace: true });
  };

  return (
    <header
      className={`h-16 px-6 flex items-center justify-between shadow
        ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}
    >
      <h2
        className={`font-semibold text-lg ${
          theme === 'light' ? 'text-[#007698]' : 'text-white'
        }`}
      >
        Admin: {adminName}
      </h2>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className={`w-10 h-10 rounded-full flex items-center justify-center border
          ${theme === 'light'
              ? 'border-gray-300 hover:bg-gray-100'
              : 'border-gray-600 hover:bg-gray-700'
            }`}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-[#007698]" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-400" />
          )}
        </button>

        <span
          className={`h-6 w-px ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-600'}`}
        />

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
