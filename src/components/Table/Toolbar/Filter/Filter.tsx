import React, { useState } from 'react';
import { useTable } from '../../../TableProvider';

import { ActionIcon, Box, CloseButton, Indicator, Popover, Tooltip } from '@mantine/core';
import FilterMenu from './FilterMenu';
import { Filter as FilterIcon } from 'tabler-icons-react';

export function Filter() {
  const { queryParams } = useTable();

  const [opened, setOpened] = useState(false);

  return (
    <Popover
      opened={opened}
      position="bottom-end"
      onClose={() => setOpened(false)}
      // closeOnClickOutside={false}
    >
      <Popover.Target>
        <Tooltip opened={opened ? false : null} label="Filter">
          <ActionIcon onClick={() => setOpened(true)}>
            {queryParams.filters.length ? (
              <Indicator styles={(theme) => ({ indicator: { padding: '3px' } })} label={queryParams.filters.length}>
                <FilterIcon />
              </Indicator>
            ) : (
              <FilterIcon />
            )}
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown>
        <Box sx={{ position: 'absolute', top: 4, right: 4 }}>
          <CloseButton title="Filters" onClick={() => setOpened(false)} />
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
