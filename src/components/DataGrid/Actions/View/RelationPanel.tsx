import React from 'react';
import { SeidrApiProvider, useApi } from '../../../SeidrApiProvider';
import { Relation } from '../../../SeidrApiProvider/types';

import { DataGrid } from '../../DataGrid';
import { urlJoin } from '../../../../utils';

interface RelationPanelProps extends Relation {
  relatedPath: string;
}

function RelationPanel({ relatedPath, ...relation }: RelationPanelProps) {
  const { path } = useApi();

  const joinedPath = urlJoin(
    path ? path.substring(0, path.lastIndexOf('/')) : '',
    relatedPath.substring(0, relatedPath.lastIndexOf('/')),
  );

  return (
    <SeidrApiProvider path={joinedPath} relation={relation}>
      <DataGrid hideToolbar />
    </SeidrApiProvider>
  );
}

export default React.memo(RelationPanel);
