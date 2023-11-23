import React, { ReactNode } from 'react';
import isHtml from 'is-html';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import { Skeleton } from '@mantine/core';
import classes from './Field.module.css'

export const Field = React.memo(({ loading, rightBorder, children, ...props }) => {

  let clean;
  if (typeof children === 'string' && isHtml(children)) {
    clean = parse(DOMPurify.sanitize(children));
  }

  return (
    <td 
      className={`${classes.field}`}
      {...props}
    >
        <Skeleton visible={loading}>{clean ? clean : children}</Skeleton>
    </td>
  );
});

Field.displayName = 'Field';
