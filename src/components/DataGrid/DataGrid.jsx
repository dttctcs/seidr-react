/* eslint-disable no-case-declarations */
import { useEffect, useReducer, forwardRef } from 'react';

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


function reducer(state, action) {
  switch (action.type) {
    case 'setSettings':
      return { ...state, settings: action.payload };

    default:
      throw new Error();
  }
}

export const DataGrid = forwardRef((props, ref) => {
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

  const localStorageKey = `${path}-datagrid`;

  const { classes, cx, theme } = applyStyles();

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    settings: JSON.parse(localStorage.getItem(localStorageKey)) || {
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
      localStorage.setItem(localStorageKey, JSON.stringify(state.settings));
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
        overlayColor='#c5c5c5'
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