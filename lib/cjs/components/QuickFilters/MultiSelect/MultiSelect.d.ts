/// <reference types="react" />
import { CheckboxGroupProps } from '@mantine/core';
interface MultiSelectProps extends Omit<CheckboxGroupProps, 'value' | 'children' | 'defaultValue' | 'onChange'> {
    name: string;
}
export declare function MultiSelect({ name, ...props }: MultiSelectProps): JSX.Element | null;
export {};
