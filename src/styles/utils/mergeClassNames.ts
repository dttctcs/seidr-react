import clsx from 'clsx';

export function mergeClassNames<T extends Record<string, string>>(
  objectStyleClasses: T,
  themeClassNames: Partial<T>,
  classNames: Partial<T>,
  name: string,
) {
  const classes = Object.keys(objectStyleClasses).reduce((acc, className) => {
    acc[className] = clsx(
      objectStyleClasses[className],
      themeClassNames !== null && themeClassNames[className],
      classNames != null && classNames[className],
      name ? `seidr-${name}-${className}` : null,
    );
    return acc;
  }, {});
  return { classes, clsx };
}
