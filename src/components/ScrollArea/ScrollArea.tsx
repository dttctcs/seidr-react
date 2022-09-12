import 'overlayscrollbars/css/OverlayScrollbars.css';

import React, { forwardRef } from 'react';

import { OverlayScrollbarsComponent, OverlayScrollbarsComponentProps } from 'overlayscrollbars-react';

export const ScrollArea = forwardRef<HTMLInputElement, OverlayScrollbarsComponentProps>(
  ({ children, options, ...others }, ref) => (
    <OverlayScrollbarsComponent ref={ref} options={options} {...others}>
      {children}
    </OverlayScrollbarsComponent>
  ),
);

ScrollArea.displayName = 'ScrollArea';
