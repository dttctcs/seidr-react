import React from 'react';
import { Settings } from './types';
export interface DataGridProps {
    /** Hide toolbar, the toolbar is the upper section containing Settings, Add and Filter */
    hideToolbar?: boolean;
    /** Hide filters */
    hideFilter?: boolean;
    /** Hide settings */
    hideSettings?: boolean;
    /** Hide Action column on every row */
    hideActions?: boolean;
    /** Style settings */
    settings?: Settings;
    /** Externally control page size */
    rowsPerPageProps?: number;
    /** Determines if the table should trigger a data fetch on mount, defaults to true */
    fetchOnMount?: boolean;
    onSelectEntry?: () => void;
    sx?: any;
    styles?: any;
}
export declare const DataGrid: React.ForwardRefExoticComponent<DataGridProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DataGrid.d.ts.map