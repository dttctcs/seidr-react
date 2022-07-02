import React from 'react';
import applyStyles from './Toolbar.styles';

import { Box } from '@mantine/core';
import { Settings } from './Settings';
import { Add } from '../Actions/Add';
import { Filter } from './Filter';

export const Toolbar = React.memo(
  ({
    path,
    info,
    settings,
    queryParams,
    dispatch,
    hideToolbar,
    hideFilter,
    hideSettings,
    dense,

    handleAddEntry,
    AddComponent,

    classNames,
    styles,
  }) => {
    if (hideToolbar) {
      return null;
    }

    const { classes } = applyStyles({ dense }, { classNames, styles, name: 'DataGrid' });

    const canPost = info.permissions.includes('can_post');
    return (
      <Box className={classes.toolbarRoot}>
        <Box>
          {!hideSettings ? (
            <Settings
              onSettingsChange={(data) => dispatch({ type: 'setSettings', payload: data })}
              settings={settings}
            />
          ) : null}
        </Box>
        <Box>
          {canPost ? (
            <Add canPost={canPost} onAddEntry={handleAddEntry} AddComponent={AddComponent} {...info.add} />
          ) : null}
          {!hideFilter ? (
            <Filter
              path={path}
              filters={info.filters}
              activeFilters={queryParams.filters}
              onFiltersChange={(data) => dispatch({ type: 'setFilters', payload: data })}
            />
          ) : null}
        </Box>
      </Box>
    );
  },
);

Toolbar.displayName = 'Toolbar';
