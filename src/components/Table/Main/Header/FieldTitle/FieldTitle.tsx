import React from 'react';
import { useTable } from '../../../../TableProvider';
import applyStyles from './FieldTitle.styles';

import { Box, Indicator, Tooltip } from '@mantine/core';
import { ChevronDown, ChevronUp } from 'tabler-icons-react';

interface FiledTitleProps {
  column: string;
  label?: string;

  selectable?: boolean;
  related?: boolean;
  rtl?: boolean;

  classNames?: string[];
  styles?: any;
}

export function FieldTitle({
  column,
  label,

  selectable,
  related,
  rtl,

  classNames,
  styles,
}: FiledTitleProps) {
  const { queryParams, setQueryParams } = useTable();

  const selectedColumn = queryParams.order_column === column;

  const { classes } = applyStyles({ selectedColumn, selectable, rtl }, { classNames, styles, name: 'Table' });

  return (
    <th
      className={classes.fieldTitleRoot}
      onClick={
        selectable
          ? () =>
              setQueryParams({
                order_column: column,
                order_direction: queryParams.order_direction === 'asc' ? 'desc' : 'asc',
              })
          : null
      }
    >
      <Box className={classes.fieldTitleWrapper}>
        <Box className={classes.fieldTitleName}>{label || column}</Box>
        {related ? (
          <Tooltip label="Related Field">
            <Indicator label="rel">
              <Box className={classes.fieldTitleIcon}>
                {selectedColumn ? (
                  queryParams.order_direction === 'asc' ? (
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
              queryParams.order_direction === 'asc' ? (
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
