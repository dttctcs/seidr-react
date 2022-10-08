import { ReactNode } from 'react';
import { SeidrAuth, SeidrInfo } from './types';
import { MantineThemeOverride } from '@mantine/core';
export declare function useSeidrAuth(): SeidrAuth;
export declare function useSeidrInfo(): SeidrInfo;
export declare function useSeidrTheme(): import("@mantine/core").MantineTheme;
export interface SeidrProviderProps {
    baseUrl?: string;
    theme?: MantineThemeOverride;
    inheritMantineTheme?: boolean;
    children: ReactNode;
}
export declare function SeidrProvider({ baseUrl, theme, inheritMantineTheme, children }: SeidrProviderProps): JSX.Element;
