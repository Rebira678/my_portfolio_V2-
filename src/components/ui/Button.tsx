import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'glass';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  download?: string | boolean;
  target?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses = "group inline-flex items-center justify-center font-outfit transition-all duration-300 rounded-full";

  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:scale-105 shadow-[0_0_30px_rgba(99,102,241,0.5)] border border-indigo-400/30",
    outline: "border border-white/20 text-white hover:bg-white/10 hover:border-white font-semibold",
    ghost: "bg-transparent text-white/50 hover:text-white font-medium",
    glass: "liquid-glass hover:bg-white/10 border border-white/20 hover:border-white/40 text-white/60 hover:text-white"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs md:text-sm gap-2",
    md: "px-6 py-3 md:px-10 md:py-4 text-sm md:text-base gap-2 md:gap-3",
    lg: "px-8 py-4 md:px-12 md:py-5 text-base md:text-lg gap-3 md:gap-4",
    icon: "p-4"
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClasses} {...(props as any)}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} className={combinedClasses} {...(props as any)}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
