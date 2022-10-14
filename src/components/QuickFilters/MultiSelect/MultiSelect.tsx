import React, { useEffect, useState } from 'react';
import { useApi } from '../../SeidrApiProvider';

import { Checkbox, CheckboxGroupProps } from '@mantine/core';
import { QuickFilter } from '../types/QuickFilter';
import { Filter } from '../../SeidrApiProvider/types';

interface MultiSelectProps extends Omit<CheckboxGroupProps, 'value' | 'children' | 'defaultValue' | 'onChange'> {
  name: string;
}

export function MultiSelect({ name, ...props }: MultiSelectProps) {
  const { info, queryParams, setQueryParams } = useApi();
  const [quickFilter, setQuickFilter] = useState<QuickFilter>();
  const [activeFilter, setActivefilter] = useState<Filter | undefined>();

  useEffect(() => {
    if (info) {
      const quickfilter = info.quickfilters.find((quickfilter: any) => quickfilter.name === name);
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
    <Checkbox.Group
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
    >
      {quickFilter.options.map((option) => {
        return <Checkbox key={option.value} value={option.value} label={option.label} />;
      })}
    </Checkbox.Group>
  ) : null;
}
