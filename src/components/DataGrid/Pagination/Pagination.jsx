import { useEffect, useMemo, useState, memo } from 'react';
import { useApi } from '../../SeidrApiProvider';

import { Box, Pagination as MantinePagination } from '@mantine/core';

export const Pagination = memo(({ ...props }) => {
  const { data, queryParams, setQueryParams } = useApi();
  const rowsPerPage = queryParams.page_size;
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
    setCachedPage(newPage-1);
    debouncedSetPage(newPage-1);
  };

  return (
    <Box
      sx={(theme) => ({
        flex: '0 1 0',
        height: 54,
        border: 'none',
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderColor: theme.colors.gray[4],
        padding: theme.spacing.md,
      })}
    >
      <MantinePagination
        position='center'
        total={Math.ceil(data.count/rowsPerPage)}
        value={cachedPage + 1}
        onChange={handlePageChange}
        {...props}
      />
    </Box>
  );
});

Pagination.displayName = 'Pagination';
