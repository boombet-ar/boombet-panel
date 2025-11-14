import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { N8N_FORM_URL } from '../constants';

interface Props {
  open: boolean;
  onClose: () => void;
}

const NewAffiliateModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          height: '90vh', // 90% de la altura de la ventana
          maxHeight: '800px',
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Crear Nuevo Afiliador
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
        <Box
          component="iframe"
          id="n8n-form-iframe"
          src={open ? N8N_FORM_URL : ''} // Solo carga la URL si el modal está abierto
          title="Crear Nuevo Afiliador"
          frameBorder="0"
          sx={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewAffiliateModal;