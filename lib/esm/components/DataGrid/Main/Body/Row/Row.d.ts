import { ReactNode } from 'react';
interface RowProps {
    entry: any;
    selected: boolean;
    striped: boolean;
    onSelect: any;
    setSelectedItem: any;
    children: ReactNode;
}
export declare function Row({ entry, selected, striped, onSelect, setSelectedItem, children }: RowProps): JSX.Element;
export {};
//# sourceMappingURL=Row.d.ts.map