import React, { useState } from 'react';
import { useApi } from '../../../SeidrApiProvider';

import { ActionIcon, Tooltip } from '@mantine/core';
import { ViewDialog } from './ViewDialog';
import { Eye } from 'tabler-icons-react';

interface ViewProps {
  id: number;
}

export function View({ id }: ViewProps) {
  const { info, getEntry } = useApi();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Tooltip label="Details">
        <ActionIcon
          size="sm"
          onClick={async () => {
            setLoading(true);
            const entry = await getEntry(id);

            if (entry) {
              setItem(entry);
              setLoading(false);
              setDialogOpen(true);
            }
          }}
        >
          <Eye />
        </ActionIcon>
      </Tooltip>

      <ViewDialog item={item} info={info} loading={loading} opened={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
