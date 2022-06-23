import React from 'react';
import { useSeidrDefaultProps } from '../../../SeidrProvider';
import applyStyles from './FieldTitle.styles';

import { Chip, Stack, Tooltip } from '@mui/material';
import { Box } from '@mantine/core';
import { ChevronDown, ChevronUp } from 'tabler-icons-react';

export function FieldTitle({ className, classNames, styles, column, onSortBy, state, ...props }) {
  const selectedColumn = state.queryParams.order_column === column;
  const selectable = state.data.order_columns.includes(column);

  const { classes, cx, theme } = applyStyles(
    { selectedColumn, selectable, rtl: state.settings.rtl },
    { classNames, styles, name: 'DataGrid' },
  );

  const label = state.data.label_columns[column];
  return (
    <th className={classes.fieldTitleRoot} onClick={selectable ? () => onSortBy(column) : null}>
      <Box className={classes.fieldTitleWrapper}>
        <Box className={classes.fieldTitleName}>{label ? label : column}</Box>
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
        <Box className={classes.fieldTitleIcon}>
          {selectedColumn ? (
            state.queryParams.order_direction === 'asc' ? (
              <ChevronDown size={14} strokeWidth={1.5} />
            ) : (
              <ChevronUp size={14} strokeWidth={1.5} />
            )
          ) : null}
        </Box>
      </Box>
    </th>
  );
}
