import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from '../../TableProvider';
import { paginationHeight } from '../utils';

import { TablePagination, debounce } from '@mui/material';
import { Box, ActionIcon, Group } from '@mantine/core';

import { ArrowBarToLeft, ArrowBarToRight, ChevronLeft, ChevronRight } from 'tabler-icons-react';

function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Group ml="sm" noWrap>
      <ActionIcon onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        <ArrowBarToLeft />
      </ActionIcon>
      <ActionIcon onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <ChevronLeft />
      </ActionIcon>
      <ActionIcon
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <ChevronRight />
      </ActionIcon>
      <ActionIcon
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <ArrowBarToRight />
      </ActionIcon>
    </Group>
  );
}

export const Pagination = React.memo(({ ...props }) => {
  const { data, queryParams, setQueryParams } = useTable();

  const pageSizes = [10, 25, 50];
  const rowsPerPage = queryParams.page_size;
  const [cachedPage, setCachedPage] = useState(queryParams.page);

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

  const handlePageChange = (event, newPage) => {
    setCachedPage(newPage);
    debouncedSetPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setQueryParams({ page_size: parseInt(event.target.value, 10) });
  };

  return (
    <Box
      sx={(theme) => ({
        flex: '0 1 0',
        height: paginationHeight,
        border: 'none',
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderColor: theme.colors.gray[4],
      })}
    >
      <TablePagination
        sx={{
          color: 'inherit',
          '& .MuiSvgIcon-root': {
            color: 'inherit',
          },
        }}
        rowsPerPageOptions={pageSizes}
        component="div"
        count={data.count}
        rowsPerPage={rowsPerPage}
        page={cachedPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        ActionsComponent={TablePaginationActions}
        {...props}
      />
    </Box>
  );
});

Pagination.displayName = 'Pagination';
