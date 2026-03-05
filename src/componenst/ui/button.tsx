'use client'

import { ButtonHTMLAttributes, FC } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
}

const variants = {
  primary: 'bg-amber-400 hover:bg-amber-500 text-gray-900',
  secondary: 'bg-transparent hover:bg-gray-100 text-gray-700',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
}


export const Button: FC<ButtonProps> = ({ variant = 'primary', className, children, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className ?? ''}`} {...props}>
      {children}
    </button>
  );
}
