import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className={`inline-flex items-center space-x-3 w-full ${className}`}>
        <div className="relative flex-shrink-0">
          <input
            type="checkbox"
            ref={ref}
            className="sr-only peer"
            {...props}
          />
          <div className="w-6 h-6 bg-gray-200 rounded-lg border border-gray-300 peer-checked:bg-gradient-to-br peer-checked:from-blue-500 peer-checked:to-purple-600 transition-colors duration-300 ease-in-out flex items-center justify-center cursor-pointer">
            <Check className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-lg opacity-0 peer-checked:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        {label && <span className="text-gray-300 truncate flex-grow">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };