import React, { ReactNode } from 'react';
import isHtml from 'is-html';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import { Skeleton } from '@mantine/core';
import applyStyles from './Field.style';

interface FieldProps {
  loading: boolean;
  rightBorder: boolean;
  rtl: boolean;

  children: ReactNode;
}

export const Field = React.memo(({ loading, rightBorder, rtl, children, ...props }: FieldProps) => {
  const { classes, cx, theme } = applyStyles({ rightBorder, rtl }, { name: 'Table' });

  let clean;
  if (typeof children === 'string' && isHtml(children)) {
    clean = parse(DOMPurify.sanitize(children));
  }

  return (
    <td className={cx(classes.field, rightBorder ? classes.borderRight : null)} {...props}>
      <Skeleton visible={loading}>{clean ? clean : children}</Skeleton>
    </td>
  );
});

Field.displayName = 'Field';
