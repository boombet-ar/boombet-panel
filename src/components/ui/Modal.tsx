import React, { Fragment } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" aria-modal="true" role="dialog">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-boombet-dark-800 rounded-lg shadow-xl overflow-hidden flex flex-col">
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between p-4 border-b border-boombet-dark-700">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 rounded-full hover:bg-boombet-dark-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        {/* Contenido del Modal */}
        <div className="flex-grow overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;