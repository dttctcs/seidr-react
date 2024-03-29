import React, { useState } from 'react';
import { useApi } from '../../../SeidrApiProvider';

import { ActionIcon, Tooltip } from '@mantine/core';
import { ViewDialog } from './ViewDialog';
import { IconEye } from '@tabler/icons-react';
import classes from '../../DataGrid.module.css'


export function View({ id }) {
  const { info, getEntry } = useApi();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Tooltip label='Details'>
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
          <IconEye />
        </ActionIcon>
      </Tooltip>

      <ViewDialog item={item} info={info} loading={loading} opened={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
