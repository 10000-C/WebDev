import React from 'react';

const Button = ({ 
  children,
  variant = 'primary', 
  size = 'md',
  isFullWidth = false,
  onClick 
}) => {
  // 基础样式类 - 完全使用 Tailwind 类
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 transform hover:scale-105 active:scale-95";
  
  // 变体样式
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50",
    outline: "border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-30",
    text: "text-blue-600 hover:text-blue-800 hover:no-underline"
  }[variant];
  
  // 尺寸样式
  const sizeClasses = {
    sm: "text-sm py-1.5 px-3 rounded-md",
    md: "text-base py-2 px-4 rounded-md",
    lg: "text-lg py-2.5 px-5 rounded-md",
  }[size];
  
  // 宽度控制
  const widthClass = isFullWidth ? "w-full" : "";
  
  // 组合所有类
  const buttonClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass}`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;