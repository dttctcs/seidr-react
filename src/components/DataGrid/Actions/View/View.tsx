import React, { useEffect, useState } from 'react';
import { useSeidrApi } from '../../../SeidrProvider';

import { ActionIcon, Tooltip } from '@mantine/core';
import { ViewDialog } from './ViewDialog';
import { Eye } from 'tabler-icons-react';

export function View({ id, path, relations, selected, ViewComponent }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [entry, setEntry] = useState(null);
  const { fetchEntry } = useSeidrApi();

  return (
    <>
      <Tooltip label="Details">
        <ActionIcon
          sx={(theme) => ({
            '&:hover': {
              backgroundColor: selected ? theme.fn.rgba(theme.colors.gray[0], 0.45) : undefined,
            },
          })}
          size="sm"
          onClick={() => {
            const entryPromise = fetchEntry(path, id);

            entryPromise.then((data) => {
              setEntry(data);
              setDialogOpen(true);
            });
          }}
        >
          <Eye color={selected ? 'white' : undefined} />
        </ActionIcon>
      </Tooltip>

      {ViewComponent ? (
        <ViewComponent opened={dialogOpen} onClose={() => setDialogOpen(false)} id={id} relations={relations} />
      ) : (
        <ViewDialog opened={dialogOpen} onClose={() => setDialogOpen(false)} entry={entry} relations={relations} />
      )}
    </>
  );
}
