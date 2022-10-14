/// <reference types="react" />
import * as _mantine_core from '@mantine/core';
import { MantineThemeOverride, CheckboxGroupProps } from '@mantine/core';
import React, { ReactNode } from 'react';

interface Role {
    id: number;
    name: string;
}
interface User {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    active: boolean;
    permissions: string[];
    roles: Role[];
    fail_login_count: number;
    last_login: string;
    created_o: string;
    changed_on: string;
}
interface UserUpdate {
    firstname: string;
    lastname: string;
}

interface UserCredentials {
    username: string;
    password: string;
}
declare type SeidrAuth = {
    user: User;
    loading: boolean;
    error: string;
    signin: (credentials: UserCredentials) => void;
    signout: () => void;
    update: (user: UserUpdate) => void;
    resetPassword: (password: string) => void;
};

interface SeidrInfo {
    baseUrl: string;
    info?: any;
}

declare function useSeidrAuth(): SeidrAuth;
declare function useSeidrInfo(): SeidrInfo;
declare function useSeidrTheme(): _mantine_core.MantineTheme;
interface SeidrProviderProps {
    baseUrl?: string;
    theme?: MantineThemeOverride;
    inheritMantineTheme?: boolean;
    children: ReactNode;
}
declare function SeidrProvider({ baseUrl, theme, inheritMantineTheme, children }: SeidrProviderProps): JSX.Element;

interface Filter {
    col: string;
    opr: string;
    value: string | number;
}
interface QueryParams {
    columns?: Array<string>;
    filters?: Array<Filter>;
    order_column?: string;
    order_direction?: 'asc' | 'desc';
    page?: number;
    page_size?: number;
}

interface Api {
    path?: string;
    data: any;
    info?: any;
    queryParams?: QueryParams;
    loading: boolean;
    error?: {
        message: string;
        originalError: string;
    };
    setQueryParams: (queryParams: QueryParams) => void;
    getEntry: (id: number) => any;
    addEntry: (data: any) => void;
    updateEntry: (id: number, data: any) => void;
    deleteEntry: (id: number) => void;
}

interface Relation {
    foreign_key: string;
    type: string;
    id: string | number;
}

declare function useApi(): Api;
interface SeidrApiProviderProps {
    path?: string;
    relation?: Relation;
    initialQueryParams?: QueryParams;
    children: ReactNode;
}
declare function SeidrApiProvider({ path, initialQueryParams, relation, children }: SeidrApiProviderProps): JSX.Element;

interface Settings {
    rtl?: boolean;
    dense?: boolean;
    striped?: boolean;
    rightBorder?: boolean;
    hover?: boolean;
}

interface DataGridProps {
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
declare const DataGrid: React.ForwardRefExoticComponent<DataGridProps & React.RefAttributes<HTMLDivElement>>;

declare const DataGridStyles: {
    root: string;
    toolbar: string;
    body: string;
    pagination: string;
    header: string;
};

interface MultiSelectProps extends Omit<CheckboxGroupProps, 'value' | 'children' | 'defaultValue' | 'onChange'> {
    name: string;
}
declare function MultiSelect({ name, ...props }: MultiSelectProps): JSX.Element | null;

interface UserMenuProps {
    basePath?: string;
    Target?: ReactNode;
    children?: ReactNode;
}
declare function UserMenu({ basePath, Target, children }: UserMenuProps): JSX.Element;

export { DataGrid, DataGridProps, DataGridStyles, MultiSelect, SeidrApiProvider, SeidrProvider, UserMenu, useApi, useSeidrAuth, useSeidrInfo, useSeidrTheme };
