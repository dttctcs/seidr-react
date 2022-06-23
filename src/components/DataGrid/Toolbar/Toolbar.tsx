import React from 'react';
import applyStyles from './Toolbar.styles';

import { Box } from '@mantine/core';
import { Settings } from './Settings';
import { Add } from '../Actions/Add';
import { Filter } from './Filter';

export const Toolbar = React.memo(
  ({ classNames, styles, path, filterState, addState, settingsState, hideFilter, hideSettings, dense }) => {
    const { classes, cx, theme } = applyStyles({ dense }, { classNames, styles, name: 'DataGrid' });

    return (
      <Box className={classes.toolbarRoot}>
        <Box>{!hideSettings ? <Settings {...settingsState} /> : null}</Box>
        <Box>
          {addState.canPost ? <Add {...addState} /> : null}
          {!hideFilter ? <Filter path={path} {...filterState} /> : null}
        </Box>
      </Box>
    );
  },
);
