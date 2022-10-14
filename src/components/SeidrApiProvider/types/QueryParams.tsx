export interface Filter {
  col: string;
  opr: string;
  value: string | number;
}

export interface QueryParams {
  columns?: Array<string>;
  filters?: Array<Filter>;
  // keys: [],
  order_column?: string;
  order_direction?: 'asc' | 'desc';
  page?: number;
  page_size?: number;
}
