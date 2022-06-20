import 'overlayscrollbars/css/OverlayScrollbars.css';

import React, { forwardRef } from 'react';

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

export const ScrollArea = forwardRef(
  (
    {
      children,

      ...others
    },
    ref,
  ) => {
    // const { classes, cx } = useStyles(
    //   { scrollbarSize, offsetScrollbars, scrollbarHovered },
    //   { name: 'ScrollArea', classNames, styles },
    // );

    return <OverlayScrollbarsComponent {...others}>{children}</OverlayScrollbarsComponent>;
  },
);
