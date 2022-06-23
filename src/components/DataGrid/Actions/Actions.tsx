import React from 'react';

import { Group } from '@mantine/core';
import { View } from './View';
import { Edit } from './Edit';
import DeleteEntry from './Delete/DeleteEntry';

export function Actions({
  id,
  path,
  info,
  selected,
  rtl,
  ViewComponent,
  EditComponent,
  onViewEntry,
  onEditEntry,
  onDeleteEntry,
}) {
  return (
    <Group sx={{ gap: 4, justifyContent: rtl ? 'flex-end' : undefined }} spacing={0} noWrap>
      {info.permissions.includes('can_get') ? (
        <View
          id={id}
          relations={info.relations}
          ViewComponent={ViewComponent}
          onViewEntry={onViewEntry}
          selected={selected}
        />
      ) : null}
      {info.permissions.includes('can_put') ? (
        <Edit
          id={id}
          path={path}
          EditComponent={EditComponent}
          onEditEntry={onEditEntry}
          selected={selected}
          {...info.edit}
        />
      ) : null}
      {info.permissions.includes('can_delete') ? (
        <DeleteEntry id={id} onDeleteEntry={onDeleteEntry} selected={selected} />
      ) : null}
    </Group>
  );
}
