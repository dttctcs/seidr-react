import React, { useEffect, useMemo, useState, memo } from 'react';
import { useApi } from '../../SeidrApiProvider';
import { Box, Pagination as MantinePagination, Select, Text } from '@mantine/core';
import { controller } from '../../SeidrApiProvider/utils/api/getList';

export const Pagination = memo(({ ...props }) => {
  const { data, queryParams, setQueryParams } = useApi();
  const pageSizes = [{value:'10', label: '10'}, {value:'25', label: '25'}, {value: '50', label: '50'}];
  const rowsPerPage = String(queryParams.page_size);
  const [cachedPage, setCachedPage] = useState(queryParams.page);

  useEffect(() => {
    setCachedPage(queryParams.page);
  }, [queryParams.page]);

  const handlePageChange = (newPage) => {
    if(controller) controller.abort();    
    setCachedPage(newPage - 1);
    setQueryParams({ page: newPage - 1 });
  };

  const handleRowsPerPageChange = (value) => {
    if(controller) controller.abort();
    setQueryParams({ page_size: parseInt(value, 10), page: 0 });
  }
  
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 54,
        border: 'none',
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderColor: 'var(--mantine-color-gray-4)',
        padding: 'var(--mantine-spacing-md)',
      }}
    >
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--mantine-spacing-sm)'
        }}
        >
          <Text>Rows per page:</Text>
          <Select
            value={rowsPerPage}
            defaultValue={rowsPerPage}
            onChange={(value) => handleRowsPerPageChange(value)}
            data={pageSizes}
            w={80}
            styles={() => ({
              input: {
                fontSize: '14px',
                fontWeight: '250',
                lineHeight: '52px',
                border: '1px solid #E6E8ED',
              },
              item: {
                '&[data-selected]': {
                  '&, &:hover': {
                    backgroundColor: '#E6E8ED',
                    color: 'black',
                    border: '1px solid #E6E8ED',
                    outline: 'none !important'
                  },
                },
              },
            })}
          />
      </Box>
      <MantinePagination
        color='rgb(143,143,143)'
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
