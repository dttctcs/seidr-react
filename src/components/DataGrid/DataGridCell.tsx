import React from 'react';
import isHtml from 'is-html';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import { Skeleton, TableCell } from '@mui/material';

function DataGridCell({ children, sx, loading, rtl, rightBorder, ...props }) {
  const rightBorderSX = rightBorder
    ? {
        borderRightWidth: '1px',
        borderRightStyle: 'solid',
        borderRightColor: 'grey.300',
        '&:last-of-type': {
          borderRight: 'none',
        },
      }
    : null;

  let clean;
  if (typeof children === 'string' && isHtml(children)) {
    clean = parse(DOMPurify.sanitize(children));
  }

  return (
    <TableCell
      sx={{
        px: 1,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        ...rightBorderSX,
        ...sx,
      }}
      align={rtl ? 'right' : 'left'}
      {...props}
    >
      {loading ? <Skeleton sx={{ m: 1.25 }} /> : clean ? clean : children}

      {/* {loading ? <Skeleton sx={{ py: 1 }} /> : clean ? clean : children} */}
    </TableCell>
  );
}

export default DataGridCell;
