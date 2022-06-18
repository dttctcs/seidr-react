import React, { useEffect, useMemo, useState } from 'react';
import { paginationHeight } from './utils';

import { TablePagination, debounce, Box, IconButton } from '@mui/material';
import { alpha, lighten, darken } from '@mui/system';
import { LastPage, FirstPage, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

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
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        <FirstPage />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPage />
      </IconButton>
    </Box>
  );
}

function DataGridPagination({ setLoading, dispatch, count, page, pageSize, rowsPerPageProps, ...props }) {
  const pageSizes = rowsPerPageProps ? rowsPerPageProps.pageSizes : [10, 25, 50];
  const rowsPerPage = rowsPerPageProps ? rowsPerPageProps.pageSizeDefault : pageSize;
  const [cachedPage, setCachedPage] = useState(page);

  const debouncedSetPage = useMemo(
    () =>
      debounce((val) => {
        dispatch({ type: 'setPage', payload: val });
      }, 550),
    [dispatch],
  );

  useEffect(() => {
    setCachedPage(page);
  }, [page]);

  const handlePageChange = (event, newPage) => {
    setLoading(true);
    setCachedPage(newPage);
    debouncedSetPage(newPage);
  };
  const handleRowsPerPageChange = (event) => {
    dispatch({ type: 'setPageSize', payload: parseInt(event.target.value, 10) });
  };

  return (
    <Box
      sx={{
        flex: '0 1 0',
        height: paginationHeight,
        border: 'none',
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderColor: (theme) =>
          theme.palette.mode === 'light'
            ? lighten(alpha(theme.palette.divider, 1), 0.88)
            : darken(alpha(theme.palette.divider, 1), 0.68),
      }}
    >
      <TablePagination
        rowsPerPageOptions={pageSizes}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={cachedPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        ActionsComponent={TablePaginationActions}
        {...props}
      />
    </Box>
  );
}

export default React.memo(DataGridPagination);
