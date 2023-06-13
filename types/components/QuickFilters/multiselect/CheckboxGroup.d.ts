/// <reference types="react" />
import { CheckboxGroupProps as MantineCheckboxGroupProps } from '@mantine/core';
interface CheckboxGroupProps extends Omit<MantineCheckboxGroupProps, 'value' | 'children' | 'defaultValue' | 'onChange'> {
    name: string;
}
export declare function CheckboxGroup({ name, ...props }: CheckboxGroupProps): JSX.Element | null;
export {};
