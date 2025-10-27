import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'info';
  size?: 'normal' | 'small';
  fullWidth?: boolean;
  children: ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  size = 'normal',
  fullWidth = false,
  className = '',
  children, 
  ...props 
}: ButtonProps) => {
  const classes = [
    styles.button,
    styles[variant],
    size === 'small' ? styles.small : '',
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

