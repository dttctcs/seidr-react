import React, { useState } from 'react';

import { IconButton, Tooltip } from '@mui/material';
import ViewEntry from './ViewEntry';
import { VisibilityOutlined } from '@mui/icons-material';

function ViewEntryButton({ id, relations, onViewEntry, ViewEntryComponent, selected }) {
  const [viewItemDialogOpen, setViewItemDialogOpen] = useState(false);

  return (
    <>
      <Tooltip title="Details">
        <IconButton
          size="small"
          onClick={() => {
            setViewItemDialogOpen(true);
          }}
        >
          <VisibilityOutlined sx={{ color: selected ? '#fff' : null }} fontSize="small" />
        </IconButton>
      </Tooltip>

      {viewItemDialogOpen ? (
        ViewEntryComponent ? (
          <ViewEntryComponent
            open={viewItemDialogOpen}
            onClose={() => {
              setViewItemDialogOpen(false);
            }}
            id={id}
            relations={relations}
            onViewEntry={onViewEntry}
          />
        ) : (
          <ViewEntry
            open={viewItemDialogOpen}
            onClose={() => {
              setViewItemDialogOpen(false);
            }}
            id={id}
            relations={relations}
            onViewEntry={onViewEntry}
          />
        )
      ) : null}
    </>
  );
}

export default ViewEntryButton;
