import { QueryParams } from './QueryParams';

export interface Api {
  path?: string;
  data: any;
  info?: any;
  queryParams?: QueryParams;
  loading?: boolean;
  error?: { message: string; originalError: string };

  setQueryParams: (queryParams: QueryParams) => void;
  getEntry: (id: number) => any;
  addEntry: (data: any) => void;
  updateEntry: (id: number, data: any) => void;
  deleteEntry: (id: number) => void;
}

export interface ApiState {
  data?: any;
  info?: any;

  queryParams: QueryParams | null;
  loading: boolean;
  error: { message: string; originalError: string } | null;
}
