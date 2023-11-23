import { memo } from 'react';

import classes from './Toolbar.module.css';
import { useApi } from '../../SeidrApiProvider';

import { Box } from '@mantine/core';
import { Add } from '../Actions/Add';
import { Filter } from './Filter';

export const Toolbar = memo(({ hideAdd, hideFilter }) => {
  const { info } = useApi();

  const canPost = info.permissions.includes('can_post');
  return (
    <Box className={`${classes.toolbarRoot} `}>
      {canPost && !hideAdd  ? <Add /> : null}
      {!hideFilter ? <Filter /> : null}
    </Box>
  );
});

Toolbar.displayName = 'Toolbar';
