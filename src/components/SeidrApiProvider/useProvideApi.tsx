import { useEffect, useReducer } from 'react';
import { QueryParams, Relation, Api, ApiState } from './types';

import {
  createQueryParams,
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

  queryParams: null,
  loading: true,
  error: undefined,
};

function reducer(state, action) {
  switch (action.type) {
    case 'setData':
      return { ...state, data: action.payload, loading: false, error: null };
    case 'setInfo':
      return { ...state, info: action.payload, loading: false, error: null };
    case 'setQueryParams':
      return { ...state, queryParams: { ...action.payload } };
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
  /** A base filter to apply (Currently used in the context of RelatedAPIs) */
  relation?: Relation;
}

export function useProvideApi(props: UseProvideApiProps): Api {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log('stati');
    console.log(state);
    if (!state.info) {
      getInfo();
    }
    if (state.queryParams) {
      getData();
    }
  }, [state.queryParams]);

  const setQueryParams = (partialQueryParams: QueryParams) => {
    console.log('setting query params');
    console.log(state);
    // add validation to queryParams
    const queryParams = createQueryParams(state.queryParams, partialQueryParams);

    dispatch({ type: 'setQueryParams', payload: queryParams });
  };

  const getData = async () => {
    console.log('getting data');
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
      dispatch({ type: 'setError', payload: "Couldn't fetch list info" });
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
