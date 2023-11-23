import React from 'react';
import { useApi } from '../../SeidrApiProvider';

import { Group } from '@mantine/core';
import { View } from './View';
import { Edit } from './Edit';
import { Delete } from './Delete';


export function Actions({ id, selected }) {
  const { info } = useApi();

  return (
    <Group 
      style={{ gap: 4, width: '110px', whiteSpace: 'nowrap', padding: 'var(--mantine-spacing-md)'}}
      spacing={0}
    >
      {info.permissions.includes('can_get') ? <View id={id} /> : null}
      {info.permissions.includes('can_put') ? <Edit id={id} /> : null}
      {info.permissions.includes('can_delete') ? <Delete id={id} /> : null}
    </Group>
  );
}
