import React, { ReactElement, useEffect, useReducer, useState, forwardRef } from 'react';
import { useSeidrApi, useSeidrInfo } from '../SeidrProvider';
import { getDefaultValues, getValidationSchema } from './utils';

import { Box, CircularProgress } from '@mui/material';
import { Toolbar } from './Toolbar';
import DataGridPagination from './DataGridPagination';

import { Body } from './Body';
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
      } else {
        delete state.queryParams.order_column;
        delete state.queryParams.order_direction;
        return {
          ...state,
          queryParams: {
            columns: state.queryParams.columns,
            filters: state.queryParams.filters,
            page: state.queryParams.page,
            page_size: state.queryParams.page_size,
          },
        };
      }
    case 'setSettings':
      return { ...state, settings: action.payload };

    default:
      throw new Error();
  }
}

export const DataGrid = forwardRef((props: DataGridProps, ref) => {
  const { baseURL } = useSeidrInfo();
  const { fetchInfo, fetchList, fetchEntry, createEntry, updateEntry, deleteEntry } = useSeidrApi();

  const {
    path,
    fitToParent = false,
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
        ? parseInt(localStorage.getItem(path + 'pageSize'))
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.queryParams]);

  useEffect(() => {
    if (state.settings) {
      localStorage.setItem(path + 'gridSettings', JSON.stringify(state.settings));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.settings]);

  useEffect(() => {
    if (queryParams) {
      dispatch({ type: 'setFilters', payload: queryParams.filters });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleViewEntry = async (id) => {
    try {
      return await fetchEntry(path, id);
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

  return state.data && state.info ? (
    <Box className={classes.root} sx={{ height: 1, display: 'flex', flexDirection: 'column', ...sx }}>
      {!hideToolbar ? (
        <Toolbar
          path={path}
          filterState={{
            filters: state.info.filters,
            activeFilters: state.queryParams.filters,
            onFiltersChange: (data) => dispatch({ type: 'setFilters', payload: data }),
          }}
          addState={{
            canPost: state.info.permissions.includes('can_post'),
            onAddEntry: handleAddEntry,
            AddComponent: AddComponent,
            ...state.info.add,
          }}
          settingsState={{
            onSettingsChange: (data) => dispatch({ type: 'setSettings', payload: data }),
            settings: state.settings,
          }}
          hideFilter={hideFilter}
          hideSettings={hideSettings}
          dense={state.settings.dense}
        />
      ) : null}
      {fitToParent ? (
        <Box
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 0,
          }}
        >
          <Body
            path={path}
            state={state}
            dispatch={dispatch}
            loading={loading}
            onSelect={onSelectEntry}
            onViewEntry={handleViewEntry}
            onEditEntry={handleEditEntry}
            onDeleteEntry={handleDeleteEntry}
            ViewComponent={ViewComponent}
            EditComponent={EditComponent}
            hideActions={hideActions}
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
      ) : (
        <>
          <Body
            path={path}
            state={state}
            dispatch={dispatch}
            loading={loading}
            onSelect={onSelectEntry}
            onViewEntry={handleViewEntry}
            onEditEntry={handleEditEntry}
            onDeleteEntry={handleDeleteEntry}
            ViewComponent={ViewComponent}
            EditComponent={EditComponent}
            hideActions={hideActions}
          />
          <DataGridPagination
            setLoading={setLoading}
            dispatch={dispatch}
            count={state.data.count}
            page={state.queryParams.page}
            pageSize={state.queryParams.page_size}
            rowsPerPageProps={rowsPerPageProps}
          />
        </>
      )}
    </Box>
  ) : loading ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 1,
        height: 1,
        p: 2,
      }}
    >
      <CircularProgress size={28} />
    </Box>
  ) : null;
});
