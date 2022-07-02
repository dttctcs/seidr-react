import 'overlayscrollbars/css/OverlayScrollbars.css';

import React, { forwardRef } from 'react';

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

export const ScrollArea = forwardRef(({ children, ...others }, ref) => (
  <OverlayScrollbarsComponent ref={ref} {...others}>
    {children}
  </OverlayScrollbarsComponent>
));

ScrollArea.displayName = 'ScrollArea';
