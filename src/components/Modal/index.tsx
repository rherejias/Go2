import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import React from 'react';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const Modal = ({ title, children, open, onClose }: ModalProps) => {

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xs'}
      open={open}
    >
      <DialogTitle>{title}<IconButton
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
      </IconButton></DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal;