//import { ReactNode } from 'react';

import { Table, useMantineTheme, ScrollArea } from '@mantine/core';
//import { ScrollArea } from '../../ScrollArea';
import { Header } from './Header';
import { Body } from './Body';
//import { EditDialog } from '../Actions/Edit/EditDialog';


export function Main({
  // settings,
  hideActions,
  loading,
  onSelect,
}) {
  const theme = useMantineTheme();

  return (
    <ScrollArea
      /*options={{ className: theme.colorScheme === 'dark' ? 'os-theme-light' : undefined }}
      style={{ flex: 1, flexDirection: 'column' }}*/
    >
      <Table
        // verticalSpacing={settings.dense ? 'xs' : 'md'}
        // horizontalSpacing={settings.dense ? 'xs' : 'md'}
        // fontSize={settings.dense ? 'sm' : 'md'}
        // striped={settings.striped}
        highlightOnHover={!!onSelect}
      >
        <Header 
          // settings={settings} 
          hideActions={hideActions} />
        <Body 
          // settings={settings} 
          loading={loading} 
          onSelect={onSelect} 
          hideActions={hideActions} />
      </Table>
    </ScrollArea>
  );
}
