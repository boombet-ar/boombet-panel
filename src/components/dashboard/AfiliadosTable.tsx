import React from 'react';
import type { Afiliador } from '../../types';
import ToggleSwitch from '../ui/ToggleSwitch';

interface AfiliadosTableProps {
  afiliados: Afiliador[];
  onToggle: (id: string | number) => void;
  onDelete: (id: string | number) => void;
  updatingId: string | number | null;
}

const AfiliadosTable: React.FC<AfiliadosTableProps> = ({ afiliados, onToggle, onDelete, updatingId }) => {
  const headers = ['ID', 'Nombre Completo', 'Token', 'Afiliaciones', 'Email', 'DNI', 'Teléfono', 'Activo', 'Acciones'];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-boombet-dark-700">
        {/* Encabezado de la Tabla */}
        <thead className="bg-boombet-dark-700">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        
        {/* Cuerpo de la Tabla */}
        <tbody className="bg-boombet-dark-800 divide-y divide-boombet-dark-700">
          {afiliados.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-6 py-12 text-center text-gray-400">
                No se encontraron afiliados.
              </td>
            </tr>
          ) : (
            afiliados.map((af) => (
              <tr key={af.id} className="hover:bg-boombet-dark-700 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">{af.id}</td>
                {/* 👇 Propiedades corregidas aquí 👇 */}
                <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap">{af.nombre_completo}</td>
                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">{af.token_afiliador}</td>
                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">{af.cant_afiliaciones}</td>
                {/* 👆 Propiedades corregidas aquí 👆 */}
                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">{af.email}</td>
                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">{af.dni}</td>
                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">{af.telefono}</td>
                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                  <ToggleSwitch
                    activo={af.activo}
                    onChange={() => onToggle(af.id)}
                    disabled={updatingId === af.id}
                  />
                </td>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                  <button
                    onClick={() => onDelete(af.id)}
                    disabled={updatingId === af.id}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AfiliadosTable;