export interface Filter {
  foreign_key: string;
  opr: string;
  value: string | number;
}

interface Order {
  order_column: string;
  order_direction: 'asc' | 'desc';
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
