/* eslint-disable no-case-declarations */
import React, { useEffect, useReducer, useState, forwardRef } from 'react';
import { Settings } from './types';

import { LoadingOverlay, Paper } from '@mantine/core';
import { Toolbar } from './Toolbar';
import { Main } from './Main';
import { Pagination } from './Pagination';

import { applyStyles } from './TableStyles.styles';
import { useTable } from '../TableProvider';

const initialState = {
  settings: {
    rtl: false,
    dense: false,
    striped: false,
    rightBorder: false,
  },
};

export interface TableProps {
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

  // /** Callback to be fired on DataGrid error */
  onError?: () => void;
  // /** Callback to be fired on entry selection */
  onSelectEntry?: () => void;
  // /** A mantine sx prop */
  sx?: any;
  styles?: any;
}

function reducer(state, action) {
  switch (action.type) {
    case 'setSettings':
      return { ...state, settings: action.payload };

    default:
      throw new Error();
  }
}

export const Table = forwardRef<HTMLDivElement, TableProps>((props, ref) => {
  const { path, data, info } = useTable();
  const {
    hideToolbar = false,
    hideFilter = false,
    hideSettings = false,
    hideActions = false,
    settings = null,
    rowsPerPageProps = null,
    sx = null,
    onError = null,
    onSelectEntry = null,
    styles,
    ...others
  } = props;

  const { classes, cx, theme } = applyStyles({}, { styles, name: 'DataGrid' });

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    settings: JSON.parse(localStorage.getItem(path + 'gridSettings')) || {
      rtl: settings?.rtl ?? false,
      dense: settings?.dense ?? false,
      striped: settings?.striped ?? false,
      rightBorder: settings?.rightBorder ?? false,
    },
  });

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (state.queryParams) {
  //     localStorage.setItem(path + 'pageSize', JSON.stringify(state.queryParams.page_size));
  //   }
  // }, [state.queryParams]);

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

          {/* <Pagination /> */}
        </>
      )}
    </Paper>
  );
});

Table.displayName = 'DataGrid';
