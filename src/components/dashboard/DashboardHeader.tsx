import React from 'react';

interface DashboardHeaderProps {
  onNewAfiliadoClick: () => void;
  onLogoutClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onNewAfiliadoClick, onLogoutClick }) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <h1 className="text-3xl font-bold text-white">
        BoomBet - <span className="text-boombet-green">Panel de Afiliadores</span>
      </h1>
      <div className="flex items-center gap-4">
        <button
          onClick={onLogoutClick}
          className="px-4 py-2 text-sm font-medium text-white bg-boombet-dark-700 rounded-md hover:bg-boombet-dark-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-boombet-dark-900 transition-colors"
        >
          Cerrar Sesión
        </button>
        <button
          onClick={onNewAfiliadoClick}
          className="px-4 py-2 font-medium text-black bg-boombet-green-500 rounded-md hover:bg-boombet-green-600 focus:outline-none focus:ring-2 focus:ring-boombet-green focus:ring-offset-2 focus:ring-offset-boombet-dark-900 transition-colors"
        >
          Nuevo Afiliador
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;