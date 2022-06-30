import React from 'react';
import applyStyles from './FieldTitle.styles';

import { Box, Indicator, Tooltip } from '@mantine/core';
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
          <Tooltip label="Related Field">
            <Indicator label="rel">
              <Box className={classes.fieldTitleIcon}>
                {selectedColumn ? (
                  state.queryParams.order_direction === 'asc' ? (
                    <ChevronDown size={14} strokeWidth={1.5} />
                  ) : (
                    <ChevronUp size={14} strokeWidth={1.5} />
                  )
                ) : null}
              </Box>
            </Indicator>
          </Tooltip>
        ) : (
          <Box className={classes.fieldTitleIcon}>
            {selectedColumn ? (
              state.queryParams.order_direction === 'asc' ? (
                <ChevronDown size={14} strokeWidth={1.5} />
              ) : (
                <ChevronUp size={14} strokeWidth={1.5} />
              )
            ) : null}
          </Box>
        )}
      </Box>
    </th>
  );
}
