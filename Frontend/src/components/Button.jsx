import React from "react";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md 
                  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 
                  focus:ring-opacity-75 transition-all duration-200 ease-in-out ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
