import type { SeidrTheme } from '../theme';

import { useSeidrTheme, useSeidrStyles } from '../components/SeidrProvider';
import { mergeClassNames, fromEntries } from './utils';
import { css } from '@stitches/react';

export interface UseStylesOptions<Key extends string> {
  classNames?: Partial<Record<Key, string>>;
  styles?: Partial<Record<Key, CSSObject>> | ((theme: SeidrTheme) => Partial<Record<Key, CSSObject>>);
  name: string;
}
export function createStyles(
  styles: ((theme: SeidrTheme, params: Params) => Record<Key, CSSObject>) | Record<Key, CSSObject>,
) {
  const applyStyles = (params, options) => {
    // get theme
    const theme = useSeidrTheme();
    // base cssObject
    const getStyles = typeof styles === 'function' ? styles : () => styles;
    const cssObject = getStyles(theme, params);
    // base stylesAPI (cssObject via props)
    const _styles = typeof options?.styles === 'function' ? options?.styles(theme) : options?.styles || {};
    // theme stylesAPI (cssObject via theme) and themeClassNames
    const { styles: themeStyles, classNames: themeClassNames } = useSeidrStyles(options?.name);
    const _themeStyles = typeof themeStyles === 'function' ? themeStyles(theme, params || {}) : themeStyles || {};

    // combine (base cssObject, base StylesAPI,stylesAPI,  themeClassNames, classNames)
    const objectStyleClasses = fromEntries(
      Object.keys(cssObject).map((key) => {
        const mergedStyles = css(cssObject[key], _themeStyles[key], _styles[key])().className;
        return [key, mergedStyles];
      }),
    ) as Record<Key, string>;

    const { classes, clsx } = mergeClassNames(objectStyleClasses, themeClassNames, options?.classNames, options?.name);
    return { classes, clsx, theme };
  };
  return applyStyles;
}
