import React, { useState } from 'react';
import { useSeidrApi } from '../../SeidrProvider';

import { IconButton, Tooltip } from '@mui/material';
import EditEntry from './EditEntry';
import { Edit } from '@mui/icons-material';

function EditEntryButton({ id, path, onEditEntry, EditEntryComponent, selected, ...props }) {
  const [editItemDialog, setEditItemDialog] = useState(false);
  const [entry, setEntry] = useState(null);
  const { fetchEntry } = useSeidrApi();

  return (
    <>
      <Tooltip title="Edit Item">
        <IconButton
          onClick={() => {
            setEditItemDialog(true);
            const entryPromise = fetchEntry(path, id);

            entryPromise.then((data) => setEntry({ id: data.id, ...data.result }));
          }}
          size="small"
        >
          <Edit sx={{ color: selected ? '#fff' : null }} fontSize="small" />
        </IconButton>
      </Tooltip>
      {EditEntryComponent ? (
        <EditEntryComponent
          open={editItemDialog}
          onClose={() => {
            setEditItemDialog(false);
          }}
          columns={props.columns.reduce((previous, current) => ({ ...previous, [current.name]: current }), {})}
          entry={entry}
          onEditEntry={onEditEntry}
        />
      ) : (
        <EditEntry
          open={editItemDialog}
          onClose={() => {
            setEditItemDialog(false);
          }}
          entry={entry}
          onEditEntry={onEditEntry}
          {...props}
        />
      )}
    </>
  );
}

export default EditEntryButton;
