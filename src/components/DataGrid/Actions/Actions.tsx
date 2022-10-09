import React from 'react';
import { useApi } from '../../SeidrApiProvider';

import { Group } from '@mantine/core';
import { View } from './View';
import { Edit } from './Edit';
import { Delete } from './Delete';

interface ActionsProps {
  id: number;
  selected: boolean;
  rtl: boolean;
}

export function Actions({ id, selected, rtl }: ActionsProps) {
  const { info } = useApi();

  return (
    <Group sx={{ gap: 4, justifyContent: rtl ? 'flex-end' : undefined }} spacing={0} noWrap>
      {info.permissions.includes('can_get') ? <View id={id} /> : null}
      {info.permissions.includes('can_put') ? <Edit id={id} /> : null}
      {info.permissions.includes('can_delete') ? <Delete id={id} /> : null}
    </Group>
  );
}
