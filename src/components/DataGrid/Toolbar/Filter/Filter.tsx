import React, { useState } from 'react';

import { ActionIcon, Indicator, Popover, Tooltip } from '@mantine/core';
import FilterMenu from './FilterMenu';
import { Filter as FilterIcon } from 'tabler-icons-react';

export function Filter({ filters, activeFilters, onFiltersChange }) {
  const [opened, setOpened] = useState(false);

  return (
    <Popover
      opened={opened}
      position="bottom"
      placement="end"
      target={
        <Tooltip opened={opened ? false : null} label="Filter">
          <ActionIcon onClick={() => setOpened(true)}>
            {activeFilters.length ? (
              <Indicator styles={(theme) => ({ indicator: { padding: '3px' } })} label={activeFilters.length}>
                <FilterIcon />
              </Indicator>
            ) : (
              <FilterIcon />
            )}
          </ActionIcon>
        </Tooltip>
      }
      onClose={() => setOpened(false)}
      closeOnClickOutside={false}
      withCloseButton
    >
      <FilterMenu
        filters={filters}
        activeFilters={activeFilters}
        onFiltersChange={onFiltersChange}
        onClose={() => {
          setOpened(false);
        }}
      />
    </Popover>
  );
}
