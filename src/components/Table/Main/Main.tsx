import React, { ReactNode } from 'react';

import { Table, useMantineTheme } from '@mantine/core';
import { ScrollArea } from '../../ScrollArea';
import { Header } from './Header';
import { Body } from './Body';
import { Settings } from '../types';
import { EditDialog } from '../Actions/Edit/EditDialog';

interface MainProps {
  settings: Settings;

  hideActions: boolean;
  loading: boolean;
  onSelect: any;
}

export function Main({
  settings,

  hideActions,
  loading,
  onSelect,
}: MainProps) {
  const theme = useMantineTheme();

  return (
    <ScrollArea
      options={{ className: theme.colorScheme === 'dark' ? 'os-theme-light' : undefined }}
      style={{ flex: 1, flexDirection: 'column' }}
    >
      <Table
        verticalSpacing={settings.dense ? 'xs' : 'md'}
        horizontalSpacing={settings.dense ? 'xs' : 'md'}
        fontSize={settings.dense ? 'sm' : 'md'}
        striped={settings.striped}
        highlightOnHover={!!onSelect}
      >
        <Header settings={settings} hideActions={hideActions} />
        <Body settings={settings} loading={loading} onSelect={onSelect} hideActions={hideActions} />
      </Table>
    </ScrollArea>
  );
}
