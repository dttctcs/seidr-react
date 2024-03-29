import { useEffect, useState } from 'react';
import { useApi } from '../../SeidrApiProvider';

import { MultiSelect as MantineMultiSelect, MultiSelectProps as MantineMultiSelectProps } from '@mantine/core';

export function MultiSelect({ name, ...props }) {
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
    // assume that the "in" Filter is the same for every Filter component, use it
    if (queryParams) {
      const activeFilter = queryParams?.filters?.find(
        (filter) => filter.col === quickFilter.column && filter.opr === 'in',
      );
      setActivefilter(activeFilter);
    }
  }, [queryParams]);

  return quickFilter ? (
    <MantineMultiSelect
      value={activeFilter && typeof activeFilter.value === 'string' ? JSON.parse(activeFilter.value) : []}
      label={quickFilter.label}
      onChange={(values) => {
        // since we are assuming that the "in" Filter is the same for every Filter component
        // we create, if it doesn't exist, update else
        const newFilters = queryParams.filters?.filter((filter) => filter !== activeFilter);
        setQueryParams({
          ...queryParams,
          filters: [...newFilters, { col: quickFilter.column, opr: 'in', value: JSON.stringify(values) }],
        });
      }}
      {...props}
      data={quickFilter.options}
    />
  ) : null;
}
