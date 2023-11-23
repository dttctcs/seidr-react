import { useState } from 'react';

import { ActionIcon, Tooltip } from '@mantine/core';
import { AddDialog } from './AddDialog';
import { IconPlus } from '@tabler/icons-react';
import classes from '../../DataGrid.module.css'

export function Add() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Tooltip label='Add Item'>
        <ActionIcon
        className={classes.icon}
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          <IconPlus />
        </ActionIcon>
      </Tooltip>

      <AddDialog
        opened={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
      />
    </>
  );
}
