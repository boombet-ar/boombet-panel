import React from 'react';

interface ToggleProps {
  activo: boolean;
  onChange: () => void;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleProps> = ({ activo, onChange, disabled }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={activo}
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex items-center h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-boombet-green focus:ring-offset-2 focus:ring-offset-boombet-dark-900 ${
        activo ? 'bg-boombet-green-500' : 'bg-boombet-dark-700'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          activo ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;