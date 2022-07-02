/* eslint-disable no-case-declarations */
import React, { ReactElement, useEffect, useReducer, useState, forwardRef } from 'react';
import { useSeidrApi } from '../SeidrProvider';
import { getDefaultValues, getValidationSchema } from './utils';

import { Box } from '@mantine/core';
import { Toolbar } from './Toolbar';
import { Table } from './Table';
import DataGridPagination from './DataGridPagination';

import { applyStyles } from './DataGrid.styles';
interface Filter {
  foreign_key: string;
  opr: string;
  value: string;
}

interface Settings {
  rtl?: boolean;
  dense?: boolean;
  striped?: boolean;
  rightBorder?: boolean;
}

interface QueryParams {
  columns?: Array<string>;
  filters?: Array<Filter>;
  // keys: [],
  order_column?: string;
  order_direction: '';
  page: 0;
  page_size: 25;
}

export interface DataGridProps {
  /** The Seidr path to interact with */
  path: string;
  /** Grid size to be controlled by parent */
  fitToParent?: boolean;
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
  /** Control the grid externally */
  queryParams?: QueryParams;
  /** Externally control page size */
  rowsPerPageProps?: number;
  /** A base filter to apply (Currently used in the context of RelatedAPIs) */
  relation?: Relation;
  /** ReatNode to be rendered on item add. Will provide add info to the component as properties ( columns, schema, defaultValues)*/
  AddComponent?: ReactElement;
  /** ReatNode to be rendered on item edit. Will provide edit info to the component as properties ( columns, schema, defaultValues)*/
  EditComponent?: ReactElement;
  /** ReatNode to be rendered on item view Will provide the selected item to the component */
  ViewComponent?: ReactElement;
  // /** Callback to be fired on DataGrid error */
  // onError?: () => void;
  // /** Callback to be fired on entry selection */
  // onSelectEntry?: () => void;
  styles;
}

const initialState = {
  data: null,
  info: null,
  queryParams: {
    columns: [],
    filters: [],
    // keys: [],
    // order_column: "",
    // order_direction: "",
    page: 0,
    page_size: 25,
  },
  settings: {
    rtl: false,
    dense: false,
    striped: false,
    rightBorder: false,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'setData':
      return { ...state, data: action.payload };
    case 'setInfo':
      return { ...state, info: action.payload };
    case 'setFilters':
      return { ...state, queryParams: { ...state.queryParams, page: 0, filters: action.payload } };
    case 'setPage':
      return { ...state, queryParams: { ...state.queryParams, page: action.payload } };
    case 'setPageSize':
      return { ...state, queryParams: { ...state.queryParams, page: 0, page_size: action.payload } };
    case 'setOrder':
      const direction = state.queryParams.order_direction ? state.queryParams.order_direction : 'asc';
      const otherDirection = direction === 'asc' ? 'desc' : null;
      if (otherDirection) {
        return {
          ...state,
          queryParams: {
            ...state.queryParams,
            order_column: otherDirection ? action.payload : null,
            order_direction: state.queryParams.order_column === action.payload ? otherDirection : direction,
          },
        };
      }

      return {
        ...state,
        queryParams: {
          columns: state.queryParams.columns,
          filters: state.queryParams.filters,
          page: state.queryParams.page,
          page_size: state.queryParams.page_size,
        },
      };

    case 'setSettings':
      return { ...state, settings: action.payload };

    default:
      throw new Error();
  }
}

