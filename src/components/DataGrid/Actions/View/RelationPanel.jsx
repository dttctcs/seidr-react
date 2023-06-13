import { memo } from 'react';
import { SeidrApiProvider, useApi } from '../../../SeidrApiProvider';

import { DataGrid } from '../../DataGrid';
import { urlJoin } from '../../../../utils';

function RelationPanel({ relatedPath, ...relation }) {
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

export default memo(RelationPanel);
