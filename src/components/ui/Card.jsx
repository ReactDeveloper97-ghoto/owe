const Card = ({ title, children }) => (
  <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 
                  p-6 rounded-xl shadow">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

export default Card;
