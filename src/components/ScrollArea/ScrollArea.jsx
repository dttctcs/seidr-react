import 'overlayscrollbars/overlayscrollbars.css';

import { forwardRef } from 'react';

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

export const ScrollArea = forwardRef(
  ({ children, options, ...others }, ref) => (
    <OverlayScrollbarsComponent ref={ref} options={options} {...others}>
      {children}
    </OverlayScrollbarsComponent>
  ),
);

ScrollArea.displayName = 'ScrollArea';
