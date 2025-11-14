import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, CircularProgress, Alert, Paper } from '@mui/material';
import { Refresh as RefreshIcon, Add as AddIcon } from '@mui/icons-material';
import {
  apiGetAfiliadores,
  apiUpdateAfiliadorStatus,
  apiDeleteAfiliador,
} from '../api/services';
import { IAfiliador } from '../types';
import AffiliatesTable from '../components/AffiliatesTable';
import NewAffiliateModal from '../components/NewAffiliateModal';
import { useAuth } from '../hooks/useAuth';

const PanelPage: React.FC = () => {
  const [afiliadores, setAfiliadores] = useState<IAfiliador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useAuth();

  const cargarAfiliadores = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetAfiliadores();
      setAfiliadores(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        if (err.message.includes('No autorizado')) {
          // Si el token expiró (o es 401), deslogueamos
          setTimeout(() => logout(), 3000);
        }
      } else {
        setError('Un error desconocido ocurrió');
      }
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    cargarAfiliadores();
  }, [cargarAfiliadores]);

  const handleToggleActivo = async (id: number, nuevoEstado: boolean) => {
    try {
      // Actualización optimista (opcional pero mejora la UX)
      setAfiliadores((prev) =>
        prev.map((af) =>
          af.id === id ? { ...af, activo: nuevoEstado } : af
        )
      );
      await apiUpdateAfiliadorStatus(id);
      // Si falla, el 'catch' de abajo debería revertir o mostrar error
    } catch (error) {
      console.error('Error al actualizar:', error);
      setError('Error al actualizar el estado. Intente de nuevo.');
      // Revertir el estado si falla
      setAfiliadores((prev) =>
        prev.map((af) =>
          af.id === id ? { ...af, activo: !nuevoEstado } : af
        )
      );
    }
  };

  const handleDelete = async (id: number) => {
    if (
      !window.confirm(
        `¿Estás seguro de que quieres eliminar al afiliador ID ${id}?`
      )
    ) {
      return;
    }

    try {
      await apiDeleteAfiliador(id);
      // Si tiene éxito, filtramos el afiliador de la lista
      setAfiliadores((prev) => prev.filter((af) => af.id !== id));
    } catch (error) {
      console.error('Error al eliminar:', error);
      setError('Error al eliminar el afiliador. Intente de nuevo.');
    }
  };

  return (
    <>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={cargarAfiliadores}
            disabled={loading}
          >
            Refrescar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => setIsModalOpen(true)}
          >
            Nuevo afiliador
          </Button>
        </Box>
      </Paper>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <AffiliatesTable
          afiliadores={afiliadores}
          onToggleActivo={handleToggleActivo}
          onDelete={handleDelete}
        />
      )}

      <NewAffiliateModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default PanelPage;