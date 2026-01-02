import * as Dialog from '@radix-ui/react-dialog';
import { FiX, FiUser, FiMail, FiPhone, FiLock, FiUserPlus, FiCheck, FiEye, FiEyeOff } from "react-icons/fi";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { useState } from "react";
import { createParent } from "../../api/admin.api";
import { useThemeStore } from "../../store/themeStore";

const ParentModal = ({ isOpen, onClose, onSuccess }) => {
    const { theme } = useThemeStore();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        parent_name: "",
        email: "",
        phone_number: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!form.parent_name.trim()) {
            alert("Parent name is required");
            return;
        }
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
            alert("Please enter a valid email");
            return;
        }
        if (!form.password || form.password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            await createParent(form);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onSuccess?.();
                onClose();
                // Reset form
                setForm({
                    parent_name: "",
                    email: "",
                    phone_number: "",
                    password: "",
                });
            }, 2000);
        } catch (err) {
            alert(err.response?.data?.error || "Failed to add parent");
        } finally {
            setLoading(false);
        }
    };

    // Responsive input field styles
    const inputClasses = `w-full pl-10 pr-10 py-3 sm:py-2.5 rounded-lg border transition-all duration-200 text-sm sm:text-base ${
        theme === 'dark'
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-500'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400'
    }`;

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className={`fixed inset-0 transition-all duration-300 ${
                    theme === 'dark' ? 'bg-black/70' : 'bg-black/50'
                }`} />

                <Dialog.Content className={`fixed max-h-[90vh] sm:max-h-[95vh] overflow-y-auto inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:w-auto sm:max-w-md rounded-none sm:rounded-2xl shadow-2xl transition-all duration-300 outline-none ${
                    theme === 'dark'
                        ? 'bg-gray-800 border-0 sm:border border-gray-700'
                        : 'bg-white border-0 sm:border border-gray-200'
                }`}>
                    {/* Modal Header */}
                    <div className={`sticky top-0 z-10 px-4 sm:px-6 py-3 sm:py-4 border-b flex items-center justify-between ${
                        theme === 'dark' 
                            ? 'border-gray-700 bg-gray-800' 
                            : 'border-gray-200 bg-white'
                    }`}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                                theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
                            }`}>
                                {success ? (
                                    <FiCheck className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                        theme === 'dark' ? 'text-green-400' : 'text-green-600'
                                    }`} />
                                ) : (
                                    <FiUserPlus className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                    }`} />
                                )}
                            </div>
                            <div>
                                <Dialog.Title className={`text-base sm:text-lg font-semibold ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                    {success ? "Success!" : "Add New Parent"}
                                </Dialog.Title>
                                <p className={`text-xs sm:text-sm ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                    {success ? "Parent added successfully" : "Fill in the parent details below"}
                                </p>
                            </div>
                        </div>
                        <Dialog.Close className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                            theme === 'dark'
                                ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                        }`}>
                            <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Dialog.Close>
                    </div>

                    {/* Modal Body */}
                    <form onSubmit={handleSubmit} className="p-4 sm:p-6">
                        {success ? (
                            <div className="flex flex-col items-center py-6 sm:py-8">
                                <div className={`p-3 sm:p-4 rounded-full mb-4 sm:mb-6 ${
                                    theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'
                                }`}>
                                    <div className={`p-2 sm:p-3 rounded-full ${
                                        theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'
                                    }`}>
                                        <FiCheck className={`w-10 h-10 sm:w-12 sm:h-12 ${
                                            theme === 'dark' ? 'text-green-400' : 'text-green-600'
                                        }`} />
                                    </div>
                                </div>
                                <h3 className={`text-lg sm:text-xl font-semibold mb-2 sm:mb-3 ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Parent Added Successfully!
                                </h3>
                                <p className={`text-center text-sm sm:text-base mb-4 sm:mb-6 ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    The parent account has been created and can now access the system.
                                </p>
                                <div className={`w-full p-3 sm:p-4 rounded-lg ${
                                    theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                                }`}>
                                    <div className="text-xs sm:text-sm space-y-2">
                                        <div className="flex justify-between">
                                            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                                Name:
                                            </span>
                                            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                                                {form.parent_name}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                                Email:
                                            </span>
                                            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                                                {form.email}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 sm:space-y-6">
                                {/* Icon Header */}
                                <div className="flex flex-col items-center">
                                    <div className={`p-3 sm:p-4 rounded-full mb-3 sm:mb-4 ${
                                        theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'
                                    }`}>
                                        <MdOutlineFamilyRestroom className={`w-10 h-10 sm:w-12 sm:h-12 ${
                                            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                        }`} />
                                    </div>
                                    <p className={`text-center text-sm sm:text-base ${
                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                        Add a new parent to the system. They will receive login credentials.
                                    </p>
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-3 sm:space-y-4">
                                    {/* Parent Name Field */}
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <label className={`block text-sm font-medium ${
                                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                            Parent Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FiUser className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                                                }`} />
                                            </div>
                                            <input
                                                type="text"
                                                value={form.parent_name}
                                                onChange={(e) => setForm({ ...form, parent_name: e.target.value })}
                                                placeholder="Enter parent's full name"
                                                className={inputClasses}
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <label className={`block text-sm font-medium ${
                                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FiMail className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                                                }`} />
                                            </div>
                                            <input
                                                type="email"
                                                value={form.email}
                                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                placeholder="parent@example.com"
                                                className={inputClasses}
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Field */}
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <label className={`block text-sm font-medium ${
                                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FiPhone className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                                                }`} />
                                            </div>
                                            <input
                                                type="tel"
                                                value={form.phone_number}
                                                onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                                                placeholder="+92 300 1234567"
                                                className={inputClasses}
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <label className={`block text-sm font-medium ${
                                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                            Password <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FiLock className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                                                }`} />
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={form.password}
                                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                                placeholder="Minimum 6 characters"
                                                className={inputClasses}
                                                required
                                                disabled={loading}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors ${
                                                    theme === 'dark'
                                                        ? 'text-gray-400 hover:text-white'
                                                        : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                                disabled={loading}
                                            >
                                                {showPassword ? (
                                                    <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                                                ) : (
                                                    <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                                                )}
                                            </button>
                                        </div>
                                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                                            Password must be at least 6 characters long
                                        </p>
                                    </div>
                                </div>

                                {/* Information Box (only on larger screens) */}
                                <div className={`hidden sm:block p-4 rounded-lg ${
                                    theme === 'dark' 
                                        ? 'bg-gray-900/50 border border-gray-700' 
                                        : 'bg-blue-50 border border-blue-200'
                                }`}>
                                    <div className="flex items-start gap-3">
                                        <MdOutlineFamilyRestroom className={`w-5 h-5 mt-0.5 ${
                                            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                        }`} />
                                        <div>
                                            <p className={`text-sm font-medium ${
                                                theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                                            }`}>
                                                Parent Account Information
                                            </p>
                                            <p className={`text-sm mt-1 ${
                                                theme === 'dark' ? 'text-gray-400' : 'text-blue-600'
                                            }`}>
                                                The parent will receive login credentials to access their dashboard and track student progress.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Modal Footer */}
                        <div className={`mt-4 sm:mt-6 pt-4 sm:pt-6 border-t flex flex-col sm:flex-row justify-end gap-3 ${
                            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                            {success ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSuccess(false);
                                        onClose();
                                        setForm({
                                            parent_name: "",
                                            email: "",
                                            phone_number: "",
                                            password: "",
                                        });
                                    }}
                                    className={`w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                                        theme === 'dark'
                                            ? 'bg-green-600 hover:bg-green-700 text-white'
                                            : 'bg-green-600 hover:bg-green-700 text-white'
                                    }`}
                                >
                                    <FiCheck className="w-4 h-4" />
                                    Done
                                </button>
                            ) : (
                                <>
                                    <Dialog.Close asChild>
                                        <button
                                            type="button"
                                            className={`w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-lg font-medium transition-all duration-200 order-2 sm:order-1 ${
                                                theme === 'dark'
                                                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600'
                                                    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                                            }`}
                                        >
                                            Cancel
                                        </button>
                                    </Dialog.Close>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 order-1 sm:order-2 ${
                                            loading
                                                ? 'opacity-70 cursor-not-allowed'
                                                : theme === 'dark'
                                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        }`}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <FiUserPlus className="w-4 h-4" />
                                                Create Parent
                                            </>
                                        )}
                                    </button>
                                </>
                            )}
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default ParentModal;