import React, { useState } from 'react';

import { IconButton, Tooltip } from '@mui/material';
import { AlertDialog } from '../../AlertDialog';
import { Delete } from '@mui/icons-material';

function DeleteEntry({ id, onDeleteEntry, selected }) {
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const handleReject = () => {
    setAlertDialogOpen(false);
  };

  const handleAccept = async () => {
    await onDeleteEntry(id);
    setAlertDialogOpen(false);
  };

  return (
    <>
      <Tooltip title="Delete Item">
        <IconButton
          size="small"
          onClick={() => {
            setAlertDialogOpen(true);
          }}
        >
          <Delete sx={{ color: selected ? '#fff' : null }} fontSize="small" />
        </IconButton>
      </Tooltip>
      <AlertDialog
        open={alertDialogOpen}
        onClose={handleReject}
        handleAccept={handleAccept}
        handleReject={handleReject}
      />
    </>
  );
}

export default DeleteEntry;
