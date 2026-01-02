import React, { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LockKeyhole, User } from 'lucide-react';
import { useAuthStore } from '../../auth/authStore';
import { useThemeStore } from '../../store/themeStore';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';
import Logo from '../../components/Logo';

const AdminLogin = () => {
  const { theme } = useThemeStore();
   const navigate = useNavigate();
  const loginAdmin = useAuthStore((s) => s.loginAdmin);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await loginAdmin(formData.email, formData.password);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <>
      <SEO title="Admin Login" description="Admin / Teacher Login" />
      <Suspense fallback={<LoadingSpinner />}>
        <div className={`w-full min-h-screen ${theme === 'light' ? 'bg-[#5D93B2]' : 'bg-gray-900'}`}>
          <div className="container flex items-center justify-center min-h-screen px-4">
            <div className={`w-full lg:w-1/2 max-w-xl rounded-lg py-8 px-6 ${theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800'}`}>
              <div className="flex justify-center mb-6"><Logo width={180} height={60} /></div>
              <h1 className={`text-3xl font-bold text-center mb-2 ${theme === 'light' ? 'text-[#007698]' : 'text-white'}`}>Admin / Teacher Login</h1>
              <p className="text-center text-gray-500 mb-6">Secure access to the admin dashboard</p>

              {error && <p className="mb-4 text-center text-red-500 font-semibold">{error}</p>}

              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <div className={`flex items-center gap-3 p-3 border rounded-md ${theme==='light'?'border-[#00779867]':'border-gray-500'}`}>
                    <User className="w-5 h-5 text-gray-400" />
                    <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required className="w-full bg-transparent outline-none"/>
                  </div>
                </div>

                <div className="mb-6">
                  <div className={`flex items-center gap-3 p-3 border rounded-md ${theme==='light'?'border-[#00779867]':'border-gray-500'}`}>
                    <LockKeyhole className="w-5 h-5 text-gray-400"/>
                    <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" value={formData.password} onChange={handleInputChange} required className="w-full bg-transparent outline-none"/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading} className={`w-full py-3 rounded-lg font-semibold ${theme==='light'?'bg-[#6FA728] text-white':'bg-white text-[#6FA728]'}`}>
                  {loading ? 'Logging in…' : 'Login'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default AdminLogin;
