import React from 'react';
import { useApi } from '../../../../SeidrApiProvider';
import classes from './FieldTitle.module.css';

import { Box, Indicator, Tooltip } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';


export function FieldTitle({
                             column,
                             label,
                             selecDataGrid,
                             related,
                             classNames,
                             styles,
                           }) {
  const { queryParams, setQueryParams } = useApi();

  const selectedColumn = queryParams.order_column === column;

  return (
    <th
      className={classes.fieldTitleRoot}
      onClick={
        selecDataGrid
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
          <Tooltip label='Related Field'>
            <Indicator
              label='rel'
              style={({ indicator: { top: `-1px !important`, right: `-2px !important`, padding: '4px' } })}
            >
              <Box className={classes.fieldTitleIcon}>
                {selectedColumn ? (
                  queryParams.order_direction === 'asc' ? (
                    <IconChevronDown size={14} strokeWidth={1.5} />
                  ) : (
                    <IconChevronUp size={14} strokeWidth={1.5} />
                  )
                ) : null}
              </Box>
            </Indicator>
          </Tooltip>
        ) : (
          <Box className={classes.fieldTitleIcon}>
            {selectedColumn ? (
              queryParams.order_direction === 'asc' ? (
                <IconChevronDown size={14} strokeWidth={1.5} />
              ) : (
                <IconChevronUp size={14} strokeWidth={1.5} />
              )
            ) : null}
          </Box>
        )}
      </Box>
    </th>
  );
}
