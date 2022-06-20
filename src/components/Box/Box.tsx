import React, { forwardRef } from 'react';

type BoxComponent = (<C = 'div'>(props) => React.ReactElement) & {
  displayName?: string;
};

export const Box: BoxComponent = forwardRef(
  ({ className, component, style, ...others }: BoxProps<'div'>, ref: PolymorphicRef<'div'>) => {
    const Element = component || 'div';
    return <Element ref={ref} className={className} style={style} {...rest} />;
  },
) as any;
