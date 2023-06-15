import { createStyles } from '@mantine/core';

// styles api
export const DataGridStyles = {
  root: 'Root element',
  toolbar: 'Main control',
  body: 'Track element, contains all other elements',
  pagination: 'Filled part of the track',
  header: 'DataGrid header, contains titles',
};

export const applyStyles = createStyles(() => ({
  root: {},

  toolbar: {
    display: 'flex',
    boxSizing: 'border-box',
  },

  body: {
    flex: 1,
    width: '100vw',
    boxSizing: 'border-box',
  },
  pagination: {
    flex: 1,
    width: '100vw',
    boxSizing: 'border-box',
  },
}));