import React, { useState } from 'react';
import { useApi } from '../../../SeidrApiProvider';

import { ActionIcon, Tooltip } from '@mantine/core';
import { EditDialog } from './EditDialog';
import { Pencil } from 'tabler-icons-react';

export function Edit({ id }) {
  const { info, getEntry } = useApi();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Tooltip label="Edit">
        <ActionIcon
          size="sm"
          onClick={() => {
            setLoading(true);
            const entryPromise = getEntry(id);

            entryPromise.then((data) => {
              setItem(data);
              setLoading(false);
              setDialogOpen(true);
            });
          }}
        >
          <Pencil />
        </ActionIcon>
      </Tooltip>

      <EditDialog item={item} info={info} loading={loading} opened={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
