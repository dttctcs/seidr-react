import React from 'react';
import { TableProvider, useTable } from '../../../TableProvider';
import { Relation } from '../../../TableProvider/types';

import { Box } from '@mantine/core';
import { DataGrid } from '../../DataGrid';
import { urlJoin } from '../../../../utils';

interface RelationPanelProps extends Relation {
  relatedPath: string;
}

function RelationPanel({ relatedPath, ...relation }: RelationPanelProps) {
  const { path } = useTable();

  const joinedPath = urlJoin(
    path.substring(0, path.lastIndexOf('/')),
    relatedPath.substring(0, relatedPath.lastIndexOf('/')),
  );

  return (
    <TableProvider path={joinedPath} relation={relation}>
      <DataGrid hideToolbar />
    </TableProvider>
  );
}

export default React.memo(RelationPanel);
