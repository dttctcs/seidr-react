import React from 'react';
import { toolbarHeight } from './utils';

import { Box, Toolbar } from '@mui/material';
import Settings from './Settings/Settings';
import AddEntryButton from './Add/AddEntryButton';
import Filter from './Filter/Filter';

function DataGridToolbar({ path, filterState, addState, settingsState, hideFilter, hideSettings, dense }) {
  return (
    <Toolbar
      sx={{
        justifyContent: 'space-between',
        px: { xs: 1, sm: 1 },
        minHeight: dense ? toolbarHeight * 0.75 : toolbarHeight,
      }}
    >
      <Box>{!hideSettings ? <Settings {...settingsState} /> : null}</Box>
      <Box>
        {addState.canPost ? <AddEntryButton {...addState} /> : null}
        {!hideFilter ? <Filter path={path} {...filterState} /> : null}
      </Box>
    </Toolbar>
  );
}

export default DataGridToolbar;
