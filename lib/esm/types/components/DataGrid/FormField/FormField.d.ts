/// <reference types="react" />
import { FormValues } from '../types';
import { Control } from 'react-hook-form';
interface FormFieldProps {
    name: string;
    label: string;
    control: Control<FormValues>;
    schema: any;
    filter?: boolean;
}
export declare function FormField({ name, control, schema, filter, ...props }: FormFieldProps): JSX.Element | null;
export {};
