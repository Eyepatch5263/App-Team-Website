import React from 'react';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const GlowButton: React.FC<GlowButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = `
    px-6 py-3 rounded-lg font-inter font-medium text-sm
    transition-all duration-300 ease-out
    transform hover:scale-105 active:scale-95
    border disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const variantClasses = {
    primary: `
      bg-accent-primary text-white border-accent-primary
      hover:bg-accent-primary/90 hover:shadow-lg hover:shadow-accent-primary/30
      active:bg-accent-primary/80 disabled:hover:bg-accent-primary
      focus:ring-accent-primary/50 focus:ring-offset-primary-dark
    `,
    secondary: `
      bg-transparent text-accent-primary border-accent-primary
      hover:bg-accent-primary/10 hover:shadow-lg hover:shadow-accent-primary/20
      active:bg-accent-primary/5 disabled:hover:bg-transparent
      focus:ring-accent-primary/50 focus:ring-offset-primary-dark
    `
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default GlowButton;