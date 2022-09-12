import React from 'react';
import applyStyles from './Toolbar.styles';
import { useTable } from '../../TableProvider';
import { Settings as SettingsType } from '../types';

import { Box } from '@mantine/core';
import { Settings } from './Settings';
import { Add } from '../Actions/Add';
import { Filter } from './Filter';

interface ToolbarProps {
  settings: SettingsType;

  dispatch: any;
  hideFilter: boolean;
  hideSettings: boolean;
  dense: boolean;
}

export const Toolbar = React.memo<ToolbarProps>(({ settings, hideFilter, hideSettings, dense, dispatch }) => {
  const { info } = useTable();

  const { classes } = applyStyles({ dense }, { name: 'DataGrid' });

  const canPost = info.permissions.includes('can_post');
  return (
    <Box className={classes.toolbarRoot}>
      <Box>
        {!hideSettings ? (
          <Settings onSettingsChange={(data) => dispatch({ type: 'setSettings', payload: data })} settings={settings} />
        ) : null}
      </Box>
      <Box sx={{ display: 'flex' }}>
        {canPost ? <Add /> : null}
        {!hideFilter ? <Filter /> : null}
      </Box>
    </Box>
  );
});

Toolbar.displayName = 'Toolbar';
