/* eslint-disable no-case-declarations */
import React, { useEffect, useReducer, forwardRef } from 'react';
import { Settings } from './types';

import { LoadingOverlay, Paper } from '@mantine/core';
import { Toolbar } from './Toolbar';
import { Main } from './Main';
import { Pagination } from './Pagination';
import { ErrorDialog } from './ErrorDialog';

import { applyStyles } from './DataGrid.styles';
import { useApi } from '../SeidrApiProvider';

const initialState = {
  settings: {
    rtl: false,
    dense: false,
    striped: false,
    rightBorder: false,
    hover: false,
  },
};

export interface DataGridProps {
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
  /** Externally control page size */
  rowsPerPageProps?: number;
  /** Determines if the table should trigger a data fetch on mount, defaults to true */
  fetchOnMount?: boolean;

  // /** Callback to be fired on entry selection */
  onSelectEntry?: () => void;
  // /** A mantine sx prop */
  sx?: any;
  styles?: any;
}

function reducer(state: any, action: { type: string; payload: any }) {
  switch (action.type) {
    case 'setSettings':
      return { ...state, settings: action.payload };

    default:
      throw new Error();
  }
}

export const DataGrid = forwardRef<HTMLDivElement, DataGridProps>((props, ref) => {
  const { path, data, loading, info, setQueryParams } = useApi();
  const {
    hideToolbar = false,
    hideFilter = false,
    hideSettings = false,
    hideActions = false,
    settings = null,
    sx = null,
    onSelectEntry = null,
    fetchOnMount = true,
    styles,
  } = props;

  const { classes, cx, theme } = applyStyles();

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    settings: JSON.parse(localStorage.getItem(path + 'datagrid')) || {
      rtl: settings?.rtl ?? false,
      dense: settings?.dense ?? false,
      striped: settings?.striped ?? false,
      rightBorder: settings?.rightBorder ?? false,
      hover: settings?.hover ?? false,
    },
  });

  useEffect(() => {
    // Trigger inital data load
    if (!data && fetchOnMount) {
      setQueryParams({});
    }
  }, [data]);

  useEffect(() => {
    if (state.settings) {
      localStorage.setItem(path + 'gridSettings', JSON.stringify(state.settings));
    }
  }, [state.settings]);

  return (
    <Paper
      ref={ref}
      className={classes.root}
      sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', ...sx }}
    >
      <LoadingOverlay
        loaderProps={{ size: 'sm', variant: 'dots' }}
        overlayOpacity={0.1}
        overlayColor="#c5c5c5"
        visible={loading}
      />
      {info && data && !loading && (
        <>
          {!hideToolbar ? (
            <Toolbar
              settings={state.settings}
              dispatch={dispatch}
              hideFilter={hideFilter}
              hideSettings={hideSettings}
              dense={state.settings.dense}
            />
          ) : null}
          <Main settings={state.settings} hideActions={hideActions} loading={loading} onSelect={onSelectEntry} />

          <Pagination />
        </>
      )}
      <ErrorDialog />
    </Paper>
  );
});

DataGrid.displayName = 'DataGrid';
