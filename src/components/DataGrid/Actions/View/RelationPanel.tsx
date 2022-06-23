import React from 'react';

import { Box } from '@mantine/core';
import { DataGrid } from '../../DataGrid';

function RelationPanel({ relation }) {
  return (
    <Box sx={{ height: 1, overflow: 'auto' }}>
      <DataGrid path={relation.path} relation={relation} hideToolbar />
    </Box>
  );
}

export default React.memo(RelationPanel);
