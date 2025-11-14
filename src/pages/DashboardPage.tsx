import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { Afiliador } from '../types';
import { getAfiliadores, toggleAfiliadorActivo, deleteAfiliador } from '../services/api';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import AfiliadosTable from '../components/dashboard/AfiliadosTable';
import Modal from '../components/ui/Modal';
import { N8N_FORM_URL } from '../config';

export default function DashboardPage() {
  const { token, logout } = useAuth();
  const [afiliados, setAfiliados] = useState<Afiliador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | number | null>(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    const loadData = async () => {
      if (!token) {
        setError("Token no encontrado, por favor inicia sesión de nuevo.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const data = await getAfiliadores(token);
        setAfiliados(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [token]);

  // Manejador para el Toggle
  const handleToggleActivo = async (id: string | number) => {
    if (!token) return;
    
    setUpdatingId(id);
    try {
      await toggleAfiliadorActivo(id, token);
      // Actualiza el estado local para reflejar el cambio
      setAfiliados(prev =>
        prev.map(af => (af.id === id ? { ...af, activo: !af.activo } : af))
      );
    } catch (err) {
      console.error('Error al cambiar estado:', err);
      // Opcional: revertir el estado o mostrar un error
    } finally {
      setUpdatingId(null);
    }
  };

  // Manejador para Eliminar
  const handleDelete = async (id: string | number) => {
    if (!token) return;
    
    // Confirmación (se puede reemplazar por un modal custom)
    if (!window.confirm('¿Estás seguro de que deseas eliminar este afiliador? Esta acción no se puede deshacer.')) {
      return;
    }
    
    setUpdatingId(id);
    try {
      await deleteAfiliador(id, token);
      // Elimina del estado local
      setAfiliados(prev => prev.filter(af => af.id !== id));
    } catch (err) {
      console.error('Error al eliminar:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-boombet-dark-900 text-gray-200 p-4 md:p-8">
      <DashboardHeader 
        onNewAfiliadoClick={() => setIsModalOpen(true)}
        onLogoutClick={logout}
      />
      
      {/* Contenedor de la Tabla */}
      <div className="w-full p-1 overflow-hidden bg-boombet-dark-800 rounded-lg shadow-xl">
        {loading ? (
          <p className="p-12 text-center text-gray-400">Cargando afiliados...</p>
        ) : error ? (
          <p className="p-12 text-center text-red-400">{error}</p>
        ) : (
          <AfiliadosTable
            afiliados={afiliados}
            onToggle={handleToggleActivo}
            onDelete={handleDelete}
            updatingId={updatingId}
          />
        )}
      </div>
      
      {/* Modal para el formulario n8n */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nuevo Afiliador"
      >
        <iframe
          src={N8N_FORM_URL}
          title="Formulario Nuevo Afiliador n8n"
          className="w-full h-[75vh]" // Ajusta la altura
          frameBorder="0"
        >
          Cargando formulario...
        </iframe>
      </Modal>
    </div>
  );
}