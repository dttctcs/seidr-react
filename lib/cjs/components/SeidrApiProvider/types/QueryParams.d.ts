export interface Filter {
    foreign_key: string;
    opr: string;
    value: string | number;
}
export interface QueryParams {
    columns?: Array<string>;
    filters?: Array<Filter>;
    order_column?: string;
    order_direction?: 'asc' | 'desc';
    page?: number;
    page_size?: number;
}
//# sourceMappingURL=QueryParams.d.ts.map