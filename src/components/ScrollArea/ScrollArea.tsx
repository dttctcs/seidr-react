import "overlayscrollbars/css/OverlayScrollbars.css";

import { forwardRef } from "react";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export const ScrollArea = forwardRef(
  ({
    children,

    ...others
  }) => {
    // const { classes, cx } = useStyles(
    //   { scrollbarSize, offsetScrollbars, scrollbarHovered },
    //   { name: 'ScrollArea', classNames, styles },
    // );

    return <OverlayScrollbarsComponent {...others}>{children}</OverlayScrollbarsComponent>;
  }
);
