const Input = ({ label, ...props }) => (
  <div className="space-y-1">
    {label && <label className="text-sm font-medium">{label}</label>}
    <input
      {...props}
      className="w-full p-2 rounded border 
      bg-gray-50 dark:bg-gray-800
      border-gray-300 dark:border-gray-700
      focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default Input;
