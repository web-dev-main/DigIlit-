import { InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, required, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white/80 mb-2">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full px-4 py-3 bg-dark-800 border rounded-lg text-white placeholder:text-white/40',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            error ? 'border-red-500 focus:ring-red-500' : 'border-white/10 hover:border-white/20',
            className
          )}
          required={required}
          {...props}
        />
        {error ? (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        ) : helperText ? (
          <p className="mt-2 text-sm text-white/60">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
