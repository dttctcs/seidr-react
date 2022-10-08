import React, { ReactNode } from 'react';
interface FieldProps {
    loading: boolean;
    rightBorder: boolean;
    rtl: boolean;
    children: ReactNode;
}
export declare const Field: React.MemoExoticComponent<({ loading, rightBorder, rtl, children, ...props }: FieldProps) => JSX.Element>;
export {};
