import React, { useEffect, useMemo, useState, memo } from 'react';
import { useApi } from '../../SeidrApiProvider';
import { Box, Pagination as MantinePagination, Select, Text } from '@mantine/core';

export const Pagination = memo(({ ...props }) => {
  const { data, queryParams, setQueryParams } = useApi();
  const pageSizes = [{value:'10', label: '10'}, {value:'25', label: '25'}, {value: '50', label: '50'}];
  const rowsPerPage = String(queryParams.page_size);
  const [cachedPage, setCachedPage] = useState(queryParams.page);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debouncedSetPage = useMemo(
    () =>
      debounce((val) => {
        setQueryParams({ page: val });
      }, 550),
    [setQueryParams],
  );

  useEffect(() => {
    setCachedPage(queryParams.page);
  }, [queryParams.page]);

  const handlePageChange = (newPage) => {
    setCachedPage(newPage - 1);
    debouncedSetPage(newPage - 1);
  };

  const handleRowsPerPageChange = (value) => {
    setQueryParams({ page_size: parseInt(value, 10) });
  }

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 54,
        border: 'none',
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderColor: theme.colors.gray[4],
        padding: theme.spacing.md,
      })}
    >
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm
        })}
        >
          <Text>Rows per page:</Text>
          <Select
            value={rowsPerPage}
            defaultValue={rowsPerPage}
            onChange={(value) => handleRowsPerPageChange(value)}
            data={pageSizes}
            w={80}
          />
      </Box>
      <MantinePagination
        color='gray'
        position='center'
        total={Math.ceil(data.count / rowsPerPage)}
        value={cachedPage + 1}
        onChange={handlePageChange}
        {...props}
      />
    </Box>
  );
});

Pagination.displayName = 'Pagination';
