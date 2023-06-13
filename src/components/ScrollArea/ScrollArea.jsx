//import 'overlayscrollbars/styles/overlayscrollbars.css';

import React, { forwardRef } from 'react';

import { OverlayScrollbarsComponent, OverlayScrollbarsComponentProps } from 'overlayscrollbars-react';

export const ScrollArea = forwardRef(
  ({ children, options, ...others }, ref) => (
    <OverlayScrollbarsComponent ref={ref} options={options} {...others}>
      {children}
    </OverlayScrollbarsComponent>
  ),
);

ScrollArea.displayName = 'ScrollArea';
