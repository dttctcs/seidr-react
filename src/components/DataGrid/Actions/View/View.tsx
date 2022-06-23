import React, { useState } from 'react';

import { ActionIcon, Tooltip } from '@mantine/core';
import { ViewDialog } from './ViewDialog';
import { Eye } from 'tabler-icons-react';

export function View({ id, relations, selected, onViewEntry, ViewComponent }) {
  const [dialogOpen, setDialogOpen] = useState(false);

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
            setDialogOpen(true);
          }}
        >
          <Eye color={selected ? 'white' : undefined} />
        </ActionIcon>
      </Tooltip>

      {ViewComponent ? (
        <ViewComponent
          opened={dialogOpen}
          onClose={() => setDialogOpen(false)}
          id={id}
          relations={relations}
          onViewEntry={onViewEntry}
        />
      ) : (
        <ViewDialog
          opened={dialogOpen}
          onClose={() => setDialogOpen(false)}
          id={id}
          relations={relations}
          onViewEntry={onViewEntry}
        />
      )}
    </>
  );
}
