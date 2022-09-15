import React, { useState } from 'react';
import { useApi } from '../../../SeidrApiProvider';

import { ActionIcon, Tooltip } from '@mantine/core';
import { ViewDialog } from './ViewDialog';
import { Eye } from 'tabler-icons-react';

export function View({ id }) {
  const { info, getEntry } = useApi();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Tooltip label="Details">
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
          <Eye />
        </ActionIcon>
      </Tooltip>

      <ViewDialog item={item} info={info} loading={loading} opened={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