export const DataGrid = forwardRef((props: DataGridProps, ref) => {
  const { fetchInfo, fetchList, fetchEntry, createEntry, updateEntry, deleteEntry } = useSeidrApi();

  const {
    path,
    hideToolbar = false,
    hideFilter = false,
    hideSettings = false,
    hideActions = false,
    settings = null,
    queryParams = null,
    rowsPerPageProps = null,
    relation = null,
    AddComponent = null,
    EditComponent = null,
    ViewComponent = null,
    sx = null,
    onError = null,
    onSelectEntry = null,
    styles,
    children,
    ...others
  } = props;

  const { classes, cx, theme } = applyStyles({}, { styles, name: 'DataGrid' });

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    queryParams: {
      ...initialState.queryParams,
      ...queryParams,
      page_size: localStorage.getItem(path + 'pageSize')
        ? parseInt(localStorage.getItem(path + 'pageSize'), 10)
        : rowsPerPageProps?.pageSizeDefault ?? 25,
    },
    settings: JSON.parse(localStorage.getItem(path + 'gridSettings')) || {
      rtl: settings?.rtl ?? false,
      dense: settings?.dense ?? false,
      striped: settings?.striped ?? false,
      rightBorder: settings?.rightBorder ?? false,
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.queryParams) {
      localStorage.setItem(path + 'pageSize', JSON.stringify(state.queryParams.page_size));
    }
  }, [state.queryParams]);

  useEffect(() => {
    if (state.settings) {
      localStorage.setItem(path + 'gridSettings', JSON.stringify(state.settings));
    }
  }, [state.settings]);

  useEffect(() => {
    if (queryParams) {
      dispatch({ type: 'setFilters', payload: queryParams.filters });
    }
  }, [queryParams]);

  useEffect(() => {
    setLoading(true);
    if (!state.info) {
      const dataInfoPromise = Promise.all([getData(), getInfo()]);
      dataInfoPromise
        .catch((error) => {
          console.log('Something went wrong while fetching Infos.');
        })
        .finally(() => setLoading(false));
    } else {
      getData().finally(() => setLoading(false));
    }
  }, [state.queryParams]);

  const getData = async () => {
    try {
      const params = { ...state.queryParams, ...queryParams };
      const relatedQueryParams = relation
        ? {
            ...params,
            filters: [...params.filters, { col: relation.foreign_key, opr: relation.type, value: relation.id }],
          }
        : params;
      const data = await fetchList(path, relatedQueryParams);
      dispatch({ type: 'setData', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const getInfo = async () => {
    try {
      const data = await fetchInfo(path);

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddEntry = async (data) => {
    setLoading(true);
    try {
      setLoading(true);
      await createEntry(path, data);
      getData();
    } catch (error) {
      console.log('Something went wrong while fetching Infos.');
    } finally {
      setLoading(false);
    }

    setLoading(false);
  };

  const handleEditEntry = async (id, data) => {
    try {
      setLoading(true);
      await updateEntry(path, id, data);
      getData();
    } catch (error) {
      console.log('Something went wrong while fetching Infos.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      await deleteEntry(path, id);
      getData();
    } catch (error) {
      console.log('Something went wrong while fetching Infos.');
    }
  };

  if (!state.data || !state.info) {
    return null;
  }

  return (
    <Box
      ref={ref}
      className={classes.root}
      sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', ...sx }}
    >
      {!hideToolbar ? (
        <Toolbar
          path={path}
          info={state.info}
          settings={state.settings}
          queryParams={state.queryParams}
          dispatch={dispatch}
          hideFilter={hideFilter}
          hideSettings={hideSettings}
          dense={state.settings.dense}
          handleAddEntry={handleAddEntry}
          AddComponent={AddComponent}
        />
      ) : null}
      <Table
        path={path}
        data={state.data}
        info={state.info}
        settings={state.settings}
        order={{ column: state.queryParams.order_column, direction: state.queryParams.order_direction }}
        loading={loading}
        hideActions={hideActions}
        dispatch={dispatch}
        onSelect={onSelectEntry}
        onDeleteEntry={handleDeleteEntry}
        onEditEntry={handleEditEntry}
        ViewComponent={ViewComponent}
        EditComponent={EditComponent}
      />
      <DataGridPagination
        setLoading={setLoading}
        dispatch={dispatch}
        count={state.data.count}
        page={state.queryParams.page}
        pageSize={state.queryParams.page_size}
        rowsPerPageProps={rowsPerPageProps}
      />
    </Box>
  );
});

DataGrid.displayName = 'DataGrid';
