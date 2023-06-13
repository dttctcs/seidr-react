import { useEffect, useMemo, useState, memo} from 'react';
import { useApi } from '../../SeidrApiProvider';

import { TablePagination, debounce } from '@mui/material';
import { Box, ActionIcon, Group } from '@mantine/core';

import { IconArrowBarToLeft, IconArrowBarToRight, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

function DataGridPaginationActions(props) {
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
    <Group ml='sm' noWrap>
      <ActionIcon onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label='first page'>
        <IconArrowBarToLeft />
      </ActionIcon>
      <ActionIcon onClick={handleBackButtonClick} disabled={page === 0} aria-label='previous page'>
        <IconChevronLeft />
      </ActionIcon>
      <ActionIcon
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        <IconChevronRight />
      </ActionIcon>
      <ActionIcon
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        <IconArrowBarToRight />
      </ActionIcon>
    </Group>
  );
}

export const Pagination = memo(({ ...props }) => {
  const { data, queryParams, setQueryParams } = useApi();

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
        height: 54,
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
        component='div'
        count={data.count}
        rowsPerPage={rowsPerPage}
        page={cachedPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        ActionsComponent={DataGridPaginationActions}
        {...props}
      />
    </Box>
  );
});

Pagination.displayName = 'Pagination';
