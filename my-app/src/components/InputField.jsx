import React from 'react';

const InputField = React.forwardRef(({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
  error = '',
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className='block text-gray-700 mb-2'>
          {label}
          {required && <span className='text-red-500'> *</span>}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500 focus:ring-red-300' : 'border-gray-300'
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
      
      {error && (
        <p className='mt-1 text-sm text-red-500'>{error}</p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;