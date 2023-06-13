/// <reference types="react" />
import { MultiSelectProps as MantineMultiSelectProps } from '@mantine/core';
interface MultiSelectProps extends Omit<MantineMultiSelectProps, 'value' | 'children' | 'defaultValue' | 'onChange'> {
    name: string;
}
export declare function MultiSelect({ name, ...props }: MultiSelectProps): JSX.Element | null;
export {};
