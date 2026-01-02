const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-blue-600 hover:bg-blue-700 
               text-white px-5 py-2 rounded 
               font-medium transition"
  >
    {children}
  </button>
);

export default Button;
