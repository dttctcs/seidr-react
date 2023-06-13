import React, { useEffect, useState } from 'react';
import { useApi } from '../../SeidrApiProvider';

import { Select as MantineSelect, SelectProps as MantineSelectProps } from '@mantine/core';



export function Select({ name, ...props }) {
  const { info, queryParams, setQueryParams } = useApi();
  const [quickFilter, setQuickFilter] = useState();
  const [activeFilter, setActivefilter] = useState();

  useEffect(() => {
    if (info) {
      const quickfilter = info.quickfilters.find((quickfilter) => quickfilter.name === name);
      setQuickFilter(quickfilter);
    }
  }, [info]);

  useEffect(() => {
    if (queryParams) {
      const activeFilter = queryParams?.filters?.find(
        (filter) => filter.col === quickFilter.column && filter.opr === 'eq',
      );
      setActivefilter(activeFilter);
    }
  }, [queryParams]);

  return quickFilter ? (
    <MantineSelect
      value={activeFilter && typeof activeFilter.value === 'string' ? activeFilter.value : []}
      label={quickFilter.label}
      onChange={(value) => {
        // since we are assuming that the "eq" Filter is the same for every Filter component
        // we create, if it doesn't exist, update else
        const newFilters = queryParams.filters?.filter((filter) => filter !== activeFilter);
        setQueryParams({
          ...queryParams,
          filters: [...newFilters, { col: quickFilter.column, opr: 'eq', value: value }],
        });
      }}
      {...props}
      data={quickFilter.options}
    />
  ) : null;
}
