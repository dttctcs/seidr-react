import React, { useState } from 'react';
import { useApi } from '../../../SeidrApiProvider';

import { ActionIcon, Tooltip } from '@mantine/core';
import { EditDialog } from './EditDialog';
import { IconPencil } from '@tabler/icons-react';
import classes from '../../DataGrid.module.css'


export function Edit({ id }) {
  const { info, getEntry } = useApi();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Tooltip label='Edit'>
        <ActionIcon
          className={classes.icon}
          size='sm'
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
          <IconPencil />
        </ActionIcon>
      </Tooltip>

      <EditDialog item={item} info={info} opened={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
