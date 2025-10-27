import type { InputHTMLAttributes, ChangeEvent } from 'react';
import styles from './Input.module.scss';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  isValid?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ 
  label,
  error,
  isValid,
  className = '',
  ...props 
}: InputProps) => {
  const inputClasses = [
    styles.input,
    isValid ? styles.valid : '',
    error ? styles.invalid : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input className={inputClasses} {...props} />
        {isValid && (
          <span className={styles.validIcon}>✓</span>
        )}
      </div>
      {error && (
        <div className={styles.errorMessage}>{error}</div>
      )}
    </div>
  );
};

