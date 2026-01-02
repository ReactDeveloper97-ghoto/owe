import React, { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LockKeyhole, User } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../auth/authStore';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useSessionStore } from '../../store/sessionStore';


const Logo = lazy(() => import('../../components/Logo'));

const Login = () => {
  const navigate = useNavigate();
  const loginParent = useAuthStore((s) => s.loginParent);
  const fetchProfile = useSessionStore((s) => s.fetchProfile);
  const { theme } = useThemeStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await loginParent(formData.email, formData.password);

    // ✅ fetch profile after login
    await fetchProfile();

    navigate('/parent');
  } catch (err) {
    alert(err.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <SEO title="Parent Portal Login" description="Login to access parent dashboard" />
      <Suspense fallback={<LoadingSpinner />}>
        <div className={`w-full min-h-screen ${theme === 'light' ? 'bg-[#5D93B2]' : 'bg-gray-900'}`}>
          <div className="container flex items-center justify-center flex-col w-full py-8 px-4">
            <div className={`flex flex-col w-full lg:w-1/2 min-w-75 max-w-150 ${theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800'} rounded-lg items-center py-6 md:py-8 px-4 md:px-8`}>
              <div className="mb-4"><Logo width={180} height={60} /></div>
              <h1 className={`text-2xl md:text-3xl font-bold ${theme === 'light' ? "text-[#007698]" : "text-white"} mb-2 text-center`}>OWE Parent Portal Login</h1>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4">
                  <div className={`flex gap-3 p-3 border rounded-md ${theme === 'light' ? 'border-[#00779867]' : 'border-gray-500'}`}>
                    <span className="border-r border-gray-400 pr-2 flex items-center"><User className="w-5 h-5 text-gray-400" /></span>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`outline-none bg-transparent w-full ${theme === 'light' ? 'text-black placeholder:text-gray-500' : 'text-white placeholder:text-gray-400'}`}
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className={`flex gap-3 p-3 border rounded-md ${theme === 'light' ? 'border-[#00779867]' : 'border-gray-500'}`}>
                    <span className="border-r border-gray-400 pr-2 flex items-center"><LockKeyhole className="w-5 h-5 text-gray-400" /></span>
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`outline-none bg-transparent w-full ${theme === 'light' ? 'text-black placeholder:text-gray-500' : 'text-white placeholder:text-gray-400'}`}
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={loading} className={`w-full p-3 font-semibold uppercase rounded-lg ${theme === 'light' ? 'bg-[#6FA728] text-white' : 'bg-white text-[#6FA728]'}`}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Login;
