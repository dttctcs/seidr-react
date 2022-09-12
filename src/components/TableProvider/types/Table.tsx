import { Filter, QueryParams } from './QueryParams';

export interface Table {
  path: string;
  data: any;
  info?: any;
  queryParams?: QueryParams;
  setQueryParams: (queryParams: QueryParams) => void;

  getEntry: (id: number) => any;
  addEntry: (data: any) => void;
  updateEntry: (id: number, data: any) => void;
  deleteEntry: (id: number) => void;
}

export interface TableState {
  data?: any;
  info?: any;

  queryParams: QueryParams;
  loading: boolean;
  error: string;
}
