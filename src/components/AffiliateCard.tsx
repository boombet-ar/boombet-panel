import React from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Switch,
  IconButton,
  Chip,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { IAfiliador } from '../types';
import AffiliateCard from './AffiliateCard';

interface Props {
  afiliadores: IAfiliador[];
  onToggleActivo: (id: number, nuevoEstado: boolean) => void;
  onDelete: (id: number) => void;
}

const AffiliatesTable: React.FC<Props> = ({
  afiliadores,
  onToggleActivo,
  onDelete,
}) => {
  const theme = useTheme();
  // 'md' es el breakpoint de MUI para 900px.
  // Coincide bien con tu media query de 768px.
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (afiliadores.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="textSecondary">
          No se encontraron afiliadores.
        </Typography>
      </Paper>
    );
  }

  // --- Vista Móvil ---
  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {afiliadores.map((afiliador) => (
          <AffiliateCard
            key={afiliador.id}
            afiliador={afiliador}
            onToggleActivo={onToggleActivo}
            onDelete={onDelete}
          />
        ))}
      </Box>
    );
  }

  // --- Vista Escritorio ---
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre Completo</TableCell>
            <TableCell>Token</TableCell>
            <TableCell>Afiliaciones</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>DNI</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Activo (Puede Afiliar)</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {afiliadores.map((af) => (
            <TableRow
              key={af.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{af.id}</TableCell>
              <TableCell>{af.nombre_completo || 'N/A'}</TableCell>
              <TableCell>
                <Chip
                  label={af.token_afiliador || 'N/A'}
                  size="small"
                  sx={{ fontFamily: 'monospace' }}
                />
              </TableCell>
              <TableCell>{af.afiliaciones || 0}</TableCell>
              <TableCell>{af.email || 'N/A'}</TableCell>
              <TableCell>{af.dni || 'N/A'}</TableCell>
              <TableCell>{af.telefono || 'N/A'}</TableCell>
              <TableCell>
                <Switch
                  checked={af.activo || false}
                  onChange={(e) => onToggleActivo(af.id, e.target.checked)}
                  color="secondary"
                />
              </TableCell>
              <TableCell align="right">
                <IconButton
                  color="error"
                  aria-label="delete"
                  onClick={() => onDelete(af.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AffiliatesTable;