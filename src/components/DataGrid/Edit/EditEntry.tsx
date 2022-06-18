import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack } from '@mui/material';
import FormDataGridField from '../FormDataGridField';
import { Close } from '@mui/icons-material';

function EditEntry({ open, onClose, entry, onEditEntry, columns, schema, defaultValues }) {
  const { handleSubmit, setValue, control } = useForm({
    mode: 'onTouched',
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (entry) {
      for (const column of columns) {
        setValue(column.name, entry[column.name]);
      }
    }
  }, [entry, columns, setValue]);

  const onSubmit = async (data) => {
    try {
      onEditEntry(entry.id, data);
    } finally {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          width: 1,
          p: 2,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: (theme) => theme.palette.primary.main + 44,
        },
        elevation: 0,
      }}
      onClose={onClose}
      scroll="body"
    >
      <DialogTitle>
        <Box>Edit Item</Box>
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

      <DialogContent>
        <Stack sx={{ pt: 3 }} spacing={3}>
          {columns.map((item, index) => (
            <FormDataGridField
              key={item.name}
              name={item.name}
              control={control}
              label={`${item.label}${item.required ? '*' : ''}`}
              schema={item}
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" autoFocus onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditEntry;
