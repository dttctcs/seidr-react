import { ReactNode } from 'react';
interface RowProps {
    entry: any;
    selected: boolean;
    hover: boolean;
    onSelect: any;
    setSelectedItem: any;
    children: ReactNode;
}
export declare function Row({ entry, selected, hover, onSelect, setSelectedItem, children }: RowProps): JSX.Element;
export {};
