import { QueryParams } from './QueryParams';

export interface Api {
  path: string;
  data: any;
  info?: any;
  queryParams?: QueryParams;
  loading?: boolean;

  setQueryParams: (queryParams: QueryParams) => void;
  getEntry: (id: number) => any;
  addEntry: (data: any) => void;
  updateEntry: (id: number, data: any) => void;
  deleteEntry: (id: number) => void;
}

export interface ApiState {
  data?: any;
  info?: any;

  queryParams: QueryParams;
  loading: boolean;
  error: string;
}
