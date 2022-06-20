import React from 'react';

import { Box, Chip, Stack, Tooltip } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

export function HeaderCell({ column, onSortBy, state }) {
  const selectedColumn = state.queryParams.order_column === column;
  const selectable = state.data.order_columns.includes(column);

  return (
    <Stack
      direction={state.settings.rtl ? 'row-reverse' : 'row'}
      sx={{
        cursor: selectable ? 'pointer' : 'default',
        color: selectedColumn ? 'secondary.main' : null,
        '&:hover': {
          color: selectable ? (selectedColumn ? 'secondary.dark' : 'grey.500') : null,
        },
      }}
      onClick={selectable ? () => onSortBy(column) : null}
    >
      <Box>{state.data.label_columns[column]}</Box>
      {state.info.filters[column]?.schema.type === 'Nested' ? (
        <Box sx={{ position: 'relative', width: (theme) => theme.spacing(5) }}>
          <Tooltip title={'Related Field'}>
            <Chip
              sx={{
                position: 'absolute',
                left: state.settings.rtl ? -1 : 2,
                top: -2,
                height: (theme) => theme.spacing(2),

                color: 'common.white',
                bgcolor: 'secondary.main',
              }}
              label="rel"
              color="primary"
            />
          </Tooltip>
        </Box>
      ) : null}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {selectedColumn ? (
          state.queryParams.order_direction === 'asc' ? (
            <ArrowDropDown sx={{ alignSelf: 'center', color: 'inherit' }} fontSize="small" />
          ) : (
            <ArrowDropUp sx={{ alignSelf: 'center' }} fontSize="small" />
          )
        ) : null}
      </Box>
    </Stack>
  );
}
