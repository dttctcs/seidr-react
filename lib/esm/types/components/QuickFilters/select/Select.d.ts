/// <reference types="react" />
import { SelectProps as MantineSelectProps } from '@mantine/core';
interface SelectProps extends Omit<MantineSelectProps, 'value' | 'children' | 'defaultValue' | 'onChange'> {
    name: string;
}
export declare function Select({ name, ...props }: SelectProps): JSX.Element | null;
export {};
