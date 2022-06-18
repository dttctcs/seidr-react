import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export function AlertDialog({ open, onClose, handleAccept, handleReject }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 1,
          maxWidth: '480px',
          p: 2,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: (theme) => theme.palette.primary.main + 44,
        },
        elevation: 0,
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Item löschen?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Sind Sie Sicher, dass Sie das Item löschen wollen?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={handleReject}>
          Abbrechen
        </Button>
        <Button color="error" onClick={handleAccept} variant="contained">
          Löschen
        </Button>
      </DialogActions>
    </Dialog>
  );
}
