import React, { useState } from 'react';
import { useApi } from '../../../SeidrApiProvider';

import { ActionIcon, Tooltip } from '@mantine/core';
import { EditDialog } from './EditDialog';
import { Pencil } from 'tabler-icons-react';

interface EditProps {
  id: number;
}

export function Edit({ id }: EditProps) {
  const { info, getEntry } = useApi();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Tooltip label="Edit">
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
          <Pencil />
        </ActionIcon>
      </Tooltip>

      <EditDialog item={item} info={info} opened={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
