import React from 'react';

const Button = ({ children, className, onClick, type = 'button', icon }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50";
  
  let variantClasses = "";
  
  if (className === 'primary') {
    variantClasses = "bg-blue-600 text-white hover:bg-blue-700";
  } else if (className === 'secondary') {
    variantClasses = "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50";
  } else if (className === 'icon') {
    variantClasses = "p-2 rounded-full hover:bg-gray-100";
  } else {
    variantClasses = className || "";
  }
  
  return (
    <button 
      type={type} 
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;