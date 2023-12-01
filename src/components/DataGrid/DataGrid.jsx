/* eslint-disable no-case-declarations */
import { useEffect, useReducer, forwardRef, useState } from 'react';

import { LoadingOverlay, Paper, Box } from '@mantine/core';
import { Toolbar } from './Toolbar';
import { Main } from './Main';
import { Pagination } from './Pagination';
import { ErrorDialog } from './ErrorDialog';

import classes from './DataGrid.module.css'
import { useApi } from '../SeidrApiProvider';

// const initialState = {
//   settings: {
//     rtl: false,
//     dense: false,
//     striped: false,
//     rightBorder: false,
//     hover: false,
//   },
// };


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
    hideAdd = false,
    hideSettings = false,
    hideActions = false,
    hidePagination = false,
    hideError = false,
    settings = null,
    onSelectEntry = null,
    fetchOnMount = true,
  } = props;

  // console.log(settings);
  // const [state, dispatch] = useReducer(reducer, {
  //   ...initialState,
  //   settings: {
  //     rtl: settings?.rtl ?? false,
  //     dense: settings?.dense ?? false,
  //     striped: settings?.striped ?? false,
  //     rightBorder: settings?.rightBorder ?? false,
  //     hover: settings?.hover ?? false,
  //   },
  // });

  useEffect(() => {
    // Trigger inital data load
    if (!data && fetchOnMount) {
      setQueryParams({});
    }
  }, [data]);



  return (
    <Paper
      ref={ref}
      className={classes.root}
      style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
        <LoadingOverlay
          pb={54}
          loaderProps={{ size: 'sm', type: 'dots' }}
          style={{color:'#c5c5c5', opacity: 0.3}}
          visible={loading}
        />
      {info && data && (
        <>
          {!loading && (
            <Box pb={54}>
              {!hideToolbar ? (
                <Toolbar
                // settings={state.settings}
                // dispatch={dispatch}
                hideFilter={hideFilter}
                hideAdd={hideAdd}
                hideSettings={hideSettings}
                // dense={state.settings.dense}
                />
                ) : null}
              <Main 
                // settings={state.settings}
                hideActions={hideActions} 
                loading={loading} 
                onSelect={onSelectEntry} />
            </Box>
          )}
          {!hidePagination ?
          <Pagination />
          : null
        }
        </>
      )}
      {!hideError ?
        <ErrorDialog />
        : null
      }
    </Paper>
  );
});

DataGrid.displayName = 'DataGrid';
