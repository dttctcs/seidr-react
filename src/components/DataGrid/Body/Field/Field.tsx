import React from 'react';
import isHtml from 'is-html';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import { Skeleton } from '@mantine/core';
import applyStyles from './Field.style';

export function Field({ children, loading, dense, rightBorder, rtl, classNames, styles, ...props }) {
  const { classes, cx, theme } = applyStyles({ loading, rightBorder, rtl }, { classNames, styles, name: 'DataGrid' });

  let clean;
  if (typeof children === 'string' && isHtml(children)) {
    clean = parse(DOMPurify.sanitize(children));
  }

  return (
    <td className={cx(classes.field, rightBorder ? classes.borderRight : null)} {...props}>
      <Skeleton visible={loading}>{clean ? clean : children}</Skeleton>
    </td>
  );
}
