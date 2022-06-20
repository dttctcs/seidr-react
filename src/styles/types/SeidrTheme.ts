import type { CSSProperties } from 'react';
import type { SeidrSizes, SeidrSize, SeidrNumberSize } from './SeidrSize';
import type { DeepPartial } from './DeepPartial';
import type { SeidrThemeColors } from './SeidrColor';

import type { ColorScheme } from './ColorScheme';
import { CSSObject } from '../../tss';

export type LoaderType = 'bars' | 'oval' | 'dots';
export type SeidrThemeOther = Record<string, any>;

export interface HeadingStyle {
  fontSize: CSSProperties['fontSize'];
  lineHeight: CSSProperties['lineHeight'];
}

type Shade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface SeidrPrimaryShade {
  light: Shade;
  dark: Shade;
}

interface SeidrThemeFunctions {
  fontStyles(): any;
  focusStyles(): any;
  cover(offset?: number | string): any;
  themeColor(color: string, shade: number, primaryFallback?: boolean): string;
  rgba(color: string, alpha: number): string;
  size(props: { size: string | number; sizes: Record<string, any> }): any;
  linearGradient(deg: number, ...colors: string[]): string;
  radialGradient(...colors: string[]): string;
  smallerThan(breakpoint: SeidrNumberSize): string;
  largerThan(breakpoint: SeidrNumberSize): string;
  lighten(color: string, alpha: number): string;
  darken(color: string, alpha: number): string;
  radius(size: SeidrNumberSize | (string & {})): string | number;
  primaryShade(colorScheme?: ColorScheme): Shade;
  hover(hoverStyle: CSSObject): any;
}

export interface SeidrTheme {
  dir: 'ltr' | 'rtl';
  primaryShade: Shade | SeidrPrimaryShade;
  focusRing: 'auto' | 'always' | 'never';
  defaultRadius: SeidrNumberSize | (string & {});
  loader: LoaderType;
  dateFormat: string;
  colorScheme: ColorScheme;
  white: string;
  black: string;
  colors: SeidrThemeColors;
  fontFamily: CSSProperties['fontFamily'];
  lineHeight: CSSProperties['lineHeight'];
  transitionTimingFunction: CSSProperties['transitionTimingFunction'];
  fontFamilyMonospace: CSSProperties['fontFamily'];
  primaryColor: keyof SeidrThemeColors;

  fontSizes: SeidrSizes;
  radius: SeidrSizes;
  spacing: SeidrSizes;
  breakpoints: SeidrSizes;
  shadows: Record<SeidrSize, string>;

  headings: {
    fontFamily: CSSProperties['fontFamily'];
    fontWeight: CSSProperties['fontWeight'];
    sizes: {
      h1: HeadingStyle;
      h2: HeadingStyle;
      h3: HeadingStyle;
      h4: HeadingStyle;
      h5: HeadingStyle;
      h6: HeadingStyle;
    };
  };

  fn: SeidrThemeFunctions;
  other: SeidrThemeOther;

  datesLocale: string;
}

export type SeidrThemeBase = Omit<SeidrTheme, 'fn'>;
export type SeidrThemeOverride = DeepPartial<Omit<SeidrThemeBase, 'fn' | 'other'>> & {
  other?: SeidrThemeOther;
};
