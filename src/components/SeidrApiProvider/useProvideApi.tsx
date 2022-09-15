import { useEffect, useReducer } from 'react';
import { QueryParams, Relation, Api, ApiState } from './types';

import {
  getList,
  getListInfo,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getDefaultValues,
  getValidationSchema,
} from './utils';

const initialState: ApiState = {
  data: null,
  info: null,

  queryParams: {
    columns: [],
    filters: [],
    // keys: [],

    page: 0,
    page_size: 25,
  },
  loading: true,
  error: undefined,
};

function reducer(state, action) {
  switch (action.type) {
    case 'setData':
      return { ...state, data: action.payload, loading: false, error: null };
    case 'setInfo':
      return { ...state, info: action.payload, loading: false, error: null };
    case 'setColumns':
      return { ...state, queryParams: { ...state.queryParams, page: 0, columns: action.payload } };
    case 'setFilters':
      return { ...state, queryParams: { ...state.queryParams, page: 0, filters: action.payload } };
    case 'setPage':
      return { ...state, queryParams: { ...state.queryParams, page: action.payload } };
    case 'setPageSize':
      return { ...state, queryParams: { ...state.queryParams, page: 0, page_size: action.payload } };
    case 'setOrder':
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          order_column: action.payload.order_column,
          order_direction: action.payload.order_direction,
        },
      };
    case 'setError':
      return {
        ...state,
        error: action.payload,
      };

    default:
      throw new Error();
  }
}

export interface UseProvideApiProps {
  /** The Seidr path to interact with */
  path?: string;
  /** Initial query parameters */
  initialQueryParams?: QueryParams;
  /** A base filter to apply (Currently used in the context of RelatedAPIs) */
  relation?: Relation;
}

export function useProvideApi(props: UseProvideApiProps): Api {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    queryParams: {
      ...initialState.queryParams,
      ...props.initialQueryParams,
    },
  });

  useEffect(() => {
    if (!state.info) {
      const dataInfoPromise = Promise.all([getData(), getInfo()]);
      dataInfoPromise.catch((error) => {
        dispatch({ type: 'setError', payload: "Couldn't fetch list data" });
      });
    } else {
      getData();
    }
  }, [state.queryParams]);

  const setQueryParams = (queryParams: QueryParams) => {
    if (queryParams.hasOwnProperty('columns')) {
      dispatch({ type: 'setColumns', payload: queryParams.columns });
    }
    if (queryParams.hasOwnProperty('filters')) {
      dispatch({ type: 'setFilters', payload: queryParams.filters });
    }
    if (queryParams.hasOwnProperty('order_column') || queryParams.hasOwnProperty('order_direction')) {
      dispatch({
        type: 'setOrder',
        payload: { order_column: queryParams.order_column, order_direction: queryParams.order_direction },
      });
    }
    if (queryParams.hasOwnProperty('page')) {
      dispatch({ type: 'setPage', payload: queryParams.page });
    }
    if (queryParams.hasOwnProperty('page_size')) {
      dispatch({ type: 'setPageSize', payload: queryParams.page_size });
    }
  };

  const getData = async () => {
    try {
      const relatedQueryParams = props.relation
        ? {
            ...state.queryParams,
            filters: [
              ...state.queryParams.filters,
              { col: props.relation.foreign_key, opr: props.relation.type, value: props.relation.id },
            ],
          }
        : state.queryParams;
      const data = await getList(props.path, relatedQueryParams);
      dispatch({ type: 'setData', payload: data });
      return data;
    } catch (error) {
      dispatch({ payload: 'Failed to fetch', type: 'setError' });
    }
  };

  const getInfo = async () => {
    try {
      const data = await getListInfo(props.path);

      const info = {
        add: {
          columns: data.add_columns,
          title: data.add_title,
          schema: getValidationSchema(data.add_columns),
          defaultValues: getDefaultValues(data.add_columns),
        },
        edit: {
          columns: data.edit_columns,
          title: data.edit_title,
          schema: getValidationSchema(data.edit_columns),
          defaultValues: getDefaultValues(data.edit_columns),
        },
        filters: data.filters,
        permissions: data.permissions,
        relations: data.relations,
      };
      await dispatch({ type: 'setInfo', payload: info });
      return info;
    } catch (error) {
      console.log(error);
    }
  };

  const getEntry = async (id) => {
    try {
      return await getItem(props.path, id);
    } catch (error) {
      console.log(error);
    }
  };

  const addEntry = async (item) => {
    try {
      const data = await createItem(props.path, item);
      getData();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateEntry = async (id, item) => {
    try {
      const data = await updateItem(props.path, id, item);
      getData();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEntry = async (id: number) => {
    try {
      const data = await deleteItem(props.path, id);
      getData();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    path: props.path,
    data: state.data,
    info: state.info,

    queryParams: state.queryParams,
    setQueryParams,
    getEntry,
    addEntry,
    updateEntry,
    deleteEntry,
  };
}
