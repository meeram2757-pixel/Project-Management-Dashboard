import React from 'react';

const baseStyles = 'px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition';

const Button = ({ children, className = '', ...props }) => {
  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
