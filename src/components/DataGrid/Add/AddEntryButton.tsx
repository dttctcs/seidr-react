import React, { useState } from 'react';

import { IconButton, Tooltip } from '@mui/material';
import AddEntry from './AddEntry';
import { Add } from '@mui/icons-material';

function AddEntryButton({ onAddEntry, AddEntryComponent, ...props }) {
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);

  return (
    <>
      <Tooltip title="Add Item">
        <IconButton
          onClick={() => {
            setAddItemDialogOpen(true);
          }}
        >
          <Add />
        </IconButton>
      </Tooltip>
      {AddEntryComponent ? (
        <AddEntryComponent
          open={addItemDialogOpen}
          onClose={() => {
            setAddItemDialogOpen(false);
          }}
          columns={props.columns.reduce((previous, current) => ({ ...previous, [current.name]: current }), {})}
          onAddEntry={onAddEntry}
        />
      ) : (
        <AddEntry
          open={addItemDialogOpen}
          onClose={() => {
            setAddItemDialogOpen(false);
          }}
          onAddEntry={onAddEntry}
          {...props}
        />
      )}
    </>
  );
}

export default AddEntryButton;
