// import { useState } from "react";
// import { createParent } from "../../api/admin.api";
// import { useThemeStore } from "../../store/themeStore";
// import { FiUser, FiMail, FiPhone, FiLock, FiAlertCircle } from "react-icons/fi";
// import { MdOutlineFamilyRestroom } from "react-icons/md";

// const AddParent = ({ onSuccess, onClose }) => {
//   const [form, setForm] = useState({
//     parent_name: "",
//     email: "",
//     phone_number: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const { theme } = useThemeStore();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!form.parent_name.trim()) {
//       newErrors.parent_name = "Parent name is required";
//     }
    
//     if (!form.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       newErrors.email = "Please enter a valid email";
//     }
    
//     if (!form.password) {
//       newErrors.password = "Password is required";
//     } else if (form.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
    
//     if (form.phone_number && !/^[0-9+\-\s()]{10,}$/.test(form.phone_number)) {
//       newErrors.phone_number = "Please enter a valid phone number";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const submit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);
//     try {
//       await createParent(form);
//       if (onSuccess) onSuccess();
//       alert("Parent added successfully!");
//       setForm({ parent_name: "", email: "", password: "", phone_number: "" });
//       if (onClose) onClose();
//     } catch (err) {
//       console.error(err);
//       let errorMessage = "Failed to add parent";
//       if (err.response?.data?.error?.includes("duplicate")) {
//         errorMessage = "A parent with this email already exists";
//       } else if (err.response?.data?.error) {
//         errorMessage = err.response.data.error;
//       }
//       alert(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const InputField = ({ label, name, type = "text", icon: Icon, placeholder, required = false }) => (
//     <div className="space-y-2">
//       <label className={`block text-sm font-medium ${
//         theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
//       }`}>
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <div className="relative">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <Icon className={`w-5 h-5 ${errors[name] ? 'text-red-500' : theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
//         </div>
//         <input
//           type={type}
//           name={name}
//           value={form[name]}
//           onChange={handleChange}
//           placeholder={placeholder}
//           className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
//             errors[name]
//               ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent'
//               : theme === 'dark'
//                 ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
//                 : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
//           }`}
//           required={required}
//         />
//       </div>
//       {errors[name] && (
//         <div className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
//           <FiAlertCircle className="w-4 h-4" />
//           {errors[name]}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <form id="parent-form" onSubmit={submit} className="space-y-4">
//       <InputField
//         label="Parent Full Name"
//         name="parent_name"
//         icon={FiUser}
//         placeholder="Enter parent's full name"
//         required={true}
//       />
      
//       <InputField
//         label="Email Address"
//         name="email"
//         type="email"
//         icon={FiMail}
//         placeholder="parent@example.com"
//         required={true}
//       />
      
//       <InputField
//         label="Phone Number"
//         name="phone_number"
//         icon={FiPhone}
//         placeholder="+92 300 1234567"
//         required={false}
//       />
      
//       <InputField
//         label="Password"
//         name="password"
//         type="password"
//         icon={FiLock}
//         placeholder="Minimum 6 characters"
//         required={true}
//       />
      
//       {/* Information Box */}
//       <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900/50 border border-gray-700' : 'bg-blue-50 border border-blue-200'}`}>
//         <div className="flex items-start gap-3">
//           <MdOutlineFamilyRestroom className={`w-5 h-5 mt-0.5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
//           <div>
//             <p className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
//               Parent Account Information
//             </p>
//             <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-blue-600'}`}>
//               The parent will receive login credentials to access their dashboard and track student progress.
//             </p>
//           </div>
//         </div>
//       </div>
      
//       {/* Submit Button (Already handled by ParentModal) */}
//     </form>
//   );
// };

// export default AddParent;