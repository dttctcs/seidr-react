import React, { useEffect, useState } from 'react';
import { getValue } from '../utils';

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import TabPanel from './TabPanel';
import RelationPanel from './RelationPanel';
import { Close } from '@mui/icons-material';

function ViewEntry({ open, onClose, id, relations, onViewEntry }) {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('sm'));

  const [loading, setLoading] = useState(false);
  const [entry, setEntry] = useState(null);
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    onViewEntry(id)
      .then((data) => setEntry(data))
      .catch((error) => console.log(error));
  }, [onViewEntry, id]);

  return entry && !loading ? (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          height: small ? 1 : 640,
          p: 2,

          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: (theme) => theme.palette.primary.main + 44,
        },
        elevation: 0,
      }}
      onClose={onClose}
      onClick={(e) => e.stopPropagation()}
      scroll="body"
      maxWidth={'md'}
      fullScreen={small}
      fullWidth
    >
      <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
        <DialogTitle sx={{ pb: 4 }}>
          <Box sx={{ pb: 3 }}>
            {entry.show_title.substr(entry.show_title.indexOf(' ') + 1)} (#{entry.id})
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              <Tab value={0} label="Details" />
              {relations.map((relation, index) => {
                return <Tab key={index} value={index + 1} label={relation.name} />;
              })}
            </Tabs>
          </Box>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <TabPanel value={value} index={0}>
            <Stack sx={{ py: 3 }} spacing={2}>
              {entry.show_columns.map((column, index) => {
                return (
                  <Grid container key={column} sx={{ fontSize: '0.875rem' }}>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        pl: 3,
                        typography: 'body2',

                        fontWeight: '500',
                        color: 'inherit',
                      }}
                    >
                      {entry.label_columns[column]}
                    </Grid>
                    <Grid item xs={1} sx={{ color: 'grey.600' }}>
                      :
                    </Grid>
                    <Grid
                      item
                      xs={7}
                      sx={{
                        pr: 3,
                        color: 'grey.600',
                        typography: 'body2',

                        fontWeight: '500',
                      }}
                    >
                      {getValue(entry.result[column])}
                    </Grid>
                  </Grid>
                );
              })}
            </Stack>
          </TabPanel>
          {relations.map((relation, index) => {
            return (
              <TabPanel key={index} value={value} index={index + 1}>
                <RelationPanel relation={{ ...relation, id }} />
              </TabPanel>
            );
          })}
        </DialogContent>
      </Box>
    </Dialog>
  ) : null;
}

export default ViewEntry;
