import React from 'react';
import applyStyles from './FieldTitle.styles';

import { Box, Indicator, Tooltip } from '@mantine/core';
import { ChevronDown, ChevronUp } from 'tabler-icons-react';

export function FieldTitle({
  column,
  label,
  order,
  selectable,
  related,
  rtl,
  onSortBy,
  className,
  classNames,
  styles,
  ...props
}) {
  const selectedColumn = order.column === column;

  const { classes } = applyStyles({ selectedColumn, selectable, rtl }, { classNames, styles, name: 'DataGrid' });

  return (
    <th className={classes.fieldTitleRoot} onClick={selectable ? () => onSortBy(column) : null}>
      <Box className={classes.fieldTitleWrapper}>
        <Box className={classes.fieldTitleName}>{label || column}</Box>
        {related ? (
          <Tooltip label="Related Field">
            <Indicator label="rel">
              <Box className={classes.fieldTitleIcon}>
                {selectedColumn ? (
                  order.direction === 'asc' ? (
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
              order.direction === 'asc' ? (
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
