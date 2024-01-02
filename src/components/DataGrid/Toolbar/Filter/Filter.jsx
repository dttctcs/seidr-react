import { useState } from 'react';
import { useApi } from '../../../SeidrApiProvider';

import { ActionIcon, Box, CloseButton, Indicator, Popover, Tooltip } from '@mantine/core';
import { FilterMenu } from './FilterMenu';
import { IconFilter } from '@tabler/icons-react';
import classes from '../../DataGrid.module.css'


export function Filter() {
  const { queryParams } = useApi();

  const [opened, setOpened] = useState(false);


  return (
    <Popover
      opened={opened}
      position='bottom-end'
      onClose={() => setOpened(false)}
      closeOnClickOutside={false}
      zIndex={1}
    >
      <Popover.Target>
        <Tooltip opened={opened ? false : null} label='Filter'>
          <ActionIcon className={classes.icon} onClick={() => setOpened(true)}>
            {queryParams.filters.length ? (
              <Indicator zIndex={1} size={16} label={queryParams.filters.length}>
                <IconFilter />
              </Indicator>
            ) : (
              <IconFilter />
            )}
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown>
        <Box style={{ position: 'absolute', top: 4, right: 4 }}>
          <CloseButton title='Filters' onClick={() => setOpened(false)} />
        </Box>
        <FilterMenu
          onClose={() => {
            setOpened(false);
          }}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
